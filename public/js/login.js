document.addEventListener('DOMContentLoaded', function() {
    let passwordInput = document.getElementById('user_password');
    const emailInput = document.getElementById('user_email');
    const passwordToggle = document.getElementById('password-toggle');
    const loginButton = document.querySelector('.button-login button');

    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            const clone = passwordInput.cloneNode(true);
            clone.type = 'text';
            clone.value = passwordInput.value;
            passwordInput.parentNode.replaceChild(clone, passwordInput);
            passwordToggle.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
            passwordInput = clone;
        } else {
            const clone = passwordInput.cloneNode(true);
            clone.type = 'password';
            clone.value = passwordInput.value;
            passwordInput.parentNode.replaceChild(clone, passwordInput);
            passwordToggle.innerHTML = '<i class="bi bi-eye-fill"></i>';
            passwordInput = clone;
        }
    });

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        console.log("Dados de login:", { email, password });

        if (!email || !password) {
            alert('Por favor, preencha ambos os campos, email e senha.');
            return;
        }

        fetch('http://localhost:3000/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userName', data.nome);
                localStorage.setItem('userPermission', data.perfil);

                if (data.perfil === 'Padrão') {
                    window.location.href = 'http://127.0.0.1:5500/app/views/user/userHome.html';
                } else if (data.perfil === 'Gestor' || data.perfil === 'Administrador') {
                    window.location.href = 'http://127.0.0.1:5500/app/views/administrator/administratorHome.html';
                }
            } else {
                alert('Erro ao realizar login. Verifique suas credenciais.');
            }
        })
        .catch(error => {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login. Por favor, tente novamente.');
        });
    });
});