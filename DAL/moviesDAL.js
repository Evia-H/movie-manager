const axios = require("axios");
const jsonfile = require("jsonfile");

exports.getMovies = async () => {
  return await axios.get("https://api.tvmaze.com/shows");
};

const getNewMovies = (exports.getNewMovies = async () => {
  return await jsonfile.readFile("data/newMovies.json");
});

exports.saveNewMovie = async (newMovie) => {
  let { movies } = await getNewMovies();
  movies.push(newMovie);
  jsonfile.writeFile("data/newMovies.json", { movies }, (err) => {
    if (err) throw err;
  });
};
