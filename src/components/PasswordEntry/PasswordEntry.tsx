import "./PasswordEntry.css";
import PasswordInput from "../PasswordInput";
import { useMemo, useState } from "react";
import PasswordRequirementItem from "../PasswordRequirementItem";
import {
  containsLowercase,
  containsNumber,
  containsSpecialCharacter,
  containsUppercase,
} from "../../utils/string";

const PasswordEntry = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsSubmitted(false);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setIsSubmitted(false);
  };

  const passwordRequirements = useMemo(
    () => [
      {
        isValid: password.length >= 6,
        label: "Must be at least 6 characters long",
      },
      {
        isValid: containsUppercase(password),
        label: "Must include at least one uppercase letter (A-Z)",
      },
      {
        isValid: containsLowercase(password),
        label: "Must include at least one lowercase letter (a-z)",
      },
      {
        isValid: containsNumber(password),
        label: "Must include at least one number (0-9)",
      },
      {
        isValid: containsSpecialCharacter(password),
        label: "Must include at least one special character",
      },
      {
        isValid: !!password && password === confirmPassword,
        label: "Passwords must match",
      },
    ],
    [confirmPassword, password]
  );

  const isPasswordValid = useMemo(
    () => passwordRequirements.every((requirement) => requirement.isValid),
    [passwordRequirements]
  );

  return (
    <form className="password-entry" onSubmit={handleSubmit}>
      <div className="password-entry-field">
        <label htmlFor="password">Password:</label>
        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="password-entry-field">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      {isSubmitted && (
        <div>
          {isPasswordValid ? (
            <span className="password-entry-validation--success">
              Your password looks great! All requirements are met.
            </span>
          ) : (
            passwordRequirements.map((requirement) => (
              <PasswordRequirementItem
                key={requirement.label}
                isValid={requirement.isValid}
                label={requirement.label}
              />
            ))
          )}
        </div>
      )}

      <button className="password-entry-submit-btn" type="submit">
        Validate
      </button>
    </form>
  );
};

export default PasswordEntry;
