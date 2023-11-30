// --- Start Genre
import {
  API_URL,
  controlPanelEl,
  selectedGenre,
  genres,
} from "./config";
import { getMovies } from "./movie";


setGenre();

function setGenre() {
  // controlPanelEl.innerHTML = "";

  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown");

  const dropdownButton = document.createElement("button");
  dropdownButton.innerText = "Genres";
  dropdownButton.classList.add("dropbtn");

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");

  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      toggleGenreSelection(genre.id);
    });
    dropdownContent.append(t);
  });

  dropdownContainer.appendChild(dropdownButton);
  dropdownContainer.appendChild(dropdownContent);
  controlPanelEl.appendChild(dropdownContainer);
}

function toggleGenreSelection(id) {
  const index = selectedGenre.indexOf(id);
  if (index !== -1) {
    selectedGenre.splice(index, 1);
  } else {
    selectedGenre.push(id);
  }

  getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
  highlightSelection();
}

function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => tag.classList.remove("highlight"));
  // clearGenresBtn();

  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag && highlightedTag.classList.add("highlight");
    });
  }
}
// *End Genre

export {
    setGenre,
    toggleGenreSelection,
    highlightSelection,
};