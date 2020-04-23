const jsonfile = require("jsonfile");

exports.getUsers = async () => await jsonfile.readFile("data/users.json");
