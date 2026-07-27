export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Helper for page props that doesn't enforce Record<string, unknown>
export type InertiaPageProps<T = Record<string, unknown>> = {
    auth: { user: User };
} & T;

// ─── Domain Models ─────────────────────────────────────────────────────────

export interface HeroSetting {
    id: number;
    title_line1: string;
    title_line2: string;
    subtitle: string;
    btn_primary_text: string;
    btn_primary_url: string;
    btn_secondary_text: string;
    btn_secondary_url: string;
    banner_image: string | null;
}

export interface AboutSetting {
    id: number;
    section_label: string;
    heading: string;
    body: string;
    cta_text: string;
    cta_url: string;
}

export interface WhyJoinCard {
    id: number;
    icon: string | null;
    title: string;
    description: string;
    order: number;
    is_active: boolean;
}

export interface Timeline {
    id: number;
    date: string;
    title: string;
    description: string | null;
    icon: string | null;
    order: number;
    is_active: boolean;
}

export interface Mentor {
    id: number;
    name: string;
    position: string;
    organization: string | null;
    photo: string | null;
    photo_url: string | null;
    bio: string | null;
    order: number;
    is_active: boolean;
}

export interface Prize {
    id: number;
    title: string;
    description: string | null;
    amount: string | null;
    icon: string | null;
    order: number;
    is_active: boolean;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    order: number;
    is_active: boolean;
}

export interface RegistrationMember {
    name?: string;
    ktm_number?: string;
    id_number?: string;
}

export interface Registration {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    institution: string | null;
    team_name: string | null;
    leader_name: string | null;
    leader_phone: string | null;
    theme_category_id: number | null;
    theme_category?: { id: number; name: string } | null;
    solution_title: string | null;
    problem_statement: string | null;
    solution_description: string | null;
    members: RegistrationMember[] | null;
    category: 'individual' | 'team';
    status: 'pending' | 'approved' | 'rejected';
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface Media {
    id: number;
    filename: string;
    original_name: string;
    path: string;
    url: string;
    mime_type: string;
    size: number;
    created_at: string;
}

export interface DashboardStats {
    registrations: number;
    approved: number;
    pending: number;
    mentors: number;
    timelines: number;
    faqs: number;
}

export interface SeoData {
    title: string;
    description: string;
    og_image: string;
}

// ─── Pagination ────────────────────────────────────────────────────────────

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}
