const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {  // Adicionando uma verificação para garantir que o botão de logout exista na página atual
    btnLogout.addEventListener('click', function () {
        // Remove o token do local storage
        localStorage.removeItem('token');

        // Redireciona o usuário para a tela de login
        window.location.href = 'http://127.0.0.1:5500/app/views/login/login.html'; // Lembre-se de atualizar com o caminho correto para sua tela de login
    });
}