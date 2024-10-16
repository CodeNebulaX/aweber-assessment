import { memo } from "react";
import { CircleCheckEmptyIcon, CircleCheckFilledIcon } from "../../icons";
import "./PasswordRequirementItem.css";

const PasswordRequirementItem = memo(
  ({ isValid, label }: { isValid: boolean; label: string }) => {
    return (
      <div className="password-requirement-item">
        {isValid ? (
          <CircleCheckFilledIcon
            role="img"
            aria-label="Requirement met"
            fill="#4caf50"
          />
        ) : (
          <CircleCheckEmptyIcon
            role="img"
            aria-label="Requirement not met"
            fill="#d70040"
          />
        )}
        <span>{label}</span>
      </div>
    );
  }
);

export default PasswordRequirementItem;
