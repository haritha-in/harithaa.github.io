/* ===============================
   CUSTOM CURSOR
================================ */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");

const mouseGlow =
    document.getElementById("mouseGlow");

document.addEventListener(
    "mousemove",
    (e) => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";

        cursorDot.style.left =
            e.clientX + "px";

        cursorDot.style.top =
            e.clientY + "px";

        mouseGlow.style.left =
            e.clientX + "px";

        mouseGlow.style.top =
            e.clientY + "px";

    }
);


/* ===============================
   TYPING EFFECT
================================ */

const typing =
    document.getElementById("typing");

const words = [
    "Frontend Developer",
    "UI/UX Designer",
    "React Developer",
    "Creative Coder"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const word =
        words[wordIndex];

    if (!deleting) {

        typing.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (
            charIndex === word.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1200
            );

            return;

        }

    } else {

        typing.textContent =
            word.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex === words.length
            ) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );

}

typeEffect();


/* ===============================
   3D TILT
================================ */

const tiltCards =
    document.querySelectorAll(".tilt");

tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 12;

            const rotateY =
                (centerX - x) / 12;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.03)`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) scale(1)";

        }
    );

});


/* ===============================
   MAGNETIC BUTTON
================================ */

const magneticButtons =
    document.querySelectorAll(".magnetic");

magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * .15}px,
                           ${y * .15}px)`;

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0,0)";

        }
    );

});


/* ===============================
   SCROLL REVEAL
================================ */

const reveals =
    document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(element => {

        const top =
            element.getBoundingClientRect()
                .top;

        if (
            top <
            window.innerHeight - 100
        ) {

            element.classList.add(
                "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


/* ===============================
   SCROLL PROGRESS
================================ */

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / height) * 100;

        document.getElementById(
            "scrollProgress"
        ).style.width =
            progress + "%";

    }
);


/* ===============================
   COUNTERS
================================ */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );

let counterStarted = false;

function startCounter() {

    const stats =
        document.querySelector(".stats");

    const top =
        stats.getBoundingClientRect()
            .top;

    if (
        top <
        window.innerHeight - 100 &&
        !counterStarted
    ) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.count
                );

            let value = 0;

            const timer =
                setInterval(() => {

                    value +=
                        Math.ceil(
                            target / 40
                        );

                    if (
                        value >= target
                    ) {

                        value = target;

                        clearInterval(timer);

                    }

                    counter.textContent =
                        value + "+";

                }, 40);

        });

    }

}

window.addEventListener(
    "scroll",
    startCounter
);


/* ===============================
   SKILL ANIMATION
================================ */

let skillsAnimated = false;

function animateSkills() {

    const section =
        document.getElementById(
            "skills"
        );

    const top =
        section.getBoundingClientRect()
            .top;

    if (
        top <
        window.innerHeight - 100 &&
        !skillsAnimated
    ) {

        skillsAnimated = true;

        document
            .querySelectorAll(".progress-bar")
            .forEach(bar => {

                bar.style.width =
                    bar.dataset.width + "%";

            });

    }

}

window.addEventListener(
    "scroll",
    animateSkills
);


/* ===============================
   PROJECT FILTER
================================ */

const filters =
    document.querySelectorAll(
        ".filter"
    );

const projects =
    document.querySelectorAll(
        ".project"
    );

filters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filters.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            button.classList.add(
                "active"
            );

            const category =
                button.dataset.filter;

            projects.forEach(project => {

                if (
                    category === "all" ||
                    project.classList.contains(
                        category
                    )
                ) {

                    project.style.display =
                        "block";

                } else {

                    project.style.display =
                        "none";

                }

            });

        }
    );

});


/* ===============================
   PROJECT MODAL
================================ */

const detailButtons =
    document.querySelectorAll(
        ".details-btn"
    );

const modal =
    new bootstrap.Modal(
        document.getElementById(
            "projectModal"
        )
    );

detailButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document.getElementById(
                "modalTitle"
            ).textContent =
                button.dataset.title;

            document.getElementById(
                "modalDescription"
            ).textContent =
                button.dataset.description;

            document.getElementById(
                "modalTech"
            ).innerHTML =
                button.dataset.tech
                    .split(",")
                    .map(
                        tech =>
                        `<span class="badge bg-info text-dark m-1">
                            ${tech}
                         </span>`
                    )
                    .join("");

            modal.show();

        }
    );

});


/* ===============================
   CONTACT FORM
================================ */

const form =
    document.getElementById(
        "contactForm"
    );

const toast =
    document.getElementById(
        "toast"
    );

form.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        toast.classList.add("show");

        form.reset();

        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

    }
);


/* ===============================
   SCROLL TOP
================================ */

const scrollTop =
    document.getElementById(
        "scrollTop"
    );

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            scrollTop.style.display =
                "block";

        } else {

            scrollTop.style.display =
                "none";

        }

    }
);

scrollTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* ===============================
   ACTIVE NAVBAR
================================ */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });

        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute(
                    "href"
                ) === "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);