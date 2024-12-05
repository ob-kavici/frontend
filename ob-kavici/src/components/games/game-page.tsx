import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const GamePage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();

    return (
        <div>
            <h1>{gameId ? `Game Page: ${gameId}` : 'Game Page'}</h1>
            <p>Welcome to the game page!</p>
            <Outlet />
        </div>
    );
};

export default GamePage;