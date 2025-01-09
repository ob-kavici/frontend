import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '@/components/utils/not-found';
import { gameTypes } from '@/features/games/config/game-types';
import { Button } from '@/components/ui/button';
import ConnectionsIcon from '@/assets/icons/connections.svg';
import LetterBoxedIcon from '@/assets/icons/letter-boxed.svg';
import SpellingBeeIcon from '@/assets/icons/spelling-bee.svg';
import StrandsIcon from '@/assets/icons/strands.svg';

const icons: Record<string, string> = {
    "connections": ConnectionsIcon,
    'letter-boxed': LetterBoxedIcon,
    'spelling-bee': SpellingBeeIcon,
    "strands": StrandsIcon,
};

const GameHome: React.FC = () => {
    const { gameTypeId } = useParams<{ gameTypeId: string }>();

    const gameType = gameTypes.find((type) => type.id === gameTypeId);

    if (!gameType) {
        return <NotFound />;
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex justify-center">
                <img
                    src={icons[gameType.id]}
                    alt={`${gameType.title} icon`}
                    className="h-24 w-24"
                />
            </div>

            <div className="text-center">
                <h1 className="text-4xl font-bold">{gameType.title}</h1>
                <p className="text-muted-foreground mt-2">{gameType.description}</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
                {gameType.is_active ? (
                    <Link to="daily">
                        <Button className="w-64 h-12">Igraj</Button>
                    </Link>
                ) : (
                    <p className="text-muted-foreground pb-5">Trenutno ni na voljo</p>
                )}
                <Link to="/games">
                    <Button className="w-64 h-12" variant="outline">Nazaj na igre</Button>
                </Link>
            </div>
        </div>
    );
};

export default GameHome;
