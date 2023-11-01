let currentSectionIndex = 0;
const sections = document.querySelectorAll("#user-settings-content .section");

function changeSection(direction) {
    sections[currentSectionIndex].style.display = "none"; // Esconde a seção atual

    if (direction === 'next') {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length; // Avança para a próxima seção
    } else {
        currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length; // Volta para a seção anterior
    }

    sections[currentSectionIndex].style.display = "flex"; // Mostra a nova seção
}

// Inicializa a primeira seção como visível
sections[0].style.display = "flex";
for (let i = 1; i < sections.length; i++) {
    sections[i].style.display = "none";
}