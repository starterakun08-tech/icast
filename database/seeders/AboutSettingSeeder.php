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
                'title' => 'ABOUT',
                'body' => "The iCast Hackathon brings\ntogether student, researchers,\ndesigner, developer, and innovators\nto solve meaning ful challengges\nthrough technology",
                'btn_primary_text' => 'Register Now →',
                'btn_primary_url' => '#register',
            ]
        );
    }
}
