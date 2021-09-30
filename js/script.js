const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav__wrapper");

menuButton.addEventListener("click", () => {
    navMenu.classList.contains("menu_open")
    ? navMenu.classList.remove("menu_open")
    : navMenu.classList.add("menu_open");
});
