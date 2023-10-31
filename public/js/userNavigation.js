document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Esconde todas as seções
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Mostra a seção correspondente ao link clicado
            const targetSection = document.querySelector(`#${this.getAttribute('data-section')}`);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
});