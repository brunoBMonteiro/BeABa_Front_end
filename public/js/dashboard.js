document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        fetch('http://localhost:5000/count-templates').then(response => response.json()),
        fetch('http://localhost:5000/count-users').then(response => response.json()),
        fetch('http://localhost:5000/count-active-templates').then(response => response.json()),
        fetch('http://localhost:5000/count-inactive-templates').then(response => response.json()),
        fetch('http://localhost:5000/dashboard-data').then(response => response.json())
    ])
    .then(([totalTemplates, totalUsers, activeTemplates, inactiveTemplates, dashboardData]) => {
        document.getElementById('total-templates-count').textContent = totalTemplates.total_templates;
        document.getElementById('total-users-count').textContent = totalUsers.total_users;
        document.getElementById('active-templates-count').textContent = activeTemplates.total_active_templates;
        document.getElementById('inactive-templates-count').textContent = inactiveTemplates.total_inactive_templates;

        // Ordena os dados do dashboard por data, do mais recente para o mais antigo
        dashboardData.sort((a, b) => new Date(b.data_cadastrado) - new Date(a.data_cadastrado));

        // Atualiza os arrays de nomes e contagens de colunas após a ordenação
        const names = dashboardData.map(template => template.nome_template);
        const columnCounts = dashboardData.map(template => Object.keys(template.campos_template).length);

        // Configuração e criação do gráfico de barras
        const linesCtx = document.getElementById('linesChart').getContext('2d');
        new Chart(linesCtx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'Quantidade de Colunas por Template',
                    data: columnCounts,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterBody: function (context) {
                                const index = context[0].dataIndex;
                                const template = dashboardData[index];
                                if (template) {
                                    return [
                                        `Usuário: ${template.nome_usuario}`,
                                        `Email: ${template.email}`,
                                        `Data: ${new Date(template.data_cadastrado).toLocaleDateString()}`
                                    ];
                                }
                                return ['Informação do usuário indisponível.'];
                            }
                        }
                    }
                }
            }
        });

        // Configuração e criação do gráfico de pizza
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: ['Ativos', 'Inativos'],
                datasets: [{
                    label: 'Status dos Templates',
                    data: [activeTemplates.total_active_templates, inactiveTemplates.total_inactive_templates],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
    });
});