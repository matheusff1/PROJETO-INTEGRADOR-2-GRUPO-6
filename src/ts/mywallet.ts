

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
        await handleWithdrawal(userEmail!, amount);
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

// Função para calcular a taxa de saque
export  function calculateWithdrawalFee(amount: number): number {
  if (amount <= 100) {
      return amount * 0.04;
  } else if (amount <= 1000) {
      return amount * 0.03;
  } else if (amount <= 5000) {
      return amount * 0.02;
  } else if (amount <= 101000) {
      return amount * 0.01;
  } else {
      throw new Error("O valor excede o limite máximo de saque.");
  }
}

export async function handleWithdrawal(email: string, amount: number): Promise<void> {
  const response = await fetch('/wallet/remove-balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, amount })
  });
  try {
    if(response.ok){

    const fee = await calculateWithdrawalFee(amount);
    const totalAmount = amount - fee;
    await removeBalanceFromDatabase(email, totalAmount);
    console.log(`Saque realizado com sucesso. Valor solicitado: R$${amount.toFixed(2)}, taxa: R$${fee.toFixed(2)}, valor final descontado: R$${totalAmount.toFixed(2)}`);

     if (totalAmount <= 0) {
      console.error("O valor após a taxa não é suficiente para realizar o saque.");
      return;
    }}
      } catch (error) {
    console.error("Erro ao calcular a taxa ou realizar o saque:", error);
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