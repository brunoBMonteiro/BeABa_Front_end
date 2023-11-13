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
            <td><i class="${uploadIconClass}" title="Upload" data-id="${template.id_template}"></i></td>
            <td>${template.status ? 'Ativo' : 'Inativo'}</td>
        `;
        templateList.appendChild(templateRow);
    });
}

function downloadXlsx(jsonObject, fileName) {
    // Cria uma nova workbook
    var wb = XLSX.utils.book_new();
    
    // Convertendo o objeto JSON em um array que contém um objeto
    // Onde cada chave-valor do objeto será uma coluna-linha na planilha
    var sheetData = [jsonObject];
    
    // Converte o array para uma worksheet
    var ws = XLSX.utils.json_to_sheet(sheetData);
    
    // Adiciona a worksheet para a workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
    // Escreve a workbook e inicia o download
    XLSX.writeFile(wb, `${fileName}.xlsx`);
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

// Função para converter JSON para CSV
function convertJsonToCsv(jsonObject) {
    const headers = Object.keys(jsonObject).join(',');
    const values = Object.values(jsonObject).join(',');
    return headers + '\n' + values;
}

function downloadTemplate(templateId) {
    const url = `http://localhost:3000/templates/${templateId}/download`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fileName = data.fileName;
            const fileExtension = data.fileExtension.toLowerCase();

            if (fileExtension === 'csv') {
                const csvString = convertJsonToCsv(data.data);
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                initiateDownload(blob, fileName, 'csv');
            } else if (fileExtension === 'xls') {
                const xlsString = convertJsonToXls(data.data);
                const blob = new Blob([xlsString], { type: 'application/vnd.ms-excel;charset=utf-8;' });
                initiateDownload(blob, fileName, 'xls');
            } else if (fileExtension === 'xlsx') {
                // Para XLSX, utiliza a função downloadXlsx diretamente com a SheetJS
                downloadXlsx(data.data, fileName);
            } else {
                console.error(`Erro no download: Tipo de arquivo '${fileExtension}' não é suportado.`);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o template:', error);
            alert('Erro ao buscar informações para download.');
        });
}

// Função para iniciar o download do arquivo
function initiateDownload(blob, fileName, fileExtension) {
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}

/// Adicionar o evento de clique no documento para lidar com download e upload
document.addEventListener('click', function (e) {
    // Verifica se o clique foi em um ícone de download ativo
    if (e.target.classList.contains('bi-download') && e.target.classList.contains('icon-active')) {
        const templateId = e.target.getAttribute('data-id');
        if (templateId) {
            downloadTemplate(templateId);
        }
    }
    // Verifica se o clique foi em um ícone de upload ativo
    else if (e.target.classList.contains('bi-upload') && e.target.classList.contains('icon-active')) {
        // Abre o modal de upload
        document.getElementById('upload-modal').style.display = 'block';
    }
});

// Event listener para o botão de fechar o modal de upload
document.querySelector('#upload-modal .close-modal').addEventListener('click', function () {
    document.getElementById('upload-modal').style.display = 'none';
});

document.getElementById('validate-button').addEventListener('click', function() {
    const originalFileInput = document.getElementById('original-template');
    const filledFileInput = document.getElementById('filled-template');
    const statusMessageDiv = document.getElementById('upload-status-message');

    if (originalFileInput.files.length > 0 && filledFileInput.files.length > 0) {
        const originalFile = originalFileInput.files[0];
        const filledFile = filledFileInput.files[0];

        statusMessageDiv.textContent = 'Validando...';
        statusMessageDiv.className = 'status-validating';

        validateTemplate(originalFile, filledFile)
            .then(data => { 
                statusMessageDiv.textContent = data.message; 
                if (data.status === 'approved') {
                    statusMessageDiv.className = 'status-approved';
                    document.getElementById('save-button').disabled = false;
                } else {
                    statusMessageDiv.className = 'status-error';
                }
            })
            .catch(error => {
                statusMessageDiv.textContent = 'Erro ao validar o template: ' + error.message;
                statusMessageDiv.className = 'status-error';
            });
    } else {
        statusMessageDiv.textContent = 'Por favor, selecione ambos os arquivos antes de validar.';
        statusMessageDiv.className = 'status-error';
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