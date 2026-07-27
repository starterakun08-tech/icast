import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface ThemeCategory {
    id: number;
    name: string;
    description: string | null;
}

interface RegisterProps {
    themeCategories: ThemeCategory[];
}

interface Member {
    name: string;
    ktm_number: string;
    id_number: string;
}

interface FormData {
    name: string;           // ketua / contact email name
    email: string;
    phone: string;
    institution: string;
    team_name: string;
    leader_name: string;
    leader_phone: string;
    theme_category_id: string;
    solution_title: string;
    problem_statement: string;
    solution_description: string;
    members: Member[];
}

// ── Shared type scale ──────────────────────────────────────────────────────
const RALEWAY  = 'Raleway, sans-serif';
const MERRI    = 'Merriweather, serif';
const ORANGE   = '#F97316';
const BG       = '#fff6e9';
const DARK     = '#111111';
const GRAY     = '#6B7280';

// ── Section badge (numbered circle) ───────────────────────────────────────
function SectionBadge({ n }: { n: number }) {
    return (
        <div style={{
            width: 36, height: 36, borderRadius: '50%', background: ORANGE,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: RALEWAY, fontWeight: 700, fontSize: 18, flexShrink: 0,
        }}>{n}</div>
    );
}

// ── Form field wrapper ─────────────────────────────────────────────────────
function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 14, color: DARK }}>
                {label}{required && <span style={{ color: ORANGE }}> *</span>}
            </label>
            {children}
            {error && <p style={{ fontFamily: MERRI, fontSize: 12, color: '#EF4444', margin: 0 }}>{error}</p>}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    border: '1px solid #D1D5DB',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    fontFamily: MERRI,
    color: DARK,
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: 100,
};

