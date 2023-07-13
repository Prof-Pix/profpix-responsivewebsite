const hamburger = document.querySelector(".hamburger-menu");

    hamburger.addEventListener('click', () => {
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");

        hamburger.classList.toggle("active");
    })