import { CircleCheckEmptyIcon, CircleCheckFilledIcon } from "../../icons";
import "./PasswordRequirementItem.css";

const PasswordRequirementItem = ({
  isValid,
  label,
}: {
  isValid: boolean;
  label: string;
}) => {
  return (
    <div className="password-requirement-item">
      {isValid ? (
        <CircleCheckFilledIcon fill="#4caf50" />
      ) : (
        <CircleCheckEmptyIcon fill="#d70040" />
      )}
      <span>{label}</span>
    </div>
  );
};

export default PasswordRequirementItem;
