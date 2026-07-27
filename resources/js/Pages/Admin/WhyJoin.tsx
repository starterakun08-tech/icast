import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, WhyJoinCard } from '@/types';

interface WhyJoinPageProps {
    cards: WhyJoinCard[];
}

export default function WhyJoinPage({ cards }: InertiaPageProps<WhyJoinPageProps>) {
    const [editId, setEditId] = useState<number | null>(null);
    const [success, setSuccess] = useState('');

    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        description: '',
        icon: '',
        order: 0 as number,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/admin/why-join/${editId}`, { onSuccess: () => { reset(); setEditId(null); setSuccess('Updated!'); } });
        } else {
            post('/admin/why-join', { onSuccess: () => { reset(); setSuccess('Created!'); } });
        }
    };

    const handleEdit = (card: WhyJoinCard) => {
        setEditId(card.id);
        setData({ title: card.title, description: card.description, icon: card.icon ?? '', order: card.order });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this card?')) router.delete(`/admin/why-join/${id}`);
    };

    return (
        <AdminLayout title="Why Join Management">
            <Head title="Why Join — Admin" />

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm p-7">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                        {editId ? 'Edit Card' : 'Add Card'}
                    </h2>
                    {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Title *</label>
                            <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Description *</label>
                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316] resize-none" />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Icon key</label>
                            <input type="text" value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="Better-Together, Think-Bigger, meet-your-future" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60" style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}>
                                {processing ? 'Saving...' : editId ? 'Update' : 'Add Card'}
                            </button>
                            {editId && <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-6 py-2.5 rounded-full text-sm border border-gray-300 text-gray-600">Cancel</button>}
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>Cards</h2>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {cards.map((card) => (
                            <li key={card.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-bold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>#{card.order} — {card.title}</p>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2" style={{ fontFamily: 'Merriweather, serif' }}>{card.description}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button onClick={() => handleEdit(card)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                                    <button onClick={() => handleDelete(card.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                                </div>
                            </li>
                        ))}
                        {cards.length === 0 && <li className="px-6 py-8 text-center text-gray-400 text-sm">No cards yet.</li>}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

