const usersDAL = require("../DAL/usersDal");

const getAllUsers = (exports.getAllUsers = async () =>
  await usersDAL.getUsers());

const getUserById = (exports.getUserById = async (username) => {
  let users = await getAllUsers();
  return users.find((user) => user.username === username);
});

exports.deleteUserById = async (username) => {
  let users = await getAllUsers();
  users = users.filter((user) => user.username !== username);
  usersDAL.saveUsers(users);
  return users;
};

exports.saveUser = async (user, type) => {
  if (type === "Save") {
    return await save(user);
  } else {
    return await update(user);
  }
};

exports.getUserCredit = async (username) => {
  let user = await getUserById(username);
  return user.numOfTransactions;
};

exports.checkCredit = async (username) => {
  if (username === "admin") return true;

  let user = await getUserById(username);
  console.log(user.numOfTransactions);
  if (user.numOfTransactions <= 0) {
    return false;
  }

  return true;
};

exports.useTransaction = async (username) => {
  if (username === "admin") return true;

  let user = await getUserById(username);

  user.numOfTransactions--;
  update(user);
  return true;
};

const save = async (user) => {
  let users = await getAllUsers();
  users.push(user);
  usersDAL.saveUsers(users);
  return users;
};

const update = async (user) => {
  let users = await getAllUsers();
  users = users.map((userData) => {
    if (userData.username === user.username) {
      userData = { ...user };
    }
    return userData;
  });
  usersDAL.saveUsers(users);
  return users;
};
