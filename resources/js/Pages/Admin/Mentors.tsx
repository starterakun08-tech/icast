import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Mentor } from '@/types';

interface MentorsPageProps {
    mentors: Mentor[];
}

export default function MentorsPage({ mentors }: InertiaPageProps<MentorsPageProps>) {
    const [editId, setEditId] = useState<number | null>(null);
    const [success, setSuccess] = useState('');

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        position: '',
        organization: '',
        bio: '',
        order: 0 as number,
        photo: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            forceFormData: true,
            onSuccess: () => { reset(); setEditId(null); setSuccess(editId ? 'Updated!' : 'Created!'); },
        };
        if (editId) {
            router.post(`/admin/mentors/${editId}`, {
                _method: 'put',
                ...data,
            } as any, options as any);
        } else {
            post('/admin/mentors', options as any);
        }
    };

    const handleEdit = (m: Mentor) => {
        setEditId(m.id);
        setData({ name: m.name, position: m.position, organization: m.organization ?? '', bio: m.bio ?? '', order: m.order, photo: null });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this mentor?')) router.delete(`/admin/mentors/${id}`);
    };

    return (
        <AdminLayout title="Mentors Management">
            <Head title="Mentors — Admin" />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm p-7">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                        {editId ? 'Edit Mentor' : 'Add Mentor'}
                    </h2>
                    {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                        {[
                            { key: 'name', label: 'Full Name *' },
                            { key: 'position', label: 'Position / Title *' },
                            { key: 'organization', label: 'Organization' },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>{f.label}</label>
                                <input
                                    type="text"
                                    value={data[f.key as keyof typeof data] as string}
                                    onChange={(e) => setData(f.key as any, e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]"
                                />
                                {errors[f.key as keyof typeof errors] && <p className="text-red-500 text-xs mt-1">{errors[f.key as keyof typeof errors]}</p>}
                            </div>
                        ))}
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Photo (PNG/JPG, max 2MB)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('photo', e.target.files?.[0] ?? null)}
                                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                            />
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60" style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}>
                                {processing ? 'Saving...' : editId ? 'Update' : 'Add Mentor'}
                            </button>
                            {editId && (
                                <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-6 py-2.5 rounded-full text-sm border border-gray-300 text-gray-600">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>Mentors</h2>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {mentors.map((m) => (
                            <li key={m.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50">
                                {/* Photo */}
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                    {m.photo_url ? (
                                        <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">👤</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate" style={{ fontFamily: 'Raleway, sans-serif' }}>{m.name}</p>
                                    <p className="text-gray-500 text-xs truncate" style={{ fontFamily: 'Merriweather, serif' }}>{m.position}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(m)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                                    <button onClick={() => handleDelete(m.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                                </div>
                            </li>
                        ))}
                        {mentors.length === 0 && <li className="px-6 py-8 text-center text-gray-400 text-sm">No mentors yet.</li>}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

