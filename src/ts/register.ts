document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register-btn');
    if (registerButton) {
        registerButton.addEventListener('click', async () => {
            const emailInput = document.getElementById('register-email') as HTMLInputElement;
            const nameInput = document.getElementById('register-name') as HTMLInputElement;
            const cpfInput = document.getElementById('register-cpf') as HTMLInputElement;
            const passwordInput = document.getElementById('register-password') as HTMLInputElement;
            const registerMessageDiv = document.getElementById('register-message') as HTMLDivElement;
            const birthdateInput = document.getElementById('register-date') as HTMLInputElement;

            const birthdate = birthdateInput.value;
            const email = emailInput.value;
            const name = nameInput.value;
            const cpf = cpfInput.value;
            const password = passwordInput.value;

            // Calcula a idade com base na data de nascimento
            const calculateAge = (birthdate: string): number => {
                const birthDateObj = new Date(birthdate);
                const today = new Date();
                let age = today.getFullYear() - birthDateObj.getFullYear();
                const monthDifference = today.getMonth() - birthDateObj.getMonth();
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
                    age--;
                }
                return age;
            };

            const age = calculateAge(birthdate);

            if (age < 18) {
                registerMessageDiv.textContent = 'Cadastro permitido apenas para maiores de 18 anos.';
                return;
            }

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, name, cpf, password, birthdate })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Novo usuário cadastrado");
                    registerMessageDiv.textContent = data.message;

                    window.location.href = '/login';
                } else {
                    registerMessageDiv.textContent = data.message;
                }
            } catch (error) {
                console.error('Erro ao fazer cadastro:', error);
                registerMessageDiv.textContent = 'Erro no servidor.';
            }
        });
    }
});
