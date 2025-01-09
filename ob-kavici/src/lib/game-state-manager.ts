import { GameState } from "@/types/games";

export class GameStateManager {
    private state: GameState;

    constructor(initialState: GameState) {
        this.state = initialState;
    }

    getState(): GameState {
        return this.state;
    }

    setState(newState: GameState): void {
        this.state = newState;
    }

    updateState(updates: Partial<GameState>): void {
        this.state = { ...this.state, ...updates };
    }

    resetState(initialState: GameState): void {
        this.state = initialState;
    }
}