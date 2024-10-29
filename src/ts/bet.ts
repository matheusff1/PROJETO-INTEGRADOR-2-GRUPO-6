document.addEventListener('DOMContentLoaded', async () => {
  const userEmail = sessionStorage.getItem('loggedInEmail');

  if (!userEmail) {
    window.location.href = 'index.html';
  } else {
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      userEmailElement.textContent = `Bem-vindo, ${userEmail}`;
    }
  }

  const response = await fetch('/events/available');
  const events: { id: number; nome_evento: string; lado_a: string; lado_b: string; data_evento: string }[] = await response.json();

  const tableBody = document.querySelector('#events-table tbody');
  if (tableBody) {
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.nome_evento}</td>
        <td>${event.lado_a}</td>
        <td>${event.lado_b}</td>
        <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
        <td>
          <button onclick="showBetModal(${event.id}, '${event.lado_a}', '${event.lado_b}')">Apostar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
});

function showBetModal(eventId: number, ladoA: string, ladoB: string): void {
  const modalHTML = `
    <div id="bet-modal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeBetModal()">&times;</span>
        <h2>Apostar no Evento</h2>
        <p>Evento ID: ${eventId}</p>
        <label for="side">Escolha um lado:</label>
        <select id="side">
          <option value="A">${ladoA}</option>
          <option value="B">${ladoB}</option>
        </select>
        <label for="amount">Valor da Aposta:</label>
        <input type="number" id="amount" min="0" step="0.01" required>
        <button onclick="placeBet(${eventId})">Confirmar Aposta</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeBetModal(): void {
  const modal = document.getElementById('bet-modal');
  if (modal) {
    modal.remove();
  }
}

async function placeBet(eventId: number): Promise<void> {
  const side = (document.getElementById('side') as HTMLSelectElement).value;
  const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
  const percentage = parseFloat((document.getElementById('amount') as HTMLInputElement).value);

  const userEmail = sessionStorage.getItem('loggedInEmail');

  const response = await fetch('/bets/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventId,
      side,
      amount,
      email: userEmail
    }),
  });

  const data = await response.json();

  if (response.ok) {
    alert('Aposta realizada com sucesso!');
    closeBetModal();
    window.location.reload();
  } else {
    alert(`Erro ao realizar a aposta: ${data.error}`);
  }
}