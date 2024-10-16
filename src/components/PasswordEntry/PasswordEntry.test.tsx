import { render, screen, fireEvent } from "@testing-library/react";
import PasswordEntry from "./PasswordEntry";

// Mock the icon components
jest.mock("../../icons", () => ({
  CircleCheckFilledIcon: () => (
    <span data-testid="filled-icon">FilledIcon</span>
  ),
  CircleCheckEmptyIcon: () => <span data-testid="empty-icon">EmptyIcon</span>,
  EyeIcon: () => <span>EyeIcon</span>,
  EyeSlashIcon: () => <span>EyeSlashIcon</span>,
}));

describe("PasswordEntry Component", () => {
  test("renders the form fields correctly", () => {
    render(<PasswordEntry />);

    // Check for the presence of password and confirm password fields
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button", { name: "Validate" });

    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("displays password validation requirements when submitted with an invalid password", () => {
    render(<PasswordEntry />);

    const submitButton = screen.getByRole("button", { name: "Validate" });

    // Submit the form without entering anything
    fireEvent.click(submitButton);

    // Validation messages should be displayed
    expect(
      screen.getByText("Must be at least 6 characters long")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one uppercase letter (A-Z)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one lowercase letter (a-z)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one number (0-9)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one special character")
    ).toBeInTheDocument();
    expect(screen.getByText("Passwords must match")).toBeInTheDocument();

    // Check that CircleCheckEmptyIcon is rendered (requirement not met)
    const emptyIcons = screen.getAllByTestId("empty-icon");
    expect(emptyIcons.length).toBeGreaterThan(0); // Ensure the empty icons are displayed for invalid requirements
  });

  test("validates the password successfully when all conditions are met", () => {
    render(<PasswordEntry />);

    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button", { name: "Validate" });

    // Simulate entering a valid password and confirming it
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Expect the success message to appear
    expect(
      screen.getByText("Your password looks great! All requirements are met.")
    ).toBeInTheDocument();

    // Check that CircleCheckFilledIcon is rendered for all requirements
    const filledIcon = screen.queryByTestId("filled-icon");
    expect(filledIcon).not.toBeInTheDocument(); // Ensure the filled icons are displayed for valid requirements
  });

  test("shows validation errors when password doesn't meet the criteria", () => {
    render(<PasswordEntry />);

    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button", { name: "Validate" });

    // Simulate entering an invalid password and mismatched confirm password
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pass" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Expect validation messages to be shown
    expect(
      screen.getByText("Must be at least 6 characters long")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one uppercase letter (A-Z)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one lowercase letter (a-z)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one number (0-9)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must include at least one special character")
    ).toBeInTheDocument();
    expect(screen.getByText("Passwords must match")).toBeInTheDocument();

    // Check that CircleCheckEmptyIcon is rendered for all invalid requirements
    const emptyIcons = screen.getAllByTestId("empty-icon");
    expect(emptyIcons.length).toBeGreaterThan(0); // Ensure the empty icons are displayed for invalid requirements
  });

  test("validates the passwords match", () => {
    render(<PasswordEntry />);

    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button", { name: "Validate" });

    // Simulate entering valid password but mismatched confirmation password
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password2!" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Expect error message for password mismatch
    expect(screen.getByText("Passwords must match")).toBeInTheDocument();

    // Ensure CircleCheckEmptyIcon is rendered for password mismatch
    const emptyIcon = screen.getByTestId("empty-icon");
    expect(emptyIcon).toBeInTheDocument();
  });
});
