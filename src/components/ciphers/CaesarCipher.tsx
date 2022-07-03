import { FormEvent, useCallback, useState } from 'react';
import { caesarEncode, shiftChar } from '../../utils/caesarEncryption';
import { ShiftScope } from '../../utils/encryptionUtils';
import { parseIntOrZero } from '../../utils/textUtils';
import Button from '../form/Button';
import Checkbox from '../form/Checkbox';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';

function CaesarCipher() {
  const [data, setData] = useState({
    plaintext: '',
    shift: '',
    ciphertext: '',
  });

  const [scope, setScope] = useState(ShiftScope.ALPHABET);

  const [includeForeignChars, setIncludeForeignChars] = useState(true);

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

  const encode = useCallback(() => {
    const { plaintext } = data;
    const shift = parseIntOrZero(data.shift);

    setDataValue(
      'ciphertext',
      caesarEncode(plaintext, shift, scope, includeForeignChars)
    );
  }, [data, scope, includeForeignChars]);

  const decode = useCallback(() => {
    const { ciphertext } = data;
    const shift = parseIntOrZero(data.shift);

    setDataValue(
      'plaintext',
      caesarEncode(ciphertext, -shift, scope, includeForeignChars)
    );
  }, [data, scope, includeForeignChars]);

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
                name="shift"
                id="shift"
                value={data.shift}
                placeholder="e.g. 2"
                onChange={handleChange}
                className="w-full rounded-md border-1 border-brand bg-transparent p-3 pr-16 shadow-glow shadow-brand/50 transition-colors duration-200 focus:shadow-brand focus:outline-none"
              />
              <span className="pointer-events-none absolute right-0 rounded-r-md p-3 text-center font-mono text-xs">
                {`A → ${shiftChar(
                  'A',
                  parseIntOrZero(data.shift),
                  scope,
                  true
                )}`}
              </span>
            </div>
          </label>
          <RadioGroup
            label="Scope"
            state={[scope, setScope]}
            options={Object.values(ShiftScope)}
          />
          <div className="-my-1 border-b-1 border-neutrals-700" />
          <Checkbox
            state={[includeForeignChars, setIncludeForeignChars]}
            label="Include foreign characters"
          />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="ciphertext"
            label="Ciphertext"
            value={data.ciphertext}
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
