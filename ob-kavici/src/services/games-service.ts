import axios, { AxiosInstance } from 'axios';

class GamesService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/games', // Replace with your API base URL
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async getGameTypes() {
        try {
            const response = await this.axiosInstance.get('/game-types');
            return response.data;
        } catch (error) {
            console.error('Error fetching game types:', error);
            throw error;
        }
    }

    public async getGames() {
        try {
            const response = await this.axiosInstance.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }

    public async getGamesByType(gameType: string) {
        try {
            const response = await this.axiosInstance.get(`/${gameType}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching games of type ${gameType}:`, error);
            throw error;
        }
    }

    public async getGameDataById(gameType: string, gameId: string) {
        try {
            const response = await this.axiosInstance.get(`/${gameType}/${gameId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching game with ID ${gameId}:`, error);
            throw error;
        }
    }

    public async getDailyGame(gameType: string) {
        try {
            const response = await this.axiosInstance.get(`/${gameType}/daily`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching daily game of type ${gameType}:`, error);
            throw error;
        }
    }

    // public async createGame(gameData: any) {
    //     try {
    //         const response = await this.axiosInstance.post('/games', gameData);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error creating game:', error);
    //         throw error;
    //     }
    // }

    // public async updateGame(gameId: string, gameData: any) {
    //     try {
    //         const response = await this.axiosInstance.put(`/games/${gameId}`, gameData);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Error updating game with ID ${gameId}:`, error);
    //         throw error;
    //     }
    // }

    // public async deleteGame(gameId: string) {
    //     try {
    //         const response = await this.axiosInstance.delete(`/games/${gameId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Error deleting game with ID ${gameId}:`, error);
    //         throw error;
    //     }
    // }
}

export default new GamesService();