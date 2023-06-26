// Run this function when the whole page is loaded
window.addEventListener('load', function() {
    console.log("Eleventy linked to js");
});

function revealProjectText(selectOptionsId, technicalExpId, innerWorkingsId){
    console.log("reveal function linked")
    // reference select options and hidden information
    const selectOption = document.querySelector(selectOptionsId);
    const technicalExp = document.querySelector(technicalExpId);
    const innerWorkings = document.querySelector(innerWorkingsId);

    // display information based on value of selectOption
    selectOption.addEventListener("change", () => {
        if (selectOption.value === "technical-experience") {
            technicalExp.style.display = "block";
        } else {
            technicalExp.style.display = "none";
        } 
        
        if (selectOption.value === "inner-workings") {
            innerWorkings.style.display = "block";
        } else {
            innerWorkings.style.display = "none";
        }

        
    })

}