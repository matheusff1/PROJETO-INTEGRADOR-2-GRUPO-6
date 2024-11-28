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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login bem-sucedido:", data);
          loginMessage.textContent = data.message;

          // Armazena o email no sessionStorage
          sessionStorage.setItem('loggedInEmail', email);

          // Redireciona para a página de administração
          window.location.href = `/welcome?email=${encodeURIComponent(email)}`;
        } else {
          console.log("Falha no login:", data);
          loginMessage.textContent = data.message;
        }
      } catch (error) {
        console.error('Erro ao realizar o login:', error);
        loginMessage.textContent = 'Erro no servidor. Tente novamente mais tarde.';
      }
    });
  }
});
