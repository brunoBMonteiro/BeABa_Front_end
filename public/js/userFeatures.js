document.addEventListener("DOMContentLoaded", function() {
    // Cadastro de novo usuário
    const formRegister = document.querySelector("#section-register-user form");
    formRegister.addEventListener("submit", function(event) {
        event.preventDefault();

        const senha = formRegister.querySelector("#senha").value;
        const confirmarSenha = formRegister.querySelector("#confirmar_senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
            return;
        }

        const formData = {};
        new FormData(formRegister).forEach((value, key) => {
            formData[key] = value;
        });

        fetch("http://localhost:3000/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Não foi possível cadastrar o usuário.');
            }
        })
        .then(data => {
            alert("Usuário cadastrado com sucesso!");
            formRegister.reset();
            fetchUsers(); // Atualiza a lista de usuários após o cadastro bem-sucedido
        })
        .catch(error => {
            console.error("Erro ao enviar os dados: ", error);
            alert("Erro ao enviar os dados. Por favor, tente novamente mais tarde.");
        });
    });

    // Busca de usuário por matricula
    const formSearch = document.querySelector("#id-search-form");
    const resultDiv = document.querySelector("#id-search-result");
    const matriculaInput = formSearch.querySelector("#id-matricula-input");

    formSearch.addEventListener("submit", function(event) {
        event.preventDefault();

        const matricula = matriculaInput.value;
        if (!matricula) {
            resultDiv.style.display = "none";
            return;
        }

        fetch(`http://localhost:3000/usuario/${matricula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Usuário não encontrado") {
                alert("Usuário não encontrado. Por favor, tente com outra matrícula.");
                resultDiv.style.display = "none";
                return;
            }

            document.querySelector("#id-display-matricula").value = data.matricula;
            document.querySelector("#id-display-email").value = data.email;
            document.querySelector("#id-display-nome").value = data.nome_usuario;
            document.querySelector("#id-display-foto").value = data.foto_url;
            document.querySelector("#id-display-perfil").value = data.perfil_acesso;

            resultDiv.style.display = "flex";
        })
        .catch(error => {
            alert("Erro ao buscar usuário. Por favor, tente novamente.");
        })
        .finally(() => {
            matriculaInput.value = ''; 
        });
    });

    // Busca de todos usuários
    const tbody = document.querySelector("#users-tbody");

    function fetchUsers() {
        fetch("http://localhost:3000/usuario/listarTodos")
        .then(response => response.json())
        .then(data => {
            displayUsers(data);
        })
        .catch(error => {
            alert("Erro ao buscar todos os usuários. Por favor, tente novamente.");
        });
    }

    function displayUsers(users) {
        tbody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.matricula}</td>
                <td>${user.email}</td>
                <td>${user.nome_usuario}</td>
                <td>${user.foto_url}</td>
                <td>${user.perfil_acesso}</td>
            `;
            tbody.appendChild(row);
        });
    }

    fetchUsers(); 
});
