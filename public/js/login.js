document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('user_password');
    const passwordToggle = document.getElementById('password-toggle');

    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '<i class="bi bi-eye-fill"></i>';
        }
    });
});
