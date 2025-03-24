document.addEventListener("DOMContentLoaded", () => {
    const recommendationsSection = document.getElementById("recommendations");
    
    // Array of new recommendations
    const newRecommendations = [
    ];

    // Function to render recommendations dynamically
    function renderRecommendations() {
        newRecommendations.forEach(rec => {
            const div = document.createElement("div");
            div.classList.add("recommendation");
            div.innerHTML = `<p>"${rec}" - Anonymous</p>`;
            recommendationsSection.appendChild(div);
        });
    }

    // Function to add a new recommendation dynamically
    window.addRecommendation = function () {
        const newRec = prompt("Enter your recommendation:");
        if (newRec) {
            newRecommendations.push(newRec);
            renderRecommendations();
            alert("Thank you! Your recommendation has been added.");
        }
    };

    // Initial rendering of new recommendations
    renderRecommendations();
});