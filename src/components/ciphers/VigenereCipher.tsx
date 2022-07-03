import { FormEvent, useCallback, useState } from 'react';
import { ShiftScope } from '../../utils/encryptionUtils';
import { vigenereDecode, vigenereEncode } from '../../utils/vigenereEncryption';
import Button from '../form/Button';
import Checkbox from '../form/Checkbox';
import ShiftScopeRadioGroup from '../form/ShiftScopeRadioGroup';
import TextInput from '../form/TextInput';

function VigenereCipher() {
  const [data, setData] = useState({
    plaintext: '',
    key: '',
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

  const encode = useCallback(() => {
    const { plaintext } = data;
    const { key } = data;

    setDataValue(
      'ciphertext',
      vigenereEncode(plaintext, key, shiftScope, isIncludingForeignChars)
    );
  }, [data, shiftScope, isIncludingForeignChars]);

  const decode = useCallback(() => {
    const { ciphertext } = data;
    const { key } = data;

    setDataValue(
      'plaintext',
      vigenereDecode(ciphertext, key, shiftScope, isIncludingForeignChars)
    );
  }, [data, shiftScope, isIncludingForeignChars]);

  return (
    <>
      <h1 className="mb-4 border-b-1 border-neutrals-700 pb-2 font-display text-2xl font-bold">
        Vigenère Cipher
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
          <TextInput
            id="key"
            label="Key"
            value={data.key}
            onChange={handleChange}
            placeholder="e.g. KEY"
          />
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
            onChange={handleChange}
            placeholder="e.g. Dlgc mq k tjkmldivd"
            rows={4}
          />
          <Button label="Decode" onClick={decode} />
        </div>
      </div>
    </>
  );
}

export default VigenereCipher;
