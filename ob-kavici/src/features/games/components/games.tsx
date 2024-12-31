import React from 'react';
import GameTypeCard from '@/features/games/components/game-type-card';
import { gameTypes } from '@/features/games/config/game-types';
import { GameType } from '@/types/games';

const Games: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-cursive p-5">Games</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {gameTypes.map((gameType: GameType) => (
                    <GameTypeCard key={gameType.id} gameType={gameType} />
                ))}
            </div>
        </div>
    );
};

export default Games;