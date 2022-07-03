import { shiftChar } from './caesarEncryption';
import { ShiftScope } from './encryptionUtils';
import { keepNumInRange } from './textUtils';

function doEncode(
  text: string,
  key: string,
  scope: ShiftScope,
  isIncludingForeignChars: boolean,
  shiftDirectionMultiplier: -1 | 1
) {
  const encodedChars: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const shift = key.charCodeAt(keepNumInRange(0, key.length, i)) - 65;

    const shiftedChar = shiftChar(
      char,
      shiftDirectionMultiplier * shift,
      scope,
      isIncludingForeignChars
    );

    encodedChars.push(shiftedChar);
  }

  const encodedText = encodedChars.join('');

  return encodedText;
}

function vigenereEncode(
  text: string,
  key: string,
  scope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const shiftDirectionMultiplier = 1;

  return doEncode(
    text,
    key,
    scope,
    isIncludingForeignChars,
    shiftDirectionMultiplier
  );
}

function vigenereDecode(
  text: string,
  key: string,
  scope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const shiftDirectionMultiplier = -1;

  return doEncode(
    text,
    key,
    scope,
    isIncludingForeignChars,
    shiftDirectionMultiplier
  );
}

export { vigenereEncode, vigenereDecode };
