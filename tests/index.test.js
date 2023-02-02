const index = require("../index");

// describe("absolute", () => {
//   test("should return positive number when number is positive", () => {
//     const result = index.absolute(25);
//     expect(result).toBe(25);
//   });

//   test("should return positive number when number is negative", () => {
//     const result = index.absolute(-25);
//     expect(result).toBe(25);
//   });

//   test("should return zero when number is zero", () => {
//     const result = index.absolute(0);
//     expect(result).toBe(0);
//   });
// });

// describe("greet", () => {
//   // test === it
//   // test.only === fit
//   it("should return greeting message", () => {
//     const result = index.greet("vasanth");
//     expect(result).toBe("Welcome vasanth");
//   });

//   it("should return greeting message if name in mixedCases", () => {
//     const result = index.greet("Vasanth");
//     expect(result).toMatch(/Welcome vasanth/i);
//   });

//   it("should contain greeting message", () => {
//     const result = index.greet("vasanth");
//     expect(result).toContain("Welcome vasanth");
//   });
// });

describe("getCurrencies", () => {
  it("should return currencies", () => {
    const result = index.getCurrencies();

    // general way
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // specific way
    // expect(result.length).toBe(3);
    // expect(result[0]).toBe("USD");
    // expect(result[1]).toBe("INR");
    // expect(result[2]).toBe("EUR");

    // good way
    expect(result).toContain("USD");
    expect(result).toContain("INR");
    expect(result).toContain("EUR");

    // best way
    expect(result).toEqual(expect.arrayContaining(["USD", "INR", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return product when id is passed", () => {
    const result = index.getProduct(1);
    // expect(result).toBe({ id: 1, price: 10 }); // error
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
    expect(result).toHaveProperty("price", 10);
  });
});
