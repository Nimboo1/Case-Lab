const closeButton = document.querySelector("#myBtn");
const spoiler = document.querySelector("#spoiler");

closeButton.addEventListener("click", () => {
  spoiler.classList.toggle("closed");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!spoiler.classList.contains("closed")) spoiler.classList.add("closed");
});
