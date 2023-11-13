document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/count-templates')
        .then(response => response.json())
        .then(data => document.getElementById('total-templates-count').textContent = data.total_templates)
        .catch(error => console.error('Erro ao carregar total de templates:', error));

    fetch('http://localhost:5000/count-users')
        .then(response => response.json())
        .then(data => document.getElementById('total-users-count').textContent = data.total_users)
        .catch(error => console.error('Erro ao carregar total de usuários:', error));

    fetch('http://localhost:5000/count-active-templates')
        .then(response => response.json())
        .then(data => document.getElementById('active-templates-count').textContent = data.total_active_templates)
        .catch(error => console.error('Erro ao carregar templates ativos:', error));

    fetch('http://localhost:5000/count-inactive-templates')
        .then(response => response.json())
        .then(data => document.getElementById('inactive-templates-count').textContent = data.total_inactive_templates)
        .catch(error => console.error('Erro ao carregar templates inativos:', error));

    // Buscar e exibir os detalhes dos templates
    fetch('http://localhost:5000/dashboard-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const dashboardDetailsContainer = document.getElementById('dashboard-details');
            dashboardDetailsContainer.innerHTML = ''; 

            // Cria um elemento para cada template e adiciona ao container
            data.forEach(template => {
                const templateElement = document.createElement('div');
                templateElement.className = 'template-detail';
                templateElement.innerHTML = `
                    <p><strong>Nome:</strong> ${template.nome_template}</p>
                    <p><strong>Data:</strong> ${new Date(template.data_cadastrado).toLocaleDateString()}</p>
                    <p><strong>Usuário:</strong> ${template.usuario.nome_usuario}</p>
                    <p><strong>Email:</strong> ${template.usuario.email}</p>
                `;
                dashboardDetailsContainer.appendChild(templateElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os detalhes dos templates:', error);
            const dashboardDetailsContainer = document.getElementById('dashboard-details');
            dashboardDetailsContainer.textContent = 'Erro ao carregar os detalhes dos templates';
        });
});