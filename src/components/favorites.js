// --- Start of Favorites functionality
import {
  main,
  pagination,
  favoritesButton,
  removeAllButton,
  createButton
} from "./config";
import { showMovies } from "./movie";
import { createModal, adjustModalPositions } from "./modal";

// Function to add a movie to favorites
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Create a new modal element
  const newModal = createModal();
  document.body.appendChild(newModal);

  const modalMessage = newModal.querySelector(".modal-message");

  if (modalMessage) {
    const modalNumber = document.querySelectorAll(".modal").length + 1;
    newModal.dataset.modalNumber = modalNumber;

    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      modalMessage.textContent = `Movie added to favorites!`;
    } else {
      modalMessage.textContent = `Movie is already in favorites!`;
    }

    // Display the new modal
    newModal.style.display = "block";

    // Adjust the position of the new modal
    adjustModalPositions();

    // Close the new modal after 10 seconds
    setTimeout(() => {
      // Check if the newModal is still a child of the document.body
      if (document.body.contains(newModal)) {
        newModal.style.display = "none";
        // Remove the new modal from the DOM after it disappears
        document.body.removeChild(newModal);
        // Adjust the position of remaining modals
        adjustModalPositions();
      } else {
        console.error("newModal is not a child or was already deleted");
      }
    }, 3000);
  } else {
    console.error("Modal message element not found");
  }
}

// Function to show favorites
function showFavorites() {
  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Display favorites in the main container
  showMovies(favorites);
  pagination.classList.add("hidden");

  // Toggle visibility of "Remove All" button based on whether there are favorites
  removeAllButton.style.display =
    favorites.length > 0 ? "inline-block" : "none";

  // Attach a "Remove from Favorite" button for each movie
  const movieElementsFromFavorite = document.querySelectorAll(".movie");
  movieElementsFromFavorite.forEach((element) => {
    const movieId = element.dataset.movieId;
    const removeFromFavoriteButton = createButton("X", () =>
      removeFromFavorites(movieId)
    );
    removeFromFavoriteButton.classList.add("remove-from-favorite");

    element.appendChild(removeFromFavoriteButton);
  });

  // Add the 'hidden' class to all elements with the class 'add-to-favorite'
  const addToFavoriteButtons = document.querySelectorAll(".add-to-favorite");
  addToFavoriteButtons.forEach((button) => {
    button.classList.add("hidden");
  });

  // Update the URL to include '/favorite'
  history.pushState(null, null, "/favorite");

  // Check if there are no favorites
  if (favorites.length === 0) {
    // Create a paragraph element with a message
    const noFavoritesMessage = document.createElement("p");
    noFavoritesMessage.innerHTML = `You have no favorite movies. Add some movies to your favorites! </br>
              If you want to see all the movies, click the logo`;

    noFavoritesMessage.classList.add("no-favorite-message");
    // Append the message to the body
    main.appendChild(noFavoritesMessage);
    // Hide the "Remove All" button
    removeAllButton.style.display = "none";
  }
}

// Function to remove all movies from favorites
function removeAllFavorites() {
  // Clear favorites in local storage
  localStorage.removeItem("favorites");

  // Display updated favorites (which will be an empty array)
  showFavorites();
}

// Remove from favorite function
function removeFromFavorites(movieId) {
  // Retrieve existing favorites from local storage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is in favorites
  const updatedFavorites = favorites.filter(
    (fav) => String(fav.id) !== String(movieId)
  ); // Compare as strings

  if (updatedFavorites.length !== favorites.length) {
    // Update the local storage with the new favorites array
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Display updated favorites
    showFavorites();
  }
  // else {
  //   modalMessage.textContent = "Movie is not in favorites!";
  // }
}

// when resize
// Function to update the button text based on screen width
// function updateButtonText() {
//   // Check if the screen width is greater than 992px
//   if (window.innerWidth > 992) {
//     favoritesButton.innerHTML = "Favorites";
//     removeAllButton.innerHTML = "Remove All";
//   } else {
//     // Use the heart icon if the screen width is 992px or smaller
//     favoritesButton.innerHTML = "&#10084;";
//     removeAllButton.innerHTML = "&#128465;";
//   }
// }

// Call the function initially to set the button text
// updateButtonText();
//* End of favorite functionality

 export {
  addToFavorites,
  showFavorites,
  removeAllFavorites,
  removeFromFavorites,
//   updateButtonText,
};