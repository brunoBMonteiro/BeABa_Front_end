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


document.addEventListener("DOMContentLoaded", function() {

    // Adicionar/remover colunas
    const addFieldBtn = document.getElementById('addField');
    const removeFieldBtn = document.getElementById('removeField');
    const colunasContainer = document.querySelector('.colunas-container');

    addFieldBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const colunaTemplate = document.createElement('div');
        colunaTemplate.classList.add('coluna-template');

        colunaTemplate.innerHTML = `
            <div>
                <label for="nome-coluna">Nome da Coluna:</label>
                <input type="text" class="input-coluna-nome" required>
            </div>
            <div>
                <label for="tipo-coluna">Tipo de Dado:</label>
                <select class="select-coluna-tipo">
                    <option value="VARCHAR">Texto</option>
                    <option value="INT">Número</option>
                </select>
            </div>
        `;

        colunasContainer.appendChild(colunaTemplate);
    });

    removeFieldBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const colunas = document.querySelectorAll('.coluna-template');
        if (colunas.length > 1) { // Garante que ao menos uma coluna sempre exista
            colunas[colunas.length - 1].remove();
        }
    });

    // Pré-visualização
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('preview-modal');
    const previewContent = document.getElementById('preview-content');
    const closePreviewModalBtn = document.getElementById('close-preview-modal');

    previewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let previewHTML = "<ul>";

        const colunaNames = document.querySelectorAll('.input-coluna-nome');
        const colunaTypes = document.querySelectorAll('.select-coluna-tipo');

        colunaNames.forEach((input, index) => {
            const type = colunaTypes[index].value;
            previewHTML += `<li>${input.value} (${type})</li>`;
        });

        previewHTML += "</ul>";

        previewContent.innerHTML = previewHTML;
        previewModal.style.display = 'block';
    });

    closePreviewModalBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });

});

// Captura o formulário
const templateForm = document.getElementById('template-form');

// Adiciona um evento de envio ao formulário
templateForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Chama a função para salvar o template
    saveTemplate();
});

function saveTemplate() {
    const url = 'http://localhost:3000/templates'; // A URL da rota de salvamento no backend
    const formData = new FormData(templateForm); // Use o mesmo formulário que foi capturado acima

    fetch(url, {
        method: 'POST',
        body: formData, // Use os dados do formulário diretamente, não é necessário transformá-los em JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Template salvo com sucesso!');
            // Adicione aqui qualquer ação adicional após o sucesso
        } else {
            console.error('Erro ao salvar o template:', data.message);
            // Adicione aqui o tratamento de erros
        }
    })
    .catch(error => {
        console.error('Erro ao enviar a requisição:', error);
        // Adicione aqui o tratamento de erros de rede
    });
}