<?php

namespace Database\Seeders;

use App\Models\Prize;
use Illuminate\Database\Seeder;

class PrizeSeeder extends Seeder
{
    public function run(): void
    {
        Prize::truncate();

        $prizes = [
            [
                'title'       => '🥇 1st Place',
                'description' => 'Grand Prize — Best Overall Solution',
                'amount'      => '$3,000',
                'order'       => 1,
            ],
            [
                'title'       => '🥈 2nd Place',
                'description' => 'Runner-Up Award',
                'amount'      => '$1,500',
                'order'       => 2,
            ],
            [
                'title'       => '🥉 3rd Place',
                'description' => 'Second Runner-Up',
                'amount'      => '$750',
                'order'       => 3,
            ],
            [
                'title'       => '🌟 Best Innovation',
                'description' => 'Most Creative & Impactful Idea',
                'amount'      => '$500',
                'order'       => 4,
            ],
        ];

        foreach ($prizes as $prize) {
            Prize::create($prize);
        }
    }
}
