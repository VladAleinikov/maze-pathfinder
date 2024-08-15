interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; name: string }[];
  label: string;
}

export const Select = ({
  value,
  onChange,
  options,
  disabled,
  label,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={label} className="text-xs text-gray-300 ml-1">
        {label}
      </label>
      <select
        id={label}
        disabled={disabled}
        className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
