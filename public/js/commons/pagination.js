const templateList = document.getElementById('template-list');
const paginationList = document.getElementById('pagination-list');

let currentPage = 0;
const recordsPerPage = 8;

// Função para buscar os modelos no back-end usando o Axios
async function fetchTemplates() {
  try {
    const response = await axios.get('http://localhost:3000/templates'); // Ajuste a URL para a rota correta do seu backend
    const templates = response.data;
    console.log('Dados recebidos do backend:', templates);
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
    const templateRow = document.createElement('tr');
    templateRow.innerHTML = `
        <td>${template.nome_template}</td>          
        <td>${template.extensao_template}</td>     
        <td>${template.usuario.matricula}</td>              
        <td>${template.id_template}</td>                     
        <td>${template.usuario.email}</td>                  
        <td>${template.downloads}</td>              
        <td>${template.uploads}</td>                
        <td>${template.status ? 'Ativo' : 'Inativo'}
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

fetchTemplates(); // Chama a função para buscar os modelos quando a página é carregada