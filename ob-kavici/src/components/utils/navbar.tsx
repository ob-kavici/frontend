import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/services/auth-service';
import { supabase } from '@/services/supabase-service';
import { Button } from '../ui/button';

const Navbar: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    // Fetch user on component mount
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {
                setUser(data?.user);
            }
        };

        fetchUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        // Cleanup subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate('/');
    };

    return (
        <div className="flex items-center justify-between p-5 bg-background text-foreground">
            <div className="text-4xl font-cursive">ob-kavici</div>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                {user ? (
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{ user.email }</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive">Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                ) : (
                    <Link to="/auth">
                        <Button variant="outline">Log In</Button>
                    </Link>
                )
                }
                
            </div>
        </div>
    );
};

export default Navbar;