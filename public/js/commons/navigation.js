document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    const userPermission = localStorage.getItem('userPermission');
    
    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (userPermission) {
        document.getElementById('userPermission').textContent = userPermission;
    }
});

// Função para atualizar o nome e perfil do usuário na barra lateral sempre que a página for alterada
function updateUserSidebarDetails() {
    const userName = localStorage.getItem('userName');
    const userPermission = localStorage.getItem('userPermission');
    
    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (userPermission) {
        document.getElementById('userPermission').textContent = userPermission;
    }
}

function showPage(pageId) {
    const welcomeContainer = document.querySelector('.welcome-container');
    const pages = document.querySelectorAll('.page');
    const dashboardContent = document.getElementById('dashboard-content');

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

    // Dentro da função showPage()
    const planilhaContent = document.querySelector('.planilha-content');

    if (pageId === 'planilha') {
        planilhaContent.classList.add('show');
    } else {
        planilhaContent.classList.remove('show');
    }

    if (pageId === 'dashboard') {
        dashboardContent.style.display = 'block';
    } else {
        dashboardContent.style.display = 'none';
    }

    updateUserSidebarDetails();
}