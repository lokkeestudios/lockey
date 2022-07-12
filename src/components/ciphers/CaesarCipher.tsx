import { FormEvent, useCallback, useState } from 'react';
import { caesarEncode, shiftChar } from '../../utils/caesarEncryption';
import { ShiftScope } from '../../utils/encryptionUtils';
import { parseIntOrZero } from '../../utils/textUtils';
import Button from '../form/Button';
import Checkbox from '../form/Checkbox';
import ShiftScopeRadioGroup from '../form/ShiftScopeRadioGroup';
import TextInput from '../form/TextInput';

function CaesarCipher() {
  const [data, setData] = useState({
    plaintext: '',
    shift: '',
    ciphertext: '',
  });

  const [errors, setErrors] = useState({
    plaintext: '',
    shift: '',
    ciphertext: '',
  });

  const [shiftScope, setShiftScope] = useState(ShiftScope.ALPHABET);

  const [isIncludingForeignChars, setIsIncludingForeignChars] = useState(true);

  function setDataValue(name: string, value: string) {
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;

      setDataValue(name, value);
    },
    []
  );

  function validate() {
    const validationErrors = {
      plaintext: '',
      shift: '',
      ciphertext: '',
    };

    let isSuccessful = true;

    const isShiftStringConvertedToNaN = Number.isNaN(parseInt(data.shift, 10));

    if (isShiftStringConvertedToNaN) {
      const typeOfNumberErrorMessage = 'Shift must be a number';

      validationErrors.shift = typeOfNumberErrorMessage;

      isSuccessful = false;
    }

    setErrors(validationErrors);

    return isSuccessful;
  }

  const encode = useCallback(() => {
    if (validate()) {
      const { plaintext } = data;
      const shift = parseInt(data.shift, 10);

      setDataValue(
        'ciphertext',
        caesarEncode(plaintext, shift, shiftScope, isIncludingForeignChars)
      );
    }
  }, [data, shiftScope, isIncludingForeignChars]);

  const decode = useCallback(() => {
    if (validate()) {
      const { ciphertext } = data;
      const shift = parseInt(data.shift, 10);

      setDataValue(
        'plaintext',
        caesarEncode(ciphertext, -shift, shiftScope, isIncludingForeignChars)
      );
    }
  }, [data, shiftScope, isIncludingForeignChars]);

  return (
    <>
      <h1 className="mb-4 border-b-1 border-neutrals-700 pb-2 font-display text-2xl font-bold">
        Caesar Cipher
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="plaintext"
            label="Plaintext"
            value={data.plaintext}
            error={errors.plaintext}
            onChange={handleChange}
            placeholder="e.g. This is a plaintext"
            rows={4}
          />
          <Button label="Encode" onClick={encode} />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <label
            htmlFor="shift"
            className="flex flex-col gap-y-2 text-xs font-bold uppercase"
          >
            Shift
            <div className="relative flex items-center divide-x-1 divide-neutrals-700 bg-neutrals-800 text-base font-normal">
              <input
                type="text"
                id="shift"
                name="shift"
                value={data.shift}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full rounded-md border-1 border-brand bg-neutrals-800 p-3 pr-16 shadow-glow shadow-brand/50 transition-colors duration-200 [-webkit-appearance:none] focus:shadow-brand focus:outline-none"
              />
              <span className="pointer-events-none absolute right-0 rounded-r-md p-3 text-center font-mono text-xs">
                {`A → ${shiftChar(
                  'A',
                  parseIntOrZero(data.shift),
                  shiftScope,
                  true
                )}`}
              </span>
            </div>
            {errors.shift && (
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
                {errors.shift}
              </p>
            )}
          </label>
          <ShiftScopeRadioGroup
            label="Scope"
            state={[shiftScope, setShiftScope]}
            options={Object.values(ShiftScope)}
          />
          <div className="-my-1 border-b-1 border-neutrals-700" />
          <Checkbox
            state={[isIncludingForeignChars, setIsIncludingForeignChars]}
            label="Include foreign characters"
          />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="ciphertext"
            label="Ciphertext"
            value={data.ciphertext}
            error={errors.ciphertext}
            onChange={handleChange}
            placeholder="e.g. Vjku ku c rnckpvgzv"
            rows={4}
          />
          <Button label="Decode" onClick={decode} />
        </div>
      </div>
    </>
  );
}

export default CaesarCipher;
