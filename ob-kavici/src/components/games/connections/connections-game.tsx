import React from 'react';
import { Button } from '@/components/ui/button';
import 'tailwindcss/tailwind.css';

const ConnectionsGame: React.FC = () => {
    return (
        <div className="p-4 max-w-4xl mx-auto grid grid-cols-4 gap-4 justify-center items-center">
            {Array.from({ length: 16 }).map((_, index) => (
                <Button key={index} variant="outline" className="h-32 flex justify-center items-center">
                    Tile {index + 1}
                </Button>
            ))}
        </div>
    );
};

export default ConnectionsGame;