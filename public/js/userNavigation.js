document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll("nav ul li");

    navItems.forEach(item => {
        item.addEventListener("click", function() {
            // Oculta todas as seções
            sections.forEach(section => {
                section.style.display = "none";
            });

            // Exibe a seção correspondente ao item clicado
            const targetSectionId = this.getAttribute("data-section");
            const targetSection = document.getElementById(targetSectionId);
            targetSection.style.display = "block";
        });
    });
});