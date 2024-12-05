import React from 'react';
import { Link } from 'react-router-dom';
import GameCard from './game-card';

const Games: React.FC = () => {
    const games = [
        { id: "connections", title: "Connections", description: "This is a description for Game 1." },
        { id: "letter-boxed", title: "Letter Boxed", description: "This is a description for Game 2." },
        { id: 3, title: "Game 3", description: "This is a description for Game 3." },
        { id: 4, title: "Game 4", description: "This is a description for Game 4." },
        { id: 5, title: "Game 5", description: "This is a description for Game 5." },
        { id: 6, title: "Game 6", description: "This is a description for Game 6." },
        { id: 7, title: "Game 7", description: "This is a description for Game 7." },
        { id: 8, title: "Game 8", description: "This is a description for Game 8." },
    ];

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-cursive p-5">Games</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {games.map((game: any) => (
                    <Link key={game.id} to={`/games/${game.id}`}>
                        <GameCard game={game} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Games;