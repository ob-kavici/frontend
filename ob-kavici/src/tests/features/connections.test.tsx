import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Connections from "../../features/connections/components/connections";
import { Game, GameState, GameStatus } from "@/types/games";

test("renders the connections component", () => {
  const mockGame: Game = {
      game_data: {
          categories: []
      },
      id: 0,
      created_at: new Date(),
      status: GameStatus.ACTIVE,
      stars: 0,
      game_type_id: ""
  };
  render(<Connections game={mockGame} gameState={null} onUpdateGameState={function (updates: Partial<GameState>): Promise<void> {
      throw new Error("Function not implemented.");
  } } isNewGame={false} />);
  expect(screen.getByText(/connections/i)).toBeInTheDocument();
});

test("renders a game category", () => {
  const mockGame: Game = {
      game_data: {
          categories: []
      },
      id: 0,
      created_at: new Date(),
      status: GameStatus.ACTIVE,
      stars: 0,
      game_type_id: ""
  };
  render(<Connections game={mockGame} gameState={null} onUpdateGameState={function (updates: Partial<GameState>): Promise<void> {
      throw new Error("Function not implemented.");
  } } isNewGame={false} />);
  expect(screen.getByText(/RASTLINE/i)).toBeInTheDocument(); // From the sample game data
});
