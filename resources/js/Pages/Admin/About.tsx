import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, AboutSetting } from '@/types';

interface AboutPageProps {
    about: AboutSetting;
}

export default function AboutPage({ about }: InertiaPageProps<AboutPageProps>) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        section_label: about.section_label,
        heading: about.heading,
        body: about.body,
        cta_text: about.cta_text,
        cta_url: about.cta_url,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/about');
    };

    return (
        <AdminLayout title="About Management">
            <Head title="About — Admin" />

            <div className="max-w-2xl">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '22px', marginBottom: '24px' }}>
                        Edit About Section
                    </h2>

                    {recentlySuccessful && (
                        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            ✅ About section updated successfully.
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {[
                            { key: 'section_label', label: 'Section Label (e.g. ABOUT)' },
                            { key: 'heading', label: 'Heading' },
                            { key: 'cta_text', label: 'CTA Button Text' },
                            { key: 'cta_url', label: 'CTA Button URL' },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block mb-1 text-sm font-semibold text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    value={data[field.key as keyof typeof data]}
                                    onChange={(e) => setData(field.key as any, e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316]"
                                />
                                {errors[field.key as keyof typeof errors] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[field.key as keyof typeof errors]}</p>
                                )}
                            </div>
                        ))}

                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                Body Text
                            </label>
                            <textarea
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                rows={8}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] resize-none"
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

