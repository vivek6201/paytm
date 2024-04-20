"use client"

interface SelectProps {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}

export default function Select({
  options,
  onSelect,
}: SelectProps): JSX.Element {
  return (
    <select
      className="select select-bordered w-full"
      defaultValue=""
      onChange={(e) => {
        onSelect(e.target.value);
      }}
    >
      <option value="">Select Bank</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  );
}
