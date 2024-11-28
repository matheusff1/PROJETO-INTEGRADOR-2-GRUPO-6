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


  try {
    const response = await fetch('/events/available');
    const events: { id: number; nome_evento: string; lado_a: string; lado_b: string; data_evento: string }[] = await response.json();
    const tableBody = document.querySelector('#events-table tbody');

    if (tableBody) {
      tableBody.innerHTML = '';
      events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${event.nome_evento}</td>
          <td>${event.lado_a}</td>
          <td>${event.lado_b}</td>
          <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
          <td>
            <button onclick="showBetModal(${event.id}, '${event.lado_a}', '${event.lado_b}')">Apostar</button>
          </td>`;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
});

const searchButton = document.getElementById('search') as HTMLButtonElement;

if (searchButton) {
  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const keyword = searchInput.value.trim();

    if (!keyword) {
      alert('Por favor, insira uma palavra-chave para a busca.');
      return;
    }

    try {
      const response = await fetch(`/events/search/${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar eventos.');
      }

      const events: { id: number; nome_evento: string; lado_a: string; lado_b: string; data_evento: string }[] = await response.json();
      const tableBody = document.querySelector('#events-table tbody');

      if (tableBody) {
        tableBody.innerHTML = '';

        if (events.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="5">Nenhum evento encontrado.</td></tr>';
          return;
        }

        events.forEach(event => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${event.nome_evento}</td>
            <td>${event.lado_a}</td>
            <td>${event.lado_b}</td>
            <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
            <td>
              <button onclick="showBetModal(${event.id}, '${event.lado_a}', '${event.lado_b}')">Apostar</button>
            </td>`;
          tableBody.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      alert('Erro ao buscar eventos. Tente novamente mais tarde.');
    }
  
  });


  

}
