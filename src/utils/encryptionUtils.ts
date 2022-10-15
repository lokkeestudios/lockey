const asciiConstants = {
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
enum ShiftScope {
  ALPHABET = 'Shift the English alphabet',
  ALPHABET_AND_DIGITS = 'Shift the English alphabet and digits',
  ASCII_TABLE = 'Shift the whole ASCII table',
}

function fastModularExponentiation(a: number, b: number, n: number) {
  function fastModularExponentiationWithBigInts(
    A: bigint,
    B: bigint,
    N: bigint
  ) {
    let result = 1n;

    let x = A % N;
    let y = B;

    while (y > 0) {
      const isYEven = y % 2n === 0n;

      if (isYEven) {
        x = (x * x) % N;
        y /= 2n;
      } else {
        result = (result * x) % N;
        y -= 1n;
      }
    }
    return result;
  }

  return Number(
    fastModularExponentiationWithBigInts(BigInt(a), BigInt(b), BigInt(n))
  );
}

function greatestCommonDivider(a: number, b: number): number {
  if (b === 0) {
    return Math.abs(a);
  }
  return greatestCommonDivider(b, a % b);
}

function coprime(num: number) {
  for (let i = Math.floor(Math.sqrt(num)); i < num; i++) {
    const isCoprime = greatestCommonDivider(num, i) === 1;

    if (isCoprime) {
      return i;
    }
  }
  throw new Error(`Could not find any coprime number for ${num}`);
}

function extendedEuclideanAlgorithm(a: number, b: number) {
  let tempA = a;
  let tempB = b;

  if (tempA < tempB) [tempA, tempB] = [tempB, tempA];

  let s = 0;
  let oldS = 1;
  let t = 1;
  let oldT = 0;

  while (tempB !== 0) {
    const q = Math.floor(tempA / tempB);

    [tempB, tempA] = [tempA - q * tempB, tempB];
    [s, oldS] = [oldS - q * s, s];
    [t, oldT] = [oldT - q * t, t];
  }
  const bezoutCoefficients = [oldS, oldT];

  return bezoutCoefficients;
}

function isPrime(num: number) {
  if (num === 2) {
    return true;
  }

  const isEven = num % 2 === 0;

  if (num <= 1 || isEven) {
    return false;
  }

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function randomOddNBitNum(n: number) {
  const min = 2 ** (n - 1) + 1;
  const max = 2 ** n - 1;

  const halvedMin = min / 2;
  const halvedMax = max / 2;

  const randomNumInHalfOfRange = Math.floor(
    Math.random() * (halvedMax - halvedMin) + halvedMin
  );

  const randomOddNumInRange = randomNumInHalfOfRange * 2 + 1;

  return randomOddNumInRange;
}

function generateRandomPrime(bitsOfPrime: number) {
  let primeCandidate = randomOddNBitNum(bitsOfPrime);

  while (!isPrime(primeCandidate)) {
    primeCandidate = randomOddNBitNum(bitsOfPrime);
  }
  return primeCandidate;
}

export {
  asciiConstants,
  ShiftScope,
  coprime,
  extendedEuclideanAlgorithm,
  fastModularExponentiation,
  generateRandomPrime,
};
