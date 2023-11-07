const templateList = document.getElementById('template-list');
const paginationList = document.getElementById('pagination-list');

let currentPage = 0;
const recordsPerPage = 8;
const maxButtonsToShow = 5;

// Função para buscar os modelos no back-end usando o Axios
async function fetchTemplates() {
    try {
        const response = await axios.get('http://localhost:3000/templates');
        const templates = response.data;
        initPagination(templates);
    } catch (error) {
        console.error('Erro ao buscar os modelos:', error);
    }
}

function displayTemplates(templates, page) {
    const startIndex = page * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const displayedTemplates = templates.slice(startIndex, endIndex);

    templateList.innerHTML = '';

    displayedTemplates.forEach((template) => {
        // Confira se o objeto usuario existe antes de tentar acessar suas propriedades.
        const matricula = template.usuario ? template.usuario.matricula : 'Não disponível';
        const email = template.usuario ? template.usuario.email : 'Não disponível';
        const downloadIconClass = template.status ? 'bi-download icon-active download-upload-icon' : 'bi-download icon-inactive download-upload-icon';
        const uploadIconClass = template.status ? 'bi-upload icon-active download-upload-icon' : 'bi-upload icon-inactive download-upload-icon';
        const templateRow = document.createElement('tr');
        templateRow.innerHTML = `
            <td>${template.nome_template}</td>
            <td>${template.extensao_template}</td>
            <td>${matricula}</td>
            <td>${template.id_template}</td>
            <td>${email}</td>
            <td><i class="${downloadIconClass}" title="Download" data-id="${template.id_template}"></i></td>
            <td><i class="${uploadIconClass}" title="Upload"></i></td>
            <td>${template.status ? 'Ativo' : 'Inativo'}</td>
        `;
        templateList.appendChild(templateRow);
    });
}

function convertJsonToXls(jsonObject) {
    // Iniciar um arquivo HTML que irá imitar um arquivo XLS
    let html = `
        <html>
            <head>
                <meta charset="utf-8">
                <style>
                    table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 5px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <table>
                    <tr>`;

    // Adicionar os cabeçalhos
    Object.keys(jsonObject).forEach(key => {
        html += `<th>${key}</th>`;
    });

    html += `</tr><tr>`;

    // Adicionar os valores
    Object.values(jsonObject).forEach(value => {
        html += `<td>${value}</td>`;
    });

    html += `</tr>
                </table>
            </body>
        </html>
    `;

    return html;
}

function downloadTemplate(templateId) {
    const url = `http://localhost:3000/templates/${templateId}/download`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fileName = data.fileName;
            const fileExtension = data.fileExtension.toLowerCase();

            let blob;
            if (fileExtension === 'csv') {
                const csvString = convertJsonToCsv(data.data);
                blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            } else if (fileExtension === 'xls') {
                const xlsString = convertJsonToXls(data.data);
                blob = new Blob([xlsString], { type: 'application/vnd.ms-excel;charset=utf-8;' });
            } else {
                console.error(`Erro no download: Tipo de arquivo '${fileExtension}' não é suportado.`);
                return;
            }

            // Iniciar o download do Blob como um arquivo
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${fileName}.${fileExtension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Erro ao buscar o template:', error);
            alert('Erro ao buscar informações para download.');
        });
}

// Função para converter JSON para CSV
function convertJsonToCsv(jsonObject) {
    const headers = Object.keys(jsonObject).join(',');
    const values = Object.values(jsonObject).join(',');
    return headers + '\n' + values;
}

// Adicionar o evento de clique no documento como antes
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('bi-download') && e.target.classList.contains('icon-active')) {
        const templateId = e.target.getAttribute('data-id');
        if (templateId) {
            downloadTemplate(templateId);
        }
    }
});

function createPaginationButtons(templates) {
    const totalPages = Math.ceil(templates.length / recordsPerPage);
    paginationList.innerHTML = '';

    // Botão "Anterior"
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayTemplates(templates, currentPage);
            updatePaginationButtons(totalPages);
        }
    });
    paginationList.appendChild(prevButton);

    const startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow);

    for (let i = startPage; i < endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.addEventListener('click', () => {
            currentPage = i;
            displayTemplates(templates, currentPage);
            updatePaginationButtons(totalPages);
        });
        paginationList.appendChild(button);
    }

    // Botão "Próximo"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Próximo';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayTemplates(templates, currentPage);
            updatePaginationButtons(totalPages);
        }
    });
    paginationList.appendChild(nextButton);
}

function updatePaginationButtons(totalPages) {
    const buttons = Array.from(paginationList.getElementsByTagName('button'));
    const prevButton = buttons[0];
    const nextButton = buttons[buttons.length - 1];

    // Atualiza botões de página
    buttons.slice(1, buttons.length - 1).forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Ativa/desativa botões "Anterior" e "Próximo"
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
}

function initPagination(templates) {
    displayTemplates(templates, currentPage);
    createPaginationButtons(templates);
    updatePaginationButtons(Math.ceil(templates.length / recordsPerPage));
}

fetchTemplates(); // Chama a função para buscar os modelos quando a página é carregada 