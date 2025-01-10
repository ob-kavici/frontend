import axios, { AxiosInstance } from 'axios';
import { Game, GameState, GameType } from '@/types/games';
import { getJwt, getRefreshToken } from './auth-service';

class GamesService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: `${import.meta.env.VITE_GAMES_SERVICE_URL}/games`,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Centralized method for generating headers with auth
    private async getAuthHeaders() {
        const jwt = await getJwt();
        const refreshToken = await getRefreshToken();

        if (!jwt || !refreshToken) {
            throw new Error('Missing authentication tokens.');
        }

        return {
            Authorization: `Bearer ${jwt}`,
            'x-refresh-token': refreshToken,
        };
    }

    private saveToLocalStorage(gameId: number, gameState: GameState) {
        const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
        const serializedGameState = {
            ...gameState,
            started_at: gameState.started_at ? new Date(gameState.started_at).toISOString() : null,
            ended_at: gameState.ended_at ? new Date(gameState.ended_at).toISOString() : null,
        };
        localData[gameId] = serializedGameState;
        localStorage.setItem('gameStates', JSON.stringify(localData));
    }

    private loadFromLocalStorage(gameId: number): GameState | null {
        const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
        const rawGameState = localData[gameId];
        if (!rawGameState) return null;

        // No conversion needed for ISO strings as they match `timestampz`
        return rawGameState;
    }

    // private clearLocalStorage(gameId: number) {
    //     const localData = JSON.parse(localStorage.getItem('gameStates') || '{}');
    //     delete localData[gameId];
    //     localStorage.setItem('gameStates', JSON.stringify(localData));
    // }

    public async getGameTypes(gameTypeId?: string): Promise<GameType[] | GameType> {
        const response = await this.axiosInstance.get('/game-types', {
            params: gameTypeId ? { game_type_id: gameTypeId } : undefined,
        });
        return response.data;
    }

    public async getDailyGame(gameType: string): Promise<Game> {
        const response = await this.axiosInstance.get(`/${gameType}/daily`,);
        return response.data;
    }

    public async getGameState(gameId: number): Promise<GameState | null> {
        const userId = await this.getUserId();

        if (userId) {
            const headers = await this.getAuthHeaders();
            const response = await this.axiosInstance.get('/state', {
                params: { user_id: userId, game_id: gameId },
                headers,
            });
            return response.data;
        } else {
            return this.loadFromLocalStorage(gameId);
        }
    }

    public async getOrInitializeGameState(gameId: number): Promise<GameState> {
        // TODO check
        const existingState = await this.getGameState(gameId);

        if (existingState) {
            return existingState;
        }

        const newState: GameState = {
            game_id: gameId,
            user_id: (await this.getUserId()) || 'anonymous',
            started_at: new Date(),
            ended_at: null,
            game_completed: false,
            game_won: false,
        };

        if (await this.getUserId()) {
            const headers = await this.getAuthHeaders();
            const response = await this.axiosInstance.post('/state', newState, { headers });
            return response.data;
        } else {
            this.saveToLocalStorage(gameId, newState);
            return newState;
        }
    }

    public async updateGameState(gameState: GameState): Promise<void> {
        if (gameState.user_id === 'anonymous') {
            this.saveToLocalStorage(gameState.game_id, gameState);
            return;
        }

        const headers = await this.getAuthHeaders();
        await this.axiosInstance.post('/state', gameState, { headers });
    }

    // Centralized method to get the user ID
    private async getUserId(): Promise<string | null> {
        const token = await getJwt();
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || null; // Assuming `sub` contains the user ID
    }
}

export default new GamesService();
