import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
            <h1 className="text-5xl font-cursive text-primary mb-6">
                ob-kavici
            </h1>

            <p className="text-lg text-muted-foreground mb-12 text-center max-w-md">
                Sprosti se ob izzivih, igrah in ugankah. Zabavaj se ob reševanju in preživi prijetne trenutke!
            </p>

            <div className="flex flex-col gap-4 max-w-xs">
                <Link to="/games">
                    <Button variant="default" className="w-full">
                        Igre
                    </Button>
                </Link>
                <Link to="/auth">
                    <Button variant="outline" className="w-full">
                        Prijava / Registracija
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
