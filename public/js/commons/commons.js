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
    btnLogout.addEventListener('click', function () {
        // Remove o token do local storage
        localStorage.removeItem('token');

        // Redireciona o usuário para a tela de login
        window.location.href = 'http://127.0.0.1:5500/app/views/login/login.html'; // Lembre-se de atualizar com o caminho correto para sua tela de login
    });
}


document.addEventListener("DOMContentLoaded", function () {

    // Adicionar/remover colunas
    const addFieldBtn = document.getElementById('addField');
    const removeFieldBtn = document.getElementById('removeField');
    const colunasContainer = document.querySelector('.colunas-container');

    addFieldBtn.addEventListener('click', function (e) {
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

    removeFieldBtn.addEventListener('click', function (e) {
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

    previewBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let previewHTML = '<div class="preview-columns">';

        const colunaNames = document.querySelectorAll('.input-coluna-nome');
        const colunaTypes = document.querySelectorAll('.select-coluna-tipo');

        colunaNames.forEach((input, index) => {
            const type = colunaTypes[index].value;
            previewHTML += `<div class="preview-column">${input.value} (${type})</div>`;
        });

        previewHTML += '</div>';

        previewContent.innerHTML = previewHTML;
        previewModal.style.display = 'block';
    });

    closePreviewModalBtn.addEventListener('click', function () {
        previewModal.style.display = 'none';
    });

});

// Captura o formulário
const templateForm = document.getElementById('template-form');

// Captura o botão "Salvar Template" que agora está dentro do modal
const saveTemplateButton = document.querySelector("#preview-modal button[type='submit']");

// Adiciona um evento de clique ao botão "Salvar Template"
saveTemplateButton.addEventListener('click', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Chama a função para salvar o template
    saveTemplate();
});

function getFieldValue(fieldName) {
    const field = templateForm.querySelector(`[name="${fieldName}"]`);
    if (field) {
        return field.type === 'checkbox' ? field.checked : field.value;
    }
    return null;
}

function getTemplateFields() {
    let fields = {};
    const colunaTemplates = templateForm.querySelectorAll('.coluna-template');
    colunaTemplates.forEach(coluna => {
        const nome = coluna.querySelector('.input-coluna-nome').value;
        const tipo = coluna.querySelector('.select-coluna-tipo').value;
        fields[nome] = tipo;
    });
    console.log("Campos do template:", fields); // Log dos campos do template
    return fields;
}

function saveTemplate() {
    const token = localStorage.getItem('jwtToken');
    console.log("Token JWT:", token);
    if (!token) {
        alert('Por favor, faça login novamente.');
        return;
    }


    const url = 'http://localhost:3000/templates';

    // Coletando os dados do formulário manualmente
    let templateData = {
        nome_template: getFieldValue('nome_template'),
        extensao_template: getFieldValue('extensao_template'),
        data_cadastrado: getFieldValue('data_cadastrado'),
        status: getFieldValue('status'),
        quantidade_linhas: parseInt(getFieldValue('quantidade_linhas')),
        campos_template: getTemplateFields()
    };
    console.log("Dados do template a serem enviados:", templateData);


    // Adicionando o token JWT no cabeçalho da requisição
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Usando o token diretamente
        },
        body: JSON.stringify(templateData)
    })
        .then(response => {
            console.log("Resposta do servidor:", response); // Log da resposta do servidor
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos do servidor:", data);
            if (data.mensagem === "Template cadastrado com sucesso") {
                alert('Template salvo com sucesso!'); // Adicionado um alerta para informar ao usuário
                templateForm.reset();

                // Fechar o modal de pré-visualização
                const previewModal = document.getElementById('preview-modal');
                if (previewModal) {
                    previewModal.style.display = 'none';
                }
            } else {
                console.error('Erro ao salvar o template:', data.mensagem || 'Erro desconhecido');
            }
        })        
        .catch(error => {
            console.error('Erro ao enviar a requisição:', error);
        });
}