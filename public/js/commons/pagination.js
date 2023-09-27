// commons/pagination.js
const exampleTemplates = [
    {
        name: 'Template 1',
        setor: 'Setor A',
        matricula: '12345',
        id: '1',
        email: 'template1@example.com',
        downloads: 10,
        uploads: 5,
        status: 'Ativo',
        downloadLink: 'link-para-download-1',
        uploadLink: 'link-para-upload-1',
    },
    {
        name: 'Template 2',
        setor: 'Setor B',
        matricula: '67890',
        id: '2',
        email: 'template2@example.com',
        downloads: 8,
        uploads: 3,
        status: 'Inativo',
        downloadLink: 'link-para-download-2',
        uploadLink: 'link-para-upload-2',
    }, {
        name: 'Template 1',
        setor: 'Setor A',
        matricula: '12345',
        id: '1',
        email: 'template1@example.com',
        downloads: 10,
        uploads: 5,
        status: 'Ativo',
        downloadLink: 'link-para-download-1',
        uploadLink: 'link-para-upload-1',
    },
    {
        name: 'Template 2',
        setor: 'Setor B',
        matricula: '67890',
        id: '2',
        email: 'template2@example.com',
        downloads: 8,
        uploads: 3,
        status: 'Inativo',
        downloadLink: 'link-para-download-2',
        uploadLink: 'link-para-upload-2',
    },
    {
        name: 'Template 1',
        setor: 'Setor A',
        matricula: '12345',
        id: '1',
        email: 'template1@example.com',
        downloads: 10,
        uploads: 5,
        status: 'Ativo',
        downloadLink: 'link-para-download-1',
        uploadLink: 'link-para-upload-1',
    },
    {
        name: 'Template 2',
        setor: 'Setor B',
        matricula: '67890',
        id: '2',
        email: 'template2@example.com',
        downloads: 8,
        uploads: 3,
        status: 'Inativo',
        downloadLink: 'link-para-download-2',
        uploadLink: 'link-para-upload-2',
    },
    {
        name: 'Template 1',
        setor: 'Setor A',
        matricula: '12345',
        id: '1',
        email: 'template1@example.com',
        downloads: 10,
        uploads: 5,
        status: 'Ativo',
        downloadLink: 'link-para-download-1',
        uploadLink: 'link-para-upload-1',
    },
    {
        name: 'Template 2',
        setor: 'Setor B',
        matricula: '67890',
        id: '2',
        email: 'template2@example.com',
        downloads: 8,
        uploads: 3,
        status: 'Inativo',
        downloadLink: 'link-para-download-2',
        uploadLink: 'link-para-upload-2',
    },
    // Adicione mais modelos de exemplo conforme necessário
];

// Variáveis para controle de paginação
let currentPage = 1;
const recordsPerPage = 6; // Número de registros por página

// Obtém a lista de templates e o elemento de paginação
const templateList = document.getElementById('template-list');
const paginationList = document.getElementById('pagination-list');

// Função para exibir os templates em uma página específica
function displayTemplates(templates, page) {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const displayedTemplates = templates.slice(startIndex, endIndex);

    // Limpa a lista de templates atual
    templateList.innerHTML = '';

    // Exibe os templates na página
    displayedTemplates.forEach((template) => {
        const templateItem = document.createElement('tr');
        templateItem.innerHTML = `
            <td>${template.name}</td>
            <td>${template.setor}</td>
            <td>${template.matricula}</td>
            <td>${template.id}</td>
            <td>${template.email}</td>
            <td><a href="${template.downloadLink}" target="_blank"><i class="bi bi-cloud-download"></i></a></td>
            <td><a href="${template.uploadLink}" target="_blank"><i class="bi bi-cloud-upload"></i></a></td>
            <td>${template.status}</td>
        `;
        templateList.appendChild(templateItem);
    });
}


// Função para criar os botões de páginação
// Função para criar os botões de páginação
function createPaginationButtons(templates) {
    const totalPages = Math.ceil(templates.length / recordsPerPage);
    paginationList.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('li');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayTemplates(templates, currentPage);
            updatePaginationButtons(totalPages);
        });

        paginationList.appendChild(button);
    }
}


// Função para atualizar a classe 'active' dos botões de paginação
// Função para atualizar a classe 'active' dos botões de paginação
function updatePaginationButtons(totalPages) {
    const buttons = paginationList.getElementsByTagName('li');
    for (let i = 0; i < buttons.length; i++) {
        if (i + 1 === currentPage) {
            buttons[i].classList.add('active');
        } else {
            buttons[i].classList.remove('active');
        }
    }
}


// Função principal para inicializar a página de templates
function initPagination(templates) {
    displayTemplates(templates, currentPage);
    createPaginationButtons(templates);
    updatePaginationButtons(Math.ceil(templates.length / recordsPerPage));
}

// Exemplo de uso:
// const templates = [/* ... array de templates ... */];
initPagination(exampleTemplates);
