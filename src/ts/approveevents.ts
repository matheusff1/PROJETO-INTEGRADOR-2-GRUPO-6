document.addEventListener('DOMContentLoaded', async () => {
  // Obter o email do usuário da URL
  const params = new URLSearchParams(window.location.search);
  const userEmail = params.get('email');

  if (!userEmail) {
    window.location.href = '/';  // Se não houver email, redireciona para a página inicial
    return;
  }

  // Fazendo a requisição para obter os eventos pendentes do servidor
  const response = await fetch('/events/pending');
  const events: { id: number; nome_evento: string; lado_a: string; lado_b: string; data_evento: string }[] = await response.json();

  // Preencher a tabela com os eventos
  const tableBody = document.querySelector('#events-table');
  if (tableBody) {
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.nome_evento}</td>
        <td>${event.lado_a}</td>
        <td>${event.lado_b}</td>
        <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
        <td><button class="btn btn-success btn-sm" onclick="approveEvent(${event.id}, '${userEmail}')">Aprovar</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
});

// Função para aprovar o evento
async function approveEvent(eventId: number, userEmail: string): Promise<void> {
  const response = await fetch(`/events/approve/${eventId}`, { method: 'POST' });
  if (response.ok) {
    alert('Evento aprovado com sucesso!');
    console.log(`Evento aprovado por: ${userEmail}`);
    window.location.reload(); // Recarrega a página para atualizar a lista de eventos
  } else {
    alert('Erro ao aprovar o evento.');
  }
}