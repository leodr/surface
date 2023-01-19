import { ChangeEvent, useRef } from "react";
import { classnames } from "../classnames";

type Props = {
  area?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  id: string;
  placeholder?: string;
  hint?: string;
};

export function TextInput({
  area = false,
  onChange,
  value,
  label,
  id,
  placeholder,
  hint,
}: Props) {
  const inputRef = useRef(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChange(event.target.value);
  }

  function handleFocus() {
    const input = inputRef.current as
      | HTMLTextAreaElement
      | HTMLInputElement
      | null;

    if (input) {
      input.select();
    }
  }

  const classes = classnames(
    "px-2 py-3 w-full rounded-t-sm",
    "bg-gray-800 focus:ring-0",
    "border-0 border-b border-gray-100 focus:border-red-500",
    "selection:bg-white selection:text-black"
  );

  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex flex-col gap-1.5">
        <span className="uppercase text-gray-300 text-sm tracking-wide">
          {label}
        </span>
        {area ? (
          <textarea
            ref={inputRef}
            className={classes}
            value={value}
            onChange={handleChange}
            id={id}
            rows={10}
            placeholder="Hello World!"
            aria-describedby={hintId}
            onFocus={handleFocus}
          />
        ) : (
          <input
            ref={inputRef}
            className={classes}
            value={value}
            onChange={handleChange}
            type="text"
            id={id}
            placeholder={placeholder}
            aria-describedby={hintId}
            onFocus={handleFocus}
          />
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-gray-500 text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
