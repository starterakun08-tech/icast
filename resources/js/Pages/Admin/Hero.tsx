import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, HeroSetting } from '@/types';

interface HeroPageProps {
    hero: HeroSetting;
}

export default function HeroPage({ hero }: InertiaPageProps<HeroPageProps>) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        title_line1: hero.title_line1,
        title_line2: hero.title_line2,
        subtitle: hero.subtitle,
        btn_primary_text: hero.btn_primary_text,
        btn_primary_url: hero.btn_primary_url,
        btn_secondary_text: hero.btn_secondary_text,
        btn_secondary_url: hero.btn_secondary_url,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/hero');
    };

    return (
        <AdminLayout title="Hero Management">
            <Head title="Hero — Admin" />

            <div className="max-w-2xl">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '22px', marginBottom: '24px' }}>
                        Edit Hero Section
                    </h2>

                    {recentlySuccessful && (
                        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            ✅ Hero section updated successfully.
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {[
                            { key: 'title_line1', label: 'Title Line 1 (Black)' },
                            { key: 'title_line2', label: 'Title Line 2 (Orange)' },
                            { key: 'btn_primary_text', label: 'Primary Button Text' },
                            { key: 'btn_primary_url', label: 'Primary Button URL' },
                            { key: 'btn_secondary_text', label: 'Secondary Button Text' },
                            { key: 'btn_secondary_url', label: 'Secondary Button URL' },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block mb-1 text-sm font-semibold text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    value={data[field.key as keyof typeof data]}
                                    onChange={(e) => setData(field.key as any, e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                                />
                                {errors[field.key as keyof typeof errors] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[field.key as keyof typeof errors]}</p>
                                )}
                            </div>
                        ))}

                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                Subtitle
                            </label>
                            <textarea
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 rounded-full text-white text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-60"
                            style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif', alignSelf: 'flex-start' }}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

