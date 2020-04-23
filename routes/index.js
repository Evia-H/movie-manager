var express = require("express");
var router = express.Router();
let utils = require("../BL/utils");
let moviesDAL = require("../DAL/moviesDAL");
let session = require("express-session");

router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  session.username = username;
  utils.authenticateUser(username, password).then((auth) => {
    auth ? res.render("main-menu", { username }) : res.render("login");
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
  let { name, language, genre } = req.body;

  utils.getNextMovieId().then((id) => {
    let newMovie = {
      id,
      name,
      language,
      genre: genre ? genre : [],
    };
    console.log(newMovie);
    moviesDAL.saveNewMovie(newMovie);
    res.render("main-menu", { username: session.username });
  });
});

module.exports = router;
