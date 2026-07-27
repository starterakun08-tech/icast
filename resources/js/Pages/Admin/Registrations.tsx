import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Registration, PaginatedData } from '@/types';

interface RegistrationsPageProps {
    registrations: PaginatedData<Registration>;
    filters: { status?: string; search?: string };
}

const statusColors: Record<string, string> = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
};

export default function RegistrationsPage({ registrations, filters }: InertiaPageProps<RegistrationsPageProps>) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

    const handleFilter = () => {
        router.get('/admin/registrations', { search, status }, { preserveState: true, replace: true });
    };

    const handleStatusUpdate = (id: number, newStatus: string) => {
        router.put(`/admin/registrations/${id}`, { status: newStatus });
        if (selectedReg && selectedReg.id === id) {
            setSelectedReg(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this registration?')) {
            router.delete(`/admin/registrations/${id}`);
            if (selectedReg?.id === id) setSelectedReg(null);
        }
    };

    return (
        <AdminLayout title="Registrations">
            <Head title="Registrations — Admin" />

            {/* Filters + Export */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-40">
                    <label className="block mb-1 text-xs font-semibold text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>Search</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search team, leader, email, solution..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]"
                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-xs font-semibold text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]">
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <button onClick={handleFilter} className="px-5 py-2 rounded-lg text-white text-sm font-semibold" style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}>
                    Filter
                </button>
                <a
                    href="/admin/registrations/export"
                    className="px-5 py-2 rounded-lg border-2 border-green-600 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors"
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                    ↓ Export CSV
                </a>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {['#', 'Nama Tim', 'Ketua / Kontak', 'Institusi', 'Kategori Tema', 'Solusi', 'Status', 'Tanggal', 'Aksi'].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-gray-500 whitespace-nowrap" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '12px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {registrations.data.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3 text-gray-400 text-xs">{reg.id}</td>
                                    <td className="px-5 py-3 font-semibold text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                        {reg.team_name || '—'}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="font-medium text-gray-800">{reg.leader_name || reg.name}</div>
                                        <div className="text-xs text-gray-500">{reg.email}</div>
                                        {(reg.leader_phone || reg.phone) && <div className="text-xs text-gray-400">{reg.leader_phone || reg.phone}</div>}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{reg.institution ?? '—'}</td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {reg.theme_category?.name ? (
                                            <span className="px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-semibold">
                                                {reg.theme_category.name}
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 max-w-xs truncate" title={reg.solution_title ?? ''}>
                                        {reg.solution_title ?? '—'}
                                    </td>
                                    <td className="px-5 py-3">
                                        <select
                                            value={reg.status}
                                            onChange={(e) => handleStatusUpdate(reg.id, e.target.value)}
                                            className={`px-2 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[reg.status]}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{new Date(reg.created_at).toLocaleDateString('id-ID')}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedReg(reg)}
                                                className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold"
                                            >
                                                Detail
                                            </button>
                                            <button onClick={() => handleDelete(reg.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {registrations.data.length === 0 && (
                                <tr><td colSpan={9} className="px-5 py-8 text-center text-gray-400">Belum ada pendaftaran.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {registrations.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-500" style={{ fontFamily: 'Merriweather, serif' }}>
                            Showing {registrations.from}–{registrations.to} of {registrations.total}
                        </p>
                        <div className="flex gap-2">
                            {registrations.links.map((link, i) => (
                                link.url ? (
                                    <button
                                        key={i}
                                        onClick={() => router.get(link.url!)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${link.active ? 'bg-[#F97316] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : null
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                    Detail Registrasi — {selectedReg.team_name || 'Tim Tanpa Nama'}
                                </h3>
                                <p className="text-xs text-gray-400">ID #{selectedReg.id} • Mendaftar pada {new Date(selectedReg.created_at).toLocaleString('id-ID')}</p>
                            </div>
                            <button
                                onClick={() => setSelectedReg(null)}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="space-y-6 text-sm">
                            {/* Section 1 */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                <h4 className="font-bold text-orange-600 text-xs uppercase tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>1. Profil Kelompok</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><span className="text-gray-500 text-xs block">Nama Tim:</span> <span className="font-semibold">{selectedReg.team_name || '—'}</span></div>
                                    <div><span className="text-gray-500 text-xs block">Institusi:</span> <span className="font-semibold">{selectedReg.institution || '—'}</span></div>
                                    <div><span className="text-gray-500 text-xs block">Ketua Tim:</span> <span className="font-semibold">{selectedReg.leader_name || selectedReg.name}</span></div>
                                    <div><span className="text-gray-500 text-xs block">No. Telepon Ketua:</span> <span className="font-semibold">{selectedReg.leader_phone || selectedReg.phone || '—'}</span></div>
                                    <div className="col-span-2"><span className="text-gray-500 text-xs block">Email Kontak:</span> <span className="font-semibold text-blue-600">{selectedReg.email}</span></div>
                                </div>

                                {/* Anggota */}
                                {selectedReg.members && selectedReg.members.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                        <span className="text-xs font-bold text-gray-700 block mb-2">Daftar Anggota Tim:</span>
                                        <div className="space-y-2">
                                            {selectedReg.members.map((m, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-wrap gap-4 text-xs">
                                                    <div><span className="text-gray-400">Anggota {idx + 1}:</span> <strong>{m.name || '—'}</strong></div>
                                                    <div><span className="text-gray-400">No. KTM:</span> <span>{m.ktm_number || '—'}</span></div>
                                                    <div><span className="text-gray-400">No. KTP/SIM:</span> <span>{m.id_number || '—'}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section 2 */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                <h4 className="font-bold text-orange-600 text-xs uppercase tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>2. Kategori Tema Solusi</h4>
                                <div>
                                    <span className="text-gray-500 text-xs block">Kategori Terpilih:</span>
                                    <span className="font-semibold text-base text-gray-900">
                                        {selectedReg.theme_category?.name || 'Belum memilih kategori'}
                                    </span>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                                <h4 className="font-bold text-orange-600 text-xs uppercase tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>3. Deskripsi Ide Awal (MVP Concept)</h4>
                                <div>
                                    <span className="text-gray-500 text-xs block">Judul Solusi / Aplikasi:</span>
                                    <span className="font-bold text-base text-gray-900 block">{selectedReg.solution_title || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs block mb-1">Problem Statement:</span>
                                    <p className="bg-white p-3 rounded-lg border border-gray-200 text-gray-700 whitespace-pre-line text-xs leading-relaxed">
                                        {selectedReg.problem_statement || '—'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs block mb-1">Deskripsi Solusi / Fitur Utama:</span>
                                    <p className="bg-white p-3 rounded-lg border border-gray-200 text-gray-700 whitespace-pre-line text-xs leading-relaxed">
                                        {selectedReg.solution_description || '—'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedReg(null)}
                                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

