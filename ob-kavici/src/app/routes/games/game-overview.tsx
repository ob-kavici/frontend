import { AppLayout } from "@/components/layouts/app-layout";
import GameHome from "@/features/games/components/game-home";


const GameOverviewRoute = () => {
    return (
        <AppLayout>
            <GameHome />
        </AppLayout>
    );
}

export default GameOverviewRoute;