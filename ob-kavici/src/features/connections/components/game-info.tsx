import React from 'react';
import { Progress } from '@/components/ui/progress';
import SolvedCategory from './solved-category';
import { ConnectionsCategory } from '@/types/connections';
import { difficultyColors } from '../config/difficulty-colors';

interface GameInfoProps {
    attempts: number;
    solvedCategories: ConnectionsCategory[];
}

const GameInfo: React.FC<GameInfoProps> = ({ attempts, solvedCategories }) => (
    <div>
        <div className="mb-6">
            <div className="flex items-center justify-center mb-2">
                <span className="text-sm text-muted-foreground">
                    še {attempts} {attempts === 1 ? 'poskus' : attempts === 2 ? 'poskusa' : 'poskusi'}
                </span>
            </div>
            <Progress value={(attempts / 4) * 100} />
        </div>
        <div>
            {solvedCategories?.map((category) => (
                <SolvedCategory
                    key={category.name}
                    category={category.name}
                    cards={category.items}
                    difficultyColor={difficultyColors[category.difficulty]}
                />
            ))}
        </div>
    </div>
);

export default GameInfo;
