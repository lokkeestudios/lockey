import { MouseEventHandler } from 'react';

interface Props {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-brand p-2 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/60 focus:outline-none focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:shadow-brand/60"
    >
      {label}
    </button>
  );
}

export default Button;
