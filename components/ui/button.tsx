import { cn } from "@/lib/utils";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isGraphVisualized: boolean;
}

export const Button = ({
  disabled,
  isGraphVisualized,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30",
        className
      )}
      {...props}
    >
      {isGraphVisualized ? (
        <GrPowerReset className="w-5 h-5" />
      ) : (
        <BsFillPlayFill className="w-5 h-5" />
      )}
    </button>
  );
};
