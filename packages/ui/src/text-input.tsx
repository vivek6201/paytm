"use client"

interface TextInputProps {
  title: string;
  placeholder: string;
  type: string;
  onInput: (value: string) => void;
}

export default function TextInput({
  title,
  type,
  placeholder,
  onInput,
}: TextInputProps): JSX.Element {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {title}
      <input className="grow" onChange={(e) =>{
        onInput(e.target.value)
      }} type={type} placeholder={placeholder}/>
    </label>
  );
}
