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

let currentPage = 0;
const recordsPerPage = 8;

const templateList = document.getElementById('template-list');
const paginationList = document.getElementById('pagination-list');

function displayTemplates(templates, page) {
    const startIndex = page * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const displayedTemplates = templates.slice(startIndex, endIndex);

    templateList.innerHTML = '';

    displayedTemplates.forEach((template) => {
        const templateRow = document.createElement('tr');
        templateRow.innerHTML = `
            <td>${template.name}</td>
            <td>${template.setor}</td>
            <td>${template.matricula}</td>
            <td>${template.id}</td>
            <td>${template.email}</td>
            <td><a href="${template.downloadLink}" target="_blank"><i class="bi bi-cloud-download"></i></a></td>
            <td><a href="${template.uploadLink}" target="_blank"><i class="bi bi-cloud-upload"></i></a></td>
            <td>${template.status}</td>
        `;
        templateList.appendChild(templateRow);
    });
}

function createPaginationButtons(templates) {
    const totalPages = Math.ceil(templates.length / recordsPerPage);
    paginationList.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.addEventListener('click', () => {
            currentPage = i;
            displayTemplates(templates, currentPage);
            updatePaginationButtons(totalPages);
        });

        paginationList.appendChild(button);
    }
}

function updatePaginationButtons(totalPages) {
    const buttons = paginationList.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        if (i === currentPage) {
            buttons[i].classList.add('active'); // Adicione a classe 'active' ao botão da página atual
        } else {
            buttons[i].classList.remove('active');
        }
    }
}

function initPagination(templates) {
    displayTemplates(templates, currentPage);
    createPaginationButtons(templates);
    updatePaginationButtons(Math.ceil(templates.length / recordsPerPage));
}

initPagination(exampleTemplates);