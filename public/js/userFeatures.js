document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#section-register-user form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const senha = form.querySelector("#senha").value;
        const confirmarSenha = form.querySelector("#confirmar_senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
            return; // Sai da função, impedindo o envio do formulário
        }

        // Coleta os dados do formulário em formato JSON
        const formData = {};
        new FormData(form).forEach((value, key) => {
            formData[key] = value;
        });

        // Envia os dados para o back-end
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
            form.reset(); // Limpa os campos do formulário
        })
        .catch(error => {
            console.error("Erro ao enviar os dados: ", error);
            alert("Erro ao enviar os dados. Por favor, tente novamente mais tarde.");
        });
    });
});

// Busca de usuário por matricula
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#id-search-form");
    const resultDiv = document.querySelector("#id-search-result");
    const matriculaInput = form.querySelector("#id-matricula-input");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const matricula = matriculaInput.value;

        // Se a matrícula estiver vazia, esconde os resultados e retorna
        if (!matricula) {
            resultDiv.style.display = "none";
            return;
        }

        // Buscar detalhes do usuário pela matrícula
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

            // Exibir os detalhes do usuário nos campos de formulário
            document.querySelector("#id-display-matricula").value = data.matricula;
            document.querySelector("#id-display-email").value = data.email;
            document.querySelector("#id-display-nome").value = data.nome_usuario;
            document.querySelector("#id-display-foto").value = data.foto_url;
            document.querySelector("#id-display-perfil").value = data.perfil_acesso;

            resultDiv.style.display = "flex"; // Mostra o resultado da busca
        })
        .catch(error => {
            alert("Erro ao buscar usuário. Por favor, tente novamente.");
        })
        .finally(() => {
            matriculaInput.value = ''; // Limpa o campo de matrícula após a pesquisa
        });
    });
});