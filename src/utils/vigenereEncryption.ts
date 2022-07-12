import { shiftChar } from './caesarEncryption';
import { asciiConstants, ShiftScope } from './encryptionUtils';
import {
  isAscii,
  isDigit,
  isLetter,
  isLetterAndDigit,
  isUpperCase,
} from './textUtils';

const { POS_ASCII_A_UPPERCASE, POS_ASCII_A_LOWERCASE, POS_ASCII_0 } =
  asciiConstants;

function getShiftOfCharacter(shiftScope: ShiftScope, char: string) {
  const charCode = char.charCodeAt(0);

  const isRecognizedAsDigit =
    shiftScope === ShiftScope.ALPHABET_AND_DIGITS && isDigit(char);
  const isRecognizedAsLetter =
    shiftScope !== ShiftScope.ASCII_TABLE && isLetter(char);

  let shift = charCode;

  if (isRecognizedAsDigit) {
    shift -= POS_ASCII_0;
  } else if (isRecognizedAsLetter) {
    if (isUpperCase(char)) {
      shift -= POS_ASCII_A_UPPERCASE;
    } else {
      shift -= POS_ASCII_A_LOWERCASE;
    }
  }

  return shift;
}

function isInScope(shiftScope: ShiftScope, char: string) {
  if (shiftScope === ShiftScope.ASCII_TABLE && isAscii(char)) {
    return true;
  }
  if (shiftScope === ShiftScope.ALPHABET_AND_DIGITS && isLetterAndDigit(char)) {
    return true;
  }
  if (shiftScope === ShiftScope.ALPHABET && isLetter(char)) {
    return true;
  }
  return false;
}

function doEncode(
  text: string,
  key: string,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean,
  shiftDirectionMultiplier: -1 | 1
) {
  if (!isAscii(key)) {
    throw new Error('Key must only consist of ASCII characters');
  }

  const encodedChars: string[] = [];

  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (isInScope(shiftScope, char)) {
      const keyChar = key[keyIndex];
      const shift = getShiftOfCharacter(shiftScope, keyChar);

      const shiftedChar = shiftChar(
        char,
        shiftDirectionMultiplier * shift,
        shiftScope,
        isIncludingForeignChars
      );

      encodedChars.push(shiftedChar);

      keyIndex += 1;

      if (keyIndex === key.length) {
        keyIndex = 0;
      }
    } else if (isIncludingForeignChars) {
      encodedChars.push(char);
    }
  }

  const encodedText = encodedChars.join('');

  return encodedText;
}

function vigenereEncode(
  text: string,
  key: string,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const shiftDirectionMultiplier = 1;

  return doEncode(
    text,
    key,
    shiftScope,
    isIncludingForeignChars,
    shiftDirectionMultiplier
  );
}

function vigenereDecode(
  text: string,
  key: string,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const shiftDirectionMultiplier = -1;

  return doEncode(
    text,
    key,
    shiftScope,
    isIncludingForeignChars,
    shiftDirectionMultiplier
  );
}

export { vigenereEncode, vigenereDecode };
