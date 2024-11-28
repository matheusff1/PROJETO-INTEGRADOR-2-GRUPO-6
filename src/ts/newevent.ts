document.addEventListener('DOMContentLoaded', () => {
  const newEventForm = document.getElementById('new-event-form');
  if (newEventForm) {
    newEventForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nomeEventoInput = document.getElementById('event-name') as HTMLInputElement;
      const ladoAInput = document.getElementById('side-a') as HTMLInputElement;
      const ladoBInput = document.getElementById('side-b') as HTMLInputElement;
      const dataEventoInput = document.getElementById('data-evento') as HTMLInputElement;
      const porcentagemLadoAInput = document.getElementById('side-a-percentage') as HTMLInputElement;
      const porcentagemLadoBInput = document.getElementById('side-b-percentage') as HTMLInputElement;
      const responseMessageDiv = document.getElementById('response-message') as HTMLDivElement;
      const descricaoEventoInput = document.getElementById('descrition-event') as HTMLInputElement;
      const nome_evento = nomeEventoInput.value;
      const lado_a = ladoAInput.value;
      const lado_b = ladoBInput.value;
      const data_evento = dataEventoInput.value;
      const porcentagem_lado_a = parseFloat(porcentagemLadoAInput.value);
      const porcentagem_lado_b = parseFloat(porcentagemLadoBInput.value);
      const descricao_event = descricaoEventoInput.value;

      try {
        const response = await fetch('/eventos/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome_evento,
            lado_a,
            lado_b,
            data_evento,
            porcentagem_lado_a,
            porcentagem_lado_b,
            descricao_event,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          responseMessageDiv.textContent = data.message;
          alert("Evento criado com sucesso.");
          window.location.href = "/welcome";
        } else {
          responseMessageDiv.textContent = `Erro: ${data.error}`;
        }
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        responseMessageDiv.textContent = 'Erro no servidor.';
      }
    });
  }
});