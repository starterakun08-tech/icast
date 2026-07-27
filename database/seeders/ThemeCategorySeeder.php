<?php

namespace Database\Seeders;

use App\Models\ThemeCategory;
use Illuminate\Database\Seeder;

class ThemeCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name'        => 'Kategori 1: Teknologi Pendidikan',
                'description' => 'Solusi berbasis teknologi untuk meningkatkan akses dan kualitas pendidikan di daerah terpencil maupun perkotaan.',
                'order'       => 1,
                'is_active'   => true,
            ],
            [
                'name'        => 'Kategori 2: Kesehatan Digital',
                'description' => 'Inovasi digital di bidang kesehatan masyarakat, telemedicine, dan sistem informasi klinis.',
                'order'       => 2,
                'is_active'   => true,
            ],
            [
                'name'        => 'Kategori 3: Smart Environment',
                'description' => 'Solusi cerdas untuk pengelolaan lingkungan, energi terbarukan, dan keberlanjutan ekosistem.',
                'order'       => 3,
                'is_active'   => true,
            ],
            [
                'name'        => 'Kategori 4: Ekonomi & Sosial Digital',
                'description' => 'Aplikasi digital untuk pemberdayaan ekonomi masyarakat, UMKM, dan inklusi sosial.',
                'order'       => 4,
                'is_active'   => true,
            ],
        ];

        foreach ($categories as $cat) {
            ThemeCategory::firstOrCreate(['name' => $cat['name']], $cat);
        }
    }
}
