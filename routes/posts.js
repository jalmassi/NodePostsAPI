const express = require("express");
const router = express.Router();
const axios = require("axios");
const errorHandler = require("../middleware/errorHandler");
const AppError = require("../errors/appError");
const sort = require("../util/sort");

const axiosInstance = axios.create({
  baseURL: "https://api.hatchways.io/assessment/blog/posts",
});

router.get(`/`, async (req, res, next) => {
  console.log(req.originalUrl);
  const tag = req.query.tag;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";
  axiosInstance
    .get(``, { params: { tag: tag, sortBy: sortBy, direction: direction } })
    .then((response) => {
      if (!response.data.posts.length) {
        next(new AppError("No posts have requested tag", 400));
      } else {
        let posts = [...response.data.posts];
        console.log(`${tag} - ${sortBy} - ${direction}`);
        sort(posts, direction, sortBy);
        // console.log(posts);
        const resPosts = new Object();
        resPosts.posts = posts;
        res.send(resPosts);
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(errorHandler);

module.exports = router;
