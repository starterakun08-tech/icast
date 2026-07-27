<?php

namespace Database\Seeders;

use App\Models\HeroSetting;
use App\Models\AboutSetting;
use App\Models\WhyJoinCard;
use App\Models\Timeline;
use App\Models\Mentor;
use App\Models\Prize;
use App\Models\Faq;
use App\Models\Registration;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            HeroSettingSeeder::class,
            AboutSettingSeeder::class,
            WhyJoinCardSeeder::class,
            TimelineSeeder::class,
            MentorSeeder::class,
            PrizeSeeder::class,
            FaqSeeder::class,
            RegistrationSeeder::class,
            ThemeCategorySeeder::class,
        ]);
    }
}
