import { motion } from 'framer-motion';

// ── Type scale ─────────────────────────────────────────────────────────────
const H2 = 'clamp(26px, 2.5vw, 48px)'; // Raleway Bold 48

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
}

export default function OrganizerSection() {
    return (
        <section
            id="organizer"
            style={{
                // Full-width 1920px, white background, marginTop = 0
                width: '100%',
                background: '#ffffff',
                marginTop: 0,
                paddingBottom: 'clamp(30px, 2.6vw, 50px)',
                marginBottom: 0,
            }}
        >
            <div
                style={{
                    maxWidth: '1920px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                {/* "Organized by" — H2 #000000 */}
                <Reveal>
                    <h2
                        style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 700,
                            fontSize: H2,
                            color: '#000000',
                            margin: 0,
                            paddingTop: 'clamp(30px, 2.6vw, 50px)',
                            paddingBottom: 'clamp(20px, 2.08vw, 40px)',
                        }}
                    >
                        Organized by
                    </h2>
                </Reveal>

                {/* Logos row — pens.png (100x100) + mu.jpg (135x100), centered */}
                <Reveal delay={0.1}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'clamp(30px, 3.65vw, 70px)',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* PENS logo — 100x100 */}
                        <motion.img
                            src="/images/pens.png"
                            alt="PENS Logo"
                            whileHover={{ scale: 1.12, rotate: 2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{
                                width: 'clamp(70px, 5.21vw, 100px)',
                                height: 'clamp(70px, 5.21vw, 100px)',
                                objectFit: 'contain',
                                cursor: 'pointer',
                            }}
                            loading="lazy"
                        />
                        {/* MU logo — 135x100 */}
                        <motion.img
                            src="/images/mu.jpg"
                            alt="Mahidol University Logo"
                            whileHover={{ scale: 1.12, rotate: -2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{
                                width: 'clamp(94px, 7.03vw, 135px)',
                                height: 'clamp(70px, 5.21vw, 100px)',
                                objectFit: 'contain',
                                cursor: 'pointer',
                            }}
                            loading="lazy"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
