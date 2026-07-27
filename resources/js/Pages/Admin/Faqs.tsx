import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Faq } from '@/types';

interface FaqsPageProps {
    faqs: Faq[];
}

export default function FaqsPage({ faqs }: InertiaPageProps<FaqsPageProps>) {
    const [editId, setEditId] = useState<number | null>(null);
    const [success, setSuccess] = useState('');

    const { data, setData, post, put, reset, processing, errors } = useForm({
        question: '',
        answer: '',
        order: 0 as number,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/admin/faqs/${editId}`, { onSuccess: () => { reset(); setEditId(null); setSuccess('Updated!'); } });
        } else {
            post('/admin/faqs', { onSuccess: () => { reset(); setSuccess('Created!'); } });
        }
    };

    const handleEdit = (faq: Faq) => {
        setEditId(faq.id);
        setData({ question: faq.question, answer: faq.answer, order: faq.order });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this FAQ?')) router.delete(`/admin/faqs/${id}`);
    };

    return (
        <AdminLayout title="FAQ Management">
            <Head title="FAQs — Admin" />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm p-7">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                        {editId ? 'Edit FAQ' : 'Add FAQ'}
                    </h2>
                    {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Question *</label>
                            <input type="text" value={data.question} onChange={(e) => setData('question', e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                            {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Answer *</label>
                            <textarea value={data.answer} onChange={(e) => setData('answer', e.target.value)} rows={5} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316] resize-none" />
                            {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]" />
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60" style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}>
                                {processing ? 'Saving...' : editId ? 'Update' : 'Add FAQ'}
                            </button>
                            {editId && <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-6 py-2.5 rounded-full text-sm border border-gray-300 text-gray-600">Cancel</button>}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>FAQs ({faqs.length})</h2>
                    </div>
                    <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {faqs.map((faq) => (
                            <li key={faq.id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>#{faq.order} — {faq.question}</p>
                                        <p className="text-gray-500 text-xs mt-1 line-clamp-2" style={{ fontFamily: 'Merriweather, serif' }}>{faq.answer}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button onClick={() => handleEdit(faq)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                                        <button onClick={() => handleDelete(faq.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {faqs.length === 0 && <li className="px-6 py-8 text-center text-gray-400 text-sm">No FAQs yet.</li>}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

