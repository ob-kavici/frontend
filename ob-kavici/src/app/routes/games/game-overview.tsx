import { GameLayout } from "@/components/layouts/game-layout";
import GameHome from "@/features/games/components/game-home";


const GameOverviewRoute = () => {
    return (
        <GameLayout>
            <GameHome />
        </GameLayout>
    );
}

export default GameOverviewRoute;