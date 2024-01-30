import { EXTRACT_PARAMS, EXTRACT_UTM } from "../src/custom-functions/url";

const url =
  "https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer&utm_content=ad1&utm_term=buy+shoes&utm_id=1";

describe("EXTRACT_PARAMS", () => {
  const params = [["utm_source", "utm_medium", "utm_campaign"]];

  it("should extract all parameters from a URL", () => {
    const expected = [["google", "cpc", "summer", "ad1", "buy shoes", "1"]];
    expect(EXTRACT_PARAMS(url)).toEqual(expected);
  });

  it("should extract the specified parameters from a URL", () => {
    const expected = [["google", "cpc", "summer"]];
    expect(EXTRACT_PARAMS(url, params)).toEqual(expected);
  });

  it("should return the params in correct order", () => {
    const expected = [["summer", "cpc", "google"]];
    expect(
      EXTRACT_PARAMS(url, [["utm_campaign", "utm_medium", "utm_source"]])
    ).toEqual(expected);
  });

  it("should return empty strings if the parameter is not found", () => {
    const expected = [[""]];
    expect(EXTRACT_PARAMS(url, "brand")).toEqual(expected);
  });
});

describe("EXTRACT_UTM", () => {
  const utms = [["source", "medium", "campaign"]];

  it("should extract default UTM parameters from a URL", () => {
    const expected = [["google", "cpc", "summer", "ad1", "buy shoes"]];
    expect(EXTRACT_UTM(url)).toEqual(expected);
  });

  it("should extract the specified UTM parameters from a URL", () => {
    const expected = [["google", "cpc", "summer"]];
    expect(EXTRACT_UTM(url, utms)).toEqual(expected);
  });

  it("should return the params in correct order", () => {
    const expected = [["summer", "cpc", "google"]];
    expect(EXTRACT_UTM(url, [["campaign", "medium", "source"]])).toEqual(
      expected
    );
  });

  it("should return empty strings if the UTM parameter is not found", () => {
    const expected = [[""]];
    expect(EXTRACT_UTM(url, "brand")).toEqual(expected);
  });
});
