export enum GameStatus {
    ACTIVE = "active",
    ARCHIVED = "archived",
    PENDING = "pending"
}

export interface GameType {
    id: string;
    title: string;
    description: string;
    is_active: boolean;
}

export interface GameMetadata {
    id: number;
    created_at: Date;
    status: GameStatus;
    editor_id?: string;
    stars: number;
    game_type_id: string;
    game_date?: Date;
}

export interface Game extends GameMetadata {
    game_data?: Record<string, any>;
}