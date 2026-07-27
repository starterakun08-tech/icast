import { useRef, useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import type { AboutSetting, WhyJoinCard, Timeline } from '@/types';

interface MainContentProps {
    about: AboutSetting;
    whyJoin: WhyJoinCard[];
    timelines: Timeline[];
    onRegisterClick?: () => void;
}

// ── Type scale (anchored to 1920px canvas) ─────────────────────────────────
const H2   = 'clamp(26px, 2.5vw, 48px)';     // Raleway Bold 48
const H3   = 'clamp(18px, 1.77vw, 34px)';    // Merriweather Regular 34
const H4   = 'clamp(14px, 1.46vw, 28px)';    // Raleway Bold 28
const BTN  = 'clamp(13px, 1.04vw, 20px)';    // Merriweather Sans 20
const WJ22 = 'clamp(13px, 1.15vw, 22px)';    // Merriweather Regular 22 (Why Join body)
const TL28 = 'clamp(15px, 1.46vw, 28px)';    // Merriweather Bold 28 (timeline month)
const TL22 = 'clamp(12px, 1.15vw, 22px)';    // Merriweather Regular 22 (timeline desc)

function RegisterNowBtn({ onClick }: { onClick?: () => void }) {
    if (onClick) {
        return (
            <button onClick={onClick} className="flow-btn">
                <span className="arrow left">➜</span>
                <span className="text">Register Now</span>
                <span className="circle"></span>
                <span className="arrow right">➜</span>
            </button>
        );
    }
    return (
        <Link href="/register" className="flow-btn">
            <span className="arrow left">➜</span>
            <span className="text">Register Now</span>
            <span className="circle"></span>
            <span className="arrow right">➜</span>
        </Link>
    );
}

// ── Animate wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay }}
            style={style}
        >
            {children}
        </motion.div>
    );
}

// ── Why Join icon map ──────────────────────────────────────────────────────
const WHY_ICONS: string[] = [
    '/images/Better-Together.svg',
    '/images/Think-Bigger.svg',
    '/images/meet-your-future.svg',
];
const WHY_OUTLINES: string[] = ['#F97316', '#FFC107', '#2E7D4F'];

// ── Timeline icon list ─────────────────────────────────────────────────────
const TL_ICONS = [
    '/images/flag.svg',
    '/images/laptop.svg',
    '/images/code.svg',
    '/images/trophy.svg',
];

