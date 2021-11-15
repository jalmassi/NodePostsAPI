const express = require("express");
const router = express.Router();
const axios = require("axios");
const errorHandler = require("../middleware/errorHandler");
let AppError = require("../errors/appError");

router.get("/ping", (req, res, next) => {
  res.status(200).send({
    success: true,
  });
});

router.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(errorHandler);

module.exports = router;
