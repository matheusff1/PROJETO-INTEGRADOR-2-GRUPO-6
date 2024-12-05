document.addEventListener('DOMContentLoaded', () => {
  const userEmail: string | null = new URLSearchParams(window.location.search).get('email');

  if (!userEmail) {
    window.location.href = 'index.html';
  } else {
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      (userEmailElement as HTMLElement).textContent = `Bem-vindo, ${userEmail}`;
    }
    updateBalance(userEmail);
  }

  const goToWalletBtn = document.getElementById('go-to-wallet-btn');
  if (goToWalletBtn) {
    goToWalletBtn.addEventListener('click', () => {
      window.location.href = `mywallet.html?email=${userEmail}`;
    });
  }

  const addBalanceBtn = document.getElementById('add-balance-btn');

  if (addBalanceBtn) {
    addBalanceBtn.addEventListener('click', async () => {
      const amountInput = document.getElementById('add-balance-amount') as HTMLInputElement;
      const nameInput = document.getElementById('register-nomeCartao') as HTMLInputElement;
      const cpfInput = document.getElementById('register-cpf') as HTMLInputElement;
      const cardNumberInput = document.getElementById('register-nuCartao') as HTMLInputElement;
      const codNumberInput = document.getElementById('register-cod') as HTMLInputElement;
      const dataExpeInput = document.getElementById('register-dataExp') as HTMLInputElement;
      const nameCard = nameInput.value;
      const cpfcard = cpfInput.value;
      const cardNumber = cardNumberInput.value;
      const codNumber = codNumberInput.value;
      const dataExpe = dataExpeInput.value;
      const amount = parseFloat(amountInput.value);

      if (nameCard !== "" && cardNumber !== "" && codNumber !== "" && dataExpe !== "" && !isNaN(amount) && amount > 0) {
        if (userEmail) {
          await updateBalanceInDatabase(userEmail, amount);
          updateBalance(userEmail);
          alert("Depósito via cartão realizado com sucesso!");
          window.location.href = `mywallet.html?email=${userEmail}`;
        }
      } else {
        alert("Por favor, preencha todos os campos corretamente.");
      }
    });
  }

  async function loadExtractData(): Promise<void> {
    try {
      const userEmail: string | null = new URLSearchParams(window.location.search).get('email');

      if (!userEmail) {
        console.error("Email não encontrado na URL.");
        return;
      }

      const response = await fetch(`/wallet/extract/${userEmail}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do extrato');
      }

      const tableBody = document.querySelector('#user-extract-table');
      const extract: { evento: number; lado_apostado: string; data_evento: string; valor: number }[] = await response.json();

      if (!tableBody) {
        console.error('Tabela não encontrada no DOM');
        return;
      }

      extract.forEach((item) => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${item.evento}</td>
          <td>${item.lado_apostado}</td>
          <td>R$ ${item.valor}</td>
          <td>${new Date(item.data_evento).toLocaleString('pt-BR')}</td>
        `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao preencher a tabela:', error);
    }
  }

  loadExtractData();

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
      const saldo = document.getElementById('current-balance') as HTMLDivElement;
      const saldofloat = parseFloat(saldo.textContent || '0')

      if (bank && agency && account && !isNaN(amount) && amount > 0) {
        if (userEmail) {
          try {
            if(amount<=saldofloat){
              await removeBalanceFromDatabase(userEmail, amount);
              updateBalance(userEmail);
              alert("Saque via conta-corrente realizado com sucesso!");
              window.location.href = `mywallet.html?email=${userEmail}`;
            } else{
              alert("Saldo insuficiente.")
            }
          } catch (error) {
            alert("Erro ao realizar o saque. Tente novamente.");
            console.error(error);
          }
        }
      } else {
        alert("Preencha todos os campos corretamente.");
      }
    });
  }

  const removeBalancePixBtn = document.getElementById('remove-balance-btn-pix');
  if (removeBalancePixBtn) {
    removeBalancePixBtn.addEventListener('click', async () => {
      const amountInput = document.getElementById('remove-balance-amount-pix') as HTMLInputElement;
      const pixInput = document.getElementById('register-keyPix') as HTMLInputElement;
      const pix = pixInput.value;
      const amount = parseFloat(amountInput.value);
      const saldo = document.getElementById('current-balance') as HTMLDivElement;
      const saldofloat = parseFloat(saldo.textContent || '0');

      if (pix && !isNaN(amount) && amount > 0) {
        if (userEmail) {
          try {
            if(saldofloat < amount){
              alert("Valor solicitado acima do que voce tem!");
              window.location.href = `mywallet.html?email=${userEmail}`;
            } else{
              await removeBalanceFromDatabase(userEmail, amount);
              updateBalance(userEmail);
              alert("Saque via Pix realizado com sucesso!");
              window.location.href = `mywallet.html?email=${userEmail}`;
            }
          } catch (error) {
            alert("Erro ao realizar o saque. Tente novamente.");
            console.error(error);
          }
        }
      } else {
        alert("Preencha todos os campos corretamente.");
      }
    });
  }
});

async function updateBalance(email: string): Promise<void> {
  const response = await fetch('/wallet/get-balance', {
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
        balanceElement.textContent = `${balance.toFixed(2)}`;
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
