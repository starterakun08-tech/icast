import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { PageProps } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const allNavItems = [
    { label: 'Dashboard',        href: '/admin/dashboard',         icon: '📊', superadminOnly: false },
    { label: 'Hero',             href: '/admin/hero',              icon: '🖼️', superadminOnly: false },
    { label: 'About',            href: '/admin/about',             icon: 'ℹ️', superadminOnly: false },
    { label: 'Why Join',         href: '/admin/why-join',          icon: '✨', superadminOnly: false },
    { label: 'Timeline',         href: '/admin/timeline',          icon: '📅', superadminOnly: false },
    { label: 'Mentors',          href: '/admin/mentors',           icon: '👥', superadminOnly: false },
    { label: 'Prizes',           href: '/admin/prizes',            icon: '🏆', superadminOnly: false },
    { label: 'FAQs',             href: '/admin/faqs',              icon: '❓', superadminOnly: false },
    { label: 'Registrations',    href: '/admin/registrations',     icon: '📝', superadminOnly: false },
    { label: 'Kategori Tema',    href: '/admin/theme-categories',  icon: '🏷️', superadminOnly: false },
    { label: 'Media',            href: '/admin/media',             icon: '📁', superadminOnly: false },
    { label: 'Pengguna',         href: '/admin/users',             icon: '🔑', superadminOnly: true  },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth } = usePage<PageProps>().props as any;
    const isSuperAdmin = auth?.user?.role === 'superadmin';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = allNavItems.filter(item => !item.superadminOnly || isSuperAdmin);

    return (
        <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: 'Merriweather, serif' }}>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:flex`}
            >
                {/* Logo area */}
                <div className="px-6 py-5 border-b border-gray-100">
                    <img src="/images/icast-logo.svg" alt="iCAST" className="h-10 w-auto mb-1" />
                    <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '12px', color: '#9CA3AF', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Admin Panel
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.label}</span>
                                        {item.superadminOnly && (
                                            <span style={{ marginLeft: 'auto', background: '#FFF7ED', color: '#C2410C', borderRadius: 10, padding: '1px 6px', fontSize: 10, fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>
                                                SA
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100">
                    <div style={{ marginBottom: 8 }}>
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Login sebagai</p>
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 13, color: '#374151', margin: 0 }}>
                            {auth?.user?.name}
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F97316] transition-colors"
                        style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                    >
                        ← View Site
                    </Link>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
                    <button
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>
                    <h1 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111' }}>
                        {title ?? 'Admin Panel'}
                    </h1>
                    <div className="ml-auto flex items-center gap-4">
                        {isSuperAdmin && (
                            <span style={{ background: '#FFF7ED', color: '#C2410C', borderRadius: 20, padding: '3px 10px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 12 }}>
                                ⭐ SuperAdmin
                            </span>
                        )}
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>
                            {auth?.user?.name}
                        </span>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                            style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
