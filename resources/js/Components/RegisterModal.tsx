import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    institution: string;
    team_name: string;
    category: 'individual' | 'team';
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        institution: '',
        team_name: '',
        category: 'individual',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await axios.post('/register-hackathon', form);
            setSuccess(true);
        } catch (err: any) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <motion.div
                className="bg-[#fff6e9] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <div className="bg-[#F97316] px-7 py-5 flex items-center justify-between">
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '24px', color: '#fff' }}>
                        Register for iCAST Hackathon
                    </h2>
                    <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
                </div>

                {/* Body */}
                <div className="px-7 py-6">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '22px' }}>
                                Registration Successful!
                            </h3>
                            <p className="mt-2 text-gray-600" style={{ fontFamily: 'Merriweather, serif', fontSize: '15px' }}>
                                We'll contact you at {form.email} with further details.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-8 py-3 rounded-full text-white"
                                style={{ background: '#F97316', fontFamily: 'Merriweather, serif' }}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="registration-form">
                            {(['name', 'email', 'phone', 'institution'] as const).map((field) => (
                                <div key={field}>
                                    <label
                                        htmlFor={`reg-${field}`}
                                        className="block mb-1 font-semibold text-sm capitalize"
                                        style={{ fontFamily: 'Raleway, sans-serif' }}
                                    >
                                        {field === 'institution' ? 'Institution / Organization' : field.charAt(0).toUpperCase() + field.slice(1)}
                                        {field === 'name' || field === 'email' ? ' *' : ''}
                                    </label>
                                    <input
                                        id={`reg-${field}`}
                                        name={field}
                                        type={field === 'email' ? 'email' : 'text'}
                                        value={form[field]}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] bg-white"
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label htmlFor="reg-category" className="block mb-1 font-semibold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                    Category *
                                </label>
                                <select
                                    id="reg-category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] bg-white"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="team">Team</option>
                                </select>
                            </div>

                            {form.category === 'team' && (
                                <div>
                                    <label htmlFor="reg-team_name" className="block mb-1 font-semibold text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                        Team Name
                                    </label>
                                    <input
                                        id="reg-team_name"
                                        name="team_name"
                                        type="text"
                                        value={form.team_name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97316] bg-white"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-full text-white font-body transition-all hover:scale-[1.02] disabled:opacity-60"
                                style={{ background: '#F97316', fontFamily: 'Merriweather, serif', fontSize: '16px' }}
                            >
                                {loading ? 'Submitting...' : 'Submit Registration'}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
