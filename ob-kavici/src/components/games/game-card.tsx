import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameCardProps {
    game: any;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 w-full">
            <CardHeader>
                <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{game.description}</p>
            </CardContent>
        </Card>
    );
};

export default GameCard;