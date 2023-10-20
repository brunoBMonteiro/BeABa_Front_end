function showPage(pageId) {
    // Obtém o contêiner da mensagem de boas-vindas e todas as páginas
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
}

// Obtém as referências para os botões e conteúdos
const btnCadastro = document.getElementById('btnCadastro');
const btnCadastrado = document.getElementById('btnCadastrado');
const cadastroContent = document.getElementById('cadastro-content');
const cadastradoContent = document.getElementById('cadastrado-content');

// Oculta a página "Templates Cadastrados" inicialmente
cadastradoContent.style.display = 'none';

// Define os eventos de clique para os botões
btnCadastro.addEventListener('click', () => {
    cadastroContent.style.display = 'block';
    cadastradoContent.style.display = 'none';
});

btnCadastrado.addEventListener('click', () => {
    cadastroContent.style.display = 'none';
    cadastradoContent.style.display = 'block';
});

const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {  // Adicionando uma verificação para garantir que o botão de logout exista na página atual
    btnLogout.addEventListener('click', function() {
        // Remove o token do local storage
        localStorage.removeItem('token');

        // Redireciona o usuário para a tela de login
        window.location.href = 'http://127.0.0.1:5500/app/views/login/login.html'; // Lembre-se de atualizar com o caminho correto para sua tela de login
    });
}
