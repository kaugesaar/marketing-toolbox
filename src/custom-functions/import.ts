import { StringInput, parseInput } from ".";

type JSONObject = {
  [key: string]: string | number | JSONObject | JSONObject[];
};

/**
 * Imports a JSON feed and returns the results in a table format.
 * By default, it will return all fields in a flattened table.
 *
 * @param {A2:A26} url - The URL to import the JSON from
 * @param {products} startFromKey [OPTIONAL] - The fields to extract. E.g. You can
 * choose to use which fields to extract. E.g. ["id", "user.name", "user.comments"].
 * @customfunction
 */
export const IMPORTJSON = (url: StringInput, startFromKey?: string) => {
  return parseInput(url, url => {
    const response = UrlFetchApp.fetch(url);
    const json = response.getContentText();
    const data = JSON.parse(json);

    return jsonTo2DArray(data, startFromKey);
  });
};

/**
 * Flattens a JSON object to a table.
 * @param {JSONObject} obj - The JSON object to flatten
 * @return {string[][]} The flattened table
 */
export function flatten(obj: JSONObject, prefix = ""): JSONObject {
  return Object.keys(obj).reduce((acc: JSONObject, k: string): JSONObject => {
    const pre = prefix ? prefix + "." : "";
    if (typeof obj[k] === "object" && obj[k] !== null) {
      Object.assign(acc, flatten(obj[k] as JSONObject, pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

/**
 * Gets a field from a JSON object.
 * @param {object} json - The JSON object
 * @param {string[]} startFromKey - The fields to get
 * @return {string} The field value
 */
export function jsonTo2DArray(
  json: JSONObject | JSONObject[],
  startFromKey?: string
) {
  let processedJson: JSONObject[] = [json as JSONObject];

  // Adjust processing based on whether a startFromKey is provided and the structure of the input
  if (startFromKey && !Array.isArray(json)) {
    if (json[startFromKey] && Array.isArray(json[startFromKey])) {
      processedJson = json[startFromKey] as JSONObject[];
    }
  } else if (Array.isArray(json)) {
    processedJson = json;
  }

  const allKeys: Set<string> = new Set();
  const flatObjects: JSONObject[] = processedJson.map(obj => {
    const flatObj = flatten(obj);
    Object.keys(flatObj).forEach(key => allKeys.add(key));
    return flatObj;
  });

  const header = Array.from(allKeys);
  const rows = flatObjects.map(obj => {
    return header.map(key => obj[key] ?? "");
  }) as string[][];

  return [header, ...rows];
}