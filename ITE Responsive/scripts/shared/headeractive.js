const headerOptions = document.getElementsByClassName("header-option");

// Get the active link from local storage
localStorage.setItem("activeLink", window.location.pathname.split('/').pop());
const activeLink = localStorage.getItem("activeLink");

// Loop through the header options
for (let i = 0; i < headerOptions.length; i++) {
  const currentLink = headerOptions[i];

  // Set the active class if the link matches the stored active link
  if (currentLink.getAttribute("href") === activeLink) {
    currentLink.classList.add("activeHeader");
  }

  // Add event listener to handle click
  currentLink.addEventListener("click", function(event) {
    // Remove active class from other links
    const activeLinks = document.querySelectorAll(".header-option.activeHeader");
    activeLinks.forEach(link => link.classList.remove("activeHeader"));

    // Add active class to clicked link
    currentLink.classList.add("activeHeader");

    // Store the active link in local storage
    localStorage.setItem("activeLink", currentLink.getAttribute("href"));
  });
}
