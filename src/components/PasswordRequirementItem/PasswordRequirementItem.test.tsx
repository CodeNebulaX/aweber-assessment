import { render, screen } from "@testing-library/react";
import PasswordRequirementItem from "./PasswordRequirementItem";

// Mock the icons
jest.mock("../../icons", () => ({
  CircleCheckFilledIcon: ({ fill }: { fill: string }) => (
    <span data-testid="filled-icon" style={{ color: fill }}>
      Filled Icon
    </span>
  ),
  CircleCheckEmptyIcon: ({ fill }: { fill: string }) => (
    <span data-testid="empty-icon" style={{ color: fill }}>
      Empty Icon
    </span>
  ),
}));

describe("PasswordRequirementItem component", () => {
  test("renders the filled icon and label when requirement is valid", () => {
    render(
      <PasswordRequirementItem
        isValid={true}
        label="At least 1 uppercase letter"
      />
    );

    // Check that the filled icon is rendered
    const filledIcon = screen.getByTestId("filled-icon");
    expect(filledIcon).toBeInTheDocument();
    expect(filledIcon).toHaveStyle("color: #4caf50");

    // Check that the label is rendered
    const label = screen.getByText("At least 1 uppercase letter");
    expect(label).toBeInTheDocument();
  });

  test("renders the empty icon and label when requirement is not valid", () => {
    render(
      <PasswordRequirementItem isValid={false} label="At least 1 number" />
    );

    // Check that the empty icon is rendered
    const emptyIcon = screen.getByTestId("empty-icon");
    expect(emptyIcon).toBeInTheDocument();
    expect(emptyIcon).toHaveStyle("color: #d70040");

    // Check that the label is rendered
    const label = screen.getByText("At least 1 number");
    expect(label).toBeInTheDocument();
  });

  test("displays the correct label regardless of validity", () => {
    const { rerender } = render(
      <PasswordRequirementItem
        isValid={true}
        label="At least 1 special character"
      />
    );

    // Check the label for valid case
    let label = screen.getByText("At least 1 special character");
    expect(label).toBeInTheDocument();

    // Re-render with invalid state and check the label again
    rerender(
      <PasswordRequirementItem
        isValid={false}
        label="At least 1 special character"
      />
    );
    label = screen.getByText("At least 1 special character");
    expect(label).toBeInTheDocument();
  });
});
