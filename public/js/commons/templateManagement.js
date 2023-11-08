// Obtém as referências para os botões e conteúdos
const btnCadastro = document.getElementById('btnCadastro');
const btnCadastrado = document.getElementById('btnCadastrado');
const cadastroContent = document.getElementById('cadastro-content');
const cadastradoContent = document.getElementById('cadastrado-content');

function getToken() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('Por favor, faça login novamente.');
        return null;
    }
    return token;
}

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

document.addEventListener("DOMContentLoaded", function () {

    // Adicionar/remover colunas/define e verifica tamanho de colunas
    const addFieldBtn = document.getElementById('addField');
    const removeFieldBtn = document.getElementById('removeField');
    const colunasContainer = document.querySelector('.colunas-container');

    addFieldBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const maxColumns = parseInt(document.getElementById('quantidade-linhas').value);
        const currentColumns = document.querySelectorAll('.coluna-template').length;

        if (currentColumns < maxColumns) {
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
        } else {
            alert(`Você só pode adicionar até ${maxColumns} colunas.`);
        }
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
    return fields;
}

function saveTemplate() {
    const token = getToken();
    if (!token) return;

    const maxColumns = parseInt(getFieldValue('quantidade_linhas'));
    const currentColumns = document.querySelectorAll('.coluna-template').length;

    if (currentColumns !== maxColumns) {
        alert(`Por favor, adicione exatamente ${maxColumns} colunas.`);
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
            if (data.mensagem === "Template cadastrado com sucesso") {
                alert('Template salvo com sucesso!'); // Adicionado um alerta para informar ao usuário

                // Remover colunas adicionais
                let colunas = document.querySelectorAll('.coluna-template');
                while (colunas.length > 1) {
                    colunas[colunas.length - 1].remove();
                    colunas = document.querySelectorAll('.coluna-template'); // Atualizar a lista de colunas
                }

                templateForm.reset();

                // Resetar a quantidade de colunas para 1
                const quantidadeLinhasInput = document.getElementById('quantidade-linhas');
                if (quantidadeLinhasInput) {
                    quantidadeLinhasInput.value = 1;
                }

                // Fechar o modal de pré-visualização
                const previewModal = document.getElementById('preview-modal');
                if (previewModal) {
                    previewModal.style.display = 'none';
                }

                fetchTemplates();
            } else {
                console.error('Erro ao salvar o template:', data.mensagem || 'Erro desconhecido');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar a requisição:', error);
        });
}

// Referência para o botão de pesquisa e o campo de input
const searchButton = document.querySelector("#search-box button");
const searchIdInput = document.getElementById("search-id-input");

searchButton.addEventListener('click', function () {
    // Pega o ID inserido pelo usuário
    const templateId = searchIdInput.value;

    if (templateId) {
        // Se um ID foi inserido, busca o template com esse ID
        fetch(`http://localhost:3000/templates/${templateId}`)
            .then(response => response.json())
            .then(data => {
                if (data.template) {
                    // Se um template for encontrado, exibe-o na tabela
                    displaySingleTemplate(data.template);
                } else {
                    alert('Template não encontrado!');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o template:', error);
            });
    } else {
        // Se nenhum ID foi inserido, exibe a lista completa de templates
        fetchTemplates();
    }
});

// Obtenção de referências para os elementos de atualização de status
const templateIdInput = document.getElementById("templateId");
const statusSearchButton = document.getElementById("statusSearchButton");
const templateIdDisplay = document.getElementById("templateIdDisplay");
const templateStatusDisplay = document.getElementById("templateStatusDisplay");
const templateStatusSelect = document.getElementById("templateStatus");
const updateButton = document.getElementById("updateButton");
const statusMessage = document.getElementById("statusMessage");

// Armazenamento do ID do template atual
let currentTemplateId = null;

// Verifica se o botão de pesquisa de status existe
if (statusSearchButton) {
    // Evento de clique para buscar o template pelo ID na seção de atualização de status
    statusSearchButton.addEventListener('click', function() {
        const templateId = templateIdInput && templateIdInput.value;

        if (!templateId) {
            if (templateIdDisplay) templateIdDisplay.textContent = '';
            if (templateStatusDisplay) templateStatusDisplay.textContent = '';
            alert('Por favor, preencha o campo com o ID do template para a pesquisa.');
            return;
        }

        fetch(`http://localhost:3000/templates/${templateId}`)
            .then(response => response.json())
            .then(data => {
                if (data.template) {
                    currentTemplateId = data.template.id_template; 
                    if (templateIdDisplay) templateIdDisplay.textContent = data.template.id_template;
                    if (templateStatusDisplay) {
                        templateStatusDisplay.textContent = data.template.status ? 'Ativo' : 'Inativo';
                        templateStatusDisplay.setAttribute('data-status', data.template.status ? 'ativo' : 'inativo');
                    }
                    if (statusMessage) statusMessage.textContent = '';  
                } else {
                    alert('Template não encontrado!');
                    if (templateIdDisplay) templateIdDisplay.textContent = '';
                    if (templateStatusDisplay) templateStatusDisplay.textContent = '';  
                    if (statusMessage) statusMessage.textContent = ''; 
                }
                if (templateIdInput) templateIdInput.value = '';
            })
            .catch(error => {
                alert('Erro ao buscar o template. Por favor, verifique o console para mais detalhes.');
                if (templateIdDisplay) templateIdDisplay.textContent = '';  
                if (templateStatusDisplay) templateStatusDisplay.textContent = '';  
                if (statusMessage) statusMessage.textContent = '';  
            });
    });
}

// Verifica se o botão de atualização existe
if (updateButton) {
    // Evento de clique para atualizar o status do template
    updateButton.addEventListener('click', function() {
        const token = getToken();
        if (!token) return;

        if (!currentTemplateId) {
            alert('Por favor, busque um template antes de atualizar o status.');
            return;
        }

        const newStatus = templateStatusSelect.value; // Correção: Deve ser templateStatusSelect em vez de templateStatus
        const currentStatus = templateStatusDisplay.getAttribute('data-status');

        if (newStatus === currentStatus) {
            alert(`O template já está ${newStatus}.`);
            return;
        }

        const url = `http://localhost:3000/templates/${currentTemplateId}/status`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })  
        })
        .then(response => {
            if (response.status === 200) { 
                return response.json();
            } else {
                throw new Error('Erro ao atualizar o status.');
            }
        })
        .then(data => {
            alert('Status atualizado com sucesso!');
            templateStatusDisplay.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
            templateStatusDisplay.setAttribute('data-status', newStatus);
            // fetchTemplates(); // Certifique-se de que esta função é definida ou remova se não for usada
        })
        .catch(error => {
            alert(error.message);
        });
    });
}

