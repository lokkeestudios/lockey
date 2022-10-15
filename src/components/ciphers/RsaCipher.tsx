import { FormEvent, useCallback, useState } from 'react';
import {
  generateKeyPair,
  rsaDecode,
  rsaEncode,
} from '../../utils/rsaEncryption';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

function isStringConvertedToNaN(string: string) {
  return Number.isNaN(parseInt(string, 10));
}

function RsaCipher() {
  const [data, setData] = useState({
    plaintext: '',
    modulus: '',
    publicKey: '',
    privateKey: '',
    ciphertext: '',
  });

  const [errors, setErrors] = useState({
    plaintext: '',
    modulus: '',
    publicKey: '',
    privateKey: '',
    ciphertext: '',
  });

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
      modulus: '',
      publicKey: '',
      privateKey: '',
      ciphertext: '',
    };

    let isSuccessful = true;

    const { modulus, publicKey, privateKey } = data;

    if (isStringConvertedToNaN(modulus)) {
      const typeOfNumberErrorMessage = 'Modulus must be a number';

      validationErrors.modulus = typeOfNumberErrorMessage;

      isSuccessful = false;
    }
    if (isStringConvertedToNaN(publicKey)) {
      const typeOfNumberErrorMessage = 'Public key must be a number';

      validationErrors.publicKey = typeOfNumberErrorMessage;

      isSuccessful = false;
    }
    if (isStringConvertedToNaN(privateKey)) {
      const typeOfNumberErrorMessage = 'Private key must be a number';

      validationErrors.privateKey = typeOfNumberErrorMessage;

      isSuccessful = false;
    }

    setErrors(validationErrors);

    return isSuccessful;
  }

  const handleGenerateKeyPair = useCallback(() => {
    const { modulus, publicKey, privateKey } = generateKeyPair();

    setDataValue('modulus', modulus.toString());
    setDataValue('publicKey', publicKey.toString());
    setDataValue('privateKey', privateKey.toString());
  }, []);

  const encode = useCallback(() => {
    if (validate()) {
      const { plaintext, modulus, publicKey } = data;
      setDataValue(
        'ciphertext',
        rsaEncode(plaintext, parseInt(modulus, 10), parseInt(publicKey, 10))
      );
    }
  }, [data]);

  const decode = useCallback(() => {
    if (validate()) {
      const { ciphertext, modulus, privateKey } = data;
      setDataValue(
        'plaintext',
        rsaDecode(ciphertext, parseInt(modulus, 10), parseInt(privateKey, 10))
      );
    }
  }, [data]);

  return (
    <>
      <h1 className="mb-4 border-b-1 border-neutrals-700 pb-2 font-display text-2xl font-bold">
        RSA Cipher
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="plaintext"
            label="Plaintext"
            value={data.plaintext}
            error={errors.plaintext}
            onChange={handleChange}
            placeholder="e.g. Test"
            rows={4}
          />
          <Button label="Encode" onClick={encode} />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="modulus"
            label="Modulus (n)"
            value={data.modulus}
            error={errors.modulus}
            onChange={handleChange}
            placeholder="e.g. 2636751933577819"
          />
          <TextInput
            id="publicKey"
            label="Public key (e)"
            value={data.publicKey}
            error={errors.publicKey}
            onChange={handleChange}
            placeholder="e.g. 51349311"
          />
          <TextInput
            id="privateKey"
            label="Private key (d)"
            value={data.privateKey}
            error={errors.privateKey}
            onChange={handleChange}
            placeholder="e.g. 1929606270070991"
          />
          <Button label="Generate key pair" onClick={handleGenerateKeyPair} />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <TextInput
            id="ciphertext"
            label="Ciphertext"
            value={data.ciphertext}
            error={errors.ciphertext}
            onChange={handleChange}
            placeholder="e.g. 2487544123443066 240504536825256 1232560970171692 1843943307481895"
            rows={4}
          />
          <Button label="Decode" onClick={decode} />
        </div>
      </div>
    </>
  );
}

export default RsaCipher;
