import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

interface Profile {
    id: string;
    username: string;
    bio: string;
    avatar_url: string;
}

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error.message);
                } else {
                    setProfile(data);
                }
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div>Loading profile...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p>{profile.bio}</p>
            {profile.avatar_url && (
                <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
            )}
        </div>
    );
};

export default UserProfile;
