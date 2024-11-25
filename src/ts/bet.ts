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
  // Verifica se já existe um modal no DOM e remove
  const existingModal = document.getElementById('bet-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Cria o HTML do modal
  const modalHTML = `
    <div id="bet-modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000;">
      <div id="bet-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); z-index: 1001; width: 400px; max-width: 90%;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Apostar no Evento</h2>
          <span style="cursor: pointer; font-size: 20px;" onclick="closeBetModal()">&times;</span>
        </div>
        <hr>
        <p><strong>Evento ID:</strong> ${eventId}</p>
        <div style="margin-bottom: 15px;">
          <label for="side" style="display: block; margin-bottom: 5px;">Escolha um lado:</label>
          <select id="side" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            <option value="A">${ladoA}</option>
            <option value="B">${ladoB}</option>
          </select>
        </div>
        <div style="margin-bottom: 15px;">
          <label for="amount" style="display: block; margin-bottom: 5px;">Valor da Aposta:</label>
          <input type="number" id="amount" min="0" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;" required>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button onclick="placeBet(${eventId})" style="background: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer;">Confirmar Aposta</button>
        </div>
      </div>
    </div>
  `;

  // Adiciona o modal ao body
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
}

function closeBetModal(): void {
  // Remove o modal do DOM
  const modalOverlay = document.getElementById('bet-modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
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