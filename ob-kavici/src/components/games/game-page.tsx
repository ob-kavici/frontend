import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NotFound from '../utils/not-found';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const gameComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
    'connections': React.lazy(() => import('./connections/connections-game')),
    'letter-boxed': React.lazy(() => import('./letter-boxed/letter-boxed-game')),
};

const gameDescriptions: Record<string, string> = {
    'connections': 'Create four groups of four!',
    'letter-boxed': 'Find words in a box of letters',
};

const GamePage = () => {
    const { gameId } = useParams<{ gameId: string }>();

    if (!gameId || !gameComponents[gameId]) {
        return <NotFound />;
    }

    const GameComponent = gameComponents[gameId];

    return (
        <div className="container mx-auto p-4">
            <div className="">
                <h1 className="text-3xl capitalize text-center">{gameId.replace('-', ' ')}</h1>
                <p className="text-center text-muted-foreground">{gameDescriptions[gameId]}</p>
            </div>
            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <GameComponent />
            </React.Suspense>
            <Outlet />
        </div>
    );
};

export default GamePage;