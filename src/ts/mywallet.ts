document.addEventListener('DOMContentLoaded', () => {
  const userEmail = new URLSearchParams(window.location.search).get('email');

  if (!userEmail) {
    window.location.href = 'index.html';
  } else {
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      userEmailElement.textContent = `Bem-vindo, ${userEmail}`;
    }
    updateBalance(userEmail);
  }

  const addBalanceBtn = document.getElementById('add-balance-btn');
  if (addBalanceBtn) {
    addBalanceBtn.addEventListener('click', async () => {
      const amountInput = document.getElementById('add-balance-amount') as HTMLInputElement;
      const nameInput = document.getElementById('register-nomeCartao') as HTMLInputElement;
      const cardNumberInput = document.getElementById('register-nuCartao') as HTMLInputElement;
      const codNumberInput = document.getElementById('register-cod') as HTMLInputElement;
      const dataExpeInput = document.getElementById('register-dataExp') as HTMLInputElement;

      const nameCard = nameInput.value;
      const cardNumber = cardNumberInput.value;
      const codNumber = codNumberInput.value;
      const dataExpe = dataExpeInput.value;
      const amount = parseFloat(amountInput.value);
      if (nameCard !== "" && cardNumber !== "" && codNumber !== "" && dataExpe !== "" && !isNaN(amount) && amount > 0) {
        await updateBalanceInDatabase(userEmail!, amount);
        updateBalance(userEmail!);
      } else {
        alert("Por favor, preencha todos os campos corretamente.");
      }
    });
  }

  // Função para saque via conta-corrente
const removeBalanceAccountBtn = document.getElementById('remove-balance-btn-account');
if (removeBalanceAccountBtn) {
  removeBalanceAccountBtn.addEventListener('click', async () => {
    const amountInput = document.getElementById('remove-balance-amount-account') as HTMLInputElement;
    const bankInput = document.getElementById('register-bank') as HTMLInputElement;
    const agencyInput = document.getElementById('register-agency') as HTMLInputElement;
    const accountInput = document.getElementById('register-accountd') as HTMLInputElement;

    const bank = bankInput.value;
    const agency = agencyInput.value;
    const account = accountInput.value;
    const amount = parseFloat(amountInput.value);

    if (bank && agency && account && !isNaN(amount) && amount > 0) {
      try {
        await removeBalanceFromDatabase(userEmail!, amount);
        updateBalance(userEmail!);
        alert("Saque via conta-corrente realizado com sucesso!");
      } catch (error) {
        alert("Erro ao realizar o saque. Tente novamente.");
        console.error(error);
      }
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  });
}

// Função para saque via Pix
const removeBalancePixBtn = document.getElementById('remove-balance-btn-pix');
if (removeBalancePixBtn) {
  removeBalancePixBtn.addEventListener('click', async () => {
    const amountInput = document.getElementById('remove-balance-amount-pix') as HTMLInputElement;
    const pixInput = document.getElementById('register-keyPix') as HTMLInputElement;

    const pix = pixInput.value;
    const amount = parseFloat(amountInput.value);

    if (pix && !isNaN(amount) && amount > 0) {
      try {
        await removeBalanceFromDatabase(userEmail!, amount);
        updateBalance(userEmail!);
        alert("Saque via Pix realizado com sucesso!");
      } catch (error) {
        alert("Erro ao realizar o saque. Tente novamente.");
        console.error(error);
      }
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  });
}

});


async function updateBalance(email: string): Promise<void> {
  const response = await fetch(`/wallet/get-balance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (response.ok) {
    const data = await response.json();
    const balance = parseFloat(data.balance);

    if (!isNaN(balance)) {
      const balanceElement = document.getElementById('current-balance');
      if (balanceElement) {
        balanceElement.textContent = `Saldo atual: R$ ${balance.toFixed(2)}`;
      }
    } else {
      console.error('O saldo retornado não é um número válido:', data.balance);
    }
  } else {
    console.error('Erro ao obter saldo:', response.statusText);
  }
}

async function updateBalanceInDatabase(email: string, amount: number): Promise<void> {
  const response = await fetch('/wallet/add-balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, amount })
  });
  if (!response.ok) {
    console.error('Erro ao adicionar saldo:', response.statusText);
  }
}

async function removeBalanceFromDatabase(email: string, amount: number): Promise<void> {
  const response = await fetch('/wallet/remove-balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, amount })
  });
  if (!response.ok) {
    console.error('Erro ao remover saldo:', response.statusText);
  }
}