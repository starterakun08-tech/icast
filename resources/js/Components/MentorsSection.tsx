import { motion } from 'framer-motion';
import type { Mentor } from '@/types';

interface MentorsSectionProps {
    mentors: Mentor[];
}

// ── Type scale ─────────────────────────────────────────────────────────────
const H2  = 'clamp(26px, 2.5vw, 48px)';   // Raleway Bold 48
const H3  = 'clamp(20px, 1.77vw, 34px)';  // Merriweather Regular 34
const R20 = 'clamp(13px, 1.04vw, 20px)';  // Raleway Bold 20 for mentor name
const M16 = 'clamp(12px, 0.83vw, 16px)';  // Merriweather Regular 16 for description

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}

// Fallback mentors if DB is empty
const FALLBACK_MENTORS: Partial<Mentor>[] = [
    {
        id: 1,
        name: 'Kyle Wild',
        position: 'CTO, @ Space Labs, Inc.',
        organization: null,
        photo: null,
    },
    {
        id: 2,
        name: 'Yusuke Takahashi, PhD',
        position: 'Associate Professor',
        organization: 'Faculty of Data Science, Shinshu Univ., Japan',
        photo: null,
    },
    {
        id: 3,
        name: 'Akhmad Alimudin, PhD',
        position: 'Lecturer, Ir.',
        organization: 'Faculty of Creative Multimedia, PENS',
        photo: null,
    },
];

export default function MentorsSection({ mentors }: MentorsSectionProps) {
    const items = (mentors && mentors.length > 0 ? mentors : FALLBACK_MENTORS) as Mentor[];

    return (
        <section
            id="mentors"
            style={{
                maxWidth: '1140px',
                margin: 'clamp(60px, 5.21vw, 100px) auto 0',
                padding: '0 clamp(16px, 1.67vw, 32px)',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* "MENTORS" — H2 #0F2E4F centered */}
            <Reveal>
                <h2
                    className="text-center"
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H2,
                        color: '#0F2E4F',
                        margin: '0 0 clamp(10px, 1.15vw, 22px) 0',
                    }}
                >
                    MENTORS
                </h2>
            </Reveal>

            {/* "Learn From The Best." — H3 */}
            <Reveal delay={0.1}>
                <p
                    className="text-center"
                    style={{
                        fontFamily: 'Merriweather, serif',
                        fontWeight: 400,
                        fontSize: H3,
                        margin: '0 0 clamp(16px, 1.15vw, 22px) 0',
                    }}
                >
                    <span style={{ color: '#000000' }}>Learn From </span>
                    <span style={{ color: '#F97316' }}>The Best.</span>
                </p>
            </Reveal>

            {/* 3 mentor frames */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'clamp(16px, 1.56vw, 30px)',
                }}
            >
                {items.slice(0, 3).map((mentor, i) => (
                    <Reveal key={mentor.id} delay={0.15 + i * 0.1}>
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                        >
                            {/* Photo frame */}
                            <div
                                style={{
                                    width: '100%',
                                    aspectRatio: '280 / 150',
                                    background: '#ffffff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                    transition: 'box-shadow 0.3s ease',
                                }}
                            >
                                {mentor.photo_url || mentor.photo ? (
                                    <img
                                        src={mentor.photo_url || (mentor.photo?.startsWith('http') ? mentor.photo : `/storage/${mentor.photo}`)}
                                        alt={mentor.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'center',
                                        }}
                                        loading="lazy"
                                    />
                                ) : null}
                            </div>

                            {/* Name — Raleway Bold 20 */}
                            <p
                                style={{
                                    fontFamily: 'Raleway, sans-serif',
                                    fontWeight: 700,
                                    fontSize: R20,
                                    color: '#000000',
                                    margin: 'clamp(8px, 0.63vw, 12px) 0 4px 0',
                                    textAlign: 'left',
                                    lineHeight: 1.2,
                                }}
                            >
                                {mentor.name}
                            </p>

                            {/* Title / description */}
                            <p
                                style={{
                                    fontFamily: 'Merriweather, serif',
                                    fontWeight: 400,
                                    fontSize: M16,
                                    color: '#555555',
                                    margin: 0,
                                    textAlign: 'left',
                                    lineHeight: 1.5,
                                }}
                            >
                                {mentor.position}
                                {mentor.organization && (
                                    <><br />{mentor.organization}</>
                                )}
                            </p>
                        </motion.div>
                    </Reveal>
                ))}
            </div>

            {/* Mobile: 1-column */}
            <style>{`
                @media (max-width: 640px) {
                    #mentors > div:last-child {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
