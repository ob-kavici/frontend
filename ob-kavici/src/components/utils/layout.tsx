import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default Layout;