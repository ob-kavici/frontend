import React, { useState, useEffect } from "react";
import { Game, GameState } from "@/types/games";
import { ConnectionsGameState, ConnectionsCard } from "@/types/connections";
import AnimatedCard from "./animated-card";
import GameInfo from "./game-info";
import ActionButtons from "./action-buttons";
import { toast } from "@/lib/hooks/use-toast";
import SolvedCategory from "./solved-category";
import { difficultyColors } from "../config/difficulty-colors";

interface ConnectionsProps {
    game: Game;
    gameState: GameState | null; // Game state can be null for a new game
    onUpdateGameState: (updates: Partial<GameState>) => void;
}

const Connections: React.FC<ConnectionsProps> = ({ game, gameState, onUpdateGameState }) => {
    const [cards, setCards] = useState<ConnectionsCard[]>([]);
    const [showCards, setShowCards] = useState(false);
    const [tempWrongGuesses, setTempWrongGuesses] = useState<string[]>([]);

    // Default game state
    const defaultConnectionsGameState: ConnectionsGameState = {
        solvedCategories: [],
        selectedCards: [],
        wrongGuesses: [],
        previousGuesses: [],
        attempts: 4,
    };

    // Initialize game state if it doesn't exist
    useEffect(() => {
        if (!gameState?.game_data) {
            onUpdateGameState({ game_data: defaultConnectionsGameState });
        }
    }, [gameState]);

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
            setCards(flattenedCards.sort(() => Math.random() - 0.5)); // Shuffle cards on load
        }

        // Remove cards of already solved categories
        gameState?.game_data?.solvedCategories.forEach((category) => {
            setCards((prev) => prev.filter((card) => card.category !== category.name));
        });

        setShowCards(true);
    }, [game?.game_data, gameState?.game_data]);

    // Handle card selection
    const handleCardClick = (content: string) => {
        if (!gameState?.game_data || gameState.game_data.attempts <= 0) return;

        const { selectedCards } = gameState.game_data;

        // Prevent adding more than 4 cards unless deselecting
        if (selectedCards.length >= 4 && !selectedCards.includes(content)) return;

        const updatedSelectedCards = selectedCards.includes(content)
            ? selectedCards.filter((card) => card !== content)
            : [...selectedCards, content];

        onUpdateGameState({
            game_data: { ...gameState.game_data, selectedCards: updatedSelectedCards },
        });
    };

    // Validate the selected cards and check the guess
    const checkSelection = () => {
        if (!gameState?.game_data) return;

        const { selectedCards, solvedCategories, attempts, previousGuesses } = gameState.game_data;

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
                const isGameWon = newSolvedCategories.length === game.game_data.categories.length; // Check if all categories are solved

                onUpdateGameState({
                    game_completed: isGameWon, // Game is over if all categories are solved
                    game_won: isGameWon, // Player wins if they solved all categories
                    game_data: {
                        ...gameState.game_data,
                        solvedCategories: newSolvedCategories,
                        selectedCards: [],
                        previousGuesses: [...previousGuesses, currentGuessString],
                    },
                });
            }
            setCards((prev) => prev.filter((card) => !selectedCards.includes(card.content)));
        } else {
            const remainingAttempts = attempts - 1;
            const isGameOver = remainingAttempts === 0; // Game over if no attempts are left

            onUpdateGameState({
                game_completed: isGameOver, // Mark game as over
                game_won: false, // Player loses if no attempts are left
                game_data: {
                    ...gameState.game_data,
                    attempts: remainingAttempts,
                    selectedCards: [],
                    wrongGuesses: selectedCards,
                    previousGuesses: [...previousGuesses, currentGuessString],
                },
            });

            setTempWrongGuesses(selectedCards);
            setTimeout(() => setTempWrongGuesses([]), 1000);
        }
    };


    // Clear selected cards
    const clearSelection = () => {
        if (!gameState?.game_data) return;
        onUpdateGameState({ game_data: { ...gameState.game_data, selectedCards: [] } });
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
                                    isSelected={gameState?.game_data?.selectedCards.includes(card.content)}
                                    onClick={() => handleCardClick(card.content)}
                                    isWrong={tempWrongGuesses.includes(card.content)}
                                />
                            ))}
                    </div>
                    <ActionButtons
                        onShuffle={shuffleCards}
                        onClear={clearSelection}
                        onSubmit={checkSelection}
                        isSubmitDisabled={gameState.game_data.selectedCards.length !== 4}
                        gameOver={gameState.game_data.attempts === 0}
                    />
                </div>
            )}
        </>
    );
};

export default Connections;
