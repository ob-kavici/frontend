export interface UserProfile {
    id: string;
    email: string;
    username: string;
    bio?: string;
    avatar_url?: string;
    created_at: Date;
}
