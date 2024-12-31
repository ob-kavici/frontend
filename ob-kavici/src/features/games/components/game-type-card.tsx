import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GameType } from '@/types/games';

import ConnectionsIcon from '@/assets/icons/connections.svg';
import LetterBoxedIcon from '@/assets/icons/letter-boxed.svg';
import SpellingBeeIcon from '@/assets/icons/spelling-bee.svg';
import StrandsIcon from '@/assets/icons/strands.svg';
import { paths } from '@/config/paths';

const icons: Record<string, string> = {
    'connections': ConnectionsIcon,
    'letter-boxed': LetterBoxedIcon,
    'spelling-bee': SpellingBeeIcon,
    'strands': StrandsIcon,
};

interface GameTypeCardProps {
    gameType: GameType
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({ gameType }) => {
    const cardContent = (
        <Card className="flex flex-col items-center">
            <CardHeader className="text-center">
                <CardTitle>{gameType.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <img src={icons[gameType.id]} alt={`${gameType.id} icon`} className="w-16 h-16" />
            </CardContent>
            <CardFooter>
                {gameType.is_active ? (
                    <Link to={paths.games.gameHome.getHref(gameType.id)}>
                        <Button variant="outline">Play</Button>
                    </Link>
                ) : (
                    <Button variant="outline" disabled>Coming soon</Button>
                )}
            </CardFooter>
        </Card>
    );

    return cardContent;
};

export default GameTypeCard;