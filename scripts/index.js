const hamburgerBtn = document.querySelector(".hamburger-btn");
const navContainer = document.querySelector(".primary-nav-container");

// Primary nav menu  -------------------------------
hamburgerBtn?.addEventListener("click", () => {
    navContainer.classList.toggle("show");
    hamburgerBtn.classList.toggle("open");
});

/* ---------------------------------------------
   HERO CONTACT FORM
------------------------------------------------ */
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    const formGroups = document.querySelectorAll(".form-group");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (formGroups?.length) {
            // remove all error classes if the input field is valid
            formGroups.forEach((formGroup) => {
                const input = formGroup.querySelector("input, select");

                if (input.value && input.value.trim()) {
                    formGroup.classList.remove("error");
                }
            });

            // focus each element one by one in order if they are invalid
            const invalidFormGroup = [...formGroups].find((formGroup) => {
                const input = formGroup.querySelector("input, select");

                return !input.value || !input.value?.trim();
            });

            if (invalidFormGroup) {
                invalidFormGroup.classList.add("error");

                const input = invalidFormGroup.querySelector("input, select");
                input?.focus();
            }

            const isFormValid = [...formGroups].every((formGroup) => {
                const input = formGroup.querySelector("input, select");

                return input.value || input.value?.trim();
            });

            if (isFormValid) {
                const contactSubmitContainer = document.querySelector(".contact-submit-container");
                const submitBtn = contactSubmitContainer.querySelector(".primary-cta-btn");
                const spinner = contactSubmitContainer.querySelector(".spinner");
                spinner.classList.add("visible");
                submitBtn.disabled = true;

                setTimeout(() => {
                    spinner.classList.remove("visible");
                    submitBtn.disabled = false;
                    window.location.href = "thank-you-page.html";
                }, 1500);
            }
        }
    });

    const inputFields = contactForm?.querySelectorAll("input, select");
    if (inputFields?.length) {
        inputFields.forEach((field) => {
            field.addEventListener("input", () => {
                const formGroup = field.closest(".form-group");
                if (field.value.trim() !== "") {
                    formGroup.classList.remove("error");
                }
            });
        });
    }
}

/* ---------------------------------------------
   Testimonials
------------------------------------------------ */
const sliderTrack = document.querySelector("#slider-track");
if (sliderTrack) {
    const slides = document.querySelectorAll(".slide") || [];
    const dots = document.querySelectorAll(".dot") || [];

    const totalSlides = slides.length - 2; // exclude the 2 clones
    let currentSlideIndex = 1; // start on real slide 1

    const updatePosition = () => {
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        dots.forEach((dot) => dot.classList.remove("active"));
        dots[currentSlideIndex - 1]?.classList.add("active");
    };

    // set initial position
    updatePosition();

    const nextBtn = document.querySelector("#next-btn");
    const prevBtn = document.querySelector("#prev-btn");

    nextBtn.addEventListener("click", () => {
        if (currentSlideIndex >= totalSlides + 1) return;
        currentSlideIndex++;

        sliderTrack.style.transition = "transform 0.4s ease-in-out";
        updatePosition();
    });

    prevBtn.addEventListener("click", () => {
        if (currentSlideIndex <= 0) return;
        currentSlideIndex--;
        sliderTrack.style.transition = "transform 0.4s ease-in-out";
        updatePosition();
    });

    sliderTrack.addEventListener("transitionend", () => {
        if (currentSlideIndex === totalSlides + 1) {
            sliderTrack.style.transition = "none";
            currentSlideIndex = 1;
            updatePosition();
        } else if (currentSlideIndex === 0) {
            sliderTrack.style.transition = "none";
            currentSlideIndex = totalSlides;
            updatePosition();
        }
    });

    dots?.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            currentSlideIndex = dotIndex + 1;
            updatePosition();
        });
    });
}

/* ---------------------------------------------
   VIDEO PLAYER / MODAL
------------------------------------------------ */
const playVideoButton = document.getElementById("play-btn");
const videoModal = document.getElementById("video-modal");
const closeModalButton = document.getElementById("close-modal-btn");
const videoPlayer = document.getElementById("video-player");

if (videoModal) {
    playVideoButton.addEventListener("click", () => {
        videoModal.classList.add("playing");
        videoPlayer.play();
    });

    closeModalButton.addEventListener("click", () => {
        videoModal.classList.remove("playing");
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    // close modal on outside click
    window.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove("playing");
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
}
