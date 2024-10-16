import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

// Mock the EyeIcon and EyeSlashIcon
jest.mock("../../icons", () => ({
  EyeIcon: () => <span>EyeIcon</span>,
  EyeSlashIcon: () => <span>EyeSlashIcon</span>,
}));

describe("PasswordInput component", () => {
  test("renders the password input correctly", () => {
    render(<PasswordInput role="textbox" />);

    // Ensure the input field is rendered
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();

    // Ensure the password is initially hidden (input type should be "password")
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("renders EyeIcon initially", () => {
    render(<PasswordInput />);

    // Check if EyeIcon is rendered initially (password hidden state)
    const eyeIcon = screen.getByText("EyeIcon");
    expect(eyeIcon).toBeInTheDocument();
  });

  test("toggles password visibility on button click", () => {
    render(<PasswordInput role="textbox" />);

    const inputElement = screen.getByRole("textbox");
    const toggleButton = screen.getByRole("button");

    // Initially, the password is hidden (input type should be "password")
    expect(inputElement).toHaveAttribute("type", "password");

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Now, the password should be visible (input type should change to "text")
    expect(inputElement).toHaveAttribute("type", "text");

    // The EyeSlashIcon should be visible now
    const eyeSlashIcon = screen.getByText("EyeSlashIcon");
    expect(eyeSlashIcon).toBeInTheDocument();

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Password should be hidden again (input type should change back to "password")
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("passes props to the input element", () => {
    render(<PasswordInput placeholder="Enter your password" />);

    // Check if the input element has the correct placeholder prop
    const inputElement = screen.getByPlaceholderText("Enter your password");
    expect(inputElement).toBeInTheDocument();
  });

  test("handles onChange event correctly", () => {
    const handleChange = jest.fn();
    render(<PasswordInput role="textbox" onChange={handleChange} />);

    const inputElement = screen.getByRole("textbox");

    // Simulate typing in the password input
    fireEvent.change(inputElement, { target: { value: "mypassword" } });

    // Ensure the onChange function is called
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue("mypassword");
  });
});
