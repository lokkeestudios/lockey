import { shiftChar } from './caesarEncryption';
import { asciiConstants, ShiftScope } from './encryptionUtils';
import {
  isAscii,
  isDigit,
  isLetter,
  isUpperCase,
  keepNumInRange,
} from './textUtils';

const { POS_ASCII_A_UPPERCASE, POS_ASCII_A_LOWERCASE, POS_ASCII_0 } =
  asciiConstants;

function getShiftOfCharacter(shiftScope: ShiftScope, char: string) {
  const charCode = char.charCodeAt(0);

  const isRecognizedAsDigit =
    shiftScope === ShiftScope.ALPHABET_AND_DIGITS && isDigit(char);

  let shift = charCode;

  if (isRecognizedAsDigit) {
    shift -= POS_ASCII_0;
  } else if (shiftScope !== ShiftScope.ASCII_TABLE && isLetter(char)) {
    // TODO: Clean up code, especially if-statements
    if (isUpperCase(char)) {
      shift -= POS_ASCII_A_UPPERCASE;
    } else {
      shift -= POS_ASCII_A_LOWERCASE;
    }
  }

  return shift;
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

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keyChar = key[keepNumInRange(0, key.length, i)];
    const shift = getShiftOfCharacter(shiftScope, keyChar);

    const shiftedChar = shiftChar(
      char,
      shiftDirectionMultiplier * shift,
      shiftScope,
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
