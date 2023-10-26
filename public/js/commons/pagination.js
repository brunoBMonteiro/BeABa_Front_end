const templateList = document.getElementById('template-list');
const paginationList = document.getElementById('pagination-list');

let currentPage = 0;
const recordsPerPage = 8;
const maxButtonsToShow = 5; // Número máximo de botões de página a serem exibidos de uma vez

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
        const downloadIconClass = template.status ? 'icon-active download-upload-icon' : 'icon-inactive download-upload-icon';
        const uploadIconClass = template.status ? 'icon-active download-upload-icon' : 'icon-inactive download-upload-icon';
        const templateRow = document.createElement('tr');
        templateRow.innerHTML = `
            <td>${template.nome_template}</td>
            <td>${template.extensao_template}</td>
            <td>${template.usuario.matricula}</td>
            <td>${template.id_template}</td>
            <td>${template.usuario.email}</td>
            <td><i class="bi bi-download ${downloadIconClass}" title="Download"></i></td>
            <td><i class="bi bi-upload ${uploadIconClass}" title="Upload"></i></td>
            <td>${template.status ? 'Ativo' : 'Inativo'}</td>
        `;
        templateList.appendChild(templateRow);
    });
}

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