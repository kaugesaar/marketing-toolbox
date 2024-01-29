/**
 * StringInput can be either a string or a 2D array of strings (rows/cols).
 */
export type StringInput = string | string[][];
/**
 * StringOutput can be either a string or a array of strings (rows/cols).
 */
export type StringOutput = string | string[][];

/**
 * Parses the input and return the hash. If the input is a range,
 * it will return a 2D array of hashes.
 */
export const parseInput = (
  input: StringInput,
  callback: (input: string) => StringOutput | void
) => {
  return Array.isArray(input)
    ? input.map(row => row.map(cell => callback(cell)))
    : callback(input);
};

/**
 * Returns a StringInput as a 2D array.
 */
export const get2dArray = (input: StringInput) => {
  return Array.isArray(input) ? input : [input.split(",")];
};
