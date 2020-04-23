const moviesDal = require("../DAL/moviesDAL");
const usersDal = require("../DAL/usersDal");
const { users } = require("../Data/users.json");

const getMoviesData = (exports.getMoviesData = async () => {
  return await moviesDal.getMovies();
});

const getNewMoviesData = (exports.getNewMoviesData = async () => {
  return await moviesDal.getNewMovies();
});

exports.authenticateUser = async (username, password) => {
  let { users } = await usersDal.getUsers();
  let isAuth =
    users.filter((user) => {
      return user.username === username && user.password === password;
    }).length > 0;

  return isAuth;
};

exports.getNextMovieId = async () => {
  let count = 1;
  let { data } = await moviesDal.getMovies();
  let { movies } = await moviesDal.getNewMovies();
  count += data.length + movies.length;
  return count;
};
