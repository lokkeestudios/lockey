/**
 * Converts a string to an integer
 * Returns zero if the string is not a number
 *
 * @param string - string to convert to an integer
 *
 * @return the parsed int or zero
 */
function parseIntOrZero(string: string) {
  const parsedInt = parseInt(string, 10);

  return Number.isNaN(parsedInt) ? 0 : parsedInt;
}

/**
 * Checks whether a {@link string} only consists of ascii characters
 *
 * @param string - character to check
 *
 * @return result of the check
 */
function isAscii(string: string): boolean {
  const asciiCharsRegex = /^[\x00-\x7F]*$/;

  return asciiCharsRegex.test(string);
}

/**
 * Checks whether a {@link string} only consists of letters
 *
 * @param string - string to check
 *
 * @return result of the check
 */
function isLetter(string: string): boolean {
  const lettersRegex = /^[a-z]*$/i;

  return lettersRegex.test(string);
}

/**
 * Checks whether a {@link string} only consists of digits
 *
 * @param string - string to check
 *
 * @return result of the check
 */
function isDigit(string: string): boolean {
  const digitsRegex = /^[0-9]*$/;

  return digitsRegex.test(string);
}

/**
 * Checks whether a {@link string} only consists of letters and digits
 *
 * @param string - string to check
 *
 * @return result of the check
 */
function isLetterAndDigit(string: string): boolean {
  const lettersAndDigitsRegex = /^[a-z0-9]*$/i;

  return lettersAndDigitsRegex.test(string);
}

/**
 * Checks whether a {@link string} is fully upper case
 *
 * @param string - string to check
 *
 * @return result of the check
 */
function isUpperCase(string: string): boolean {
  if (string === string.toUpperCase()) {
    return true;
  }
  return false;
}

/**
 * Keeps a {@link num} within a {@link range} starting from a {@link minValue}
 *
 * @param minValue - minimum value of the clamped num
 * @param range - range in which the clamped num should be
 * @param num - number which should be clamped to the given {@link range}
 *
 * @return clamped num
 */
function keepNumInRange(minValue: number, range: number, num: number) {
  const clampedNum = ((num - minValue) % range) + minValue;

  return clampedNum;
}

/**
 * Joins multiple strings of css classes to one single string
 *
 * @param classes - css class strings
 *
 * @return joined classes string
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export {
  parseIntOrZero,
  isAscii,
  isLetter,
  isDigit,
  isLetterAndDigit,
  isUpperCase,
  keepNumInRange,
  classNames,
};
