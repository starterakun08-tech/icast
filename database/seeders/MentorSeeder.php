<?php

namespace Database\Seeders;

use App\Models\Mentor;
use Illuminate\Database\Seeder;

class MentorSeeder extends Seeder
{
    public function run(): void
    {
        Mentor::truncate();

        $mentors = [
            [
                'name'         => 'Kyle Wild',
                'position'     => 'CTO',
                'organization' => 'Endgame Labs, Inc.',
                'photo'        => null,
                'order'        => 1,
            ],
            [
                'name'         => 'Yusuke Takahashi, PhD',
                'position'     => 'Associate Professor, Faculty of Data Science',
                'organization' => 'Musashino University',
                'photo'        => null,
                'order'        => 2,
            ],
            [
                'name'         => 'Akhmad Alimudin, PhD',
                'position'     => 'Researcher, Faculty of Creative Multimedia',
                'organization' => 'PENS',
                'photo'        => null,
                'order'        => 3,
            ],
        ];

        foreach ($mentors as $mentor) {
            Mentor::create($mentor);
        }
    }
}
