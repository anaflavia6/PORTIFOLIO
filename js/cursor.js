/* =========================================================
   CURSOR / LANTERNA
   =========================================================

   Responsável por:

   - revelar a fotografia conforme o cursor
   - movimento suave da iluminação
   - funcionamento independente para cada fotografia
   - desativação em touch e reduced-motion

========================================================= */

function initCursor() {

    const finePointer =
        window.matchMedia("(pointer: fine)").matches;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
        return;
    }

    const lanterns =
        document.querySelectorAll("[data-lantern]");

    lanterns.forEach((lantern) => {

        initLantern(lantern);

    });
}


/* =========================================================
   CONFIGURAÇÃO DA LANTERNA
========================================================= */

function initLantern(lantern) {

    const scope =
        lantern.closest("[data-lantern-scope]") ||
        lantern;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let active = false;

    let animationFrame = null;


    /* -----------------------------------------------------
       MOUSEMOVE
    ----------------------------------------------------- */

    scope.addEventListener("mousemove", (event) => {

        const rect =
            lantern.getBoundingClientRect();

        targetX =
            event.clientX - rect.left;

        targetY =
            event.clientY - rect.top;


        if (!active) {

            active = true;

            lantern.classList.add(
                "lantern-active"
            );

        }


        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(
                    updateLight
                );

        }

    });


    /* -----------------------------------------------------
       MOVIMENTO SUAVE
    ----------------------------------------------------- */

    function updateLight() {

        currentX +=
            (targetX - currentX) * 0.16;

        currentY +=
            (targetY - currentY) * 0.16;


        lantern.style.setProperty(
            "--mouse-x",
            `${currentX}px`
        );

        lantern.style.setProperty(
            "--mouse-y",
            `${currentY}px`
        );


        const distanceX =
            Math.abs(targetX - currentX);

        const distanceY =
            Math.abs(targetY - currentY);


        if (
            distanceX > 0.5 ||
            distanceY > 0.5
        ) {

            animationFrame =
                requestAnimationFrame(
                    updateLight
                );

        } else {

            animationFrame = null;

        }

    }


    /* -----------------------------------------------------
       SAÍDA DO MOUSE
    ----------------------------------------------------- */

    scope.addEventListener(
        "mouseleave",
        () => {

            active = false;

            lantern.classList.remove(
                "lantern-active"
            );

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame = null;

            }

        }
    );

}