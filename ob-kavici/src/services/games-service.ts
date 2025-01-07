import axios, { AxiosInstance } from 'axios';
import { Game, GameState, GameType } from '@/types/games';
import { ConnectionsGameState, ConnectionsGameData } from '@/types/connections';
import { getJwt } from './auth-service';

class GamesService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: `${import.meta.env.VITE_GAMES_SERVICE_URL}/games`,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    private async withAuthHeader() {
        const token = await getJwt();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    private saveToLocalStorage(gameId: number, gameState: GameState) {
        const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
        localData[gameId] = gameState;
        localStorage.setItem('gameStates', JSON.stringify(localData));
    }

    private loadFromLocalStorage(gameId: number): GameState | null {
        const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
        return localData[gameId] || null;
    }

    private clearLocalStorage(gameId: number) {
        const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
        delete localData[gameId];
        localStorage.setItem('gameStates', JSON.stringify(localData));
    }

    public async getGameTypes(gameTypeId?: string): Promise<GameType[] | GameType> {
        const response = await this.axiosInstance.get('/game-types', {
            params: gameTypeId ? { game_type_id: gameTypeId } : undefined,
        });
        return response.data;
    }

    public async getDailyGame(gameType: string): Promise<Game> {
        const response = await this.axiosInstance.get(`/${gameType}/daily`);
        return response.data;
    }

    public async getGameState(gameId: number): Promise<GameState | null> {
        const userId = await this.getUserId();

        if (userId) {
            const headers = await this.withAuthHeader();
            const response = await this.axiosInstance.get('/state', {
                params: { user_id: userId, game_id: gameId },
                headers,
            });
            return response.data;
        } else {
            return this.loadFromLocalStorage(gameId);
        }
    }

    public async getOrInitializeGameState(game: Game): Promise<GameState> {
        const existingState = await this.getGameState(game.id);

        if (existingState) {
            return existingState;
        }

        const newState: GameState = {
            game_id: game.id,
            user_id: (await this.getUserId()) || 'anonymous',
            started_at: new Date(),
            game_completed: false,
            game_won: false,
        };

        if (await this.getUserId()) {
            const headers = await this.withAuthHeader();
            const response = await this.axiosInstance.post('/start', newState, { headers });
            return response.data;
        } else {
            this.saveToLocalStorage(game.id, newState);
            return newState;
        }
    }

    public async updateGameState(gameState: GameState): Promise<void> {
        const userId = await this.getUserId();
        const headers = await this.withAuthHeader();

        if (userId) {
            // Update state for authenticated users
            await this.axiosInstance.post('/update', gameState, { headers });
        } else {
            // Update state for unauthenticated users
            this.saveToLocalStorage(gameState.game_id, gameState);
        }
    }

    public async endGame(gameId: number, gameWon: boolean): Promise<GameState> {
        const userId = await this.getUserId();
        const headers = await this.withAuthHeader();

        if (userId) {
            // End game for authenticated users
            const response = await this.axiosInstance.post('/end', {
                game_id: gameId,
                game_won: gameWon,
            }, { headers });
            return response.data;
        } else {
            // End game for unauthenticated users
            const localState = this.loadFromLocalStorage(gameId);
            if (!localState) throw new Error('Game state not found in localStorage.');

            const updatedState = {
                ...localState,
                ended_at: new Date(),
                game_completed: true,
                game_won: gameWon,
            };
            this.saveToLocalStorage(gameId, updatedState);
            return updatedState;
        }
    }

    // TODO move this method to a separate service
    // TODO also check the way how the user ID is obtained
    private async getUserId(): Promise<string | null> {
        const token = await getJwt();
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || null; // Assuming `sub` contains the user ID
    }
}

export default new GamesService();
