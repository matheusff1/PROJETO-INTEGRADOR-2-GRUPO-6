document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM totalmente carregado e analisado');
    const loginButton = document.getElementById('bLogin');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log("Requisição para a tela de login");
            fetch('/login', {
                method: 'GET',
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    console.error('Erro ao carregar a página de login.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição de login:', error);
            });
        });
    }

    const registerButton = document.getElementById('bRegister');

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            console.log("Requisição para a tela de cadastro");
            fetch('/register', {
                method: 'GET',
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/register';
                } else {
                    console.error('Erro ao carregar a página de cadastro.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição de cadastro:', error);
            });
        });
    }
});