function displaySingleTemplate(template) {
    const templateList = document.getElementById("template-list");
    templateList.innerHTML = '';

    const downloadIconClass = template.status ? 'bi-download icon-active download-upload-icon' : 'bi-download icon-inactive download-upload-icon';
    const uploadIconClass = template.status ? 'bi-upload icon-active download-upload-icon' : 'bi-upload icon-inactive download-upload-icon';

    const templateRow = document.createElement('tr');
    templateRow.innerHTML = `
        <td>${template.nome_template}</td>
        <td>${template.extensao_template}</td>
        <td>${template.usuario ? template.usuario.matricula : 'Não disponível'}</td>
        <td>${template.id_template}</td>
        <td>${template.usuario ? template.usuario.email : 'Não disponível'}</td>
        <td><i class="${downloadIconClass}" title="Download" data-id="${template.id_template}"></i></td>
        <td><i class="${uploadIconClass}" title="Upload"></i></td>
        <td>${template.status ? 'Ativo' : 'Inativo'}</td>
    `;

    templateList.appendChild(templateRow);

    // Adiciona o evento de clique para download
    const downloadIcon = templateRow.querySelector(`.${downloadIconClass}`);
    if (downloadIcon && template.status) {
        downloadIcon.addEventListener('click', function () {
            downloadTemplate(template.id_template);
        });
    }
}