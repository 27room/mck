/* =========================
NAVBAR + MOBILE MENU
========================= */

const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");

const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

/* =========================
LIGHTBOX
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

/* всички снимки със zoom */
const zoomImages = document.querySelectorAll(".zoom-img");

zoomImages.forEach(img => {

    img.addEventListener("click", () => {

        if (!lightbox || !lightboxImg) return;

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

/* бутон за затваряне */
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

/* затваряне при клик извън снимката */
if (lightbox) {

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

/* затваряне с ESC */
document.addEventListener("keydown", e => {

    if (e.key === "Escape" && lightbox) {
        lightbox.style.display = "none";
    }

});

/* =========================
NAVBAR SCROLL EFFECT
========================= */

if (navbar) {

    window.addEventListener("scroll", () => {

        navbar.classList.toggle("scrolled", window.scrollY > 50);

    });
}

/* =========================
MOBILE MENU
========================= */

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    mobileMenuOverlay.classList.add("open");
    mobileMenuBtn.classList.add("active");
    document.body.classList.add("menu-open");
}

function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    mobileMenuOverlay.classList.remove("open");
    mobileMenuBtn.classList.remove("active");
    document.body.classList.remove("menu-open");

}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
}

mobileNavLinks.forEach(link => {

    link.addEventListener("click", closeMobileMenu);

});

/* =========================
SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* =========================
ACTIVE NAV LINK
========================= */

function highlightNav() {

    const scroll = window.scrollY + 150;

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.id;

        if (scroll >= top && scroll < top + height) {

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + id
                );

            });

            mobileNavLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + id
                );

            });
        }
    });
}

window.addEventListener("scroll", highlightNav);