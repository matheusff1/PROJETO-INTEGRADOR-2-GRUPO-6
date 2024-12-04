document.addEventListener('DOMContentLoaded', async () => {
    const userEmail = sessionStorage.getItem('loggedInEmail');
  
    // Verifica se o usuário está logado, caso contrário redireciona
    if (!userEmail) {
      window.location.href = 'index.html';
    } else {
      const userEmailElement = document.getElementById('user-email');
  
      if (userEmailElement) {
        userEmailElement.textContent = `Bem-vindo, ${userEmail}`;
      }
    }
  
    try {
      // Faz a requisição para buscar os eventos mais apostados
      const response = await fetch('/events/proximoAcabar');
      if (!response.ok) throw new Error('Erro ao carregar os eventos mais apostados');
  
      // Define o tipo dos eventos
      const events: { id: number; nome_evento: string; lado_a: string; lado_b: string; data_evento: string }[] =
        await response.json();
        console.log(events);
      const tableBody = document.querySelector('#events-table-proximo-acabar tbody');
  
      if (tableBody) {
        tableBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la
  
        // Preenche a tabela com os eventos
        events.forEach(event => {
          console.log(event.id); // Verifique se o id_evento está correto aqui
          const button = document.createElement('button');
          button.textContent = 'Apostar';
          button.onclick = () => openBet(event.id, event.lado_a, event.lado_b); // Passe o id_evento corretamente
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${event.nome_evento}</td>
            <td>${event.lado_a}</td>
            <td>${event.lado_b}</td>
            <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
          `;
          const cell = document.createElement('td');
          cell.appendChild(button);
          row.appendChild(cell);
          tableBody.appendChild(row);
        });
        
          
      }
    } catch (error) {
      console.error('Erro ao carregar os eventos proximo acabar:', error);
      alert('Não foi possível carregar os eventos proximo acabar.');
    }
  });
  
  // Função para abrir o modal de apostas
  function openBet(eventId: number, ladoA: string, ladoB: string): void {
    console.log('Abrindo modal com:', { eventId, ladoA, ladoB }); // Debug
    const modalHTML = `
      <div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000;">
        <div id="bet-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 10px; width: 400px;">
          <h2>Apostar no Evento</h2>
          <p><strong>ID do Evento:</strong> ${eventId}</p>
          <label for="side">Escolha um lado:</label>
          <select id="side">
            <option value="A">${ladoA}</option>
            <option value="B">${ladoB}</option>
          </select>
          <label for="amount">Valor da aposta:</label>
          <input type="number" id="amount" placeholder="Digite o valor" min="1" />
          <button onclick="confirm(${eventId})">Confirmar Aposta</button>
          <button onclick="closeM()">Cancelar</button>
        </div>
      </div>
    `;
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
  }
  
  
  
  // Função para fechar o modal
  function closeM(): void {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.remove();
  }
  
  // Função para confirmar a aposta
  async function confirm(eventId: number): Promise<void> {
    const side = (document.getElementById('side') as HTMLSelectElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement).value;
    const userEmail = sessionStorage.getItem('loggedInEmail'); // Certifique-se de que o email está salvo no sessionStorage
  
    if (!userEmail) {
      alert('Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }
  
    try {
      // Enviando a requisição para o servidor
      const response = await fetch('/bets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          side,
          amount: parseFloat(amount),
          email: userEmail,
        }),
      });
  
      // Tratando a resposta
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        closeM();
        window.location.reload(); // Recarrega a página para atualizar os dados
      } else {
        const error = await response.json();
        alert(`Erro ao realizar aposta: ${error.error}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a aposta:', error);
      alert('Não foi possível realizar a aposta. Tente novamente mais tarde.');
    }
  }
  