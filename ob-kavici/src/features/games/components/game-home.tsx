import { useEffect, useState } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import NotFound from '@/components/utils/not-found';
import gamesService from '@/services/games-service';
import { GameMetadata, GameType } from '@/types/games';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GameTypeCard from '@/features/games/components/game-type-card';

const GameHome = () => {
    const [gameType, setGameType] = useState<GameType | null>(null);
    const [activeGames, setActiveGames] = useState<GameMetadata[]>([]);
    const [otherGameTypes, setOtherGameTypes] = useState<GameType[]>([]);
    const [selectedGameMetadata, setSelectedGameMetadata] = useState<GameMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(false);
    const [visibleGames, setVisibleGames] = useState(8); // Tracks the number of games visible
    const { gameTypeId } = useParams<{ gameTypeId: string }>();

    useEffect(() => {
        if (gameTypeId) {
            setLoading(true);
            setError(false);

            Promise.all([
                gamesService.getGameTypes(gameTypeId), // Fetch the current game type
                gamesService.getActiveGames(gameTypeId), // Fetch active games
                gamesService.getGameTypes(), // Fetch all other game types
            ])
                .then(([gameType, activeGames, allGameTypes]) => {
                    setGameType(gameType);
                    setActiveGames(activeGames);
                    setOtherGameTypes(allGameTypes.filter((type: GameType) => type.id !== gameTypeId)); // Exclude the current type
                })
                .catch((error) => {
                    console.error('Error fetching game data: ', error);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [gameTypeId]);

    const loadMoreGames = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleGames((prev) => prev + 8);
            setLoadingMore(false);
        }, 500); // Simulate loading delay
    };

    const handleSelectGame = (game: GameMetadata) => {
        setSelectedGameMetadata(game);
    };

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-destructive">Error loading game data. Please try again later.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Reload
                </Button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        );
    }

    if (!gameType) {
        return <NotFound />;
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            {/* Game Type Info Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold">{gameType.title}</h1>
                <p className="text-muted-foreground mt-2">{gameType.description}</p>
            </div>

            {/* Play Daily Game Section */}
            <div className="bg-muted p-8 rounded-lg shadow space-y-6">
                <h2 className="text-2xl font-semibold text-center">Play the Daily Game</h2>
                <p className="text-center text-sm text-muted-foreground">
                    Jump into the daily challenge and test your skills!
                </p>
                <div className="flex justify-center">
                    <Link to="daily">
                        <Button className="w-64 h-12">Play Daily Game</Button>
                    </Link>
                </div>
                <p className="text-center text-muted-foreground text-sm mt-2">Or pick another game from below...</p>
            </div>

            {/* Selected Game Metadata */}
            {selectedGameMetadata && (
                <div className="bg-secondary p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Selected Game</h3>
                    <p>ID: {selectedGameMetadata.id}</p>
                    <p>Status: {selectedGameMetadata.status}</p>
                    <p>Created: {new Date(selectedGameMetadata.created_at).toLocaleDateString()}</p>
                </div>
            )}

            {/* Active Games Grid */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Active Games</h2>
                {activeGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {activeGames.slice(0, visibleGames).map((game) => (
                            <Card
                                key={game.id}
                                className="hover:shadow-md transition-shadow"
                                onClick={() => handleSelectGame(game)}
                            >
                                <CardHeader>
                                    <CardTitle>{game.id}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Created on: {new Date(game.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Status: {game.status}</p>
                                    <Link to={`/games/${gameTypeId}/${game.id}`}>
                                        <Button className="mt-2 w-full" variant="outline">
                                            Play Game
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No active games available.</p>
                )}
                {visibleGames < activeGames.length && (
                    <div className="flex justify-center mt-4">
                        <Button onClick={loadMoreGames} disabled={loadingMore}>
                            {loadingMore ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Other Games Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Other Game Types</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {otherGameTypes.map((gameType) => (
                        <GameTypeCard key={gameType.id} gameType={gameType} />
                    ))}
                </div>
            </div>

            {/* Outlet for Dynamic Content */}
            <Outlet />
        </div>
    );
};

export default GameHome;
