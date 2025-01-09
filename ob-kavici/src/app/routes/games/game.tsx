import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamesService from "@/services/games-service";
import { Game, GameState } from "@/types/games";
import Connections from "@/features/connections/components/connections";
import NotFound from "@/components/utils/not-found";
import { GameLayout } from "@/components/layouts/game-layout";
import { gameTypes } from "@/features/games/config/game-types";

const GameRoute: React.FC = () => {
    const { gameTypeId } = useParams<{ gameTypeId: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!gameTypeId || gameState) return;

        const fetchGame = async () => {
            try {
                const fetchedGame = await GamesService.getDailyGame(gameTypeId);
                setGame(fetchedGame);

                const fetchedGameState = await GamesService.getOrInitializeGameState(fetchedGame.id);
                setGameState(fetchedGameState);
            } catch {
                setGame(null);
                setGameState(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameTypeId]);


    const updateGameState = async (updatedState: Partial<GameState>) => {
        if (!gameState) return;

        setGameState((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                ...updatedState,
            };
        });

        await GamesService.updateGameState({
            ...gameState,
            ...updatedState,
        });
    };

    if (!gameTypeId || (!loading && !game)) {
        return <NotFound />;
    }

    return (
        <GameLayout game={game} gameTypeTitle={gameTypes.find((type) => type.id === gameTypeId)?.title || ""}>
            {loading && <div>Loading...</div>}
            {!loading && game && gameState && (
                <Connections
                    game={game}
                    gameState={gameState}
                    onUpdateGameState={updateGameState}
                    isNewGame={!gameState.game_data}
                />
            )}
        </GameLayout>
    );
};

export default GameRoute;
