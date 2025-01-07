import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/services/supabase-service";
import ProfileService from "@/services/profile-service";
import { User } from "@supabase/supabase-js";

interface UserContextProps {
    user: User | null;
    username: string | null;
    setUser: (user: any) => void;
    setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setUser(data.user);

                const profile = await ProfileService.getProfile(data.user.id);
                setUsername(profile?.username || null);
            }
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);

            if (session?.user) {
                ProfileService.getProfile(session.user.id).then((profile) => {
                    setUsername(profile?.username || null);
                });
            } else {
                setUsername(null);
            }
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, username, setUser, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
