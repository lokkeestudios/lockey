import { FormEvent, useCallback, useState } from 'react';
import { ShiftScope } from '../../utils/encryptionUtils';
import { isAscii, isLetter, isLetterAndDigit } from '../../utils/textUtils';
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

  const [errors, setErrors] = useState({
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

  function validate() {
    const validationErrors = {
      plaintext: '',
      key: '',
      ciphertext: '',
    };

    let isSuccessful = true;

    const { key } = data;

    const isNotInAsciiScope =
      shiftScope === ShiftScope.ASCII_TABLE && !isAscii(key);
    const isNotInAlphabetAndDigitsScope =
      shiftScope === ShiftScope.ALPHABET_AND_DIGITS && !isLetterAndDigit(key);
    const isNotInAlphabetScope =
      shiftScope === ShiftScope.ALPHABET && !isLetter(key);

    if (isNotInAsciiScope) {
      const onlyAsciiCharactersErrorMessage =
        'Key must only consist of ASCII characters';

      validationErrors.key = onlyAsciiCharactersErrorMessage;

      isSuccessful = false;
    } else if (isNotInAlphabetAndDigitsScope) {
      const onlyLettersAndDigitsErrorMessage =
        'Key must only consist of letters and digits';

      validationErrors.key = onlyLettersAndDigitsErrorMessage;

      isSuccessful = false;
    } else if (isNotInAlphabetScope) {
      const onlyLettersErrorMessage = 'Key must only consist of letters';

      validationErrors.key = onlyLettersErrorMessage;

      isSuccessful = false;
    }

    setErrors(validationErrors);

    return isSuccessful;
  }

  const encode = useCallback(() => {
    if (validate()) {
      const { plaintext, key } = data;

      setDataValue(
        'ciphertext',
        vigenereEncode(plaintext, key, shiftScope, isIncludingForeignChars)
      );
    }
  }, [data, shiftScope, isIncludingForeignChars]);

  const decode = useCallback(() => {
    if (validate()) {
      const { ciphertext, key } = data;

      setDataValue(
        'plaintext',
        vigenereDecode(ciphertext, key, shiftScope, isIncludingForeignChars)
      );
    }
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
            error={errors.plaintext}
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
            error={errors.key}
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
            error={errors.ciphertext}
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
