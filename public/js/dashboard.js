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

    fetch('http://localhost:5000/dashboard-data')
        .then(response => response.json())
        .then(data => {
            const names = data.map(template => template.nome_template);
            // Calcula a quantidade de colunas para cada template
            const columnCounts = data.map(template => Object.keys(template.campos_template).length);
            const activeCounts = data.filter(template => template.status).length;
            const inactiveCounts = data.filter(template => !template.status).length;
            const linesCtx = document.getElementById('linesChart').getContext('2d');
            const statusCtx = document.getElementById('statusChart').getContext('2d');

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
                                    const template = data[index];
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

            new Chart(statusCtx, {
                type: 'pie',
                data: {
                    labels: ['Ativos', 'Inativos'],
                    datasets: [{
                        label: 'Status dos Templates',
                        data: [activeCounts, inactiveCounts],
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
            console.error('Erro ao carregar os detalhes dos templates:', error);
        });
});