// Run this function when the whole page is loaded
window.addEventListener('load', function() {
    console.log("Eleventy linked to js");
});

/* reveal text functions */

// function to reveal hidden elements from select option
function revealText(element, text, selectOption) {
    if (selectOption.value === text) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function revealProjectText(selectOptionsId, technicalExpId, innerWorkingsId) {
    console.log("reveal function linked")
    // reference select options and hidden information
    const selectOption = document.querySelector(selectOptionsId);
    const technicalExp = document.querySelector(technicalExpId);
    const innerWorkings = document.querySelector(innerWorkingsId);

    // reveal text
    selectOption.addEventListener("change", () => {
        revealText(technicalExp, "technical-experience", selectOption);
        revealText(innerWorkings, "inner-workings", selectOption);
    });
};

function revealAboutText(selectOptionsId, programmingJourneyId, decisionToProgramId, educationId) {

    // reference select options and hidden information
    const selectOptionAbout = document.querySelector(selectOptionsId);
    const programmingJourney = document.querySelector(programmingJourneyId);
    const decisionToProgram = document.querySelector(decisionToProgramId);
    const education = document.querySelector(educationId);

    // reveal text
    selectOptionAbout.addEventListener("change", () => {
        revealText(programmingJourney, "programming-journey", selectOptionAbout);
        revealText(decisionToProgram, "decision-to-program", selectOptionAbout);
        revealText(education, "education", selectOptionAbout);
    })
}
