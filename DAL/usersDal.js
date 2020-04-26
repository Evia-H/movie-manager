const jsonfile = require("jsonfile");

const { users } = require("../Data/users.json");

const getUsers = (exports.getUsers = async () => await users);

exports.saveUsers = async (users) => {
  jsonfile.writeFile("data/users.json", { users }, (err) => {
    if (err) throw err;
  });
};

exports.saveUser = async (user) => {
  let users = await getUsers();
  users.push(user);
  jsonfile.writeFile("data/users.json", { users }, (err) => {
    if (err) throw err;
  });
  return { users };
};

exports.updateUser = async (user) => {
  let users = await getUsers();
  users = users.map((userData) => {
    if (userData.username === user.username) {
      userData = { ...user };
    }
    return userData;
  });
  jsonfile.writeFile("data/users.json", { users });
  return { users };
};
