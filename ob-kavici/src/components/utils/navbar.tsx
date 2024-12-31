import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/services/auth-service';
import { supabase } from '@/services/supabase-service';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import ProfileService from '@/services/profile-service';

interface NavbarProps {
    title: string;
    linkTo: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, linkTo }) => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error?.status === 500) {
                toast({ title: 'Napaka strežnika', description: 'Avtentikacija trenutno ni na voljo', variant: 'destructive' });
            } else {
                const userData = data?.user;
                setUser(userData);

                if (userData) {
                    try {
                        const profile = await ProfileService.getProfile(userData.id);
                        setUsername(profile?.username || null);
                    } catch (error) {
                        toast({ title: 'Napaka', description: 'Ni mogoče naložiti uporabniškega imena', variant: 'destructive' });
                    }
                }
            }
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);

            if (session?.user) {
                ProfileService.getProfile(session.user.id)
                    .then((profile) => setUsername(profile?.username || null))
                    .catch(() => toast({ title: 'Napaka', description: 'Ni mogoče naložiti uporabniškega imena', variant: 'destructive' }));
            } else {
                setUsername(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setUsername(null);
        navigate('/');
    };

    return (
        <div className="flex items-center justify-between p-5 bg-background text-foreground">
            <Link to={linkTo} className="text-4xl font-cursive hover:text-amber-400">{title}</Link>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                                <AvatarFallback>{username?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{username || 'Nalaganje...'}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/profile">Profil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="text-destructive">Odjava</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link to="/auth">
                        <Button variant="outline">Prijava</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
