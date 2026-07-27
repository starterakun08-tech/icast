<?php

namespace Database\Seeders;

use App\Models\AboutSetting;
use Illuminate\Database\Seeder;

class AboutSettingSeeder extends Seeder
{
    public function run(): void
    {
        AboutSetting::updateOrCreate(
            ['id' => 1],
            [
                'section_label' => 'ABOUT',
                'heading' => 'Hackathon',
                'body' => "The iCast Hackathon brings\ntogether student, researchers,\ndesigner, developer, and innovators\nto solve meaningful challenges\nthrough technology",
                'cta_text' => 'Register Now →',
                'cta_url' => '#register',
            ]
        );
    }
}
