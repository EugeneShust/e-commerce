// functions to set and get data from local storage
function addFavorite(item) {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  console.log(item, movies);
  try {
    if (movies.some((x) => x.id === item.id)) {
      throw new FavoriteAddError();
    }

    movies.push(item);

    localStorage.setItem('movies', JSON.stringify(movies));
    return movies;
  } catch (error) {
    if (error instanceof FavoriteAddError) {
      alert('This favorite already exists!');
    } else {
      throw error;
    }
  }
}

function removeFavorite(item) {
  let movies = JSON.parse(localStorage.getItem('movies')) || [];

  movies = movies.filter((x) => x.id !== item.id);
  localStorage.setItem('movies', JSON.stringify(movies));
}

function getFavorites() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}

class FavoriteAddError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FavoriteAddError';
  }
}

export { addFavorite, removeFavorite, getFavorites };
