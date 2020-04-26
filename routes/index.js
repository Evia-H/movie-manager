var express = require("express");
var router = express.Router();
let utils = require("../BL/utils");
let utilsUsers = require("../BL/utilsUsers");
let moviesDAL = require("../DAL/moviesDAL");
let session = require("express-session");

router.get("/", function (req, res, next) {
  res.render("login");
});

router.get("/main-menu", function (req, res, next) {
  res.render("main-menu", { username: req.session.username, message: "" });
});

router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  req.session.username = username;
  utils.authenticateUser(username, password).then((auth) => {
    auth
      ? res.render("main-menu", { username, message: "" })
      : res.render("login");
  });
});

router.get("/error", function (req, res, next) {
  let messageQuery = req.query.message;
  res.render("error", { message: messageQuery });
});

router.get("/create-movie", function (req, res, next) {
  res.render("create-movie");
});

router.post("/create-movie", function (req, res, next) {
  let { name, language, genres } = req.body;

  utilsUsers.checkCredit(req.session.username).then((hasCredit) => {
    if (hasCredit) {
      utils.saveNewMovie(name, language, genres);
      utilsUsers.useTransaction(req.session.username);
      res.render("main-menu", {
        username: req.session.username,
        message: "",
      });
    } else {
      res.render("main-menu", {
        username: req.session.username,
        message: "You have no credit left",
      });
    }
  });
});

router.get("/search-movie", function (req, res, next) {
  res.render("search-movie");
});

router.post("/search-movie", function (req, res, next) {
  let { name, language, genres } = req.body;

  utils.findMovies(name, language, genres).then((movies) => {
    res.render("search-results", { movies });
  });
});

router.get("/movie-details/:id", function (req, res, next) {
  utils.getMovieDetails(req.params.id).then((movie) => {
    res.render("movie-details", { movie });
  });
});

module.exports = router;
