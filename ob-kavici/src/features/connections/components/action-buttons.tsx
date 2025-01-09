import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

interface ActionButtonsProps {
    onShuffle: () => void;
    onClear: () => void;
    onSubmit: () => void;
    isSubmitDisabled: boolean;
    gameOver: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onShuffle,
    onClear,
    onSubmit,
    isSubmitDisabled,
    gameOver,
}) => (
    <div className="flex justify-center gap-4">
        <Button onClick={onShuffle} variant="outline" disabled={gameOver}>
            <Shuffle className="w-4 h-4 mr-2" />
            Premešaj
        </Button>
        <Button onClick={onClear} variant="outline" disabled={gameOver}>
            Počisti
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitDisabled}>
            Potrdi
        </Button>
    </div>
);

export default ActionButtons;
