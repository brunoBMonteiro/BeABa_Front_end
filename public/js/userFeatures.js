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