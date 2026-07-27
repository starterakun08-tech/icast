import { motion } from 'framer-motion';
import type { Prize } from '@/types';

interface PrizesSectionProps {
    prizes: Prize[];
}

// ── Type scale ─────────────────────────────────────────────────────────────
const H2 = 'clamp(26px, 2.5vw, 48px)';   // Raleway Bold 48
const H4 = 'clamp(16px, 1.46vw, 28px)';  // Raleway Bold 28
const H5 = 'clamp(13px, 0.94vw, 18px)';  // Merriweather Regular 18

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}

export default function PrizesSection({ prizes }: PrizesSectionProps) {
    if (!prizes || prizes.length === 0) return null;

    return (
        <section
            id="prizes"
            aria-labelledby="prizes-heading"
            style={{
                maxWidth: '1664px',
                margin: 'clamp(60px, 5.21vw, 100px) auto 0',
                padding: '0 clamp(16px, 1.67vw, 32px)',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Reveal>
                <h2
                    id="prizes-heading"
                    className="text-center"
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H2,
                        color: '#F97316',
                        margin: '0 0 clamp(24px, 2.08vw, 40px) 0',
                    }}
                >
                    PRIZES
                </h2>
            </Reveal>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 'clamp(16px, 1.56vw, 30px)',
                }}
            >
                {prizes.map((prize, i) => (
                    <Reveal key={prize.id} delay={i * 0.1}>
                        <motion.div
                            style={{
                                background: '#ffffff',
                                borderRadius: '16px',
                                padding: 'clamp(20px, 1.56vw, 30px)',
                                textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                border: '1.5px solid rgba(249,115,22,0.15)',
                                cursor: 'pointer',
                            }}
                            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 12px 36px rgba(249,115,22,0.22)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            {prize.icon && (
                                <div style={{ fontSize: 'clamp(28px, 2.08vw, 40px)', marginBottom: '12px' }}>
                                    {prize.icon}
                                </div>
                            )}
                            <h3
                                style={{
                                    fontFamily: 'Raleway, sans-serif',
                                    fontWeight: 700,
                                    fontSize: H4,
                                    color: '#000000',
                                    margin: '0 0 8px 0',
                                }}
                            >
                                {prize.title}
                            </h3>
                            {prize.amount && (
                                <p
                                    style={{
                                        fontFamily: 'Raleway, sans-serif',
                                        fontWeight: 800,
                                        fontSize: 'clamp(18px, 1.46vw, 28px)',
                                        color: '#F97316',
                                        margin: '0 0 8px 0',
                                    }}
                                >
                                    {prize.amount}
                                </p>
                            )}
                            {prize.description && (
                                <p
                                    style={{
                                        fontFamily: 'Merriweather, serif',
                                        fontWeight: 400,
                                        fontSize: H5,
                                        color: '#555555',
                                        margin: 0,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {prize.description}
                                </p>
                            )}
                        </motion.div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
