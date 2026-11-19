/*
 * =========================================================
 * ANIMATIONS
 * =========================================================
 *
 * Responsável por:
 *
 * - parallax sutil no hero
 * - parallax sutil nas fotografias internas
 * - entrada das seções (scroll reveal)
 * =========================================================
 */


function initAnimations() {

    initHeroParallax();

    initPhotoParallax();

    initScrollReveal();

}


/* =========================================================
   HERO PARALLAX
   Movimento mínimo entre nome e fotografia
   ========================================================= */

function initHeroParallax() {

    const hero =
        document.querySelector(".hero");

    const photo =
        document.querySelector(".hero-photo");

    const content =
        document.querySelector(".hero-content");

    if (!hero || !photo || !content) {
        return;
    }

    if (!canAnimate()) {
        return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame = null;

    hero.addEventListener("mousemove", (event) => {

        targetX =
            event.clientX / window.innerWidth - 0.5;

        targetY =
            event.clientY / window.innerHeight - 0.5;

        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(animate);

        }

    });

    function animate() {

        currentX +=
            (targetX - currentX) * 0.06;

        currentY +=
            (targetY - currentY) * 0.06;

        photo.style.transform =
            `translate3d(
                ${currentX * -14}px,
                ${currentY * -10}px,
                0
            )`;

        content.style.transform =
            `translate3d(
                ${currentX * 8}px,
                ${currentY * 6}px,
                0
            )`;

        animationFrame = null;

    }

}


/* =========================================================
   PHOTO PARALLAX
   About e Services — movimento muito sutil
   ========================================================= */

function initPhotoParallax() {

    const items = [
        {
            section: document.querySelector(".about-section"),
            photo: document.querySelector(".about-photo")
        },
        {
            section: document.querySelector(".services-section"),
            photo: document.querySelector(".services-photo")
        }
    ];

    if (!canAnimate()) {
        return;
    }

    items.forEach((item) => {

        if (!item.section || !item.photo) {
            return;
        }

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        let animationFrame = null;

        item.section.addEventListener(
            "mousemove",
            (event) => {

                targetX =
                    event.clientX / window.innerWidth - 0.5;

                targetY =
                    event.clientY / window.innerHeight - 0.5;

                if (!animationFrame) {

                    animationFrame =
                        requestAnimationFrame(animate);

                }

            }
        );

        function animate() {

            currentX +=
                (targetX - currentX) * 0.05;

            currentY +=
                (targetY - currentY) * 0.05;

            item.photo.style.transform =
                `translate3d(
                    ${currentX * -10}px,
                    ${currentY * -7}px,
                    0
                )`;

            animationFrame = null;

        }

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal-section"
        );

    if (!elements.length) {
        return;
    }

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {

        elements.forEach((element) => {

            element.classList.add("is-visible");

        });

        return;

    }

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );

    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================================================
   HELPERS
   ========================================================= */

function canAnimate() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return false;
    }

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return false;
    }

    return true;

}
