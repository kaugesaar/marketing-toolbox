type StringInput = string | string[][];
type StringOutput = string[] | string[][] | StringOutput[] | StringOutput[][];

/**
 * Extracts the parameters from a URL. By default, it will extract all parameters.
 *
 * @param {A2:A26} url - The URL to extract the UTM parameters from
 * @param {B1:D1} params [OPTIONAL] - The parameters to extract.
 * @param {true} decode_uri [OPTIONAL] - Whether to decode the URI. Defaults to true.
 * I.e. %20 will be converted to a space.
 * @return {string[]} The UTM parameters
 * @customfunction
 */
export const EXTRACT_PARAMS = (
  url: StringInput,
  params?: string[][],
  decode_uri: boolean = true,
): StringOutput => {
  if (Array.isArray(url)) {
    const rows: string[] = [];
    url.forEach((row) =>
      row.forEach((cell) =>
        rows.push(...(EXTRACT_PARAMS(cell, params, decode_uri) as string[])),
      ),
    );
    return rows;
  }

  const matches = url.match(/[^?&]+=[^&]+/g);

  if (!matches) {
    return [[]];
  }

  const link: { [key: string]: string } = {};

  matches.forEach((param) => {
    const [key, value] = param.split("=");
    link[key] = decode_uri ? decodeURIComponent(value) : value;
  });

  const output = params
    ? [...params[0].map((key) => link[key] || "")]
    : [...Object.keys(link).map((key) => link[key])];

  return [output];
};

/**
 * Extracts the UTM parameters from a URL. It can be used to extract a single
 * UTM parameter or multiple UTM parameters. By default, it will extract utm_source,
 * utm_medium, utm_campaign, utm_content, and utm_term. In that order.
 *
 * @param {A2:A26} url - The URL to extract the UTM parameters from
 * @param {B1:D1} utms [OPTIONAL] - The UTM parameters to extract. E.g. You can
 * choose to use the full name or the short name. E.g. utm_source or source.
 * @param {true} decode_uri [OPTIONAL] - Whether to decode the URI. Defaults to true.
 * I.e. %20 will be converted to a space.
 * @return {string[]} The UTM parameters
 * @customfunction
 */
export const EXTRACT_UTM = (
  url: StringInput,
  utms?: string[][],
  decode_uri: boolean = true,
): StringOutput => {
  if (Array.isArray(url)) {
    const rows: string[] = [];
    url.forEach((row) =>
      row.forEach((cell) =>
        rows.push(...(EXTRACT_UTM(cell, utms, decode_uri) as string[])),
      ),
    );
    return rows;
  }

  const matches = url.match(/utm_[^&]+/g);

  if (!matches) {
    return [[]];
  }

  const link: { [key: string]: string } = {};

  matches.forEach((utm) => {
    const [key, value] = utm.split("=");
    link[key] = decode_uri ? decodeURIComponent(value) : value;
  });

  const assureUtm = (key: string) => {
    if (!key.startsWith("utm_")) {
      return `utm_${key}`;
    }
    return key;
  };

  const output = utms
    ? [...utms[0].map((key) => link[assureUtm(key)] || "")]
    : [
        link["utm_source"],
        link["utm_medium"],
        link["utm_campaign"],
        link["utm_content"],
        link["utm_term"],
      ];

  return [output];
};
