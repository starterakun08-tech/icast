import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Timeline } from '@/types';

interface TimelinePageProps {
    timelines: Timeline[];
}

interface FormState {
    date: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

const defaultForm: FormState = { date: '', title: '', description: '', icon: '', order: 0 };

export default function TimelinePage({ timelines }: InertiaPageProps<TimelinePageProps>) {
    const [editId, setEditId] = useState<number | null>(null);
    const { data, setData, post, put, reset, processing, errors } = useForm<FormState>(defaultForm);
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/admin/timeline/${editId}`, {
                onSuccess: () => { reset(); setEditId(null); setSuccess('Updated!'); },
            });
        } else {
            post('/admin/timeline', {
                onSuccess: () => { reset(); setSuccess('Created!'); },
            });
        }
    };

    const handleEdit = (item: Timeline) => {
        setEditId(item.id);
        setData({ date: item.date, title: item.title, description: item.description ?? '', icon: item.icon ?? '', order: item.order });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this timeline event?')) {
            router.delete(`/admin/timeline/${id}`);
        }
    };

    return (
        <AdminLayout title="Timeline Management">
            <Head title="Timeline — Admin" />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm p-7">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                        {editId ? 'Edit Event' : 'Add Timeline Event'}
                    </h2>
                    {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {[
                            { key: 'date', label: 'Date (e.g. 06 August)' },
                            { key: 'title', label: 'Title' },
                            { key: 'description', label: 'Description (mode: Online/Onsite)' },
                            { key: 'icon', label: 'Icon key (flag, laptop, code, trophy)' },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>{f.label}</label>
                                <input
                                    type="text"
                                    value={data[f.key as keyof FormState] as string}
                                    onChange={(e) => setData(f.key as any, e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]"
                                />
                                {errors[f.key as keyof typeof errors] && <p className="text-red-500 text-xs mt-1">{errors[f.key as keyof typeof errors]}</p>}
                            </div>
                        ))}
                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>Order</label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]"
                            />
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60"
                                style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}
                            >
                                {processing ? 'Saving...' : editId ? 'Update' : 'Add'}
                            </button>
                            {editId && (
                                <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-6 py-2.5 rounded-full text-sm border border-gray-300 text-gray-600">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>Events</h2>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {timelines.map((item) => (
                            <li key={item.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-bold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>{item.date} — {item.title}</p>
                                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'Merriweather, serif' }}>{item.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                                </div>
                            </li>
                        ))}
                        {timelines.length === 0 && (
                            <li className="px-6 py-8 text-center text-gray-400 text-sm">No events yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

