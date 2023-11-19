document.addEventListener('DOMContentLoaded', function() {
    updateUserSidebarDetails();
});

function updateUserSidebarDetails() {
    const userName = localStorage.getItem('userName');
    const userPermission = localStorage.getItem('userPermission');
    const userPhotoUrl = localStorage.getItem('userPhoto'); 
    const userPhotoElement = document.getElementById('userImage'); 

    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (userPermission) {
        document.getElementById('userPermission').textContent = userPermission;
    }
    if (userPhotoUrl) {
        userPhotoElement.src = userPhotoUrl; 
        userPhotoElement.style.display = 'block'; // Certifique-se de que a foto seja exibida
    }
}

function showPage(pageId) {
    const welcomeContainer = document.querySelector('.welcome-container');
    const pages = document.querySelectorAll('.page');
    const dashboardContent = document.getElementById('dashboard-content');
    const planilhaContent = document.querySelector('.planilha-content');
    const settingsContent = document.querySelector('#settings-content');
    const userSettingsContent = document.querySelector('#user-settings .user-settings-content');

    // Itera sobre todas as páginas e as oculta
    pages.forEach((page) => {
        if (page != null) { // Verificação adicionada aqui
            page.style.display = 'none';
        }
    });

    // Exibe a página correspondente ao ícone do menu clicado
    const pageToShow = document.getElementById(pageId);
    if (pageToShow != null) { // Verificação adicionada aqui
        pageToShow.style.display = 'block';
    }

    // Remove a classe 'active' de todos os ícones do menu
    const menuIcons = document.querySelectorAll('.menu-icon');
    menuIcons.forEach((icon) => {
        icon.classList.remove('active');
    });

    // Adiciona a classe 'active' ao ícone do menu clicado
    const clickedIcon = document.querySelector(`[data-page="${pageId}"]`);
    if (clickedIcon != null) { // Verificação adicionada aqui
        clickedIcon.classList.add('active');
    }

    // Condições para mostrar ou esconder elementos específicos, com verificações de existência
    if (welcomeContainer != null) { // Verificação adicionada aqui
        welcomeContainer.style.display = (pageId === 'home') ? 'block' : 'none';
    }

    if (dashboardContent != null) { // Verificação adicionada aqui
        dashboardContent.style.display = (pageId === 'dashboard') ? 'block' : 'none';
    }

    if (planilhaContent != null) { // Verificação adicionada aqui
        planilhaContent.classList.toggle('show', pageId === 'planilha');
    }

    if (settingsContent != null) { // Verificação adicionada aqui
        settingsContent.classList.toggle('show', pageId === 'settings');
    }

    if (userSettingsContent != null) { // Verificação adicionada aqui
        userSettingsContent.classList.toggle('show', pageId === 'user-settings');
    }

    // Atualiza os detalhes da barra lateral do usuário
    updateUserSidebarDetails();
}
