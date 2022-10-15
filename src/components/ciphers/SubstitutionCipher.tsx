import { FormEvent, useCallback, useState } from 'react';
import substitutionEncode from '../../utils/substitutionEncryption';
import Button from '../form/Button';
import Checkbox from '../form/Checkbox';
import TextInput from '../form/TextInput';

function SubstitutionCipher() {
  const [data, setData] = useState({
    plaintext: '',
    plaintextAlphabet: '',
    ciphertextAlphabet: '',
    ciphertext: '',
  });

  const [errors, setErrors] = useState({
    plaintext: '',
    plaintextAlphabet: '',
    ciphertextAlphabet: '',
    ciphertext: '',
  });

  const [isIncludingForeignChars, setIsIncludingForeignChars] = useState(true);

  function setDataValue(name: string, value: string) {
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;

      setDataValue(name, value);
    },
    [data, errors]
  );

  function validate() {
    const validationErrors = {
      plaintext: '',
      plaintextAlphabet: '',
      ciphertextAlphabet: '',
      ciphertext: '',
    };

    let isSuccessful = true;

    const { plaintextAlphabet, ciphertextAlphabet } = data;

    if (plaintextAlphabet.length !== ciphertextAlphabet.length) {
      const equalLengthErrorMessage = 'Alphabets must be of same length';

      validationErrors.plaintextAlphabet = equalLengthErrorMessage;
      validationErrors.ciphertextAlphabet = equalLengthErrorMessage;

      isSuccessful = false;
    }

    setErrors(validationErrors);

    return isSuccessful;
  }

  const encode = useCallback(() => {
    if (validate()) {
      const { plaintext, plaintextAlphabet, ciphertextAlphabet } = data;

      setDataValue(
        'ciphertext',
        substitutionEncode(
          plaintext,
          plaintextAlphabet,
          ciphertextAlphabet,
          isIncludingForeignChars
        )
      );
    }
  }, [data, isIncludingForeignChars]);

  const decode = useCallback(() => {
    if (validate()) {
      const { ciphertext, ciphertextAlphabet, plaintextAlphabet } = data;

      setDataValue(
        'plaintext',
        substitutionEncode(
          ciphertext,
          ciphertextAlphabet,
          plaintextAlphabet,
          isIncludingForeignChars
        )
      );
    }
  }, [data, isIncludingForeignChars]);

  return (
    <>
      <h1 className="mb-4 border-b-1 border-neutrals-700 pb-2 font-display text-2xl font-bold">
        Substitution Cipher
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
            id="plaintextAlphabet"
            label="Plaintext Alphabet"
            value={data.plaintextAlphabet}
            error={errors.plaintextAlphabet}
            onChange={handleChange}
            placeholder="e.g. abcdefghijklmnopqrstuvwxyz"
          />
          <TextInput
            id="ciphertextAlphabet"
            label="Ciphertext Alphabet"
            value={data.ciphertextAlphabet}
            error={errors.ciphertextAlphabet}
            onChange={handleChange}
            placeholder="e.g. zyxwvutsrqponmlkjihgfedcba"
          />
          <div className="-mb-1 border-b-1 border-neutrals-700" />
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
            placeholder="e.g. Gsrh rh z kozrmgvcg"
            rows={4}
          />
          <Button label="Decode" onClick={decode} />
        </div>
      </div>
    </>
  );
}

export default SubstitutionCipher;
