<?php

namespace Database\Seeders;

use App\Models\WhyJoinCard;
use Illuminate\Database\Seeder;

class WhyJoinCardSeeder extends Seeder
{
    public function run(): void
    {
        WhyJoinCard::truncate();

        $cards = [
            [
                'icon'        => 'Better-Together',
                'title'       => 'Better Together.',
                'description' => "Innovation happens when\ndifferent perspectives meet\naround one table.",
                'order'       => 1,
            ],
            [
                'icon'        => 'Think-Bigger',
                'title'       => 'Think Bigger.',
                'description' => "Explore bold ideas.\nPrototype quickly.\nLearn continuously.",
                'order'       => 2,
            ],
            [
                'icon'        => 'meet-your-future',
                'title'       => 'Meet Your Future Collaborators',
                'description' => "Connect with students,\nresearchers, mentors,\nstartups, and industry\nleaders.",
                'order'       => 3,
            ],
        ];

        foreach ($cards as $card) {
            WhyJoinCard::create($card);
        }
    }
}
