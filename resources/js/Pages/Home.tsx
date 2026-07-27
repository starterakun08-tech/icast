import { Head } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import type { InertiaPageProps, HeroSetting, AboutSetting, WhyJoinCard, Timeline, Mentor, Prize, Faq, SeoData } from '@/types';

import Navbar from '@/Components/Navbar';
import HeroBanner from '@/Components/HeroBanner';
import MainContent from '@/Components/MainContent';
import MentorsSection from '@/Components/MentorsSection';
import PrizesSection from '@/Components/PrizesSection';
import FaqSection from '@/Components/FaqSection';
import RegisterCTA from '@/Components/RegisterCTA';
import OrganizerSection from '@/Components/OrganizerSection';
import Footer from '@/Components/Footer';

interface HomeProps {
    hero: HeroSetting;
    about: AboutSetting;
    whyJoin: WhyJoinCard[];
    timelines: Timeline[];
    mentors: Mentor[];
    prizes: Prize[];
    faqs: Faq[];
    seo: SeoData;
}

export default function Home({ hero, about, whyJoin, timelines, mentors, prizes, faqs, seo }: InertiaPageProps<HomeProps>) {
    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:image" content={seo.og_image} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <link rel="icon" type="image/svg+xml" href="/images/icast-logo.svg" />
            </Head>

            {/* Global page background */}
            <div style={{ minHeight: '100vh', background: '#fff6e9' }}>
                <Navbar transparent />

                {/* Navbar occupies space — push content below it */}
                <div style={{ paddingTop: 'clamp(80px, 7.19vw, 138px)' }}>
                    <main>
                        {/* 1. Hero Banner */}
                        <HeroBanner hero={hero} featureCards={whyJoin} />

                        {/* 2. About + Why Join + Timeline */}
                        <MainContent
                            about={about}
                            whyJoin={whyJoin}
                            timelines={timelines}
                        />

                        {/* 3. Mentors */}
                        <MentorsSection mentors={mentors} />

                        {/* 4. Prizes */}
                        <PrizesSection prizes={prizes} />

                        {/* 5. FAQ */}
                        <FaqSection faqs={faqs} />

                        {/* 6. Ready to Build CTA */}
                        <RegisterCTA />

                        {/* 7. Organizer */}
                        <OrganizerSection />
                    </main>

                    <Footer />
                </div>
            </div>
        </>
    );
}
