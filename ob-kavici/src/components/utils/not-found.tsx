import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl">404 - Not Found</h1>
            <p className="text-2xl mt-4">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6">
                <Button>Go to Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;