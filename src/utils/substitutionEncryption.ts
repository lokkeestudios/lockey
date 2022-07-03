/**
 * Encodes a {@link text} using the monoalphabetic substitution cipher
 * This is done by replacing every character of the {@link text} which is part of the {@link alphabet}
 * with its encoded character counterparts at the same position in the {@link encodeAlphabet}
 * Thus {@link alphabet} and {@link encodeAlphabet} must be of same length
 *
 * @param text - text to encode
 * @param alphabet - alphabet with all characters which should be encoded to their {@link encodeAlphabet} counterparts
 * @param encodeAlphabet - alphabet with the encoded character counterparts of the {@link alphabet}
 * @param isIncludingForeignChars - whether characters which are not part of the {@link alphabet} should be included in the returned text
 *
 * @return encoded text
 */
function substitutionEncode(
  text: string,
  alphabet: string,
  encodeAlphabet: string,
  isIncludingForeignChars: boolean
) {
  if (alphabet.length !== encodeAlphabet.length) {
    throw new Error('Alphabet and encode alphabet must be of same length');
  }

  const encodedChars: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    let encodedChar = isIncludingForeignChars ? char : '';

    if (alphabet.includes(char)) {
      const charPos = alphabet.indexOf(char);

      encodedChar = encodeAlphabet.charAt(charPos);
    }
    encodedChars.push(encodedChar);
  }

  const encodedText = encodedChars.join('');

  return encodedText;
}

export default substitutionEncode;
