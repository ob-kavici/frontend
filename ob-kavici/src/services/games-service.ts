import { Game, GameMetadata, GameType } from '@/types/games';
import axios, { AxiosInstance } from 'axios';

class GamesService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_GAMES_SERVICE_URL + '/games',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async getGameTypes(gameTypeId?: string): Promise<GameType[] | GameType> {
        try {
            const response = await this.axiosInstance.get('/game-types', {
                params: gameTypeId ? { "game_type_id": gameTypeId } : undefined,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getActiveGames(gameTypeId?: string): Promise<GameMetadata[]> {
        try {
            const response = await this.axiosInstance.get('/', {
                params: gameTypeId ? { "game_type_id": gameTypeId } : undefined,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDailyGame(gameType: string): Promise<Game> {
        try {
            const response = await this.axiosInstance.get(`/${gameType}/daily`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getGame(gameType: string, gameId: string): Promise<Game> {
        try {
            const response = await this.axiosInstance.get(`/${gameType}/${gameId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new GamesService();