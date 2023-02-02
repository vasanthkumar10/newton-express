const index = require("../index");
const db = require("../db");

describe("applyDiscount", () => {
  it("should apply discount if user has more than 10 points", () => {
    // db.getCustomerData = function (customerId) {
    //   //   console.log("reading from mock function");
    //   return { id: customerId, points: 15 };
    // };

    const order = { customerId: 10, totalPrice: 2000 };
    const result = index.applyDiscount(order);
    expect(result).toBe(2000 * 0.9);
  });

  it("should not apply discount if user has less than 10 points", () => {
    db.getCustomerData = function (customerId) {
      //   console.log("reading from mock function");
      return { id: customerId, points: 8 };
    };

    const order = { customerId: 10, totalPrice: 2000 };
    const result = index.applyDiscount(order);
    expect(result).toBe(2000);
  });
});
