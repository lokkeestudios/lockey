import { Switch } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function Checkbox({ label, state }: Props) {
  const [isChecked, setIsChecked] = state;

  return (
    <Switch
      checked={isChecked}
      onChange={setIsChecked}
      className="flex items-center"
    >
      <div
        className={`${
          isChecked ? 'shadow-brand/90' : 'shadow-brand/60'
        } mr-2 flex h-4 w-4 items-center justify-center rounded-sm border-1 border-brand shadow-glow`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isChecked ? 'inline-block' : 'hidden'} text-brand`}
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-sm">{label}</span>
    </Switch>
  );
}
