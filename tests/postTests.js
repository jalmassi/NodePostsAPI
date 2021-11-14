const axios = require("axios");
const mocha = require("mocha");
const assert = require("chai").assert;
const global = require("global");
const request = require("supertest")("https://airportgap.dev-tester.com/api");

describe("Posts API app", () => {
  describe("GET /posts with tags", function () {
    it("returns posts with 'tech' tag", async function () {
      const response = await axios.get("/airports");

      expect(response.status).to.eql(200);
      expect(response.body.data.length).to.eql(30);
    });
  });
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
