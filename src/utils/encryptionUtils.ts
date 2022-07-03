export const asciiConstants = {
  AMOUNT_ASCII_CHARACTERS: 127,
  AMOUNT_DIGITS: 10,
  AMOUNT_LETTERS: 26,
  POS_ASCII_A_UPPERCASE: 65,
  POS_ASCII_A_LOWERCASE: 97,
  POS_ASCII_0: 48,
};

/**
 * Supported shift scope types
 * These define the range in which characters are shifted
 */
export enum ShiftScope {
  ALPHABET = 'Shift the English alphabet',
  ALPHABET_AND_DIGITS = 'Shift the English alphabet and digits',
  ASCII_TABLE = 'Shift the whole ASCII table',
}
