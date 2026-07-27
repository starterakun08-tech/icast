<?php

namespace Database\Seeders;

use App\Models\Timeline;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder
{
    public function run(): void
    {
        Timeline::truncate();

        $items = [
            [
                'date'        => '06 August',
                'title'       => 'Kickoff',
                'description' => 'Onsite + Online',
                'icon'        => 'flag',
                'order'       => 1,
            ],
            [
                'date'        => '10 September',
                'title'       => 'Submission',
                'description' => 'Online',
                'icon'        => 'laptop',
                'order'       => 2,
            ],
            [
                'date'        => '24 August',
                'title'       => 'Workshop',
                'description' => 'Online',
                'icon'        => 'code',
                'order'       => 3,
            ],
            [
                'date'        => '9–10 October',
                'title'       => 'iCAST Onsite',
                'description' => 'iCAST Onsite',
                'icon'        => 'trophy',
                'order'       => 4,
            ],
        ];

        foreach ($items as $item) {
            Timeline::create($item);
        }
    }
}
