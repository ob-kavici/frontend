import React from 'react';
import { GameType } from '@/types/GameType';
import GameTypeCard from './game-type-card';

const Games: React.FC = () => {
    const gameTypes: GameType[] = [
        {
            id: 'connections',
            title: 'Connections',
            is_active: true
        },
        {
            id: 'letter-boxed',
            title: 'Letter Boxed',
            is_active: false
        },
        {
            id: 'strands',
            title: 'Strands',
            is_active: false
        },
        {
            id: 'spelling-bee',
            title: 'Spelling Bee',
            is_active: false
        },
    ]


    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-cursive p-5">Games</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {gameTypes.map((gameType: any) => (
                    <GameTypeCard key={gameType.id} gameType={gameType} />
                ))}
            </div>
        </div>
    );
};

export default Games;