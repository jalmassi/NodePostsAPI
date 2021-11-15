const express = require("express");
const posts = require("./routes/posts");
const ping = require("./routes/ping");
const bodyParser = require("body-parser");
const logger = require("morgan");
const handleErrors = require("./middleware/errorHandler");
const app = express();

app.use(logger("combined"));
app.use("/api/posts", posts);
app.use("/api", ping);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const startServer = (port) => {
  try {
    app.listen(port);
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

app.get("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(handleErrors);

startServer(PORT);

module.exports = app;
