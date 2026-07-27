<?php

namespace Database\Seeders;

use App\Models\HeroSetting;
use Illuminate\Database\Seeder;

class HeroSettingSeeder extends Seeder
{
    public function run(): void
    {
        HeroSetting::updateOrCreate(['id' => 1], [
            'title_line1'        => 'Build Technology',
            'title_line2'        => 'That Matters',
            'subtitle'           => "Design solutions that empower people,\nstrengthen communities,\nand accelerate sustainable development",
            'btn_primary_text'   => 'Register Now',
            'btn_primary_url'    => '#register',
            'btn_secondary_text' => 'Learn More',
            'btn_secondary_url'  => '#about',
            'banner_image'       => null,
        ]);
    }
}
