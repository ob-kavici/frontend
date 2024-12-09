import React, { useState } from 'react';
import Login from './login.tsx';
import Register from './register.tsx';
import { Button } from '../ui/button.tsx';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {isRegistering ? (
                <Register switchToLogin={() => setIsRegistering(false)} />
            ) : (
                <Login switchToRegister={() => setIsRegistering(true)} />
            )}
            <Link to="/">
                <Button variant="ghost" className="mt-4">
                    Play as guest
                </Button>
            </Link>  
        </div>
    );
};

export default AuthPage;
