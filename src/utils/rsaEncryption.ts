import {
  coprime,
  extendedEuclideanAlgorithm,
  fastModularExponentiation,
  generateRandomPrime,
} from './encryptionUtils';

function generatePrimePair() {
  const BITS_OF_PRIME = 26;

  const p = generateRandomPrime(BITS_OF_PRIME);

  let q = generateRandomPrime(BITS_OF_PRIME);

  while (q === p) {
    q = generateRandomPrime(BITS_OF_PRIME);
  }
  return { p, q };
}

function calculatePhiOfN(p: number, q: number) {
  return (p - 1) * (q - 1);
}

function calculateModulus(p: number, q: number) {
  return p * q;
}

function calculatePublicKey(phiOfN: number) {
  return coprime(phiOfN);
}

function calculatePrivateKey(phiOfN: number, publicKey: number) {
  const bezoutCoefficients = extendedEuclideanAlgorithm(phiOfN, publicKey);

  let privateKey = bezoutCoefficients[1];

  if (privateKey < 0) {
    privateKey += phiOfN;
  }

  return privateKey;
}

function generateKeyPair() {
  const { p, q } = generatePrimePair();
  const phiOfN = calculatePhiOfN(p, q);

  const modulus = calculateModulus(p, q);
  const publicKey = calculatePublicKey(phiOfN);
  const privateKey = calculatePrivateKey(phiOfN, publicKey);

  return { modulus, publicKey, privateKey };
}

function rsaEncode(text: string, modulus: number, publicKey: number) {
  return text
    .split('')
    .map((char) =>
      fastModularExponentiation(char.charCodeAt(0), publicKey, modulus)
    )
    .join(' ');
}

function rsaDecode(text: string, modulus: number, privateKey: number) {
  return text
    .split(' ')
    .map((decodedChar) =>
      String.fromCharCode(
        fastModularExponentiation(
          parseInt(decodedChar, 10),
          privateKey,
          modulus
        )
      )
    )
    .join('');
}

export { rsaEncode, rsaDecode, generateKeyPair };
