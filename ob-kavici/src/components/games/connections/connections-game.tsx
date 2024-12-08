'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import shuffle from 'lodash/shuffle'
import { Shuffle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

type Card = {
    id: number
    content: string
    category: string
    color: string
}

const initialCards: Card[] = [
    { id: 1, content: 'BELT', category: 'PUNCH', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 2, content: 'BLOW', category: 'PUNCH', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 3, content: 'SOCK', category: 'PUNCH', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 4, content: 'SLUG', category: 'PUNCH', color: 'bg-yellow-500 dark:bg-yellow-600' },

    { id: 5, content: 'SANDWICH', category: 'CRAM', color: 'bg-green-500 dark:bg-green-600' },
    { id: 6, content: 'SHOEHORN', category: 'CRAM', color: 'bg-green-500 dark:bg-green-600' },
    { id: 7, content: 'SQUEEZE', category: 'CRAM', color: 'bg-green-500 dark:bg-green-600' },
    { id: 8, content: 'WEDGE', category: 'CRAM', color: 'bg-green-500 dark:bg-green-600' },

    { id: 9, content: 'CATERPILLAR', category: 'COMPANIES NAMED AFTER ANIMALS', color: 'bg-blue-400 dark:bg-blue-500' },
    { id: 10, content: 'DOVE', category: 'COMPANIES NAMED AFTER ANIMALS', color: 'bg-blue-400 dark:bg-blue-500' },
    { id: 11, content: 'GREYHOUND', category: 'COMPANIES NAMED AFTER ANIMALS', color: 'bg-blue-400 dark:bg-blue-500' },
    { id: 12, content: 'PUMA', category: 'COMPANIES NAMED AFTER ANIMALS', color: 'bg-blue-400 dark:bg-blue-500' },

    { id: 13, content: 'INDY', category: 'HOMOPHONES OF MUSIC GENRES', color: 'bg-purple-400 dark:bg-purple-500' },
    { id: 14, content: 'METTLE', category: 'HOMOPHONES OF MUSIC GENRES', color: 'bg-purple-400 dark:bg-purple-500' },
    { id: 15, content: 'SEOUL', category: 'HOMOPHONES OF MUSIC GENRES', color: 'bg-purple-400 dark:bg-purple-500' },
    { id: 16, content: 'WRAP', category: 'HOMOPHONES OF MUSIC GENRES', color: 'bg-purple-400 dark:bg-purple-500' },
]

const ConnectionsGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [solvedCategories, setSolvedCategories] = useState<string[]>([])
    const [attempts, setAttempts] = useState(1)
    const [gameOver, setGameOver] = useState(false)
    const [wrongGuess, setWrongGuess] = useState<number[]>([])
    const [previousGuesses, setPreviousGuesses] = useState<Set<string>>(new Set())
    const [showAllCategories, setShowAllCategories] = useState(false)

    const currentGuessString = useMemo(() => {
        return [...selectedCards].sort().join(',')
    }, [selectedCards])

    useEffect(() => {
        setCards(shuffle(initialCards))
    }, [])

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
                title: 'Already guessed',
                description: 'You have already tried this combination',
                variant: 'default'
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
                    } ${wrongGuess.includes(card.id) ? 'animate-shake ring-2 ring-destructive' : ''}`}
                onClick={() => handleCardClick(card.id)}
            >
                <span className="font-semibold text-sm sm:text-base">{card.content}</span>
            </Card>
        </motion.div>
    )

    const renderCategories = () => {
        const allCategories = [...new Set(initialCards.map(card => card.category))]
        return allCategories.map((category) => (
            <motion.div
                key={category}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 overflow-hidden"
            >
                <div className={`rounded-lg p-4 ${initialCards.find(card => card.category === category)?.color}`}>
                    <h3 className="font-bold text-center mb-1">{category}</h3>
                    <p className="text-center text-sm">
                        {initialCards
                            .filter(card => card.category === category)
                            .map(card => card.content)
                            .join(', ')}
                    </p>
                </div>
            </motion.div>
        ))
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            {!showAllCategories && (
                <>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                {attempts} {attempts === 1 ? 'attempt' : 'attempts'} remaining
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${(attempts / 4) * 100}%` }}
                            />
                        </div>
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
                                <div className={`rounded-lg p-4 ${initialCards.find(card => card.category === category)?.color}`}>
                                    <h3 className="font-bold text-center mb-1">{category}</h3>
                                    <p className="text-center text-sm">
                                        {initialCards
                                            .filter(card => card.category === category)
                                            .map(card => card.content)
                                            .join(', ')}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                        <AnimatePresence>
                            {cards.map((card) => renderCard(card))}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-4 mb-6">
                        <Button onClick={shuffleCards} variant="outline" disabled={gameOver}>
                            <Shuffle className="w-4 h-4 mr-2" />
                            Shuffle
                        </Button>
                        <Button onClick={() => setSelectedCards([])} variant="outline" disabled={gameOver}>
                            Clear
                        </Button>
                        <Button
                            onClick={checkSelection}
                            disabled={selectedCards.length !== 4 || gameOver}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            )}

            {showAllCategories && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h1 className="text-2xl mb-4 text-center">Unfortunate 🥲</h1>
                    {renderCategories()}
                    <div className="text-center mt-6">
                        <Button variant="outline" className="mx-auto">
                            View Statistics
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default ConnectionsGame

