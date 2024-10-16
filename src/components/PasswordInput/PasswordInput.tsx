import "./PasswordInput.css";
import { memo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../icons";

const PasswordInput = memo((props: React.HTMLProps<HTMLInputElement>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="password-input">
      <input type={passwordVisible ? "text" : "password"} {...props} />
      <button
        className="password-input-toggle"
        aria-label={passwordVisible ? "Hide password" : "Show password"}
        type="button"
        onClick={togglePasswordVisible}
      >
        {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
});

export default PasswordInput;
