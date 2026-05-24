<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::where('is_active', true)
            ->orderBy('member_type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Members/Create', [
            'galleries' => \App\Models\Gallery::latest('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'member_type' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('members', 'public');
        }

        Member::create([
            'name' => $validated['name'],
            'member_type' => $validated['member_type'],
            'position' => $validated['position'] ?? null,
            'specialty' => $validated['specialty'] ?? null,
            'description' => $validated['description'] ?? null,
            'photo_path' => $photoPath,
        ]);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function edit(Member $member)
    {
        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
            'galleries' => \App\Models\Gallery::latest('id')->get(),
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'member_type' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('members', 'public');
            $member->photo_path = $path;
        }

        $member->update([
            'name' => $validated['name'],
            'member_type' => $validated['member_type'],
            'position' => $validated['position'] ?? null,
            'specialty' => $validated['specialty'] ?? null,
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? $member->is_active,
        ]);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil dihapus.');
    }

    public function downloadTemplate()
    {
        $headers = ['Nama', 'Tipe Anggota', 'Posisi / Spesialisasi', 'Status Aktif (Ya/Tidak)'];
        $callback = function() use($headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            fputcsv($file, ['John Doe', 'Dewan Penasihat', 'Ketua', 'Ya']);
            fputcsv($file, ['Jane Doe', 'Pengurus', 'Sekretaris', 'Ya']);
            fclose($file);
        };

        return response()->stream($callback, 200, [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=template_anggota.csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ]);
    }

    private function parseSpreadsheet($path)
    {
        $fullPath = \Illuminate\Support\Facades\Storage::path($path);
        $ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
        
        $rows = [];
        if ($ext === 'csv') {
            $content = file_get_contents($fullPath);
            $lines = explode("\n", $content);
            if (count($lines) > 0) {
                $firstLine = $lines[0];
                $delimiter = strpos($firstLine, ';') !== false ? ';' : ',';
                if (($handle = fopen($fullPath, "r")) !== FALSE) {
                    while (($data = fgetcsv($handle, 1000, $delimiter)) !== FALSE) {
                        $rows[] = $data;
                    }
                    fclose($handle);
                }
            }
        } else if ($ext === 'xlsx') {
            if ($xlsx = \Shuchkin\SimpleXLSX::parse($fullPath)) {
                $rows = $xlsx->rows();
            } else {
                \Illuminate\Support\Facades\Log::error('SimpleXLSX Parse Error: ' . \Shuchkin\SimpleXLSX::parseError());
                throw new \Exception('Gagal membaca file Excel. Pastikan file tidak rusak. Detail: ' . \Shuchkin\SimpleXLSX::parseError());
            }
        } else {
            throw new \Exception('Format file tidak didukung. Harap gunakan format .xlsx atau .csv');
        }
        return $rows;
    }

    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv,txt|max:5120',
        ]);

        $file = $request->file('file');
        // Rename file to keep extension for parsing
        $path = $file->storeAs('temp', uniqid() . '.' . $file->getClientOriginalExtension());

        try {
            $rows = $this->parseSpreadsheet($path);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Storage::delete($path);
            return response()->json(['error' => $e->getMessage()], 400);
        }

        if (!empty($rows)) {
            $headers = [];
            $preview_data = [];
            foreach ($rows as $k => $r) {
                if ($k === 0) {
                    $headers = $r;
                } else if ($k <= 5) {
                    $rowAssoc = [];
                    foreach ($headers as $idx => $header) {
                        $rowAssoc[$header] = $r[$idx] ?? null;
                    }
                    $preview_data[] = $rowAssoc;
                } else {
                    break;
                }
            }
            return response()->json([
                'filename' => $path,
                'headers' => $headers,
                'preview_data' => $preview_data,
            ]);
        } else {
            \Illuminate\Support\Facades\Storage::delete($path);
            return response()->json(['error' => 'File kosong atau tidak dapat dibaca. Pastikan file berisi data.'], 400);
        }
    }

    public function processImport(Request $request)
    {
        $request->validate([
            'filename' => 'required|string',
            'mapping' => 'required|array',
            'mapping.name' => 'required|string',
            'mapping.member_type' => 'required|string',
        ]);

        $path = $request->filename;
        $mapping = $request->mapping;

        if (!\Illuminate\Support\Facades\Storage::exists($path)) {
            return response()->json(['error' => 'File tidak ditemukan atau kadaluarsa.'], 400);
        }

        try {
            $rows = $this->parseSpreadsheet($path);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Storage::delete($path);
            return response()->json(['error' => $e->getMessage()], 400);
        }

        if (!empty($rows)) {
            $header_values = [];
            $importedCount = 0;
            foreach ($rows as $k => $r) {
                if ($k === 0) {
                    $header_values = $r; // Original headers to match with mapping
                    continue;
                }
                
                // If the row is empty, skip
                if (empty(array_filter($r))) {
                    continue;
                }
                
                $row = [];
                foreach ($header_values as $idx => $header) {
                    $row[$header] = $r[$idx] ?? null;
                }
                
                $name = $row[$mapping['name']] ?? null;
                $tipe = $row[$mapping['member_type']] ?? null;
                
                $posisi = null;
                if (!empty($mapping['position']) && isset($row[$mapping['position']])) {
                    $posisi = $row[$mapping['position']];
                }
                
                $aktif = null;
                if (!empty($mapping['is_active']) && isset($row[$mapping['is_active']])) {
                    $aktif = $row[$mapping['is_active']];
                }
                
                // default to active if not provided or parsing fails
                $isActive = true;
                if ($aktif !== null) {
                    $aktifStr = strtolower(trim((string)$aktif));
                    $isActive = in_array($aktifStr, ['ya', '1', 'aktif', 'true', 'yes']);
                }

                if ($name && $tipe) {
                    Member::create([
                        'name' => trim((string)$name),
                        'member_type' => trim((string)$tipe),
                        'position' => $posisi ? trim((string)$posisi) : null,
                        'is_active' => $isActive,
                    ]);
                    $importedCount++;
                }
            }
            
            \Illuminate\Support\Facades\Storage::delete($path);
            
            return response()->json([
                'success' => true,
                'message' => 'Berhasil mengimpor ' . $importedCount . ' data anggota.'
            ]);
        } else {
            \Illuminate\Support\Facades\Storage::delete($path);
            return response()->json(['error' => 'Gagal membaca isi file.'], 400);
        }
    }
}
