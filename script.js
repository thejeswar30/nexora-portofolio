document.addEventListener("DOMContentLoaded", function () {

```
// Get HTML elements
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const yearElement = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


// Mobile navigation
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// Light and dark theme
let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    savedTheme = null;
}

const prefersDark = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

const initialTheme = savedTheme ||
    (prefersDark ? "dark" : "light");

document.body.classList.toggle(
    "dark-theme",
    initialTheme === "dark"
);

function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    const isDark = document.body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

}

updateThemeButton();

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        updateThemeButton();

        const theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Theme switching remains available without storage.
        }

    });

}


// Automatic footer year
if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
}


// Contact form validation
if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formStatus.textContent =
            "Form validated successfully. Email sending is not configured.";

        contactForm.reset();

    });

}
```

});
