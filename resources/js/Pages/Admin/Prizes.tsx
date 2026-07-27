import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Prize } from '@/types';

interface PrizesPageProps {
    prizes: Prize[];
}

export default function PrizesPage({ prizes }: InertiaPageProps<PrizesPageProps>) {
    const [editId, setEditId] = useState<number | null>(null);
    const [success, setSuccess] = useState('');

    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        description: '',
        amount: '',
        icon: '',
        order: 0 as number,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/admin/prizes/${editId}`, { onSuccess: () => { reset(); setEditId(null); setSuccess('Updated!'); } });
        } else {
            post('/admin/prizes', { onSuccess: () => { reset(); setSuccess('Created!'); } });
        }
    };

    const handleEdit = (p: Prize) => {
        setEditId(p.id);
        setData({ title: p.title, description: p.description ?? '', amount: p.amount ?? '', icon: p.icon ?? '', order: p.order });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this prize?')) router.delete(`/admin/prizes/${id}`);
    };

    return (
        <AdminLayout title="Prizes Management">
            <Head title="Prizes — Admin" />

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm p-7">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                        {editId ? 'Edit Prize' : 'Add Prize'}
                    </h2>
                    {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {[
                            { key: 'title', label: 'Title *', placeholder: '🥇 1st Place' },
                            { key: 'amount', label: 'Amount', placeholder: '$3,000' },
                            { key: 'icon', label: 'Emoji Icon', placeholder: '🥇' },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>{f.label}</label>
                                <input type="text" placeholder={f.placeholder} value={data[f.key as keyof typeof data] as string} onChange={(e) => setData(f.key as any, e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                                {errors[f.key as keyof typeof errors] && <p className="text-red-500 text-xs mt-1">{errors[f.key as keyof typeof errors]}</p>}
                            </div>
                        ))}
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Description</label>
                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316] resize-none" />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60" style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}>
                                {processing ? 'Saving...' : editId ? 'Update' : 'Add Prize'}
                            </button>
                            {editId && <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-6 py-2.5 rounded-full text-sm border border-gray-300 text-gray-600">Cancel</button>}
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>Prizes</h2>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {prizes.map((p) => (
                            <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-bold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>{p.title}</p>
                                    {p.amount && <p className="text-[#F97316] font-bold text-sm">{p.amount}</p>}
                                    {p.description && <p className="text-gray-500 text-xs" style={{ fontFamily: 'Merriweather, serif' }}>{p.description}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(p)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                                </div>
                            </li>
                        ))}
                        {prizes.length === 0 && <li className="px-6 py-8 text-center text-gray-400 text-sm">No prizes yet.</li>}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

