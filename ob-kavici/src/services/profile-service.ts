import { supabase } from '@/services/supabase-service';
import { UserProfile } from '@/types/users';

class ProfileService {
    async getProfile(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            return null;
        }

        return data;
    }

    async getAllProfiles(): Promise<UserProfile[] | null> {
        const { data, error } = await supabase.from('profiles').select('*');

        if (error) {
            return null;
        }

        return data;
    }
}

export default new ProfileService();
