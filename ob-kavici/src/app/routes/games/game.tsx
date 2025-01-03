import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamesService from "@/services/games-service";
import { GameLayout } from "@/components/layouts/game-layout";
import Connections from "@/features/games/components/connections";
import LetterBoxed from "@/features/games/components/letter-boxed";
import SpellingBee from "@/features/games/components/spelling-bee";
import Strands from "@/features/games/components/strands";
import NotFound from "@/components/utils/not-found";
import { gameTypes } from "@/features/games/config/game-types";

const gameComponents: Record<string, React.FC<any>> = {
    "connections": Connections,
    "letter-boxed": LetterBoxed,
    "spelling-bee": SpellingBee,
    "strands": Strands,
};

const GameRoute: React.FC = () => {
    const { gameTypeId } = useParams<{ gameTypeId: string }>();
    const [game, setGame] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!gameTypeId) return;

        const fetchGame = async () => {
            try {
                const dailyGame = await GamesService.getDailyGame(gameTypeId);
                setGame(dailyGame);
            } catch {
                setGame(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameTypeId]);

    if (!gameTypeId) {
        return <NotFound />;
    }

    const SelectedGameComponent = gameComponents[gameTypeId];
    const gameType = gameTypes.find((type) => type.id === gameTypeId);

    return (
        <GameLayout game={game} gameTypeTitle={gameType?.title || ""}>
            {loading && <div>Nalaganje...</div>}
            {!loading && game && SelectedGameComponent && <SelectedGameComponent {...game} />}
            {!loading && !game && <NotFound />}
        </GameLayout>
    );
};

export default GameRoute;
