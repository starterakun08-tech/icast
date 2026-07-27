import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

// ── Type scale ─────────────────────────────────────────────────────────────
const H2  = 'clamp(24px, 2.5vw, 48px)';   // Raleway Bold 48
const M34 = 'clamp(16px, 1.77vw, 34px)';  // Merriweather Bold 34
const BTN = 'clamp(13px, 1.04vw, 20px)';  // Merriweather Sans 20

export default function RegisterCTA() {
    return (
        <>
            <section
                id="ready-to-build"
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    marginTop: 0,
                    marginBottom: 0,
                    padding: '0 clamp(16px, 6.67vw, 128px)',
                }}
            >
                <motion.div
                    style={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: 0,
                        overflow: 'visible',
                        minHeight: 'clamp(220px, 21.93vw, 421px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        marginBottom: 0,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    {/* SVG Background image */}
                    <img
                        src="/images/ready-to-build.svg"
                        alt="Ready to Build Background"
                        className="ready-cta-bg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                            zIndex: 0,
                        }}
                    />

                    {/* Content centered vertically and horizontally */}
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'clamp(14px, 1.4vw, 26px)',
                            maxWidth: '90%',
                            margin: '0 auto',
                            paddingTop: 'clamp(30px, 3.5vw, 65px)',
                            paddingBottom: 'clamp(15px, 1.75vw, 32px)',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            boxSizing: 'border-box',
                            marginBottom: 0,
                        }}
                    >
                        {/* "Ready to Build?" */}
                        <h2
                            className="ready-cta-heading"
                            style={{
                                fontFamily: 'Raleway, sans-serif',
                                fontWeight: 700,
                                fontSize: H2,
                                color: '#ffffff',
                                margin: 0,
                                lineHeight: 1.1,
                                textAlign: 'center',
                            }}
                        >
                            Ready to Build?
                        </h2>

                        {/* Sub text */}
                        <p
                            className="ready-cta-subtext"
                            style={{
                                fontFamily: 'Merriweather, serif',
                                fontWeight: 700,
                                fontSize: M34,
                                color: '#ffffff',
                                margin: 0,
                                lineHeight: 1.35,
                                maxWidth: '1000px',
                                textAlign: 'center',
                            }}
                        >
                            Let's Build with Purpose. Create with AI. Impact The Future.
                        </p>

                        {/* Register Now button */}
                        <Link
                            href="/register"
                            className="ready-cta-btn"
                            style={{
                                fontFamily: "'Merriweather Sans', sans-serif",
                                fontSize: BTN,
                                fontWeight: 400,
                                color: '#F97316',
                                background: '#ffffff',
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
                                marginTop: 'clamp(4px, 0.4vw, 8px)',
                                marginBottom: 0,
                                textDecoration: 'none',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            Register Now →
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Mobile View Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .ready-cta-heading {
                        color: #000000 !important;
                    }
                    .ready-cta-btn {
                        background-color: #F97316 !important;
                        color: #ffffff !important;
                    }
                }
            `}</style>
        </>
    );
}
