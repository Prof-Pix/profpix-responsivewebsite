const hamburger = document.querySelector(".hamburger-container");
const navBar = document.querySelector(".nav-bar");

    hamburger.addEventListener('click', () => {

        navBar.classList.toggle("active");

            hamburger.classList.toggle("active");
            hamburger.classList.toggle("notactive");
    })

window.onclick = function(event) {
    if ( (!event.target.closest(".nav-bar")) && (!event.target.closest(".hamburger-menu")) ) {
        if (navBar.classList.contains("active")) {
        navBar.classList.toggle("active");

        hamburger.classList.toggle("active");
        hamburger.classList.toggle("notactive");
    }
  }
}