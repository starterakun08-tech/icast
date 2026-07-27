import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const RALEWAY = 'Raleway, sans-serif';
const MERRI   = 'Merriweather, serif';
const ORANGE  = '#F97316';

export default function RegisterSuccess() {
    return (
        <>
            <Head>
                <title>Pendaftaran Berhasil — iCAST Hackathon 2026</title>
            </Head>

            <div style={{ minHeight: '100vh', background: '#fff6e9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ background: '#fff', borderRadius: 20, padding: '48px 56px', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
                >
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                    <h1 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 28, color: '#111', margin: '0 0 12px' }}>
                        Pendaftaran Berhasil!
                    </h1>
                    <p style={{ fontFamily: MERRI, fontSize: 15, color: '#6B7280', lineHeight: 1.7, margin: '0 0 32px' }}>
                        Tim Anda telah berhasil terdaftar untuk <strong>iCAST Hackathon 2026</strong>. Kami akan menghubungi Anda melalui email yang didaftarkan dalam waktu dekat.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            href="/"
                            style={{
                                background: ORANGE,
                                color: '#fff',
                                borderRadius: 10,
                                padding: '12px 32px',
                                fontFamily: RALEWAY,
                                fontWeight: 700,
                                fontSize: 15,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                            }}
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
