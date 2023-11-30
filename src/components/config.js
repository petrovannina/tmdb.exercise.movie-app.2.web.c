// -- Start of configuration setting/variables
import {
  showFavorites,
  removeAllFavorites
} from "./favorites";

// TMDB configurations
const API_KEY = "api_key=280cea638de62fa610523ecbebf23321";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

// variables
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const controlPanelEl = document
  .getElementById("control-panel")
  .querySelector(".container");
const pagination = document.querySelector(".pagination");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");
const logo = document.querySelector(".logo");
const favoritesButton = createButton("Favorites", showFavorites);
const removeAllButton = createButton("Remove All", removeAllFavorites);

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;
let selectedGenre = [];

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 53, name: "Thriller" },
  { id: 37, name: "Western" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10751, name: "Family" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
];
//* End of configuration setting/variables


// --- Start of general functions
function createButton(text, clickHandler) {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", clickHandler);
  return button;
}
// *End of general functions

export {
    API_KEY,
    BASE_URL,
    API_URL,
    IMG_URL,
    searchURL,
    main,
    form,
    search,
    controlPanelEl,
    pagination,
    prev,
    next,
    current,
    logo,
    favoritesButton,
    removeAllButton,
    currentPage,
    nextPage,
    prevPage,
    lastUrl,
    totalPages,
    selectedGenre,
    genres,
    createButton
};