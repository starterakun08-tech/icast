import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { HeroSetting } from '@/types';

interface HeroBannerProps {
    hero: HeroSetting;
    featureCards?: unknown[];
}

// ── Type scale (anchored to 1920px canvas) ────────────────────────────────
const H1  = 'clamp(34px, 3.54vw, 68px)';   // Raleway Bold 68
const H3  = 'clamp(18px, 1.77vw, 34px)';   // Merriweather Regular 34
const H4  = 'clamp(14px, 1.46vw, 28px)';   // Raleway Bold 28
const H5  = 'clamp(12px, 0.94vw, 18px)';   // Merriweather Regular 18
const BTN = 'clamp(13px, 1.04vw, 20px)';   // Merriweather Sans 20

// ── Button component — supports href (link) or onClick (button) ────────────
function HeroBtn({
    label,
    solid,
    href,
    onClick,
}: {
    label: string;
    solid: boolean;
    href?: string;
    onClick?: () => void;
}) {
    const style: React.CSSProperties = {
        fontFamily: "'Merriweather Sans', sans-serif",
        fontSize: BTN,
        fontWeight: 400,
        color: solid ? '#ffffff' : '#F97316',
        background: solid ? '#F97316' : 'transparent',
        border: solid ? 'none' : '2px solid #F97316',
        borderRadius: '10px',
        width: 'clamp(150px, 13.54vw, 260px)',
        height: 'clamp(38px, 2.86vw, 55px)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        transition: 'opacity 0.2s',
    };
    if (href) {
        return <Link href={href} style={style}>{label}</Link>;
    }
    return (
        <button onClick={onClick} style={style}>
            {label}
        </button>
    );
}

// ── Hardcoded feature items ────────────────────────────────────────────────
const FEATURES = [
    {
        icon: '/images/living-side.svg',
        title: 'Living Side by Side with AI',
        body: "AI isn't replacing creativity.\nit's expanding what's possible.",
    },
    {
        icon: '/images/token-budget.svg',
        title: 'Token Budget vs Human Budget',
        body: 'Optimize computation.\nMaximize human creativity.',
    },
    {
        icon: '/images/when-ai.svg',
        title: 'When AI Works More Than You Do',
        body: 'Less repetitive.\nMore breakthrough ideas.',
    },
];

export default function HeroBanner({ hero }: HeroBannerProps) {
    function scrollTo(id: string) {
        document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            {/* ── Banner Section ────────────────────────────────────────── */}
            <section
                id="hero"
                className="hero-section"
                style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    background: '#fff6e9',
                    height: 'clamp(460px, 37.92vw, 728px)',
                }}
            >
                {/* ── Banner image — right-aligned, full visible, no crop ── */}
                <div
                    className="hero-banner-img"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: 'calc(clamp(460px, 37.92vw, 728px) * 1.978)',
                        maxWidth: '75vw',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src="/images/banner.webp"
                        alt="iCAST Hackathon Banner"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'right center',
                            display: 'block',
                        }}
                        loading="eager"
                    />
                </div>

                {/* ── Left text content ── */}
                <div
                    className="hero-content"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        paddingLeft: 'clamp(20px, 3.75vw, 72px)',
                        paddingRight: '16px',
                        maxWidth: '100%',
                    }}
                >
                    {/* Heading */}
                    <motion.h1
                        style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 700,
                            fontSize: H1,
                            color: '#000000',
                            marginTop: 'clamp(20px, 1.82vw, 35px)',
                            marginBottom: 0,
                            lineHeight: 1.15,
                            maxWidth: 'clamp(280px, 30.2vw, 580px)',
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {(hero.title_line1 || 'Build Technology').split('\n').map((t, i) => (
                            <React.Fragment key={i}>{t}<br /></React.Fragment>
                        ))}
                        <span style={{ color: '#F97316' }}>
                            {hero.title_line2 || 'That Matters'}
                        </span>
                    </motion.h1>

                    {/* Sub-heading */}
                    <motion.p
                        style={{
                            fontFamily: 'Merriweather, serif',
                            fontWeight: 400,
                            fontSize: H3,
                            color: '#000000',
                            marginTop: 'clamp(16px, 1.56vw, 30px)',
                            marginBottom: 0,
                            maxWidth: 'clamp(240px, 54.06vw, 1038px)',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-line',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        {hero.subtitle ||
                            'Design solutions that empower people, strengthen communities,\nand accelerate sustainable development'}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 'clamp(12px, 1.56vw, 30px)',
                            marginTop: 'clamp(16px, 1.56vw, 30px)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <HeroBtn
                            label="Register Now   →"
                            solid
                            href="/register"
                        />
                        <HeroBtn
                            label="Learn More"
                            solid={false}
                            onClick={() => scrollTo(hero.btn_secondary_url || 'about')}
                        />
                    </motion.div>

                    {/* Feature icons row */}
                    <motion.div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexWrap: 'nowrap',
                            gap: 'clamp(12px, 1.5vw, 24px)',
                            marginTop: 'clamp(20px, 2.6vw, 50px)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                    >
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '8px',
                                    flex: '0 0 auto',
                                    width: 'clamp(260px, 20vw, 350px)',
                                }}
                            >
                                {/* Icon */}
                                <img
                                    src={f.icon}
                                    alt={f.title}
                                    style={{
                                        width: 'clamp(44px, 4.84vw, 93px)',
                                        height: 'clamp(44px, 4.84vw, 93px)',
                                        objectFit: 'contain',
                                        flexShrink: 0,
                                    }}
                                    loading="lazy"
                                />
                                {/* Text column */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'clamp(4px, 0.5vw, 10px)',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: 'Raleway, sans-serif',
                                            fontWeight: 700,
                                            fontSize: H4,
                                            color: '#000000',
                                            margin: 0,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {f.title}
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 400,
                                            fontSize: H5,
                                            color: '#000000',
                                            margin: 0,
                                            lineHeight: 1.5,
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        {f.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Mobile responsive ─────────────────────────────────────── */}
            <style>{`
                @media (max-width: 900px) {
                    .hero-section {
                        height: auto !important;
                        min-height: unset !important;
                        flex-direction: column !important;
                    }
                    .hero-banner-img {
                        position: relative !important;
                        top: auto !important;
                        right: auto !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        height: 240px !important;
                        order: 1 !important;
                    }
                    .hero-banner-img img {
                        object-fit: contain !important;
                        object-position: center !important;
                    }
                    .hero-content {
                        position: relative !important;
                        max-width: 100% !important;
                        height: auto !important;
                        order: 2 !important;
                        padding: 16px 20px 24px !important;
                        margin-top: -20px;
                    }
                    .hero-content > div:last-child {
                        flex-wrap: wrap !important;
                        gap: 20px !important;
                    }
                    .hero-content > div:last-child > div {
                        flex: 1 1 100% !important;
                        width: 100% !important;
                    }
                }
            `}</style>
        </>
    );
}
