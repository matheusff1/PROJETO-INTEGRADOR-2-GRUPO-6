document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const emailInput = document.getElementById('login-email') as HTMLInputElement;
            const passwordInput = document.getElementById('login-password') as HTMLInputElement;
            const loginMessage = document.getElementById('login-message') as HTMLDivElement;
            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("FUNCIONAMENTO OK");
                    loginMessage.textContent = data.message;

                    sessionStorage.setItem('loggedInEmail', email);

                    window.location.href = '/welcome';
                } else {
                    loginMessage.textContent = data.message;
                }
            } catch (error) {
                console.log("ERRO OCORREU");
                console.error('Erro ao fazer login:', error);
                loginMessage.textContent = 'Erro no servidor.';
            }
        });
    }
});