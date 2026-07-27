import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Faq } from '@/types';

interface FaqSectionProps {
    faqs: Faq[];
}

// ── Type scale ─────────────────────────────────────────────────────────────
const H2 = 'clamp(26px, 2.5vw, 48px)';   // Raleway Bold 48
const H4 = 'clamp(16px, 1.46vw, 28px)';  // Raleway Bold 28 — question
const H5 = 'clamp(13px, 0.94vw, 18px)';  // Merriweather Regular 18 — answer

function FaqItem({ faq, isOpen, toggle }: { faq: Faq; isOpen: boolean; toggle: () => void }) {
    return (
        <div
            style={{
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: isOpen ? '0 4px 20px rgba(249,115,22,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s',
            }}
        >
            <button
                onClick={toggle}
                style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 'clamp(14px, 1.04vw, 20px) clamp(16px, 1.56vw, 30px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
                aria-expanded={isOpen}
            >
                <span
                    style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: H4,
                        color: '#000000',
                    }}
                >
                    {faq.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                        flexShrink: 0,
                        width: 'clamp(24px, 1.56vw, 30px)',
                        height: 'clamp(24px, 1.56vw, 30px)',
                        borderRadius: '50%',
                        background: '#F97316',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    +
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p
                            style={{
                                fontFamily: 'Merriweather, serif',
                                fontWeight: 400,
                                fontSize: H5,
                                color: '#444444',
                                padding: '0 clamp(16px, 1.56vw, 30px) clamp(14px, 1.04vw, 20px)',
                                margin: 0,
                                lineHeight: 1.7,
                            }}
                        >
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqSection({ faqs }: FaqSectionProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section
            id="faq"
            aria-labelledby="faq-heading"
            style={{
                maxWidth: '1664px',
                margin: 'clamp(60px, 5.21vw, 100px) auto 0',
                padding: '0 clamp(16px, 1.67vw, 32px)',
                width: '100%',
                boxSizing: 'border-box',
                paddingBottom: 0,
            }}
        >
            <motion.h2
                id="faq-heading"
                className="text-center"
                style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 700,
                    fontSize: H2,
                    color: '#2E7D4F',
                    margin: '0 0 clamp(24px, 2.08vw, 40px) 0',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                FAQ
            </motion.h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(10px, 0.83vw, 16px)',
                    maxWidth: '900px',
                    margin: '0 auto',
                }}
            >
                {faqs.map((faq, i) => (
                    <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.08 }}
                    >
                        <FaqItem
                            faq={faq}
                            isOpen={openId === faq.id}
                            toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
