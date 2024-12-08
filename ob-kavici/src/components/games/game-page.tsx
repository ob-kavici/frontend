import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NotFound from '../utils/not-found';
import { Skeleton } from '@/components/ui/skeleton';
import gamesService from '@/services/games-service';

const gameComponents: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
    'connections': React.lazy(() => import('./connections/connections-game')),
    'letter-boxed': React.lazy(() => import('./letter-boxed/letter-boxed-game')),
};

const gameDescriptions: Record<string, string> = {
    'connections': 'Create four groups of four!',
    'letter-boxed': 'Find words in a box of letters',
};

const GamePage = () => {
    const [gameMetadata, setGameMetadata] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { gameType } = useParams<{ gameType: string }>();

    useEffect(() => {
        console.log("GameMetadata updated: ", gameMetadata);
      }, [gameMetadata]);

    useEffect(() => {
        console.log("GameType: ", gameType);
        if (gameType) {
            setLoading(true);
            gamesService.getDailyGame(gameType)
                .then((game: any) => {
                    console.log("Game: ", game);
                    setGameMetadata(game);
                    console.log("GameMetadata: ", gameMetadata);
                })
                .catch((error) => {
                    console.error("Error fetching game data:", error);
                })
                .finally(() => {
                    console.log("GameMetadata: ", gameMetadata);
                    setLoading(false);
                });
        }
    }, [gameType]);

    if (!gameType || !gameComponents[gameType]) {
        return <NotFound />;
    }

    const GameComponent = gameComponents[gameType];

    return (
        <div className="container mx-auto p-4">
            <div>
                <h1 className="text-3xl capitalize text-center">{gameType.replace('-', ' ')}</h1>
                <p className="text-center text-muted-foreground">{gameDescriptions[gameType]}</p>

                {loading ? (
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                ) : (
                    gameMetadata && <p className="text-center">Game Date: {gameMetadata?.game_date}</p>
                )}
            </div>

            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
                {loading ? (
                    <Skeleton className="h-64 w-full" />
                ) : (
                    gameMetadata && <GameComponent gameId={gameMetadata?.id} />
                )}
            </React.Suspense>

            <Outlet />
        </div>
    );
};

export default GamePage;
