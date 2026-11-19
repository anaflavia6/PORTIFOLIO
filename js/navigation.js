/*
 * =========================================================
 * NAVIGATION
 * =========================================================
 *
 * Responsável por:
 *
 * - menu principal
 * - menu mobile
 * - fechamento do menu
 * - navegação interna
 * - scroll suave
 * =========================================================
 */


function initNavigation() {

    initMobileMenu();

    initSmoothScroll();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle =
        document.querySelector(".nav-toggle");

    const navigation =
        document.querySelector(".nav-links");


    /*
     * O menu mobile ainda pode não existir.
     */

    if (!toggle || !navigation) {
        return;
    }


    toggle.addEventListener("click", () => {

        const isOpen =
            toggle.getAttribute("aria-expanded")
            === "true";


        toggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        navigation.classList.toggle(
            "nav-open",
            !isOpen
        );


        document.body.classList.toggle(
            "menu-open",
            !isOpen
        );

    });


    /*
     * Fecha o menu quando um link é clicado.
     */

    const links =
        navigation.querySelectorAll("a");


    links.forEach((link) => {

        link.addEventListener("click", () => {

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );


            navigation.classList.remove(
                "nav-open"
            );


            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}