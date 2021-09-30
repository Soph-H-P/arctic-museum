const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav__wrapper");

menuButton.addEventListener("click", () => {
  navMenu.classList.contains("menu_open")
    ? navMenu.classList.remove("menu_open")
    : navMenu.classList.add("menu_open");
});

//Search

const addSearchFunction = () => {
  const searchInput = document.querySelector("#search__input");
  searchInput.addEventListener("keyup", (e) => {
    const searchInput = e.target.value;
    const key = e.key;
    if (key === "Enter" && e.target.value.length > 0) {
      window.location.href = `/exhibitions.html?search=${searchInput}`;
    }

    if (key === "Escape") e.target.blur();
  });
};

addSearchFunction();
