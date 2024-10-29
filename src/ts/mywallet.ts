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
      const amount = parseFloat(amountInput.value);
      if (!isNaN(amount) && amount > 0) {
        await updateBalanceInDatabase(userEmail!, amount);
        updateBalance(userEmail!);
      }
    });
  }

  const removeBalanceBtn = document.getElementById('remove-balance-btn');
  if (removeBalanceBtn) {
    removeBalanceBtn.addEventListener('click', async () => {
      const amountInput = document.getElementById('remove-balance-amount') as HTMLInputElement;
      const amount = parseFloat(amountInput.value);
      if (!isNaN(amount) && amount > 0) {
        await removeBalanceFromDatabase(userEmail!, amount);
        updateBalance(userEmail!);
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