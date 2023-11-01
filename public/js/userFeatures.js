document.addEventListener("DOMContentLoaded", function () {

    // Seleciona o formulário de atualização de acesso
    const formUpdateAccess = document.getElementById('form-update-access');

    // Função para lidar com o envio do formulário
    formUpdateAccess.addEventListener('submit', function (e) {
        e.preventDefault();

        // Pega os valores do formulário
        const matricula = document.getElementById('input-update-matricula').value;
        const tipoAcesso = document.getElementById('select-update-tipoacesso').value;

        // Prepara os dados para enviar
        const data = {
            novoTipoAcesso: tipoAcesso 
        };

        fetch(`http://localhost:3000/usuario/${matricula}/tipoacesso`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo deu errado na atualização!');
                }
            })
            .then(data => {
                alert(data.mensagem); 
                fetchUsers();
                document.getElementById('input-update-matricula').value = '';
                
            })
            .catch((error) => {
                console.error('Erro:', error);
                alert('Erro ao atualizar acesso.');
            });
    });

    // Deletar usuário por matrícula
    const formDelete = document.querySelector("#deleteUserForm");
    const inputMatricula = formDelete.querySelector("#matricula");

    formDelete.addEventListener("submit", function (event) {
        event.preventDefault();

        const matricula = inputMatricula.value;
        if (!matricula) {
            alert("Por favor, insira uma matrícula válida.");
            return;
        }

        fetch(`http://localhost:3000/usuario/${matricula}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível deletar o usuário.');
                }
            })
            .then(data => {
                if (data.message === "Usuário excluído com sucesso") {
                    alert("Usuário deletado com sucesso!");
                    inputMatricula.value = '';
                    fetchUsers(); // Atualiza a lista de usuários após a exclusão bem-sucedida
                } else {
                    alert("Erro ao deletar usuário. Por favor, tente novamente.");
                }
            })
            .catch(error => {
                console.error("Erro ao enviar os dados: ", error);
                alert("Erro ao enviar os dados. Por favor, tente novamente mais tarde.");
            });
    });


    // Cadastro de novo usuário
    const formRegister = document.querySelector("#section-register-user form");
    formRegister.addEventListener("submit", function (event) {
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

    formSearch.addEventListener("submit", function (event) {
        event.preventDefault();

        const matricula = matriculaInput.value;
        if (!matricula) {
            resultDiv.style.display = "none";
            return;
        }

        fetch(`http://localhost:3000/usuario/${matricula}`)
            .then(response => {
                if (response.status === 404) {
                    throw new Error("Usuário não encontrado");
                }
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.querySelector("#id-display-matricula").value = data.matricula;
                document.querySelector("#id-display-email").value = data.email;
                document.querySelector("#id-display-nome").value = data.nome_usuario;
                document.querySelector("#id-display-foto").value = data.foto_url;
                document.querySelector("#id-display-perfil").value = data.perfil_acesso;

                resultDiv.style.display = "flex";
            })
            .catch(error => {
                if (error.message === "Usuário não encontrado") {
                    alert("Usuário com a matrícula " + matricula + " não foi encontrado. Por favor, tente com outra matrícula.");
                } else {
                    alert("Erro ao buscar usuário. Por favor, tente novamente.");
                }
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
