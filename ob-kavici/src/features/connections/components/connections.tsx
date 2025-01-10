import React, { useState, useEffect } from "react";
import { Game, GameState } from "@/types/games";
import { ConnectionsCard } from "@/types/connections";
import AnimatedCard from "./animated-card";
import GameInfo from "./game-info";
import ActionButtons from "./action-buttons";
import { toast } from "@/lib/hooks/use-toast";
import SolvedCategory from "./solved-category";
import { difficultyColors } from "../config/difficulty-colors";

interface ConnectionsProps {
    game: Game;
    gameState: GameState | null; // Game state can be null for a new game
    onUpdateGameState: (updates: Partial<GameState>) => Promise<void>;
    isNewGame: boolean;
}

const Connections: React.FC<ConnectionsProps> = ({ game, gameState, onUpdateGameState, isNewGame }) => {
    const [cards, setCards] = useState<ConnectionsCard[]>([]);
    const [showCards, setShowCards] = useState(false);
    const [tempWrongGuesses, setTempWrongGuesses] = useState<string[]>([]);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    // Initialize cards from game data and shuffle
    useEffect(() => {
        if (!game.game_data) return;

        const flattenedCards = game.game_data.categories.flatMap((category) =>
            category.items.map((item) => ({
                content: item,
                category: category.name,
                difficulty: category.difficulty,
            }))
        );

        if (!cards.length) {
            setCards(flattenedCards.sort(() => Math.random() - 0.5));
        }

        // Initialize game state if it doesn't exist
        if (isNewGame) {
            onUpdateGameState({
                game_data: {
                    solvedCategories: [],
                    wrongGuesses: [],
                    previousGuesses: [],
                    attempts: 4,
                },
            });
        };

        gameState?.game_data?.solvedCategories.forEach((category) => {
            setCards((prev) => prev.filter((card) => card.category !== category.name));
        });

        setShowCards(true);
    }, [game?.game_data, gameState]);

    // Handle card selection
    const handleCardClick = (content: string) => {
        if (!gameState?.game_data || gameState.game_data.attempts <= 0) return;

        // Prevent adding more than 4 cards unless deselecting
        if (selectedCards.length >= 4 && !selectedCards.includes(content)) return;

        const updatedSelectedCards = selectedCards.includes(content)
            ? selectedCards.filter((card) => card !== content)
            : [...selectedCards, content];

        setSelectedCards(updatedSelectedCards);
    };

    // Validate the selected cards and check the guess
    const checkSelection = () => {
        if (!gameState?.game_data) return;
        if (gameState.game_completed) return;

        const { solvedCategories, attempts, previousGuesses, wrongGuesses } = gameState.game_data;

        if (selectedCards.length !== 4 || attempts <= 0) return;

        const currentGuessString = [...selectedCards].sort().join(",");

        if (previousGuesses.includes(currentGuessString)) {
            toast({ title: "Duplicate Guess", description: "This combination has already been guessed.", variant: "default" });
            clearSelection();
            return;
        }

        const selectedCategory = cards.find((card) => card.content === selectedCards[0])?.category;

        if (selectedCards.every((content) => cards.find((card) => card.content === content)?.category === selectedCategory)) {
            const solvedCategory = game.game_data.categories.find((cat) => cat.name === selectedCategory);
            if (solvedCategory) {
                const newSolvedCategories = [...solvedCategories, solvedCategory];
                const isGameWon = newSolvedCategories.length === game.game_data.categories.length;

                onUpdateGameState({
                    game_completed: isGameWon,
                    game_won: isGameWon,
                    game_data: {
                        ...gameState.game_data,
                        solvedCategories: newSolvedCategories,
                        previousGuesses: [...previousGuesses, currentGuessString],
                    },
                });

                setCards((prev) => prev.filter((card) => card.category !== selectedCategory));
                clearSelection();
            }
        } else {
            const remainingAttempts = attempts - 1;

            onUpdateGameState({
                game_completed: remainingAttempts === 0,
                game_won: false,
                ended_at: remainingAttempts === 0 ? new Date() : null,
                game_data: {
                    ...gameState.game_data,
                    attempts: remainingAttempts,
                    wrongGuesses: [...wrongGuesses, currentGuessString],
                    previousGuesses: [...previousGuesses, currentGuessString],
                },
            });

            setTempWrongGuesses(selectedCards);
            setTimeout(() => clearSelection(), 1000);
        }
    };

    // Clear selected cards
    const clearSelection = () => {
        setSelectedCards([]);
        setTempWrongGuesses([]);
    };

    // Shuffle the cards
    const shuffleCards = () => {
        setCards((prev) => prev.sort(() => Math.random() - 0.5));
        clearSelection();
    };

    if (!gameState?.game_data) return null;

    return (
        <>
            {gameState?.game_completed ? (
                <div className="text-center mt-6">
                    {gameState?.game_won ? (
                        <h1 className="text-2xl mb-4">Lepa igra! 🎉</h1>
                    ) : (
                        <h1 className="text-2xl mb-4">Več sreče jutri 🥲</h1>
                    )}
                    {game.game_data.categories.map((category) => (
                        <SolvedCategory
                            key={category.name}
                            category={category.name}
                            cards={category.items}
                            difficultyColor={difficultyColors[category.difficulty]}
                        />
                    ))}
                </div>
            ) : (
                <div className="container mx-auto max-w-2xl">
                    <GameInfo attempts={gameState.game_data.attempts} solvedCategories={gameState.game_data.solvedCategories} />
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {showCards &&
                            cards.map((card) => (
                                <AnimatedCard
                                    key={card.content}
                                    card={card}
                                    isSelected={selectedCards.includes(card.content)}
                                    onClick={() => handleCardClick(card.content)}
                                    isWrong={tempWrongGuesses.includes(card.content)}
                                />
                            ))}
                    </div>
                    <ActionButtons
                        onShuffle={shuffleCards}
                        onClear={clearSelection}
                        onSubmit={checkSelection}
                        isSubmitDisabled={selectedCards.length !== 4}
                        gameOver={gameState.game_data.attempts === 0}
                    />
                </div>
            )}
        </>
    );
};

export default Connections;
