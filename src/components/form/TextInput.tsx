import { FormEventHandler } from 'react';
import { classNames } from '../../utils/textUtils';

interface Props {
  id: string;
  rows?: number;
  label: string;
  value: string;
  error: string;
  onChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder: string;
}

function TextInput({
  id,
  rows = 1,
  label,
  value,
  error,
  onChange,
  placeholder,
}: Props) {
  const classes =
    'rounded-md border-1 border-brand bg-neutrals-800 p-3 text-base font-normal shadow-glow shadow-brand/50 transition-colors duration-200 focus:shadow-brand focus:outline-none [-webkit-appearance:none]';

  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-y-2 text-xs font-bold uppercase"
    >
      {label}
      {rows < 2 ? (
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classes}
        />
      ) : (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames(classes, 'resize-none')}
        />
      )}
      {error && (
        <p className="flex items-center text-xs font-normal normal-case text-rose-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </label>
  );
}

export default TextInput;
