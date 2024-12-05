import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NotFound from '../utils/not-found';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const gameComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
    'connections': React.lazy(() => import('./connections/connections-game')),
    'letter-boxed': React.lazy(() => import('./letter-boxed/letter-boxed-game')),
};

const GamePage = () => {
    const { gameId } = useParams<{ gameId: string }>();

    if (!gameId || !gameComponents[gameId]) {
        return <NotFound />;
    }

    const GameComponent = gameComponents[gameId];

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-4xl capitalize mt-2">{gameId.replace('-', ' ')}</h1>
            </div>
            <Card className="mb-4">
                <CardHeader />
                <CardContent>
                    <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
                        <GameComponent />
                    </React.Suspense>
                </CardContent>
            </Card>
            <Outlet />
        </div>
    );
};

export default GamePage;