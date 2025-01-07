import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/services/auth-service';
import { Button } from '../ui/button';
import { toast } from '@/lib/hooks/use-toast';
import { useUser } from '@/lib/contexts/user-context';

interface NavbarProps {
    title: string;
    linkTo: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, linkTo }) => {
    const { user, username, setUser, setUsername } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const error = await logout();
        if (!error) {
            setUser(null);
            setUsername(null);
            navigate('/');
        } else {
            toast({ title: 'Napaka', description: 'Odjava ni uspela', variant: 'destructive' });
        }
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
