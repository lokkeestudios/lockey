import { ChangeEvent, useState } from 'react';
import { shiftChar } from '../../utils/caesarEncryption';
import { parseIntOrZero } from '../../utils/textUtils';

export default function CaesarCipher() {
  const [data, setData] = useState({
    plaintext: '',
    key: '',
    ciphertext: '',
  });

  function setValue(name: string, value: string) {
    setData((values) => ({ ...values, [name]: value }));
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setValue(name, value);
  }

  function doEncode(text: string, key: string) {
    const encodedChars: string[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const shift = key.charCodeAt(i % 26) - 65;

      const shiftedChar = shiftChar(char, shift, scope, includeForeignChars);

      encodedChars.push(shiftedChar);
    }

    const encodedText = encodedChars.join('');

    return encodedText;
  }

  function encode() {
    const { plaintext } = data;
    const { key } = data;

    setValue('ciphertext', doEncode(plaintext, shift));
  }

  function decode() {
    const { ciphertext } = data;
    const shift = parseIntOrZero(data.shift);

    setValue('plaintext', doEncode(ciphertext, key));
  }

  return (
    <>
      <h1 className="mb-4 border-b-1 border-neutrals-700 pb-2 font-display text-2xl font-bold">
        Vigenère Cipher
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-y-4">
          <label
            htmlFor="plaintext"
            className="-mb-2 text-xs font-bold uppercase"
          >
            Plaintext
          </label>
          <textarea
            name="plaintext"
            id="plaintext"
            value={data.plaintext}
            onChange={handleChange}
            placeholder="e.g. This is a plaintext"
            rows={4}
            className="resize-none rounded-md border-1 border-brand bg-neutrals-800 p-3 shadow-glow shadow-brand/50 transition-colors duration-200 focus:shadow-brand focus:outline-none"
          ></textarea>
          <button
            onClick={encode}
            className="rounded-md bg-brand p-2 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/60 focus:outline-none focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:shadow-brand/60"
          >
            Encode
          </button>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <label htmlFor="key" className="-mb-2 text-xs font-bold uppercase">
            Key
          </label>
          <input
            type="text"
            name="key"
            id="key"
            value={data.key}
            onChange={handleChange}
            placeholder="e.g. KEY"
            className="rounded-md border-1 border-brand bg-neutrals-800 p-3 shadow-glow shadow-brand/50 transition-colors duration-200 focus:shadow-brand focus:outline-none"
          ></input>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <label
            htmlFor="ciphertext"
            className="-mb-2 text-xs font-bold uppercase"
          >
            Ciphertext
          </label>
          <textarea
            name="ciphertext"
            id="ciphertext"
            value={data.ciphertext}
            onChange={handleChange}
            placeholder="e.g. Dlgc mq k tjkmldivd"
            rows={4}
            className="resize-none rounded-md border-1 border-brand bg-neutrals-800 p-3 shadow-glow shadow-brand/50 transition-colors duration-200 focus:shadow-brand focus:outline-none"
          ></textarea>
          <button
            onClick={decode}
            className="rounded-md bg-brand p-2 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/60 focus:outline-none focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:shadow-brand/60"
          >
            Decode
          </button>
        </div>
      </div>
    </>
  );
}
