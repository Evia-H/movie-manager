const moviesDal = require("../DAL/moviesDAL");
const usersDal = require("../DAL/usersDal");

const getMoviesData = (exports.getMoviesData = async () => {
  return await moviesDal.getMovies();
});

const getNewMoviesData = (exports.getNewMoviesData = async () => {
  return await moviesDal.getNewMovies();
});

const getAllMoviesData = (exports.getAllMoviesData = async () => {
  let { data } = await moviesDal.getMovies();
  let { movies } = await moviesDal.getNewMovies();
  let allMovies = [...data, ...movies];
  return allMovies;
});

const getExtendedMovieData = (exports.getExtendedMovieData = async (movies) => {
  let allMovies = await getAllMoviesData();

  movies = movies.map((mainMovie) => {
    let relatedMovies = [];
    allMovies.forEach((searchedMovie) => {
      if (searchedMovie.id !== mainMovie.id) {
        let hasGenre = searchedMovie.genres.some((s) =>
          mainMovie.genres.includes(s)
        );
        if (hasGenre) relatedMovies.push(searchedMovie);
      }
    });
    mainMovie = { ...mainMovie, relatedMovies };
    return mainMovie;
  });

  return movies;
});

exports.authenticateUser = async (username, password) => {
  let users = await usersDal.getUsers();
  let isAuth =
    users.filter((user) => {
      return user.username === username && user.password === password;
    }).length > 0;

  return isAuth;
};

const getNextMovieId = (exports.getNextMovieId = async () => {
  let movies = await getAllMoviesData();

  return movies.length + 1;
});

exports.findMovies = async (nameSearch, languageSearch, genre) => {
  let movies = await getAllMoviesData();

  if (nameSearch) {
    movies = movies.filter(({ name }) => name.includes(nameSearch));
    if (movies.length === 0) return [];
  }

  if (languageSearch) {
    movies = movies.filter(({ language }) => language === languageSearch);
    if (movies.length === 0) return [];
  }

  if (genre) {
    movies = movies.filter(({ genres }) => genres.includes(genre));
    if (movies.length === 0) return [];
  }

  let extendedMovieData = await getExtendedMovieData(movies);

  return extendedMovieData;
};

exports.getMovieDetails = async (id) => {
  let movies = await getAllMoviesData();
  return movies.find((x) => x.id == id);
};

exports.saveNewMovie = async (name, language, genres) => {
  getNextMovieId().then((id) => {
    let newMovie = {
      id,
      name,
      language,
      genres: genres ? genres : [],
    };
    moviesDal.saveNewMovie(newMovie);
  });
};
