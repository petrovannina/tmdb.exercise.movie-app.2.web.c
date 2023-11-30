// --- Start of Modal
// Function to create a new modal element
function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.removeChild(modal);
    adjustModalPositions();
  };

  const modalMessage = document.createElement("p");
  modalMessage.classList.add("modal-message");

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalMessage);
  modal.appendChild(modalContent);

  return modal;
}

// Function to adjust the positions of modals
function adjustModalPositions() {
  const modals = document.querySelectorAll(".modal");
  let topOffset = 60;

  modals.forEach((modal, index) => {
    modal.style.top = topOffset + "px";
    topOffset += modal.offsetHeight + 10;
  });
}
// * End of Modal

export { createModal, adjustModalPositions };