import { render, screen } from "@testing-library/react";
import { Button } from "../../components/ui/button";

test("renders a button with text", () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("button has correct styling", () => {
  render(<Button className="btn-primary">Styled Button</Button>);
  const button = screen.getByText("Styled Button");
  expect(button).toHaveClass("btn-primary");
});
