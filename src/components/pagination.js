// --- Start pagination
// Refactored pageCall function
import {
  lastUrl
} from "./config";
import { getMovies } from "./movie";
// import {
//   updateButtonText,
// } from "./components/favorites";

function pageCall(page) {
  // Check if lastUrl is defined before splitting
  if (lastUrl) {
    const urlSplit = lastUrl.split("?");
    const queryParams = urlSplit[1] ? urlSplit[1].split("&") : [];
    const key = queryParams[queryParams.length - 1]
      ? queryParams[queryParams.length - 1].split("=")
      : [];

    // Use ternary operator for cleaner conditional
    const url =
      key[0] !== "page"
        ? `${lastUrl}&page=${page}`
        : `${urlSplit[0]}?${queryParams.join("&")}&${key[0]}=${page}`;

    getMovies(url);
  } else {
    console.error("lastUrl is undefined");
  }
}

// // Event listener for previous button
// prev.addEventListener("click", () => {
//   if (prevPage > 0) {
//     // Update lastUrl before calling pageCall
//     lastUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}&page=${prevPage}`;
//     const loader = document.getElementById("loader-wrapper");
//     loader.style.display = "block";
//     setTimeout(() => {
//       loader.style.display = "none"; // Hide the loader after 500 milliseconds
//       pageCall(prevPage);
//     }, 500);
//   }
// });

// // Event listener for next button
// next.addEventListener("click", () => {
//   if (nextPage <= totalPages) {
//     console.log(lastUrl);
//     // Update lastUrl before calling pageCall
//     lastUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}&page=${nextPage}`;
//     const loader = document.getElementById("loader-wrapper");
//     loader.style.display = "block";
//     setTimeout(() => {
//       loader.style.display = "none";
//       pageCall(nextPage);
//     }, 500);
//   }
// });
// *End pagination

export { pageCall };