// ────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION
// ────────────────────────────────────────────────────────────────────────────
function AboutSection({ about, onRegisterClick }: { about: AboutSetting; onRegisterClick?: () => void }) {
    return (
        <section
            id="about"
            style={{
                width: '100%',
                boxSizing: 'border-box',
                marginTop: 0,
                padding: '0 clamp(16px, 6.67vw, 128px)',
            }}
        >
            {/* about.svg background — 1664x431, no shadow, no outline */}
            <div
                style={{
                    backgroundImage: 'url(/images/about.svg)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: 'clamp(280px, 22.45vw, 431px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 clamp(16px, 2.08vw, 40px)',
                    boxSizing: 'border-box',
                }}
            >
                {/* "ABOUT" — H2 F97316, centered */}
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 700,
                            fontSize: H2,
                            color: '#F97316',
                            margin: '0 0 clamp(16px, 2.08vw, 40px) 0',
                            textAlign: 'center',
                        }}
                    >
                        ABOUT
                    </p>
                </Reveal>

                {/* 2-col: icast-logo LEFT | Hackathon text RIGHT */}
                <div
                    className="about-cols"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(60px, 9vw, 180px)',
                        flexWrap: 'nowrap',
                    }}
                >
                    {/* Left column — icast-logo (575x170) with continuous floating motion */}
                    <Reveal delay={0.1}>
                        <motion.div
                            animate={{
                                y: [-8, 8, -8],
                                rotate: [-1, 1, -1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            style={{
                                flex: '0 0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src="/images/icast-logo.svg"
                                alt="iCAST Logo"
                                style={{
                                    width: 'clamp(180px, 29.95vw, 575px)',
                                    height: 'auto',
                                    maxHeight: 'clamp(55px, 8.85vw, 170px)',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 25px rgba(249, 115, 22, 0.18))',
                                }}
                                loading="lazy"
                            />
                        </motion.div>
                    </Reveal>

                    {/* Right column — text */}
                    <Reveal delay={0.2}>
                        <div style={{ flex: '0 0 auto', maxWidth: '650px' }}>
                            <h2
                                style={{
                                    fontFamily: 'Raleway, sans-serif',
                                    fontWeight: 700,
                                    fontSize: H2,
                                    color: '#000000',
                                    margin: '0 0 clamp(10px, 1.04vw, 20px) 0',
                                }}
                            >
                                Hackathon
                            </h2>
                            <p
                                style={{
                                    fontFamily: 'Merriweather, serif',
                                    fontWeight: 400,
                                    fontSize: H3,
                                    color: '#000000',
                                    margin: '0 0 clamp(12px, 1.04vw, 20px) 0',
                                    lineHeight: 1.5,
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {about.body ||
                                    'The iCast Hackathon brings\ntogether student, researchers,\ndesigner, developer, and innovators\nto solve meaning ful challengges\nthrough technology'}
                            </p>
                            {/* Register button — 20px below body */}
                            <RegisterNowBtn onClick={onRegisterClick} />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Mobile: stack to column */}
            {/* Mobile: stack to column */}
            <style>{`
                @media (max-width: 768px) {
                    .about-cols {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        flex-wrap: wrap !important;
                        gap: 24px !important;
                    }
                }
            `}</style>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN THEME 2026 SECTION (Continuous Floating Theme Cards)
// ────────────────────────────────────────────────────────────────────────────
const MAIN_THEMES = [
    {
        num: '01',
        title: 'AI AND SEMICONDUCTOR DIGITALIZATION',
        color: '#1D4ED8',
        bg: 'rgba(29, 78, 216, 0.06)',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'FOOD SECURITY',
        color: '#16A34A',
        bg: 'rgba(22, 163, 74, 0.06)',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v8M9 11l3-3 3 3" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'MEDICAL DEVICES & PHARMACEUTICALS',
        color: '#0D9488',
        bg: 'rgba(13, 148, 136, 0.06)',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12h6M12 9v6" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'ENERGY',
        color: '#EAB308',
        bg: 'rgba(234, 179, 8, 0.06)',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        num: '05',
        title: 'DOWNSTREAMING AND INDUSTRY',
        color: '#8B5CF6',
        bg: 'rgba(139, 92, 246, 0.06)',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M4 20V10l4 2V8l4 2V4l8 4v12" />
            </svg>
        ),
    },
];

function ThemesSection() {
    return (
        <section
            id="themes"
            style={{
                width: '100%',
                boxSizing: 'border-box',
                marginTop: 'clamp(60px, 5.21vw, 100px)',
                padding: '0 clamp(16px, 6.67vw, 128px)',
            }}
        >
            <Reveal>
                <h2
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H2,
                        color: '#F97316',
                        margin: '0 0 clamp(8px, 0.8vw, 16px) 0',
                        textAlign: 'center',
                    }}
                >
                    MAIN THEME 2026
                </h2>
                <p
                    style={{
                        fontFamily: 'Merriweather, serif',
                        fontWeight: 400,
                        fontSize: H3,
                        color: '#4B5563',
                        margin: '0 0 clamp(24px, 2.5vw, 40px) 0',
                        textAlign: 'center',
                    }}
                >
                    Innovating Solutions Across Key National & Global Priorities
                </p>
            </Reveal>

            {/* Continuous Floating Hexagon Theme Cards Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'clamp(16px, 1.8vw, 28px)',
                    alignItems: 'stretch',
                }}
            >
                {MAIN_THEMES.map((theme, i) => (
                    <Reveal key={theme.num} delay={i * 0.08} style={{ display: 'flex' }}>
                        <motion.div
                            animate={{
                                y: i % 2 === 0 ? [-8, 8, -8] : [8, -8, 8],
                                rotate: i % 2 === 0 ? [-0.8, 0.8, -0.8] : [0.8, -0.8, 0.8],
                            }}
                            transition={{
                                duration: 4.2 + (i % 3) * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -12,
                                boxShadow: `0 14px 32px ${theme.color}35`,
                            }}
                            style={{
                                width: '100%',
                                background: '#FFFFFF',
                                border: `2px solid ${theme.color}`,
                                borderRadius: '16px',
                                padding: 'clamp(18px, 1.6vw, 28px) clamp(14px, 1.2vw, 20px)',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                minHeight: '230px',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Number badge */}
                            <span
                                style={{
                                    fontFamily: 'Raleway, sans-serif',
                                    fontWeight: 800,
                                    fontSize: '18px',
                                    color: theme.color,
                                    background: theme.bg,
                                    padding: '4px 14px',
                                    borderRadius: '20px',
                                }}
                            >
                                {theme.num}
                            </span>

                            {/* Icon */}
                            <div
                                style={{
                                    width: '54px',
                                    height: '54px',
                                    borderRadius: '50%',
                                    background: theme.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {theme.icon}
                            </div>

                            {/* Title */}
                            <p
                                style={{
                                    fontFamily: 'Raleway, sans-serif',
                                    fontWeight: 700,
                                    fontSize: 'clamp(13px, 1vw, 16px)',
                                    color: '#1F2937',
                                    margin: 0,
                                    lineHeight: 1.35,
                                    textAlign: 'center',
                                }}
                            >
                                {theme.title}
                            </p>
                        </motion.div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// WHY JOIN SECTION
// ────────────────────────────────────────────────────────────────────────────
function WhyJoinSection({ cards }: { cards: WhyJoinCard[] }) {
    // Fallback cards if DB is empty
    const items: WhyJoinCard[] = cards.length > 0 ? cards : [
        {
            id: 1,
            title: 'Better Together.',
            description: 'Innovation happens when\ndifferent perspective meet\naround one table.',
            icon: 'better-together',
            order: 0,
        } as WhyJoinCard,
        {
            id: 2,
            title: 'Think Bigger.',
            description: 'Explore bold ideas.\nPrototype quickly.\nLearn continuously.',
            icon: 'think-bigger',
            order: 1,
        } as WhyJoinCard,
        {
            id: 3,
            title: 'Meet Your Future\nCollaborators',
            description: 'Connect with students,\nresearchers, mentors,\nstartups, and industry\nleaders.',
            icon: 'meet-your-future',
            order: 2,
        } as WhyJoinCard,
    ];

    return (
        <section
            id="why-join"
            style={{
                width: '100%',
                boxSizing: 'border-box',
                marginTop: 'clamp(60px, 5.21vw, 100px)',
                padding: '0 clamp(16px, 6.67vw, 128px)',
            }}
        >
            {/* "WHY JOIN" — H2 FFC107 centered */}
            <Reveal>
                <h2
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H2,
                        color: '#FFC107',
                        margin: '0 0 clamp(24px, 2.4vw, 46px) 0',
                        textAlign: 'center',
                    }}
                >
                    WHY JOIN
                </h2>
            </Reveal>

            {/* 3-card grid: fill #FFFBF4, border berwarna, round corner 10px with continuous floating */}
            <div
                className="why-join-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'clamp(20px, 2.86vw, 55px)',
                    alignItems: 'stretch',
                }}
            >
                {items.slice(0, 3).map((card, i) => (
                    <Reveal key={card.id} delay={i * 0.1} style={{ height: '100%', display: 'flex' }}>
                        <motion.div
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="why-join-card"
                            style={{
                                border: `2px solid ${WHY_OUTLINES[i] || '#F97316'}`,
                                borderRadius: '10px',
                                width: '100%',
                                minHeight: 'clamp(160px, 13.13vw, 252px)',
                                padding: 'clamp(16px, 1.56vw, 30px) clamp(12px, 1.04vw, 20px)',
                                background: '#FFFBF4',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                boxSizing: 'border-box',
                                transition: 'box-shadow 0.3s ease',
                                cursor: 'pointer',
                            }}
                        >
                            {/* Icon: 140x140 */}
                            <img
                                src={WHY_ICONS[i] || WHY_ICONS[0]}
                                alt={card.title}
                                style={{
                                    width: 'clamp(60px, 7.29vw, 140px)',
                                    height: 'clamp(60px, 7.29vw, 140px)',
                                    objectFit: 'contain',
                                    flexShrink: 0,
                                }}
                                loading="lazy"
                            />
                            {/* Text */}
                            <div style={{ flex: 1 }}>
                                <p
                                    style={{
                                        fontFamily: 'Raleway, sans-serif',
                                        fontWeight: 700,
                                        fontSize: H4,
                                        color: '#000000',
                                        margin: '0 0 clamp(8px, 0.78vw, 15px) 0',
                                        lineHeight: 1.2,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {card.title}
                                </p>
                                <p
                                    style={{
                                        fontFamily: 'Merriweather, serif',
                                        fontWeight: 400,
                                        fontSize: WJ22,
                                        color: '#000000',
                                        margin: 0,
                                        lineHeight: 1.5,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    </Reveal>
                ))}
            </div>

            {/* Mobile: 1 column */}
            <style>{`
                @media (max-width: 900px) {
                    .why-join-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }
                @media (max-width: 600px) {
                    .why-join-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// TIMELINE SECTION (Dynamic Date-Driven Active Indicator)
// ────────────────────────────────────────────────────────────────────────────
function parseTimelineDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const now = new Date();
    const currentYear = now.getFullYear();

    // Check if YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) return d;
    }

    // Clean range prefix e.g. "9 - 10 October" or "9–10 October" -> "10 October"
    let cleaned = dateStr.replace(/^[0-9]+\s*[\u2013\u2014\u2015\-]\s*/, '').trim().toLowerCase();

    const MONTHS: Record<string, number> = {
        january: 0, jan: 0,
        february: 1, feb: 1,
        march: 2, mar: 2,
        april: 3, apr: 3,
        may: 4,
        june: 5, jun: 5,
        july: 6, jul: 6,
        august: 7, aug: 7,
        september: 8, sep: 8, sept: 8,
        october: 9, oct: 9,
        november: 10, nov: 10,
        december: 11, dec: 11,
    };

    // Match "06 august" or "06 august 2026"
    const dayMonthMatch = cleaned.match(/^(\d{1,2})\s+([a-z]+)(?:\s+(\d{4}))?$/i);
    if (dayMonthMatch) {
        const day = parseInt(dayMonthMatch[1], 10);
        const monthName = dayMonthMatch[2];
        const yr = dayMonthMatch[3] ? parseInt(dayMonthMatch[3], 10) : currentYear;
        if (MONTHS[monthName] !== undefined) {
            return new Date(yr, MONTHS[monthName], day, 23, 59, 59);
        }
    }

    // Match "august 06" or "august 06 2026"
    const monthDayMatch = cleaned.match(/^([a-z]+)\s+(\d{1,2})(?:\s+(\d{4}))?$/i);
    if (monthDayMatch) {
        const monthName = monthDayMatch[1];
        const day = parseInt(monthDayMatch[2], 10);
        const yr = monthDayMatch[3] ? parseInt(monthDayMatch[3], 10) : currentYear;
        if (MONTHS[monthName] !== undefined) {
            return new Date(yr, MONTHS[monthName], day, 23, 59, 59);
        }
    }

    // Fallback: append currentYear explicitly
    const fallbackDate = new Date(`${dateStr} ${currentYear}`);
    if (!isNaN(fallbackDate.getTime())) {
        return fallbackDate;
    }

    return null;
}

function calculateTimelineState(items: Timeline[]) {
    if (!items || items.length === 0) return { activeIndex: 0, progressPercent: 0 };

    const now = new Date();
    const dates = items.map((item) => parseTimelineDate(item.date));

    let activeIdx = -1; // Start with -1 if before any event
    for (let i = 0; i < items.length; i++) {
        const d = dates[i];
        if (d && now >= d) {
            activeIdx = i;
        }
    }

    // If today (e.g. July 27) is before the 1st event date (Aug 6):
    if (activeIdx === -1) {
        return { activeIndex: 0, progressPercent: 0 };
    }

    let targetPercent = (activeIdx / Math.max(items.length - 1, 1)) * 100;

    // Interpolate progress if currently between current active event and next event
    if (activeIdx < items.length - 1) {
        const dCurr = dates[activeIdx];
        const dNext = dates[activeIdx + 1];
        if (dCurr && dNext && now >= dCurr && now <= dNext) {
            const total = dNext.getTime() - dCurr.getTime();
            const elapsed = now.getTime() - dCurr.getTime();
            if (total > 0) {
                const fraction = elapsed / total;
                const step = 100 / (items.length - 1);
                targetPercent = activeIdx * step + fraction * step;
            }
        }
    }

    return { activeIndex: activeIdx, progressPercent: targetPercent };
}

function getTimelineIcon(iconName: string | null | undefined, index: number): string {
    if (!iconName) return TL_ICONS[index % TL_ICONS.length];
    const name = iconName.toLowerCase();
    if (name.includes('flag') || name.includes('kickoff')) return '/images/flag.svg';
    if (name.includes('code') || name.includes('workshop')) return '/images/code.svg';
    if (name.includes('laptop') || name.includes('submission') || name.includes('submit')) return '/images/laptop.svg';
    if (name.includes('trophy') || name.includes('onsite')) return '/images/trophy.svg';
    return TL_ICONS[index % TL_ICONS.length];
}

function TimelineSection({ timelines }: { timelines: Timeline[] }) {
    const items = useMemo(() => {
        return timelines.length > 0 ? timelines : [
            { id: 1, date: '06 August', title: 'Kickoff', description: 'Onsite + Online', icon: 'flag', order: 0, is_active: true },
            { id: 2, date: '24 August', title: 'Submission', description: 'Online', icon: 'laptop', order: 1, is_active: true },
            { id: 3, date: '10 September', title: 'Workshop', description: 'Online', icon: 'code', order: 2, is_active: true },
            { id: 4, date: '9 - 10 October', title: 'iCAST Onsite', description: 'iCAST Onsite', icon: 'trophy', order: 3, is_active: true },
        ];
    }, [timelines]);

    const NODE_COLORS = ['#F97316', '#FFC107', '#2E7D4F', '#1E3A8A'];

    // Automatically calculate active index & progress strictly from dates in DB / Superadmin config
    const { activeIndex, progressPercent } = useMemo(() => calculateTimelineState(items), [items]);

    const currentIdx = activeIndex;
    const currentPercent = progressPercent;
    const currentColor = NODE_COLORS[Math.min(currentIdx, NODE_COLORS.length - 1)];

    return (
        <section
            id="timeline"
            style={{
                width: '100%',
                boxSizing: 'border-box',
                marginTop: 'clamp(60px, 5.21vw, 100px)',
                padding: '0 clamp(16px, 6.67vw, 128px)',
            }}
        >
            {/* "TIMELINE" — H2 #2E7D4F centered */}
            <Reveal>
                <h2
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H2,
                        color: '#2E7D4F',
                        margin: '0 0 clamp(20px, 2.08vw, 40px) 0',
                        textAlign: 'center',
                    }}
                >
                    TIMELINE
                </h2>
            </Reveal>

            {/* Dynamic 4-icon row with date-driven indicator */}
            <Reveal delay={0.1}>
                <div
                    className="tl-row"
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        position: 'relative',
                        paddingTop: '16px',
                    }}
                >
                    {/* Connector line track container */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 'calc(20px + clamp(30px, 3.65vw, 70px))',
                            left: `${50 / items.length}%`,
                            right: `${50 / items.length}%`,
                            height: '6px',
                            marginTop: '-3px',
                            background: '#E2E8F0',
                            borderRadius: '3px',
                            zIndex: 0,
                            overflow: 'visible',
                        }}
                    >
                        {/* Active Progress Fill line */}
                        <motion.div
                            animate={{ width: `${currentPercent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #F97316 0%, #2E7D4F 35%, #FFC107 70%, #1E3A8A 100%)',
                                borderRadius: '3px',
                                boxShadow: '0 0 12px rgba(46, 125, 79, 0.6)',
                            }}
                        />

                        {/* Glowing Traveling Indicator Dot positioned dynamically at current date percentage */}
                        <motion.div
                            animate={{ left: `${currentPercent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                marginTop: '-11px',
                                marginLeft: '-11px',
                                width: '22px',
                                height: '22px',
                                zIndex: 2,
                                pointerEvents: 'none',
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    border: `3.5px solid ${currentColor}`,
                                    boxShadow: `0 0 18px ${currentColor}AA, 0 0 28px ${currentColor}66`,
                                    boxSizing: 'border-box',
                                }}
                                animate={{
                                    scale: [1, 1.28, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Nodes */}
                    {items.map((item, i) => {
                        const isPassed = i <= currentIdx;
                        const isCurrent = i === currentIdx;
                        const activeColor = NODE_COLORS[i % NODE_COLORS.length];

                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 1,
                                    flex: 1,
                                    maxWidth: `calc(${100 / items.length}% - 12px)`,
                                }}
                            >
                                {/* Icon Wrapper with Glow & Pulse on Active */}
                                <motion.div
                                    animate={{
                                        scale: isCurrent ? 1.18 : isPassed ? 1.05 : 0.9,
                                        opacity: isPassed ? 1 : 0.5,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    style={{
                                        borderRadius: '50%',
                                        padding: '4px',
                                        background: isPassed ? '#FFFFFF' : 'transparent',
                                        boxShadow: isCurrent
                                            ? `0 0 25px ${activeColor}88, 0 0 12px ${activeColor}55`
                                            : isPassed
                                            ? `0 0 12px ${activeColor}44`
                                            : 'none',
                                        marginBottom: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={getTimelineIcon(item.icon, i)}
                                        alt={item.date || `Step ${i + 1}`}
                                        style={{
                                            width: 'clamp(60px, 7.29vw, 140px)',
                                            height: 'clamp(60px, 7.29vw, 140px)',
                                            objectFit: 'contain',
                                            filter: isPassed ? 'none' : 'grayscale(50%)',
                                            transition: 'filter 0.3s ease',
                                        }}
                                        loading="lazy"
                                    />
                                </motion.div>

                                {/* Date — Merriweather Bold 28 */}
                                <motion.p
                                    animate={{
                                        color: isPassed ? activeColor : '#6B7280',
                                        scale: isCurrent ? 1.05 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        fontFamily: 'Merriweather, serif',
                                        fontWeight: 700,
                                        fontSize: TL28,
                                        margin: '0 0 4px 0',
                                        textAlign: 'center',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {item.date}
                                </motion.p>

                                {/* Description — Merriweather Regular 22 */}
                                <p
                                    style={{
                                        fontFamily: 'Merriweather, serif',
                                        fontWeight: isCurrent ? 700 : isPassed ? 600 : 400,
                                        fontSize: TL22,
                                        color: isPassed ? '#111827' : '#9CA3AF',
                                        margin: 0,
                                        textAlign: 'center',
                                        lineHeight: 1.4,
                                        whiteSpace: 'pre-line',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {item.title}
                                    {item.description ? `\n${item.description}` : ''}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Reveal>

            {/* Responsive handling */}
            <style>{`
                @media (max-width: 640px) {
                    .tl-row {
                        flex-wrap: wrap !important;
                    }
                    .tl-row > div {
                        max-width: 50% !important;
                        flex: 0 0 50% !important;
                        margin-bottom: 24px;
                    }
                }
            `}</style>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────────────────────
export default function MainContent({ about, whyJoin, timelines, onRegisterClick }: MainContentProps) {
    return (
        <>
            <AboutSection about={about} onRegisterClick={onRegisterClick} />
            <ThemesSection />
            <WhyJoinSection cards={whyJoin} />
            <TimelineSection timelines={timelines} />
        </>
    );
}
