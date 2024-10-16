import "./PasswordInput.css";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../icons";

const PasswordInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="password-input">
      <input type={passwordVisible ? "text" : "password"} {...props} />
      <button onClick={togglePasswordVisible}>
        {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
