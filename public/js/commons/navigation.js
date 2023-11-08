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

    if (pageId === 'home') {
        welcomeContainer.style.display = 'block';
    } else {
        welcomeContainer.style.display = 'none';
    }

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

    if (pageId === 'settings') {
        settingsContent.classList.add('show');
    } else {
        settingsContent.classList.remove('show');
    }

    if (pageId === 'user-settings') {
        userSettingsContent.classList.add('show');
    } else {
        userSettingsContent.classList.remove('show');
    }

    updateUserSidebarDetails();
}