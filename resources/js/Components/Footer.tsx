import { Link } from '@inertiajs/react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">
            <div className="canvas-max px-6 lg:px-12 py-12">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* Logo + tagline */}
                    <div className="md:col-span-2">
                        <img
                            src="/images/icast-logo.svg"
                            alt="iCAST"
                            className="h-12 w-auto mb-4 brightness-0 invert"
                            loading="lazy"
                        />
                        <p
                            className="text-gray-400 leading-relaxed max-w-xs"
                            style={{ fontFamily: 'Merriweather, serif', fontSize: '14px' }}
                        >
                            Building technology that matters. Empowering innovators to create solutions that impact communities worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            className="text-white mb-4"
                            style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}
                        >
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {['About', 'Timeline', 'Mentors', 'Prizes', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById(item.toLowerCase());
                                            el?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-gray-400 hover:text-[#F97316] transition-colors text-sm cursor-pointer bg-transparent border-none"
                                        style={{ fontFamily: 'Merriweather, serif' }}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3
                            className="text-white mb-4"
                            style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px' }}
                        >
                            Follow Us
                        </h3>
                        <div className="flex gap-3">
                            {[
                                { label: 'Twitter / X', icon: '𝕏', href: '#' },
                                { label: 'Instagram', icon: '📷', href: '#' },
                                { label: 'LinkedIn', icon: 'in', href: '#' },
                                { label: 'YouTube', icon: '▶', href: '#' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#F97316] flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: 'Merriweather, serif' }}
                    >
                        &copy; {year} iCAST Hackathon. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <a href="#" className="hover:text-[#F97316] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>Privacy Policy</a>
                        <a href="#" className="hover:text-[#F97316] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
