import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, Media } from '@/types';

interface MediaPageProps {
    media: Media[];
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function MediaPage({ media }: InertiaPageProps<MediaPageProps>) {
    const { data, setData, post, reset, processing, errors } = useForm({
        file: null as File | null,
    });
    const [success, setSuccess] = useState('');
    const [copied, setCopied] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/media', {
            forceFormData: true,
            onSuccess: () => { reset(); setSuccess('File uploaded!'); setTimeout(() => setSuccess(''), 3000); },
        } as any);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this file?')) router.delete(`/admin/media/${id}`);
    };

    const copyUrl = (url: string, id: number) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <AdminLayout title="Media Manager">
            <Head title="Media — Admin" />

            {/* Upload form */}
            <div className="bg-white rounded-2xl shadow-sm p-7 mb-8 max-w-xl">
                <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>Upload File</h2>
                {success && <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">✅ {success}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                    <div>
                        <label className="block mb-1 text-xs font-semibold text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                            File (PNG, JPG, WebP, SVG — max 5MB)
                        </label>
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp,.svg"
                            onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                        />
                        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing || !data.file}
                        className="px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-60 self-start"
                        style={{ background: '#F97316', fontFamily: 'Raleway, sans-serif' }}
                    >
                        {processing ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>

            {/* Media grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.map((file) => (
                    <div key={file.id} className="bg-white rounded-xl shadow-sm overflow-hidden group relative">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                            {file.mime_type.startsWith('image/') ? (
                                <img src={file.url} alt={file.original_name} className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                                <div className="text-4xl">📄</div>
                            )}
                        </div>
                        <div className="p-2">
                            <p className="text-xs font-semibold truncate" style={{ fontFamily: 'Raleway, sans-serif' }} title={file.original_name}>{file.original_name}</p>
                            <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                            <div className="flex gap-1 mt-2">
                                <button
                                    onClick={() => copyUrl(file.url, file.id)}
                                    className="flex-1 text-xs py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                >
                                    {copied === file.id ? '✓ Copied' : 'Copy URL'}
                                </button>
                                <button
                                    onClick={() => handleDelete(file.id)}
                                    className="text-xs py-1 px-2 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {media.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-400">
                        <div className="text-5xl mb-4">📂</div>
                        <p style={{ fontFamily: 'Merriweather, serif' }}>No media uploaded yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}


