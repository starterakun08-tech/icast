<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        Faq::truncate();

        $faqs = [
            [
                'question' => 'Who can participate in the iCAST Hackathon?',
                'answer'   => 'The hackathon is open to students, researchers, designers, developers, and innovators from all backgrounds. Whether you\'re a beginner or an experienced professional, you\'re welcome to join.',
                'order'    => 1,
            ],
            [
                'question' => 'Do I need to have a team to register?',
                'answer'   => 'You can register individually or as a team. Teams can have up to 5 members. We also have a team-matching session during the Kickoff event.',
                'order'    => 2,
            ],
            [
                'question' => 'Is there a registration fee?',
                'answer'   => 'No, participation in the iCAST Hackathon is completely free. We believe in democratizing access to innovation opportunities.',
                'order'    => 3,
            ],
            [
                'question' => 'What themes or tracks are available?',
                'answer'   => 'The hackathon focuses on technology solutions that empower communities and accelerate sustainable development. Specific tracks will be announced at the Kickoff event.',
                'order'    => 4,
            ],
            [
                'question' => 'How will projects be evaluated?',
                'answer'   => 'Projects are evaluated on innovation, technical implementation, social impact, feasibility, and presentation quality by a panel of industry experts and academics.',
                'order'    => 5,
            ],
            [
                'question' => 'Can I participate remotely?',
                'answer'   => 'Yes! Most sessions are hybrid (online + onsite). The final presentation at iCAST is onsite, but remote participants can present virtually.',
                'order'    => 6,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
