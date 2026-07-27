<?php

namespace App\Http\Controllers;

use App\Models\AboutSetting;
use App\Models\Faq;
use App\Models\HeroSetting;
use App\Models\Mentor;
use App\Models\Prize;
use App\Models\Timeline;
use App\Models\WhyJoinCard;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'hero'       => HeroSetting::instance(),
            'about'      => AboutSetting::instance(),
            'whyJoin'    => WhyJoinCard::active()->get(),
            'timelines'  => Timeline::active()->get(),
            'mentors'    => Mentor::active()->get(),
            'prizes'     => Prize::active()->get(),
            'faqs'       => Faq::active()->get(),
            'seo'        => [
                'title'       => 'iCAST Hackathon 2026 — Build Technology That Matters',
                'description' => 'Join the iCAST Hackathon 2026. Design solutions that empower people, strengthen communities, and accelerate sustainable development.',
                'og_image'    => asset('images/banner.png'),
            ],
        ]);
    }
}
