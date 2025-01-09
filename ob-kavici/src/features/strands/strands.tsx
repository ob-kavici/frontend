import { Game } from '@/types/games';
import React from 'react';

const Strands: React.FC<Game> = ({ game_data }) => {
    return (
        <div>
            <h1>Strands Game</h1>
            {/* Game implementation will go here */}
            {game_data ? (
                <div>
                    <p>{game_data.description}</p>
                    {/* Additional game data rendering can go here */}
                </div>
            ) : (
                <p>No game data available.</p>
            )}
        </div>
    );
};

export default Strands;