var express = require("express");
var router = express.Router();
var usersUtils = require("../BL/utilsUsers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let users = usersUtils.getAllUsers().then((users) => {
    res.render("users-managment", { users });
  });
});

module.exports = router;
