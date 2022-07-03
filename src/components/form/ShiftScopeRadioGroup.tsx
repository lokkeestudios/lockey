import { RadioGroup } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { ShiftScope } from '../../utils/encryptionUtils';
import { classNames } from '../../utils/textUtils';

interface Props {
  label: string;
  state: [ShiftScope, Dispatch<SetStateAction<ShiftScope>>];
  options: ShiftScope[];
}

function ShiftScopeRadioGroup({ label, state, options }: Props) {
  const [selectedOption, setSelectedOption] = state;

  return (
    <RadioGroup value={selectedOption} onChange={setSelectedOption}>
      <RadioGroup.Label className="text-xs font-bold uppercase">
        {label}
      </RadioGroup.Label>
      {options.map((option) => (
        <RadioGroup.Option
          key={option}
          value={option}
          className="cursor-pointer focus:outline-none"
        >
          {({ checked }) => (
            <div className="flex items-center">
              <div
                className={classNames(
                  'mr-1 flex h-4 w-4 items-center justify-center rounded-full border-1 border-brand shadow-glow transition-colors duration-200',
                  checked ? 'shadow-brand/90' : 'shadow-brand/50'
                )}
              >
                <div
                  className={classNames(
                    'absolute inline-block h-[0.35rem] w-[0.35rem] rounded-full',
                    checked ? 'bg-brand' : 'bg-transparent'
                  )}
                />
              </div>
              <span className="w-full rounded-l-lg p-1 text-sm">{option}</span>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default ShiftScopeRadioGroup;
