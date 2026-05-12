<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\LandingSection;
use App\Models\User;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first();
        if (!$admin) {
            return;
        }

        // --- Landing Sections (Feature, History, Philosophy, Kompetisi & Event/Education) ---
        $landingSections = [
            // History (Indonesian)
            ['locale' => 'id', 'section_key' => 'history_1', 'title' => 'Sejarah Lahirnya Tarung Derajat', 'content' => 'Tarung Derajat dideklarasikan kelahirannya di Bandung pada tanggal 18 Juli 1972 oleh Achmad Dradjat yang kelak dipanggil dengan sebutan Sang Guru. Bela diri ini lahir dari pengalaman keras di jalanan dan telah berkembang menjadi olahraga bela diri resmi yang diakui secara nasional maupun internasional.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'id', 'section_key' => 'history_2', 'title' => 'Pengakuan Resmi dan Perkembangan', 'content' => 'Seiring perkembangan zaman, Tarung Derajat telah diakui oleh Kemenpora RI sebagai cabang olahraga resmi. Organisasi ini terus berkembang dengan membuka dojo di berbagai wilayah dan mengadakan kompetisi rutin untuk mengembangkan atlet-atlet berkualitas.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'id', 'section_key' => 'history_3', 'title' => 'Ekspansi Internasional', 'content' => 'Tarung Derajat kini telah dikenal di tingkat internasional dengan partisipasi di berbagai kompetisi dunia. Visi untuk menjadikan Tarung Derajat sebagai bela diri yang diakui global terus didorong melalui berbagai program pembinaan dan promosi.', 'is_active' => true, 'sort_order' => 3],

            // Philosophy (Indonesian)
            ['locale' => 'id', 'section_key' => 'philosophy_1', 'title' => 'Filosofi Dasar Berdiri', 'content' => 'Semboyan atau motto Tarung Derajat adalah "Aku Ramah Bukan Berarti Takut, Aku Tunduk Bukan Berarti Takluk". Filosofi ini mengajarkan bahwa kekuatan tidak untuk menindas, melainkan untuk melindungi diri dan menyebarkan kasih sayang kepada sesama.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'id', 'section_key' => 'philosophy_2', 'title' => 'Nilai Kemanusiaan dan Sportivitas', 'content' => 'Dalam setiap latihan dan kompetisi, Tarung Derajat mengutamakan nilai-nilai kemanusiaan, sportivitas, dan saling menghormati. Atlet diajari untuk menguasai teknik bela diri sambil mempertahankan budi pekerti luhur dan integritas moral.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'id', 'section_key' => 'philosophy_3', 'title' => 'Dedikasi dan Disiplin', 'content' => 'Filosofi Tarung Derajat juga menekankan pentingnya dedikasi, disiplin, dan kerja keras dalam mencapai tujuan. Setiap atlet dituntut untuk berkomitmen penuh dalam proses latihan untuk meraih prestasi setinggi mungkin.', 'is_active' => true, 'sort_order' => 3],

            // Education / Kompetisi & Event (Indonesian)
            ['locale' => 'id', 'section_key' => 'education_1', 'title' => 'Kejurnas Tarung Derajat 2026', 'content' => 'Persiapkan diri Anda untuk Kejuaraan Nasional (Kejurnas) Tarung Derajat yang akan diselenggarakan bulan ini. Event ini merupakan ajang unjuk gigi bagi para atlet terbaik dari seluruh wilayah untuk meraih prestasi tertinggi.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'id', 'section_key' => 'education_2', 'title' => 'Sirkuit Kompetisi Pelajar', 'content' => 'Sebagai ajang pembibitan atlet usia dini, sirkuit kompetisi tahunan pelajar akan dimulai. Mari kembangkan sportivitas dan prestasi peserta didik melalui kegiatan ini dengan bimbingan pelatih profesional.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'id', 'section_key' => 'education_3', 'title' => 'Pelatihan Intensif Tim Nasional', 'content' => 'Tim nasional Tarung Derajat sedang melaksanakan pelatihan intensif dalam persiapan menghadapi kompetisi internasional. Para atlet dipilih melalui proses seleksi ketat dan dibimbing oleh pelatih-pelatih berpengalaman.', 'is_active' => true, 'sort_order' => 3],
            ['locale' => 'id', 'section_key' => 'education_4', 'title' => 'Ujian Kenaikan Tingkat (UKT)', 'content' => 'Setiap enam bulan, praktisi Tarung Derajat dapat mengikuti Ujian Kenaikan Tingkat (UKT) untuk naik ke sabuk yang lebih tinggi. UKT mencakup penilaian teknik, kebugaran fisik, pengetahuan teori, dan budi pekerti.', 'is_active' => true, 'sort_order' => 4],

            // History (English)
            ['locale' => 'en', 'section_key' => 'history_1', 'title' => 'The Origin of Tarung Derajat', 'content' => 'Tarung Derajat was declared in Bandung on July 18, 1972, by Achmad Dradjat, later known as Sang Guru. Born from tough street experiences, it has evolved into a recognized national and international martial art.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'en', 'section_key' => 'history_2', 'title' => 'Official Recognition and Development', 'content' => 'Over time, Tarung Derajat gained official recognition from the Indonesian Ministry of Sports as a registered martial art. The organization continues to expand by opening dojos across various regions and holding regular competitions to develop quality athletes.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'en', 'section_key' => 'history_3', 'title' => 'International Expansion', 'content' => 'Tarung Derajat is now recognized internationally with participation in various world competitions. The vision to establish Tarung Derajat as a globally recognized martial art is continuously advanced through training and promotion programs.', 'is_active' => true, 'sort_order' => 3],

            // Philosophy (English)
            ['locale' => 'en', 'section_key' => 'philosophy_1', 'title' => 'Core Philosophy', 'content' => 'The motto of Tarung Derajat is "I Am Friendly Does Not Mean I am Afraid, I Submit Does Not Mean I am Defeated." This philosophy teaches that strength is not for oppressing, but to protect oneself and spread kindness.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'en', 'section_key' => 'philosophy_2', 'title' => 'Humanity and Sportsmanship', 'content' => 'In every training and competition, Tarung Derajat prioritizes values of humanity, sportsmanship, and mutual respect. Athletes are taught to master martial arts techniques while maintaining noble character and moral integrity.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'en', 'section_key' => 'philosophy_3', 'title' => 'Dedication and Discipline', 'content' => 'Tarung Derajat philosophy also emphasizes the importance of dedication, discipline, and hard work in achieving goals. Every athlete is required to commit fully to the training process to achieve the highest level of achievement.', 'is_active' => true, 'sort_order' => 3],

            // Education / Kompetisi & Event (English)
            ['locale' => 'en', 'section_key' => 'education_1', 'title' => 'National Championship 2026', 'content' => 'Prepare yourself for the upcoming Tarung Derajat National Championship. This event is a great opportunity for the best athletes from various regions to showcase their skills and compete for the highest honors.', 'is_active' => true, 'sort_order' => 1],
            ['locale' => 'en', 'section_key' => 'education_2', 'title' => 'Student Competition Circuit', 'content' => 'As an arena for young athlete development, the annual student competition circuit is about to begin. Let us foster sportsmanship and outstanding achievement under professional coaching.', 'is_active' => true, 'sort_order' => 2],
            ['locale' => 'en', 'section_key' => 'education_3', 'title' => 'National Team Intensive Training', 'content' => 'The Tarung Derajat national team is conducting intensive training in preparation for international competitions. Athletes are selected through a rigorous process and coached by experienced trainers.', 'is_active' => true, 'sort_order' => 3],
            ['locale' => 'en', 'section_key' => 'education_4', 'title' => 'Promotion Examination (UKT)', 'content' => 'Every six months, Tarung Derajat practitioners can take the Promotion Examination (UKT) to advance to a higher belt level. UKT includes assessment of technique, physical fitness, theoretical knowledge, and character.', 'is_active' => true, 'sort_order' => 4],
        ];

        foreach ($landingSections as $data) {
            LandingSection::updateOrCreate(
                ['locale' => $data['locale'], 'section_key' => $data['section_key']],
                $data
            );
        }

        // --- Articles ---
        $articles = [
            [
                'user_id' => $admin->id,
                'title' => 'Persiapan PON: Atlet Tarung Derajat Genjot Fisik',
                'content' => '<p>Menjelang perhelatan Pekan Olahraga Nasional (PON), para ketua wilayah mulai memastikan atlet-atlet binaan dari cabang olahraga Tarung Derajat dalam kondisi terbaik. Berbagai pemusatan latihan telah dilakukan guna mencapai target emas.</p><p>Metode latihan diintensifkan dengan fokus khusus pada daya tahan, ketahanan, kecepatan, dan taktik pertarungan di atas matras. Semoga Tim Tarung Derajat bisa memberikan performa maksimal di PON kali ini.</p>',
                'is_featured' => true,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Sosialisasi Kurikulum Latihan Terbaru 2026',
                'content' => '<p>Perguruan Pusat Tarung Derajat baru-baru ini meluncurkan kurikulum latihan terbaru sebagai bagian dari standarisasi teknik. Kurikulum ini didesain agar mudah dipelajari tanpa menghilangkan esensi beladiri aslinya.</p><p>Seluruh pelatih cabang diwajibkan mengikuti penataran yang akan diinformasikan dalam waktu dekat. Tujuan dari kurikulum ini adalah untuk memastikan konsistensi metode pengajaran di seluruh wilayah.</p>',
                'is_featured' => true,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Ujian Kenaikan Tingkat (UKT) Semester Pertama Berlangsung Sukses',
                'content' => '<p>Kegiatan Ujian Kenaikan Tingkat (UKT) yang dilaksanakan serentak oleh berbagai Pengprov sukses digelar bulan kemarin. Ratusan anggota berhasil lulus ujian fisik, teknik, maupun mental.</p><p>Kami ucapkan selamat kepada seluruh peserta yang berhasil meraih tingkat/sabuk baru. Tetap berlatih dan asah terus kemampuan Anda.</p>',
                'is_featured' => false,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Pembukaan Dojo Cabang Baru di Yogyakarta',
                'content' => '<p>Dengan terus berkembangnya organisasi, Tarung Derajat membuka dojo cabang baru di Yogyakarta. Fasilitas modern dan pelatih berpengalaman telah disiapkan untuk memberikan latihan terbaik bagi praktisi.</p><p>Pendaftaran anggota baru sudah dibuka dan kami mengajak masyarakat Yogyakarta untuk bergabung dalam mempelajari bela diri Tarung Derajat.</p>',
                'is_featured' => false,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Turnamen Internasional: Tarung Derajat Berlaga di Tingkat Dunia',
                'content' => '<p>Tim Tarung Derajat akan mengikuti turnamen internasional di Asia Tenggara bulan depan. Ini adalah kesempatan berharga untuk menunjukkan kemampuan atlet-atlet terbaik kita di kancah internasional.</p><p>Persiapan telah dimulai dengan intensitas latihan yang tinggi dan strategi pertarungan yang matang. Mari kita dukung penuh pencapaian para atlet kami.</p>',
                'is_featured' => false,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Webinar: Strategi Pengembangan Olahraga Lokal di Era Digital',
                'content' => '<p>Tarung Derajat menggelar webinar dengan tema "Strategi Pengembangan Olahraga Lokal di Era Digital". Narasumber adalah para ahli di bidang manajemen olahraga dan transformasi digital.</p><p>Webinar ini terbuka untuk para pemimpin organisasi, pelatih, dan praktisi yang ingin memahami lebih dalam tentang pengembangan olahraga tradisional di era modern.</p>',
                'is_featured' => false,
            ],
            [
                'user_id' => $admin->id,
                'title' => 'Pelatih Tarung Derajat Raih Sertifikasi Internasional',
                'content' => '<p>Sejumlah pelatih senior Tarung Derajat telah berhasil meraih sertifikasi internasional dari badan olahraga regional. Pencapaian ini membuktikan komitmen Tarung Derajat dalam meningkatkan kualitas pelatihan.</p><p>Dengan sertifikasi ini, para pelatih diharapkan dapat membawa standar latihan Tarung Derajat sesuai dengan norma internasional.</p>',
                'is_featured' => false,
            ],
        ];

        foreach ($articles as $article) {
            Article::firstOrCreate(
                ['title' => $article['title']], // Avoid duplicates if seeded multiple times
                $article
            );
        }
    }
}
