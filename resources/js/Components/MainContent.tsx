import { motion } from 'framer-motion';
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

// ── Shared Register Button ─────────────────────────────────────────────────
function RegisterNowBtn({ onClick }: { onClick?: () => void }) {
    function scrollToRegister() {
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
        onClick?.();
    }
    return (
        <button
            onClick={scrollToRegister}
            style={{
                fontFamily: "'Merriweather Sans', sans-serif",
                fontSize: BTN,
                fontWeight: 400,
                color: '#ffffff',
                background: '#F97316',
                border: 'none',
                borderRadius: '10px',
                width: 'clamp(150px, 13.54vw, 260px)',
                height: 'clamp(38px, 2.86vw, 55px)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
            }}
        >
            Register Now →
        </button>
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
                    {/* Left column — icast-logo (575x170) */}
                    <Reveal delay={0.1}>
                        <div
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
                                }}
                                loading="lazy"
                            />
                        </div>
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

            {/* 3-card grid: fill #FFFBF4, border berwarna, round corner 10px */}
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
                        <div
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
                        </div>
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
// TIMELINE SECTION
// ────────────────────────────────────────────────────────────────────────────
function TimelineSection({ timelines }: { timelines: Timeline[] }) {
    const items: Timeline[] = timelines.length > 0 ? timelines : [
        { id: 1, date: '06 August', title: 'Kickoff', description: 'Onsite + Online', icon: 'flag', order: 0, is_active: true },
        { id: 2, date: '10 September', title: 'Online', description: null, icon: 'laptop', order: 1, is_active: true },
        { id: 3, date: '24 August', title: 'Online', description: null, icon: 'code', order: 2, is_active: true },
        { id: 4, date: '9 - 10 October', title: 'iCAST Onsite', description: null, icon: 'trophy', order: 3, is_active: true },
    ];

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

            {/* 4-icon row with connector line HANYA di antara flag (icon 1) dan trophy (icon 4) */}
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
                    {/* Horizontal connector line: berawal dari tengah icon 1 (12.5%) hingga tengah icon 4 (87.5%) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 'calc(16px + clamp(30px, 3.65vw, 70px))',
                            left: '12.5%',
                            right: '12.5%',
                            height: '2px',
                            background: '#000000',
                            zIndex: 0,
                        }}
                    />

                    {items.slice(0, 4).map((item, i) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                                flex: 1,
                                maxWidth: 'calc(25% - 12px)',
                            }}
                        >
                            {/* Icon: 140x140 */}
                            <img
                                src={TL_ICONS[i]}
                                alt={item.date || `Step ${i + 1}`}
                                style={{
                                    width: 'clamp(60px, 7.29vw, 140px)',
                                    height: 'clamp(60px, 7.29vw, 140px)',
                                    objectFit: 'contain',
                                }}
                                loading="lazy"
                            />


                            {/* Date — Merriweather Bold 28 */}
                            <p
                                style={{
                                    fontFamily: 'Merriweather, serif',
                                    fontWeight: 700,
                                    fontSize: TL28,
                                    color: '#000000',
                                    margin: '0 0 4px 0',
                                    textAlign: 'center',
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.date}
                            </p>

                            {/* Description — Merriweather Regular 22 */}
                            <p
                                style={{
                                    fontFamily: 'Merriweather, serif',
                                    fontWeight: 400,
                                    fontSize: TL22,
                                    color: '#000000',
                                    margin: 0,
                                    textAlign: 'center',
                                    lineHeight: 1.4,
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {item.title}
                                {item.description ? `\n${item.description}` : ''}
                            </p>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Mobile: 2x2 grid */}
            <style>{`
                @media (max-width: 640px) {
                    .tl-row {
                        flex-wrap: wrap !important;
                    }
                    .tl-row > div {
                        max-width: 50% !important;
                        flex: 0 0 50% !important;
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
            <WhyJoinSection cards={whyJoin} />
            <TimelineSection timelines={timelines} />
        </>
    );
}
