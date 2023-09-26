function showPage(pageId) {
    // Obtém o contêiner da mensagem de boas-vindas e todas as páginas
    const welcomeContainer = document.querySelector('.welcome-container');
    const pages = document.querySelectorAll('.page');

    // Itera sobre todas as páginas e as oculta
    pages.forEach((page) => {
        page.style.display = 'none';
    });

    // Exibe a página correspondente ao ícone do menu clicado
    const pageToShow = document.getElementById(pageId);
    if (pageToShow) {
        pageToShow.style.display = 'block';
    }

    // Remove a classe 'active' de todos os ícones do menu
    const menuIcons = document.querySelectorAll('.menu-icon');
    menuIcons.forEach((icon) => {
        icon.classList.remove('active');
    });

    // Adiciona a classe 'active' ao ícone do menu clicado
    const clickedIcon = document.querySelector(`[data-page="${pageId}"]`);
    if (clickedIcon) {
        clickedIcon.classList.add('active');
    }

    // Verifica se a página atual é a página inicial e exibe ou oculta o contêiner da mensagem de boas-vindas
    if (pageId === 'home') {
        welcomeContainer.style.display = 'block';
    } else {
        welcomeContainer.style.display = 'none';
    }
}