// --- Start of movie component
import {
  IMG_URL,
  main,
  controlPanelEl,
  prev,
  next,
  current,
  currentPage,
  totalPages,
  createButton
} from "./config";
import {
  addToFavorites,
} from "./favorites";
// import { next, prev } from "./pagination";

class Movie {
  constructor({ title, poster_path, id, release_date }) {
    this.title = title;
    this.poster_path = poster_path;
    this.id = id;
    this.release_date = release_date;
  }

  formatDate() {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(this.release_date).toLocaleDateString(undefined, options);
  }

  createMovieElement() {
    const formattedReleaseDate = this.formatDate();
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.dataset.movieId = this.id;

    movieEl.innerHTML = `
      <img src="${
        this.poster_path
          ? IMG_URL + this.poster_path
          : "http://via.placeholder.com/1080x1580"
      }" alt="${this.title}">
      <div class="movie-info">
          <h3>${this.title}</h3>
          <span>${formattedReleaseDate}</span>
      </div>
    `;

    const addToFavoriteButton = createButton("+", () => addToFavorites(this));
    addToFavoriteButton.classList.add("add-to-favorite");
    movieEl.appendChild(addToFavoriteButton);

    return movieEl;
  }
}

// Usage
function showMovies(data) {
  main.innerHTML = "";
  console.log(data);

  data.forEach((movieData) => {
    const movie = new Movie(movieData);
    const movieEl = movie.createMovieElement();
    main.appendChild(movieEl);
  });
}

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length !== 0) {
        showMovies(data.results);
        console.log(currentPage);
      currentPage = data.page;
        nextPage = currentPage + 1;
        console.log(nextPage);
        prevPage = currentPage - 1;
        console.log(prevPage);
      totalPages = data.total_pages;

      current.innerText = currentPage;

      prev.classList.toggle("disabled", currentPage <= 1);
      next.classList.toggle("disabled", currentPage >= totalPages);

      controlPanelEl.scrollIntoView({ behavior: "smooth" });
    } else {
      main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
//* End of movie component


export { Movie, showMovies, getMovies };