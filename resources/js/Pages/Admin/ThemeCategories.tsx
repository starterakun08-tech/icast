import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface ThemeCategory {
    id: number;
    name: string;
    description: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    categories: ThemeCategory[];
}

const ORANGE = '#F97316';
const RALEWAY = 'Raleway, sans-serif';
const MERRI = 'Merriweather, serif';

const inputCls: React.CSSProperties = {
    border: '1px solid #D1D5DB',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 14,
    fontFamily: MERRI,
    color: '#111',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
};

export default function ThemeCategories({ categories }: Props) {
    const { props } = usePage<any>();
    const flash = props.flash as { success?: string; error?: string } | undefined;

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState({ name: '', description: '', order: '0', is_active: true });
    const [processing, setProcessing] = useState(false);

    const resetForm = () => {
        setForm({ name: '', description: '', order: '0', is_active: true });
        setEditId(null);
        setShowForm(false);
    };

    const startEdit = (cat: ThemeCategory) => {
        setForm({
            name: cat.name,
            description: cat.description || '',
            order: String(cat.order),
            is_active: cat.is_active,
        });
        setEditId(cat.id);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        const data = { ...form, order: Number(form.order) };

        if (editId) {
            router.put(`/admin/theme-categories/${editId}`, data, {
                onFinish: () => { setProcessing(false); resetForm(); },
            });
        } else {
            router.post('/admin/theme-categories', data, {
                onFinish: () => { setProcessing(false); resetForm(); },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus kategori ini? Registrasi yang sudah menggunakan kategori ini tidak akan terpengaruh.')) return;
        router.delete(`/admin/theme-categories/${id}`);
    };

    const toggleActive = (cat: ThemeCategory) => {
        router.put(`/admin/theme-categories/${cat.id}`, {
            name: cat.name,
            description: cat.description,
            order: cat.order,
            is_active: !cat.is_active,
        });
    };

    return (
        <AdminLayout title="Kategori Tema">
            {/* Flash messages */}
            {flash?.success && (
                <div style={{ background: '#D1FAE5', border: '1px solid #6EE7B7', borderRadius: 8, padding: '10px 16px', marginBottom: 20, fontFamily: MERRI, fontSize: 14, color: '#065F46' }}>
                    ✅ {flash.success}
                </div>
            )}
            {flash?.error && (
                <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '10px 16px', marginBottom: 20, fontFamily: MERRI, fontSize: 14, color: '#991B1B' }}>
                    ❌ {flash.error}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 22, color: '#111', margin: '0 0 4px' }}>Kategori Tema Solusi</h2>
                    <p style={{ fontFamily: MERRI, fontSize: 13, color: '#6B7280', margin: 0 }}>
                        Kelola opsi kategori yang ditampilkan di formulir pendaftaran.
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                    >
                        + Tambah Kategori
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: `2px solid ${ORANGE}` }}>
                    <h3 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 18, color: '#111', margin: '0 0 20px' }}>
                        {editId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, color: '#111', display: 'block', marginBottom: 6 }}>
                                    Nama Kategori <span style={{ color: ORANGE }}>*</span>
                                </label>
                                <input
                                    style={inputCls}
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="Contoh: Kategori 1: Teknologi Pendidikan"
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, color: '#111', display: 'block', marginBottom: 6 }}>Urutan</label>
                                <input
                                    style={inputCls}
                                    type="number"
                                    min="0"
                                    value={form.order}
                                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, color: '#111', display: 'block', marginBottom: 6 }}>Deskripsi</label>
                            <textarea
                                style={{ ...inputCls, minHeight: 80, resize: 'vertical' } as React.CSSProperties}
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Penjelasan singkat tentang kategori ini..."
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={form.is_active}
                                onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                                style={{ accentColor: ORANGE, width: 16, height: 16 }}
                            />
                            <label htmlFor="is_active" style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, color: '#111', cursor: 'pointer' }}>
                                Aktif (tampil di formulir pendaftaran)
                            </label>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}
                            >
                                {processing ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Tambahkan')}
                            </button>
                            <button type="button" onClick={resetForm} style={{ background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 8, padding: '10px 24px', fontFamily: RALEWAY, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                            {['No', 'Nama Kategori', 'Deskripsi', 'Urutan', 'Status', 'Aksi'].map(h => (
                                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: RALEWAY, fontWeight: 700, fontSize: 13, color: '#374151' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', fontFamily: MERRI, fontSize: 14, color: '#9CA3AF' }}>
                                    Belum ada kategori. Tambahkan kategori pertama.
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat, i) => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ padding: '14px 16px', fontFamily: MERRI, fontSize: 14, color: '#6B7280' }}>{i + 1}</td>
                                    <td style={{ padding: '14px 16px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, color: '#111' }}>{cat.name}</td>
                                    <td style={{ padding: '14px 16px', fontFamily: MERRI, fontSize: 13, color: '#6B7280', maxWidth: 280 }}>
                                        {cat.description ? (cat.description.length > 80 ? cat.description.slice(0, 80) + '...' : cat.description) : '—'}
                                    </td>
                                    <td style={{ padding: '14px 16px', fontFamily: MERRI, fontSize: 14, color: '#374151', textAlign: 'center' }}>{cat.order}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <button
                                            onClick={() => toggleActive(cat)}
                                            style={{
                                                background: cat.is_active ? '#D1FAE5' : '#F3F4F6',
                                                color: cat.is_active ? '#065F46' : '#6B7280',
                                                border: 'none',
                                                borderRadius: 20,
                                                padding: '4px 12px',
                                                fontFamily: RALEWAY,
                                                fontWeight: 700,
                                                fontSize: 12,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {cat.is_active ? '● Aktif' : '○ Nonaktif'}
                                        </button>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                onClick={() => startEdit(cat)}
                                                style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, padding: '6px 14px', fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '6px 14px', fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 16, fontFamily: MERRI, fontSize: 13, color: '#9CA3AF' }}>
                💡 Perubahan kategori akan langsung terlihat di formulir pendaftaran publik.
            </div>
        </AdminLayout>
    );
}
