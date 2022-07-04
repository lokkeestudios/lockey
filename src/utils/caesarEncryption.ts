import { asciiConstants, ShiftScope } from './encryptionUtils';
import {
  isAscii,
  isDigit,
  isLetter,
  isUpperCase,
  keepNumInRange,
} from './textUtils';

const {
  AMOUNT_ASCII_CHARACTERS,
  AMOUNT_DIGITS,
  AMOUNT_LETTERS,
  POS_ASCII_A_UPPERCASE,
  POS_ASCII_A_LOWERCASE,
  POS_ASCII_0,
} = asciiConstants;

function isRecognizedAsAsciiChar(shiftScope: ShiftScope, char: string) {
  return shiftScope === ShiftScope.ASCII_TABLE && isAscii(char);
}
function isRecognizedAsDigit(shiftScope: ShiftScope, char: string) {
  return shiftScope === ShiftScope.ALPHABET_AND_DIGITS && isDigit(char);
}

function positiveShiftChar(
  char: string,
  shift: number,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const charCode = char.charCodeAt(0);
  const shiftedCharCode = charCode + shift;

  let scopedShiftedCharCode = charCode;

  if (isRecognizedAsAsciiChar(shiftScope, char)) {
    scopedShiftedCharCode = keepNumInRange(
      0,
      AMOUNT_ASCII_CHARACTERS,
      shiftedCharCode
    );
  } else if (isLetter(char)) {
    if (isUpperCase(char)) {
      scopedShiftedCharCode = keepNumInRange(
        POS_ASCII_A_UPPERCASE,
        AMOUNT_LETTERS,
        shiftedCharCode
      );
    } else {
      scopedShiftedCharCode = keepNumInRange(
        POS_ASCII_A_LOWERCASE,
        AMOUNT_LETTERS,
        shiftedCharCode
      );
    }
  } else if (isRecognizedAsDigit(shiftScope, char)) {
    scopedShiftedCharCode = keepNumInRange(
      POS_ASCII_0,
      AMOUNT_DIGITS,
      shiftedCharCode
    );
  } else if (!isIncludingForeignChars) {
    return '';
  }

  const shiftedChar = String.fromCharCode(scopedShiftedCharCode);

  return shiftedChar;
}

function negativeShiftChar(
  char: string,
  shift: number,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  let neutralizedShift = shift;

  while (neutralizedShift < 0) {
    if (isRecognizedAsAsciiChar(shiftScope, char)) {
      neutralizedShift += AMOUNT_ASCII_CHARACTERS;
    } else if (isRecognizedAsDigit(shiftScope, char)) {
      neutralizedShift += AMOUNT_DIGITS;
    } else if (isLetter(char)) {
      neutralizedShift += AMOUNT_LETTERS;
    } else {
      neutralizedShift += -shift;
    }
  }

  return positiveShiftChar(
    char,
    neutralizedShift,
    shiftScope,
    isIncludingForeignChars
  );
}

/**
 * Shifts a {@link char} by the {@link shift} in the alphabet
 *
 * @param char - character to shift
 * @param shift - amount to shift the {@link char} by
 * @param shiftScope - scope of characters which are shifted
 * @param isIncludingForeignChars - whether a char should be returned if the {@link char} is not within the {@link shiftScope}
 *
 * @return shifted character
 */
function shiftChar(
  char: string,
  shift: number,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  if (!Number.isInteger(shift)) {
    throw new TypeError('Shift must be of type number');
  }

  if (shift < 0) {
    return negativeShiftChar(char, shift, shiftScope, isIncludingForeignChars);
  }
  return positiveShiftChar(char, shift, shiftScope, isIncludingForeignChars);
}

/**
 * Encodes a {@link text} using the monoalphabetic caesar cipher
 * This is done by shifting every character of the {@link text} by the {@link shift}
 * in the set {@link shiftScope}
 *
 * @param text - text to encode
 * @param shift - amount by which each character of the {@link text} should be shifted
 * @param shiftScope - scope of characters which are shifted
 * @param isIncludingForeignChars - whether characters which are not within {@link shiftScope} should be included in the returned text
 *
 * @return encoded text
 */
function caesarEncode(
  text: string,
  shift: number,
  shiftScope: ShiftScope,
  isIncludingForeignChars: boolean
) {
  const encodedChars: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    const shiftedChar = shiftChar(
      char,
      shift,
      shiftScope,
      isIncludingForeignChars
    );

    encodedChars.push(shiftedChar);
  }

  const encodedText = encodedChars.join('');

  return encodedText;
}

export { shiftChar, caesarEncode };
