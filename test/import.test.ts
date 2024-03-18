import { jsonTo2DArray } from "../src/custom-functions/import";

const testObject = {
  comments: [
    {
      id: 1,
      user: {
        id: 1,
        username: "test",
      },
    },
    {
      id: 2,
      user: {
        id: 2,
        username: "test2",
      },
    },
  ],
  total: 340,
  skip: 0,
  limit: 2,
};

describe("IMPORT", () => {
  it("should flatten an object into 2d array with a given startFromKey", () => {
    const expected = [
      ["id", "user.id", "user.username"],
      [1, 1, "test"],
      [2, 2, "test2"],
    ];
    expect(jsonTo2DArray(testObject, "comments")).toEqual(expected);
  });

  it("should flatten an object into 2d array", () => {
    const expected = [
      [
        "comments.0.id",
        "comments.0.user.id",
        "comments.0.user.username",
        "comments.1.id",
        "comments.1.user.id",
        "comments.1.user.username",
        "total",
        "skip",
        "limit",
      ],
      [1, 1, "test", 2, 2, "test2", 340, 0, 2],
    ];
    expect(jsonTo2DArray(testObject)).toEqual(expected);
  });
});
