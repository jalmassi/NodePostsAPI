const express = require("express");
const axios = require("axios");
const mocha = require("mocha");
let chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const global = require("../util/global");
const request = require("supertest");
const postsDefaultResponse = require("./mocks/posts-tech-id-asc");

chai.use(require("chai-sorted"));

const app = require("../app.js");

const noTagError = {
  status: "BAD_REQUEST",
  message: "Bad request",
  details: "No tag parameter included",
};

const apiNoTagError = { error: "The tag parameter is required" };

describe("Posts API app tests", () => {
  describe("express API request tests", () => {
    it("ping success test", function (done) {
      request(app).get("/api/ping").expect("Content-Type", /json/).expect(200, { success: true }, done);
    });
    it("return posts with one tag ('tech') and other params are default (parameters: 'tech', 'id', 'asc')", function (done) {
      request(app).get("/api/posts").query({ tag: "tech" }).expect("Content-Type", /json/).expect(200, postsDefaultResponse, done);
    });
    it("return fail test - no tag parameter (parameters: '', 'id', 'asc')", function (done) {
      request(app).get("/api/posts").query({ tag: "" }).expect("Content-Type", /json/).expect(400, noTagError, done);
    });
    it("return posts test - multiple tag parameter (parameters: 'tech,health', 'id', 'asc')", function (done) {
      request(app).get("/api/posts").query({ tag: "tech,health" }).expect("Content-Type", /json/).expect(200, done);
    });
    it("return posts test - sort by reads in ascending order (parameters: 'culture'', 'reads', 'asc')", function (done) {
      request(app).get("/api/posts").query({ tag: "culture", sortBy: "reads" }).expect("Content-Type", /json/).expect(200, done);
    });
    it("return posts test - sort by reads in descending order (parameters: 'politics', 'reads', 'desc')", function (done) {
      request(app).get("/api/posts").query({ tag: "culture", sortBy: "reads", direction: "desc" }).expect("Content-Type", /json/).expect(200, done);
    });
    it("return posts test - sort by authorId in EXPLICIT query parameter of descending order  (parameters: 'politics', 'authorId', 'asc')", function (done) {
      request(app).get("/api/posts").query({ tag: "politics", sortBy: "authorId", direction: "asc" }).expect("Content-Type", /json/).expect(200, done);
    });
    it("check if posts are in ascending order for 'popularity'  (parameters: 'politics', 'popularity', 'asc')", function (done) {
      request(app)
        .get("/api/posts")
        .query({ tag: "politics", sortBy: "popularity", direction: "asc" })
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          chai.expect(res.body.posts).to.be.sortedBy("popularity", { descending: false });
          done();
        });
    });
    it("check if posts are in descending order for 'reads' - sort by authorId in EXPLICIT query parameter of descending order  (parameters: 'politics', 'reads', 'desc')", function (done) {
      request(app)
        .get("/api/posts")
        .query({ tag: "politics", sortBy: "reads", direction: "desc" })
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          chai.expect(res.body.posts).to.be.sortedBy("reads", { descending: true });
          done();
        });
    });
  });
  describe("API HTTP request tests", function () {
    it("API success test (parameters: 'tech', 'id', 'asc')", function (done) {
      request(`${global.URL}?tag=tech`).get("").expect("Content-Type", /json/).expect(200, postsDefaultResponse, done);
    });
    it("API fail test - no tag parameter (parameters: '', 'id', 'asc')", function (done) {
      request(`${global.URL}?tag=`).get("").expect("Content-Type", /json/).expect(400, apiNoTagError, done);
    });
  });
});