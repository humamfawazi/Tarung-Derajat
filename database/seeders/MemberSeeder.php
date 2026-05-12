<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = [
            // Pengurus / Board
            [
                'name' => 'Achmad Dradjat',
                'member_type' => 'board',
                'position' => 'Pendiri / Sang Guru',
                'specialty' => 'Pembinaan filosofi dan arah organisasi',
                'description' => 'Tokoh pendiri Tarung Derajat yang menjadi sumber nilai, disiplin, dan arah pengembangan bela diri ini.',
                'is_active' => true,
            ],
            [
                'name' => 'H. Asep Suhendar',
                'member_type' => 'board',
                'position' => 'Ketua Umum',
                'specialty' => 'Kepemimpinan organisasi dan koordinasi nasional',
                'description' => 'Memimpin koordinasi organisasi Tarung Derajat di tingkat pusat dan menjembatani pembinaan antarwilayah.',
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Rina Prameswari',
                'member_type' => 'board',
                'position' => 'Sekretaris Jenderal',
                'specialty' => 'Administrasi, tata naskah, dan publikasi',
                'description' => 'Mengelola administrasi pusat, dokumentasi kegiatan, dan komunikasi resmi organisasi secara terstruktur.',
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santosa',
                'member_type' => 'board',
                'position' => 'Bendahara Umum',
                'specialty' => 'Keuangan dan pengelolaan anggaran',
                'description' => 'Bertanggung jawab atas pengelolaan keuangan organisasi serta memastikan program berjalan efektif dan akuntabel.',
                'is_active' => true,
            ],
            [
                'name' => 'Nina Larasati',
                'member_type' => 'board',
                'position' => 'Bidang Pembinaan Prestasi',
                'specialty' => 'Program latihan dan kompetisi',
                'description' => 'Mendorong pembinaan atlet melalui kurikulum latihan, seleksi, dan monitoring prestasi secara berkala.',
                'is_active' => true,
            ],
            [
                'name' => 'M. Farhan Yusuf',
                'member_type' => 'board',
                'position' => 'Bidang Kompetisi & Event',
                'specialty' => 'Penyelenggaraan turnamen dan agenda resmi',
                'description' => 'Mengatur agenda kejuaraan, event pembinaan, dan kegiatan promosi Tarung Derajat di berbagai daerah.',
                'is_active' => true,
            ],
            [
                'name' => 'Siti Aulia Rahma',
                'member_type' => 'board',
                'position' => 'Bidang Humas & Digital',
                'specialty' => 'Publikasi, media sosial, dan dokumentasi',
                'description' => 'Mengelola kanal informasi digital, publikasi kegiatan, serta hubungan dengan media dan masyarakat.',
                'is_active' => true,
            ],
            [
                'name' => 'Dedi Kurniawan',
                'member_type' => 'board',
                'position' => 'Bidang Kerja Sama',
                'specialty' => 'Kemitraan dan pengembangan jaringan',
                'description' => 'Menjalin kerja sama dengan sekolah, perguruan tinggi, dan lembaga olahraga untuk pengembangan organisasi.',
                'is_active' => true,
            ],

            // Atlet
            [
                'name' => 'Agung Pratama',
                'member_type' => 'athlete',
                'position' => 'Atlet Senior',
                'specialty' => 'Kelas tarung bebas',
                'description' => 'Atlet berpengalaman yang pernah tampil di berbagai kejuaraan regional dan nasional.',
                'is_active' => true,
            ],
            [
                'name' => 'Rizky Ramadhan',
                'member_type' => 'athlete',
                'position' => 'Atlet Nasional',
                'specialty' => 'Kelas tanding putra',
                'description' => 'Bersiap mengikuti ajang nasional dengan fokus pada peningkatan stamina, kecepatan, dan taktik.',
                'is_active' => true,
            ],
            [
                'name' => 'Nabila Putri',
                'member_type' => 'athlete',
                'position' => 'Atlet Nasional',
                'specialty' => 'Kelas tanding putri',
                'description' => 'Aktif dalam program pelatihan intensif dan menjadi salah satu atlet andalan di cabang putri.',
                'is_active' => true,
            ],
            [
                'name' => 'M. Hafiz Alfarizi',
                'member_type' => 'athlete',
                'position' => 'Atlet Pelajar',
                'specialty' => 'Pembinaan usia dini',
                'description' => 'Masuk program pembinaan pelajar untuk menyiapkan regenerasi atlet masa depan.',
                'is_active' => true,
            ],
            [
                'name' => 'Putri Aisyah',
                'member_type' => 'athlete',
                'position' => 'Atlet Pelajar',
                'specialty' => 'Teknik dasar dan sparring',
                'description' => 'Menunjukkan perkembangan teknik yang cepat dalam kelas pembinaan usia sekolah.',
                'is_active' => true,
            ],
            [
                'name' => 'Fajar Nugraha',
                'member_type' => 'athlete',
                'position' => 'Atlet Daerah',
                'specialty' => 'Kelas tarung dewasa',
                'description' => 'Atlet daerah yang rutin mengikuti sirkuit kompetisi dan training camp tahunan.',
                'is_active' => true,
            ],
            [
                'name' => 'Salsa Kinasih',
                'member_type' => 'athlete',
                'position' => 'Atlet Daerah',
                'specialty' => 'Kategori seni & fisik',
                'description' => 'Terlibat dalam pengembangan kategori seni, fisik, dan pembinaan karakter atlet muda.',
                'is_active' => true,
            ],
            [
                'name' => 'Yoga Saputra',
                'member_type' => 'athlete',
                'position' => 'Atlet Cadangan',
                'specialty' => 'Sparring dan strategi',
                'description' => 'Siap masuk skuad utama kapan saja dan fokus meningkatkan kualitas pertarungan.',
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            Member::updateOrCreate(
                ['name' => $member['name']],
                $member
            );
        }
    }
}
