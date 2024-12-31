import { GameType } from "@/types/games";

export const gameTypes: GameType[] = [
    {
        id: 'connections',
        title: 'Connections',
        description: 'Connect letters to make words',
        is_active: true
    },
    {
        id: 'letter-boxed',
        title: 'Letter Boxed',
        description: 'Find words in a box of letters',
        is_active: false
    },
    {
        id: 'strands',
        title: 'Strands',
        description: 'Connect words with shared letters',
        is_active: false
    },
    {
        id: 'spelling-bee',
        title: 'Spelling Bee',
        description: 'Make words using the provided letters',
        is_active: false
    },
]