import { GameType } from "@/types/games";
import gamesService from "../../services/games-service";

test("getGameTypes returns game data", async () => {
    const mockGameTypes: GameType[] = [
        {
            id: "1",
            title: "Game 1",
            description: "Description 1",
            is_active: false
        },
        {
            id: "2",
            title: "Game 2",
            description: "Description 2",
            is_active: true
        },
    ];

    // Mock the fetch API
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockGameTypes),
        })
    ) as jest.Mock;

    const gameTypes = await gamesService.getGameTypes();
    expect(gameTypes).toEqual(mockGameTypes);
    expect(fetch).toHaveBeenCalledTimes(1);
});
