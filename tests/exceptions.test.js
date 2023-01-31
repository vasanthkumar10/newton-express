const index = require("../index");

describe("registerUser", () => {
  it("should throw error when username is falsy", () => {
    // FALSY -> false, null, undefined, '', 0
    // expect(() => {
    //   index.registerUser(null);
    // }).toThrow();

    const args = [false, null, undefined, "", 0];
    args.forEach((arg) => {
      expect(() => {
        index.registerUser(arg);
      }).toThrow();
    });
  });

  it("should return user when username is valid", () => {
    const result = index.registerUser("vasanth");
    expect(result).toMatchObject({ id: 1, username: "vasanth" });
  });
});
