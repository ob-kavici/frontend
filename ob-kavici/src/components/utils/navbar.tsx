import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';

const Navbar: React.FC = () => {
    return (
        <div className="flex items-center justify-between p-5 bg-background text-foreground">
            <div className="text-4xl font-cursive">ob-kavici</div>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;