import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/toaster';
import Navbar from './navbar';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
};

export default Layout;