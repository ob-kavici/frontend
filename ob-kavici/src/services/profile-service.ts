import { supabase } from '@/services/supabase-service';
import { UserProfile } from '@/types/UserProfile';

class ProfileService {
    // Fetch a single user profile by user ID
    async getProfileById(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error.message);
            return null;
        }

        return data;
    }

    // Fetch all user profiles
    async getAllProfiles(): Promise<UserProfile[] | null> {
        const { data, error } = await supabase.from('profiles').select('*');

        if (error) {
            console.error('Error fetching profiles:', error.message);
            return null;
        }

        return data;
    }
}

export default new ProfileService();
