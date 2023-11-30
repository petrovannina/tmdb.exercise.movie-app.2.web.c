import "./styles/main.scss";
// Import the variables and functions from config.js
import {
  API_KEY,
  BASE_URL,
  API_URL,
  searchURL,
  form,
  search,
  controlPanelEl,
  pagination,
  prev,
  next,
  logo,
  favoritesButton,
  removeAllButton,
  nextPage,
  prevPage,
  lastUrl,
  totalPages,
} from "./components/config";
import {  getMovies } from "./components/movie";
import {
  setGenre,
} from "./components/genre";
// import {
//   updateButtonText,
// } from "./components/favorites";
import { pageCall } from "./components/pagination";

// --- Start of Favorites functionality
// Add class 'favorites' and appent to controlPanel
favoritesButton.classList.add("favorite");
controlPanelEl.appendChild(favoritesButton);
// Add class 'remove-all' and append to controlPanel
removeAllButton.classList.add("remove-all");
controlPanelEl.appendChild(removeAllButton);
removeAllButton.style.display = "none"; // Hide initially
// Add an event listener to update the button text on window resize
// window.addEventListener("resize", updateButtonText);
//* End of favorite functionality



// --- Start of header functionality
// Add an event listener to the logo
logo.addEventListener("click", function () {
  // Remove '/favorite' from the URL
  history.pushState(null, null, "/");
  pagination.classList.remove("hidden");
  // Call the function to show the home page content
  getMovies(API_URL);
});

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();

  // Use template literals for string concatenation
  const url = searchTerm ? `${searchURL}&query=${searchTerm}` : API_URL;
  getMovies(url);
});
// *End of header functionality



// --- Start pagination
// Refactored pageCall function

// Event listener for previous button
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    // Update lastUrl before calling pageCall
    lastUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}&page=${prevPage}`;
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none"; // Hide the loader after 500 milliseconds
      pageCall(prevPage);
    }, 500);
  }
});

// Event listener for next button
next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    console.log(lastUrl);
    // Update lastUrl before calling pageCall
    lastUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}&page=${nextPage}`;
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
      pageCall(nextPage);
    }, 500);
  }
});
// *End pagination




// --- start loader
document.addEventListener("DOMContentLoaded", function () {
  const loaderWrapper = document.getElementById("loader-wrapper");

  // Check if the element exists before accessing its style
  if (loaderWrapper) {
    // Display the loader and overlay
    loaderWrapper.style.display = "block";

    // Hide the loader and overlay after 5 seconds
    setTimeout(function () {
      loaderWrapper.style.display = "none";

      // Remove the loader wrapper from the DOM after hiding
      // setTimeout(function () {
      //   loaderWrapper.parentNode.removeChild(loaderWrapper);
      // }, 500);
    }, 500);
  } else {
    console.error('Element with ID "loader-wrapper" not found');
  }
});
// *End the loader




// Shows the *home page 
getMovies(API_URL);


// updateButtonText dosen't function cum trebuie inca
// pagination inca nu merge cum trebuie