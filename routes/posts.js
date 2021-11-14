const express = require("express");
const router = express.Router();
const axios = require("axios");
const NodeCache = require("node-cache");
const errorHandler = require("../middleware/errorHandler");
const AppError = require("../errors/appError");
const sort = require("../util/sort");
const processRequestResponse = require("../util/processRequest");
const createTagRequestList = require("../util/createTagRequestList");
const global = require("../util/global");

const cache = new NodeCache({ stdTTL: 300 });

let tagRequests = [];

router.get(`/`, async (req, res, next) => {
  const tagParams = req.query.tag;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";
  const cacheKey = `${tagParams}${sortBy}${direction}`;

  if (cache.has(cacheKey)) {
    res.send(cache.get(cacheKey));
  } else {
    await createTagRequestList(tagRequests, { tag: tagParams, sortBy: sortBy, direction: direction });
    await Promise.all(tagRequests)
      .then((response) => {
        if (!response.length) {
          next(new AppError("No posts have requested tag(s)", 400));
        } else {
          const posts = processRequestResponse(response);
          sort(posts, direction, sortBy);
          cache.set(cacheKey, posts);
          res.send(posts);
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

router.get(`/`, async (req, res, next) => {
  console.log(req.originalUrl);
  const tagParams = req.query.tagParams;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";
  const cacheKey = `${tagParams}${sortBy}${direction}`;
  if (cache.has(cacheKey)) {
    res.send(cache.get(cacheKey));
  } else {
    await axiosInstance
      .get(``, { params: { tagParams: tagParams, sortBy: sortBy, direction: direction } })
      .then((response) => {
        if (!response.data.posts.length) {
          next(new AppError("No posts have requested tagParams", 400));
        } else {
          let posts = [...response.data.posts];
          console.log(`${tagParams} - ${sortBy} - ${direction}`);
          sort(posts, direction, sortBy);
          const resPosts = new Object();
          resPosts.posts = posts;
          cache.set(cacheKey, resPosts);
          res.send(resPosts);
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

router.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(errorHandler);

module.exports = router;
