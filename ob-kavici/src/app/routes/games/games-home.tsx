import Games from "@/features/games/components/games";
import { AppLayout } from "@/components/layouts/app-layout";


const GamesRoute = () => {
    return (
        <AppLayout>
            <Games />
        </AppLayout>
    );
}

export default GamesRoute;