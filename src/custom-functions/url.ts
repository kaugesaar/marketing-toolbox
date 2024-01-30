import { StringInput, get2dArray, parseInput } from ".";

/**
 * Extracts the parameters from a URL. By default, it will extract all parameters.
 *
 * @param {A2:A26} url - The URL to extract the UTM parameters from
 * @param {B1:D1} url_parameters [OPTIONAL] - The parameters to extract.
 * @param {true} decode_uri [OPTIONAL] - Whether to decode the URI. Defaults to true.
 * I.e. %20 will be converted to a space.
 * @return {string[]} The UTM parameters
 * @customfunction
 */
export const EXTRACT_PARAMS = (
  url: StringInput,
  url_parameters?: StringInput,
  decode_uri: boolean = true
) => {
  const rows: string[][] = [];
  parseInput(url, cell => {
    const params = extractUrlParams(cell, decode_uri);
    rows.push(
      url_parameters
        ? [...get2dArray(url_parameters)[0].map(key => params[key] || "")]
        : [...Object.keys(params).map(key => params[key])]
    );
  });
  return rows;
};

/**
 * Extracts the UTM parameters from a URL. By default, it will extract utm_source,
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
  utms?: StringInput,
  decode_uri: boolean = true
) => {
  const rows: string[][] = [];
  parseInput(url, cell => {
    const params = extractUrlParams(cell, decode_uri);
    const assureUtm = (key: string) =>
      key.startsWith("utm_") ? key : `utm_${key}`;

    rows.push(
      utms
        ? [...get2dArray(utms)[0].map(key => params[assureUtm(key)] || "")]
        : [
            params["utm_source"],
            params["utm_medium"],
            params["utm_campaign"],
            params["utm_content"],
            params["utm_term"],
          ]
    );
  });
  return rows;
};

/**
 * Extracts URL parameters into a key-value object.
 */
const extractUrlParams = (
  url: string,
  decode_uri: boolean
): { [key: string]: string } => {
  const matches = url.match(/[^?&]+=[^&]+/g) || [];
  return matches.reduce(
    (acc, param) => {
      const [key, value] = param.split("=");
      acc[key] = decode_uri ? decodeURIComponent(value) : value;
      return acc;
    },
    {} as { [key: string]: string }
  );
};
