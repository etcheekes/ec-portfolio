document.addEventListener('DOMContentLoaded', function() {

    // smaller screen size value
    const breakpointWidth = 901; 

    // reference toggle button
    const navbarToggle = document.querySelector('.nav-modal-dropdown-toggle'); // reference toggle button

    /* toggle nav bar */
    const modalWindow = document.querySelector('.nav-modal-dropdown'); // reference modal window containing links
    // button functionality
    navbarToggle.addEventListener('click', () => {
        // if links not visible, make visible
        if (modalWindow.style.display !== "flex") {
            modalWindow.style.display = "flex";
        // make links invisible
        } else {
            modalWindow.style.display = "none";
        }
    });

    // modal window links disappear over certain screen size
    window.addEventListener('resize', () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= breakpointWidth) {
            modalWindow.style.display = "none";
        }
    });

    // animate hamburger lines to form cross
    navbarToggle.addEventListener("click", () => {
        // CSS for X shape
        navbarToggle.classList.toggle("active");
    });

    // toggle off cross if screen width changes
    window.addEventListener('resize', () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= breakpointWidth && navbarToggle.classList.contains("active")) {
            navbarToggle.classList.toggle("active");
        }
    })
});