const dalMovies = require("../DAL/moviesDAL");

exports.getMoviesData = async () => {
  let moviesData = await dalMovies.getMovies();

  console.log(moviesData);
};
