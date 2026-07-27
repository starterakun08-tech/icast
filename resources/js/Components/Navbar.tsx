import { Link } from '@inertiajs/react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
    transparent?: boolean;
}

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'FAQ', href: '#faq' },
];

function scrollToSection(href: string) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// h4: Raleway Bold 28px on 1920px canvas
const H4 = 'clamp(16px, 1.46vw, 28px)';

export default function Navbar({ transparent = true }: NavbarProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsSticky(latest > 80);
    });

    return (
        <motion.header
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isSticky ? 'bg-[#fff6e9] shadow-md' : transparent ? 'bg-transparent' : 'bg-[#fff6e9]'
            }`}
            style={{ height: 'clamp(80px, 7.19vw, 138px)' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="h-full px-6 lg:px-12 flex items-center justify-between mx-auto" style={{ maxWidth: '1920px' }}>
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img
                        src="/images/icast-logo.svg"
                        alt="iCAST Logo"
                        style={{ height: 'clamp(36px, 3.33vw, 64px)', width: 'auto' }}
                        loading="lazy"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollToSection(link.href)}
                            className="text-black hover:text-[#F97316] transition-colors duration-200 cursor-pointer bg-transparent border-none"
                            style={{
                                fontFamily: 'Raleway, sans-serif',
                                fontSize: H4,
                                fontWeight: 700,
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    className="md:hidden bg-[#fff6e9] border-t border-gray-200 px-6 py-4 flex flex-col gap-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => { scrollToSection(link.href); setMobileOpen(false); }}
                            className="text-black hover:text-[#F97316] text-left bg-transparent border-none cursor-pointer"
                            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 700 }}
                        >
                            {link.label}
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}
