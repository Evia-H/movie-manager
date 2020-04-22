var express = require("express");
var router = express.Router();
let utils = require("../BL/utils");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(utils.getMoviesData());
  res.render("index", { title: "Evia" });
});

module.exports = router;
