import { StringInput, get2dArray, parseInput } from ".";

/**
 * Returns a random UUID. This identifier is not guaranteed to be unique across all time and space.
 * As such, do not use in situations where guaranteed uniqueness is required.
 * @param {A1:A26} input_range [OPTIONAL] - Can be any cell or range. If provided,
 * it will return a 2d array of unique UUIDs.
 * @return {string} A random UUID
 * @customfunction
 */
export const RAND_UUID = (input_range: StringInput) => {
  return parseInput(input_range, () => Utilities.getUuid());
};

/**
 * Parses a template and replaces the $[col_num] with the value from the corresponding column. Note that
 * the column number is Zero-indexed. Meaning the first column is 0, second column is 1, etc.
 *
 * @param {"Good $[1] $[0]!"} template - The template to parse
 * @param {A1:B26} values - The values to replace the template with
 * @return {string[][]} The parsed template
 * @customfunction
 */
export const PARSE_TEMPLATE = (template: string, values: StringInput) => {
  const rows: string[][] = [];
  get2dArray(values).forEach(row => {
    const newRow = template.replace(/\$\[(\d+)\]/g, (_, index) => row[index]);
    rows.push([newRow]);
  });
  return rows;
};
