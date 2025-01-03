'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import shuffle from 'lodash/shuffle'
import { Shuffle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Progress } from '@/components/ui/progress'
import { Game } from '@/types/games'

const difficultyColors: Record<number, string> = {
    0: 'bg-yellow-500 dark:bg-yellow-600',
    1: 'bg-green-500 dark:bg-green-600',
    2: 'bg-blue-400 dark:bg-blue-500',
    3: 'bg-purple-400 dark:bg-purple-500',
}

type Card = {
    id: number
    content: string
    category: string
    difficulty: number
}

const Connections: React.FC<Game> = ({ game_data }) => {
    const [gameData, setGameData] = useState<Card[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [solvedCategories, setSolvedCategories] = useState<string[]>([])
    const [attempts, setAttempts] = useState(4)
    const [gameOver, setGameOver] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [wrongGuess, setWrongGuess] = useState<number[]>([])
    const [previousGuesses, setPreviousGuesses] = useState<Set<string>>(new Set())
    const [showAllCategories, setShowAllCategories] = useState(false)

    useEffect(() => {
        if (game_data) {
            setGameData(game_data.data)
        }
    }, [game_data])

    const currentGuessString = useMemo(() => {
        return [...selectedCards].sort().join(',')
    }, [selectedCards])

    useEffect(() => {
        setCards(shuffle(gameData))
    }, [gameData])

    const handleCardClick = (id: number) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((cardId) => cardId !== id))
        } else if (selectedCards.length < 4) {
            setSelectedCards([...selectedCards, id])
        }
    }

    const checkSelection = () => {
        if (selectedCards.length !== 4) return

        if (previousGuesses.has(currentGuessString)) {
            toast({
                title: 'Ponavljaš se...',
                description: 'Ta kombinacija kartic je že bila izbrana',
                variant: 'default',
            })
            return
        }

        setPreviousGuesses(new Set([...previousGuesses, currentGuessString]))

        const selectedCategory = cards.find((card) => card.id === selectedCards[0])?.category

        if (selectedCards.every((id) => cards.find((card) => card.id === id)?.category === selectedCategory)) {
            setSolvedCategories([...solvedCategories, selectedCategory!])
            setCards(cards.filter((card) => !selectedCards.includes(card.id)))
            setSelectedCards([])

            if (solvedCategories.length === 3) {
                setGameOver(true)
                setGameWon(true)
                setShowAllCategories(true)
            }
        } else {
            setWrongGuess(selectedCards)
            setTimeout(() => setWrongGuess([]), 1000)

            setAttempts(attempts - 1)
            if (attempts === 1) {
                setGameOver(true)
                setShowAllCategories(true)
            }
            setSelectedCards([])
        }
    }

    const shuffleCards = () => {
        setCards(shuffle(cards))
        setSelectedCards([])
    }

    const renderCard = (card: Card) => (
        <motion.div
            key={card.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                className={`h-16 flex justify-center items-center cursor-pointer transition-all ${selectedCards.includes(card.id) ? 'ring-2 ring-primary bg-accent' : ''
                    } ${wrongGuess.includes(card.id) ? 'animate-shake ring-2 ring-destructive' : ''
                    } hover:bg-gray-200 dark:hover:bg-gray-700 text-center`}
                onClick={() => handleCardClick(card.id)}
            >
                <span className="font-semibold text-sm sm:text-base break-words">{card.content}</span>
            </Card>
        </motion.div>
    )

    const renderCategories = () => {
        const allCategories = [...new Set(gameData.map((card) => card.category))]
        return allCategories.map((category) => (
            <motion.div
                key={category}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 overflow-hidden"
            >
                <div className={`rounded-lg p-4 ${difficultyColors[gameData.find((card) => card.category === category)?.difficulty ?? 0]}`}>
                    <h3 className="font-bold text-center mb-1">{category}</h3>
                    <p className="text-center text-sm">
                        {gameData
                            .filter((card) => card.category === category)
                            .map((card) => card.content)
                            .join(', ')}
                    </p>
                </div>
            </motion.div>
        ))
    }

    return (
        <div className="container mx-auto max-w-2xl">
            {!showAllCategories && (
                <>
                    <div className="mb-6">
                        <div className="flex items-center justify-center mb-2">
                            <span className="text-sm text-muted-foreground">
                                še {attempts} {attempts === 1 ? 'poskus' : 'poskusi'}
                            </span>
                        </div>
                        <Progress value={(attempts / 4) * 100} />
                    </div>

                    <AnimatePresence>
                        {solvedCategories.map((category) => (
                            <motion.div
                                key={category}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-2 overflow-hidden"
                            >
                                <div
                                    className={`rounded-lg p-4 ${difficultyColors[gameData?.find((card) => card.category === category)?.difficulty ?? 0]
                                        }`}
                                >
                                    <h3 className="font-bold text-center mb-1">{category}</h3>
                                    <p className="text-center text-sm">
                                        {gameData
                                            .filter((card) => card.category === category)
                                            .map((card) => card.content)
                                            .join(', ')}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                        <AnimatePresence>{cards.map((card) => renderCard(card))}</AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button onClick={shuffleCards} variant="outline" disabled={gameOver}>
                            <Shuffle className="w-4 h-4 mr-2" />
                            Premešaj
                        </Button>
                        <Button onClick={() => setSelectedCards([])} variant="outline" disabled={gameOver}>
                            Počisti
                        </Button>
                        <Button
                            onClick={checkSelection}
                            disabled={selectedCards.length !== 4 || gameOver}
                        >
                            Potrdi
                        </Button>
                    </div>
                </>
            )}

            {showAllCategories && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {gameWon ? (
                        <h1 className="text-2xl mb-4 text-center">Lepa igra! 🎉</h1>
                    ) : (
                        <h1 className="text-2xl mb-4 text-center">Več sreče jutri 🥲</h1>
                    )}
                    {renderCategories()}
                    <div className="text-center mt-6">
                        <Button variant="outline" className="mx-auto">
                            Statistika
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Connections
