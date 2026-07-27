import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import type { InertiaPageProps, DashboardStats, Registration } from '@/types';

interface DashboardProps {
    stats: DashboardStats;
    recent_registrations: Registration[];
}

interface StatCardProps {
    label: string;
    value: number;
    color: string;
    icon: string;
    delay?: number;
}

function StatCard({ label, value, color, icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: color + '22', color }}
                >
                    Live
                </span>
            </div>
            <p
                className="text-3xl font-bold"
                style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, color: '#111' }}
            >
                {value.toLocaleString()}
            </p>
            <p className="text-gray-500 mt-1 text-sm" style={{ fontFamily: 'Merriweather, serif' }}>
                {label}
            </p>
        </motion.div>
    );
}

const statusColors: Record<string, string> = {
    approved: '#2E7D4F',
    pending: '#FFC107',
    rejected: '#EF4444',
};

export default function Dashboard({ stats, recent_registrations }: InertiaPageProps<DashboardProps>) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard — iCAST" />

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                <StatCard label="Total Registrations" value={stats.registrations} color="#F97316" icon="📝" delay={0} />
                <StatCard label="Approved" value={stats.approved} color="#2E7D4F" icon="✅" delay={0.05} />
                <StatCard label="Pending" value={stats.pending} color="#FFC107" icon="⏳" delay={0.1} />
                <StatCard label="Mentors" value={stats.mentors} color="#1a56db" icon="👥" delay={0.15} />
                <StatCard label="Timeline Events" value={stats.timelines} color="#8B5CF6" icon="📅" delay={0.2} />
                <StatCard label="FAQs" value={stats.faqs} color="#EC4899" icon="❓" delay={0.25} />
            </div>

            {/* Recent Registrations */}
            <motion.div
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}>
                        Recent Registrations
                    </h2>
                    <a
                        href="/admin/registrations"
                        className="text-sm text-[#F97316] hover:underline"
                        style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                    >
                        View all →
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Name', 'Email', 'Institution', 'Category', 'Status', 'Date'].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-6 py-3 text-gray-500"
                                        style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '12px' }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recent_registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>{reg.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{reg.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{reg.institution ?? '—'}</td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                            {reg.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="capitalize px-2 py-1 rounded-full text-xs font-semibold text-white"
                                            style={{ background: statusColors[reg.status] ?? '#9CA3AF' }}
                                        >
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(reg.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {recent_registrations.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        No registrations yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </AdminLayout>
    );
}

