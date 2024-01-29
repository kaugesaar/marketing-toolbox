import { StringInput, parseInput } from ".";

/**
 * Helper function to create a hash function.
 */
const createHashFunction = (
  algorithm: GoogleAppsScript.Utilities.DigestAlgorithm
) => {
  return (input: StringInput) =>
    parseInput(input, input => getHash(input, algorithm));
};

/**
 * Returns the MD2 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The MD2 hash of the string
 * @customfunction
 */
export const HASH_MD2 = createHashFunction(Utilities.DigestAlgorithm.MD2);

/**
 * Returns the MD5 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The MD5 hash of the string
 * @customfunction
 */
export const HASH_MD5 = createHashFunction(Utilities.DigestAlgorithm.MD5);

/**
 * Returns the SHA1 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The SHA1 hash of the string
 * @customfunction
 */
export const HASH_SHA1 = createHashFunction(Utilities.DigestAlgorithm.SHA_1);

/**
 * Returns the SHA256 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The SHA256 hash of the string
 * @customfunction
 */
export const HASH_SHA256 = createHashFunction(
  Utilities.DigestAlgorithm.SHA_256
);

/**
 * Returns the SHA384 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The SHA384 hash of the string
 * @customfunction
 */
export const HASH_SHA384 = createHashFunction(
  Utilities.DigestAlgorithm.SHA_384
);

/**
 * Returns the SHA512 hash of the given string.
 * @param {A1:A26} input - The input to hash, can be a single cell or a range.
 * @return {string} The SHA512 hash of the string
 * @customfunction
 */
export const HASH_SHA512 = createHashFunction(
  Utilities.DigestAlgorithm.SHA_512
);

/**
 * Returns the hash of the given string using the specified algorithm.
 */
const getHash = (
  input: string,
  algorithm: GoogleAppsScript.Utilities.DigestAlgorithm
) => {
  const digest = Utilities.computeDigest(algorithm, input);
  let hash = "";
  for (let i = 0; i < digest.length; i++) {
    digest[i] < 0 ? (digest[i] += 256) : null;
    digest[i].toString(16).length == 1 ? (hash += "0") : null;
    hash += digest[i].toString(16);
  }
  return hash;
};
