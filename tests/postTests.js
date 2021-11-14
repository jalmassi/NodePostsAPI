const mocha = require('mocha');
const assert = require('chai').assert;
const request = require("supertest")("https://airportgap.dev-tester.com/api");

describe("Posts API app", () => {
  describe("tag is 'tech'", () => {
    it("request should return more than 1", () => {
      // let result = app.sayHello();
      assert.equal(sayHelloResult, "hello");
    });

    it("sayHello should return type string", () => {
      // let result = app.sayHello();
      assert.typeOf(sayHelloResult, "string");
    });
  });
  describe("addNumbers()", () => {
    it("addNumbers should be above 5", () => {
      // let result = app.addNumbers(3, 4);
      assert.isAbove(addNumbersResult, 5);
    });

    it("addNumbers should return type number", () => {
      let result = app.addNumbers(3, 4);
      assert.typeOf(addNumbersResult, "number");
    });
  });
});
