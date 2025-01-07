export interface ConnectionsCategory {
    name: string;
    difficulty: number;
    items: string[];
}

export interface ConnectionsGameData {
    categories: ConnectionsCategory[];
}

export interface ConnectionsGameState {
    solvedCategories: ConnectionsCategory[];
    selectedCards: string[];
    wrongGuesses: string[];
    previousGuesses: string[];
    attempts: number;
}

export interface ConnectionsCard {
    content: string;
    category: string;
    difficulty: number;
}
