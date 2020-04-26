var express = require("express");
var router = express.Router();
var usersUtils = require("../BL/utilsUsers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  usersUtils.getAllUsers().then((users) => {
    res.render("users-managment", { users });
  });
});

router.get("/user-data", function (req, res, next) {
  let user = {
    username: "",
    password: "",
    createdDate: "",
    numOfTransactions: 0,
  };

  res.render("user-data", { user, btn: "Save" });
});

router.get("/user-data/:id", function (req, res, next) {
  usersUtils.getUserById(req.params.id).then((user) => {
    res.render("user-data", { user, btn: "Update" });
  });
});

router.get("/delete-user-data/:id", function (req, res, next) {
  usersUtils.deleteUserById(req.params.id).then((users) => {
    res.render("users-managment", { users });
  });
});

router.post("/save-user-data", function (req, res, next) {
  let { btn } = req.body;
  let { username, password, createdDate, numOfTransactions } = req.body;
  let user = { username, password, createdDate, numOfTransactions };

  usersUtils.saveUser(user, btn).then((users) => {
    res.render("users-managment", { users });
  });
});

module.exports = router;