export default function Register({ themeCategories }: RegisterProps) {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        institution: '',
        team_name: '',
        leader_name: '',
        leader_phone: '',
        theme_category_id: '',
        solution_title: '',
        problem_statement: '',
        solution_description: '',
        members: [
            { name: '', ktm_number: '', id_number: '' },
            { name: '', ktm_number: '', id_number: '' },
        ],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const set = (field: keyof FormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
    };

    const setMember = (index: number, field: keyof Member, value: string) => {
        setForm(prev => {
            const members = [...prev.members];
            members[index] = { ...members[index], [field]: value };
            return { ...prev, members };
        });
    };

    const addMember = () => {
        if (form.members.length < 3) {
            setForm(prev => ({ ...prev, members: [...prev.members, { name: '', ktm_number: '', id_number: '' }] }));
        }
    };

    const removeMember = (index: number) => {
        setForm(prev => ({ ...prev, members: prev.members.filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/register', {
            ...form,
            name: form.leader_name || form.name,
        } as any, {
            onError: (errs) => {
                setErrors(errs as Record<string, string>);
                setLoading(false);
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <>
            <Head>
                <title>Formulir Pendaftaran — iCAST Hackathon 2026</title>
                <meta name="description" content="Daftarkan tim Anda untuk iCAST Hackathon 2026." />
            </Head>

            <div style={{ minHeight: '100vh', background: BG, fontFamily: MERRI }}>

                {/* ── Top bar ── */}
                <div style={{ background: ORANGE, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/">
                        <img src="/images/icast-logo.svg" alt="iCAST" style={{ height: 44, filter: 'brightness(0) invert(1)' }} />
                    </Link>
                    <Link
                        href="/"
                        style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 14, color: '#fff', textDecoration: 'none' }}
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>

                {/* ── Page header ── */}
                <div style={{ background: '#fff', borderBottom: '1px solid #F3F4F6', padding: '32px 32px 24px' }}>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <h1 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 'clamp(24px, 2.5vw, 36px)', color: DARK, margin: '0 0 8px' }}>
                            Formulir Pendaftaran Resmi
                        </h1>
                        <p style={{ fontFamily: MERRI, fontSize: 14, color: GRAY, margin: 0, lineHeight: 1.6 }}>
                            iCAST Hackathon 2026 — Isi semua kolom yang bertanda <span style={{ color: ORANGE }}>*</span> dengan benar. Satu tim hanya boleh mendaftar satu kali.
                        </p>
                    </div>
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: '32px auto', padding: '0 16px 64px' }}>

                    {/* ───── SECTION 1: Profil Kelompok ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                            <SectionBadge n={1} />
                            <h2 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 20, color: DARK, margin: 0 }}>
                                Profil Kelompok &amp; Struktur Tim
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <Field label="Nama Tim / Kelompok" required error={errors.team_name}>
                                <input
                                    style={{ ...inputStyle, borderColor: errors.team_name ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Contoh: Tim Innovate Nusantara"
                                    value={form.team_name}
                                    onChange={e => set('team_name', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Institusi / Asal Universitas" required error={errors.institution}>
                                <input
                                    style={{ ...inputStyle, borderColor: errors.institution ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Contoh: Universitas Airlangga"
                                    value={form.institution}
                                    onChange={e => set('institution', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Nama Ketua Tim" required error={errors.leader_name}>
                                <input
                                    style={{ ...inputStyle, borderColor: errors.leader_name ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Nama lengkap ketua tim"
                                    value={form.leader_name}
                                    onChange={e => set('leader_name', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Nomor Telepon Aktif" required error={errors.leader_phone}>
                                <input
                                    style={{ ...inputStyle, borderColor: errors.leader_phone ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="08xx-xxxx-xxxx"
                                    value={form.leader_phone}
                                    onChange={e => set('leader_phone', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Email Kontak" required error={errors.email}>
                                <input
                                    type="email"
                                    style={{ ...inputStyle, borderColor: errors.email ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="email@universitas.ac.id"
                                    value={form.email}
                                    onChange={e => set('email', e.target.value)}
                                    required
                                />
                            </Field>
                        </div>

                        {/* Members */}
                        <div style={{ marginTop: 28 }}>
                            <p style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 15, color: DARK, margin: '0 0 16px' }}>
                                Anggota Tim <span style={{ color: GRAY, fontWeight: 400, fontSize: 13 }}>(2–3 anggota)</span>
                            </p>

                            {form.members.map((member, i) => (
                                <div
                                    key={i}
                                    style={{ background: '#FFF6E9', borderRadius: 12, padding: '20px 20px 16px', marginBottom: 16, border: '1px solid #FDDCB5' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                        <p style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 13, color: ORANGE, margin: 0 }}>
                                            Anggota {i + 1}
                                        </p>
                                        {form.members.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeMember(i)}
                                                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 13, fontFamily: RALEWAY, fontWeight: 600 }}
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                                        <Field label="Nama Anggota">
                                            <input
                                                style={inputStyle}
                                                placeholder="Nama lengkap"
                                                value={member.name}
                                                onChange={e => setMember(i, 'name', e.target.value)}
                                            />
                                        </Field>
                                        <Field label="No. KTM">
                                            <input
                                                style={inputStyle}
                                                placeholder="Nomor KTM"
                                                value={member.ktm_number}
                                                onChange={e => setMember(i, 'ktm_number', e.target.value)}
                                            />
                                        </Field>
                                        <Field label="No. Identitas (KTP/SIM)">
                                            <input
                                                style={inputStyle}
                                                placeholder="16 digit NIK / No. SIM"
                                                value={member.id_number}
                                                onChange={e => setMember(i, 'id_number', e.target.value)}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            ))}

                            {form.members.length < 3 && (
                                <button
                                    type="button"
                                    onClick={addMember}
                                    style={{
                                        background: 'none', border: `2px dashed ${ORANGE}`,
                                        borderRadius: 10, color: ORANGE, fontFamily: RALEWAY, fontWeight: 600,
                                        fontSize: 14, padding: '10px 20px', cursor: 'pointer', width: '100%',
                                    }}
                                >
                                    + Tambah Anggota
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* ───── SECTION 2: Kategori Tema Solusi ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                            <SectionBadge n={2} />
                            <h2 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 20, color: DARK, margin: 0 }}>
                                Kategori Tema Solusi
                            </h2>
                        </div>

                        <p style={{ fontFamily: MERRI, fontSize: 13, color: GRAY, margin: '0 0 20px', lineHeight: 1.6 }}>
                            Pilih satu kategori tema yang paling sesuai dengan solusi yang akan dikembangkan tim Anda.
                        </p>

                        {errors.theme_category_id && (
                            <p style={{ fontFamily: MERRI, fontSize: 12, color: '#EF4444', marginBottom: 12 }}>{errors.theme_category_id}</p>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {themeCategories.map(cat => (
                                <label
                                    key={cat.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 14,
                                        padding: '16px 20px',
                                        borderRadius: 12,
                                        border: `2px solid ${form.theme_category_id === String(cat.id) ? ORANGE : '#E5E7EB'}`,
                                        background: form.theme_category_id === String(cat.id) ? '#FFF6E9' : '#FAFAFA',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="theme_category_id"
                                        value={String(cat.id)}
                                        checked={form.theme_category_id === String(cat.id)}
                                        onChange={e => set('theme_category_id', e.target.value)}
                                        style={{ marginTop: 3, accentColor: ORANGE, flexShrink: 0 }}
                                    />
                                    <div>
                                        <p style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, color: DARK, margin: '0 0 4px' }}>
                                            {cat.name}
                                        </p>
                                        {cat.description && (
                                            <p style={{ fontFamily: MERRI, fontSize: 13, color: GRAY, margin: 0, lineHeight: 1.5 }}>
                                                {cat.description}
                                            </p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    {/* ───── SECTION 3: Deskripsi Ide Awal ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                            <SectionBadge n={3} />
                            <h2 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 20, color: DARK, margin: 0 }}>
                                Deskripsi Ide Awal (MVP Concept)
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <Field label="Judul Solusi / Aplikasi" required error={errors.solution_title}>
                                <input
                                    style={{ ...inputStyle, borderColor: errors.solution_title ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Contoh: EduTrack — Sistem Monitoring Kehadiran Berbasis AI"
                                    value={form.solution_title}
                                    onChange={e => set('solution_title', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Problem Statement" required error={errors.problem_statement}>
                                <textarea
                                    style={{ ...textareaStyle, borderColor: errors.problem_statement ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Jelaskan masalah yang ingin diselesaikan, siapa yang terdampak, dan seberapa besar skalanya..."
                                    value={form.problem_statement}
                                    onChange={e => set('problem_statement', e.target.value)}
                                    required
                                />
                            </Field>

                            <Field label="Deskripsi Solusi / Fitur Utama" required error={errors.solution_description}>
                                <textarea
                                    style={{ ...textareaStyle, borderColor: errors.solution_description ? '#EF4444' : '#D1D5DB' }}
                                    placeholder="Deskripsikan solusi yang ditawarkan, teknologi yang digunakan, dan fitur-fitur utama aplikasi..."
                                    value={form.solution_description}
                                    onChange={e => set('solution_description', e.target.value)}
                                    required
                                />
                            </Field>
                        </div>
                    </motion.div>

                    {/* ───── Submit ───── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, alignItems: 'center' }}>
                        <Link
                            href="/"
                            style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 15, color: GRAY, textDecoration: 'none' }}
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                background: ORANGE,
                                color: '#fff',
                                border: 'none',
                                borderRadius: 10,
                                padding: '14px 40px',
                                fontFamily: MERRI,
                                fontWeight: 700,
                                fontSize: 16,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'all 0.2s',
                            }}
                        >
                            {loading ? 'Mengirim...' : 'Kirim Pendaftaran →'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
