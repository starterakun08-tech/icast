import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'superadmin';
    created_at: string;
}

interface Props {
    users: User[];
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

export default function Users({ users }: Props) {
    const { props } = usePage<any>();
    const flash = props.flash as { success?: string; error?: string } | undefined;
    const authUser = (props.auth as any)?.user;

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' as 'admin' | 'superadmin' });
    const [processing, setProcessing] = useState(false);

    const resetForm = () => {
        setForm({ name: '', email: '', password: '', role: 'admin' });
        setEditId(null);
        setShowForm(false);
    };

    const startEdit = (user: User) => {
        setForm({ name: user.name, email: user.email, password: '', role: user.role });
        setEditId(user.id);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        const data: Record<string, string> = { name: form.name, email: form.email, role: form.role };
        if (form.password) data.password = form.password;

        if (editId) {
            router.put(`/admin/users/${editId}`, data, { onFinish: () => { setProcessing(false); resetForm(); } });
        } else {
            data.password = form.password;
            router.post('/admin/users', data, { onFinish: () => { setProcessing(false); resetForm(); } });
        }
    };

    const handleDelete = (user: User) => {
        if (user.id === authUser?.id) return;
        if (!confirm(`Hapus pengguna "${user.name}"?`)) return;
        router.delete(`/admin/users/${user.id}`);
    };

    const roleBadge = (role: string) => ({
        superadmin: { bg: '#FFF7ED', color: '#C2410C', label: '⭐ SuperAdmin' },
        admin: { bg: '#EFF6FF', color: '#1D4ED8', label: '🔧 Admin' },
    }[role] ?? { bg: '#F3F4F6', color: '#374151', label: role });

    return (
        <AdminLayout title="Manajemen Pengguna">
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
                    <h2 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 22, color: '#111', margin: '0 0 4px' }}>Manajemen Pengguna</h2>
                    <p style={{ fontFamily: MERRI, fontSize: 13, color: '#6B7280', margin: 0 }}>
                        Hanya SuperAdmin yang dapat menambah, mengubah, atau menghapus akun admin.
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                    >
                        + Tambah Admin
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: `2px solid ${ORANGE}` }}>
                    <h3 style={{ fontFamily: RALEWAY, fontWeight: 700, fontSize: 18, color: '#111', margin: '0 0 20px' }}>
                        {editId ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                                    Nama <span style={{ color: ORANGE }}>*</span>
                                </label>
                                <input style={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nama lengkap" required />
                            </div>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                                    Email <span style={{ color: ORANGE }}>*</span>
                                </label>
                                <input type="email" style={inputCls} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@icast.id" required />
                            </div>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                                    Password {editId && <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(kosongkan jika tidak diubah)</span>}
                                    {!editId && <span style={{ color: ORANGE }}> *</span>}
                                </label>
                                <input
                                    type="password"
                                    style={inputCls}
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    placeholder="Minimal 8 karakter"
                                    required={!editId}
                                />
                            </div>
                            <div>
                                <label style={{ fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                                    Role <span style={{ color: ORANGE }}>*</span>
                                </label>
                                <select style={inputCls} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as any }))}>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">SuperAdmin</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}
                            >
                                {processing ? 'Menyimpan...' : (editId ? 'Simpan' : 'Tambahkan')}
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
                            {['Nama', 'Email', 'Role', 'Terdaftar', 'Aksi'].map(h => (
                                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: RALEWAY, fontWeight: 700, fontSize: 13, color: '#374151' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const badge = roleBadge(user.role);
                            const isSelf = user.id === authUser?.id;
                            return (
                                <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6', background: isSelf ? '#FFFBF7' : undefined }}>
                                    <td style={{ padding: '14px 16px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 14, color: '#111' }}>
                                        {user.name} {isSelf && <span style={{ fontFamily: MERRI, fontSize: 11, color: '#9CA3AF' }}>(Anda)</span>}
                                    </td>
                                    <td style={{ padding: '14px 16px', fontFamily: MERRI, fontSize: 13, color: '#374151' }}>{user.email}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{ background: badge.bg, color: badge.color, borderRadius: 20, padding: '4px 12px', fontFamily: RALEWAY, fontWeight: 700, fontSize: 12 }}>
                                            {badge.label}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px', fontFamily: MERRI, fontSize: 13, color: '#6B7280' }}>
                                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        {!isSelf ? (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <button onClick={() => startEdit(user)} style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, padding: '6px 14px', fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(user)} style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '6px 14px', fontFamily: RALEWAY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                                    Hapus
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontFamily: MERRI, fontSize: 12, color: '#9CA3AF' }}>—</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 16, fontFamily: MERRI, fontSize: 13, color: '#9CA3AF' }}>
                🔐 Halaman ini hanya dapat diakses oleh SuperAdmin. Admin biasa tidak dapat melihat halaman ini.
            </div>
        </AdminLayout>
    );
}
