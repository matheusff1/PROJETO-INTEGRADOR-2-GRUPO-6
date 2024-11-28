document.addEventListener('DOMContentLoaded', () => {
  const newEventForm = document.getElementById('new-event-form');
  
  if (newEventForm) {
    newEventForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nomeEventoInput = document.getElementById('event-name') as HTMLInputElement | null;
      const ladoAInput = document.getElementById('side-a') as HTMLInputElement | null;
      const ladoBInput = document.getElementById('side-b') as HTMLInputElement | null;
      const dataEventoInput = document.getElementById('data-evento') as HTMLInputElement | null;
      const dataFinalEventoInput = document.getElementById('data_final_evento') as HTMLInputElement | null;
      const porcentagemLadoAInput = document.getElementById('side-a-percentage') as HTMLInputElement | null;
      const porcentagemLadoBInput = document.getElementById('side-b-percentage') as HTMLInputElement | null;
      const responseMessageDiv = document.getElementById('response-message') as HTMLDivElement | null;
      const descricaoEventoInput = document.getElementById('descrition-event') as HTMLInputElement | null;
      
      // Verificar se todos os campos necessários existem
      if (!nomeEventoInput || !ladoAInput || !ladoBInput || !dataEventoInput || !dataFinalEventoInput || !porcentagemLadoAInput || !porcentagemLadoBInput || !responseMessageDiv || !descricaoEventoInput) {
        console.error('Erro: Algum dos campos não foi encontrado.');
        return;
      }

      const nome_evento = nomeEventoInput.value;
      const lado_a = ladoAInput.value;
      const lado_b = ladoBInput.value;
      const data_evento = dataEventoInput.value;
      const data_final_evento = dataFinalEventoInput.value;
      const porcentagem_lado_a = parseFloat(porcentagemLadoAInput.value);
      const porcentagem_lado_b = parseFloat(porcentagemLadoBInput.value);
      const descricao_event = descricaoEventoInput.value;

      // Validação de data no frontend
      if (new Date(data_evento) <= new Date()) {
        responseMessageDiv.textContent = 'O evento não pode ser criado com uma data no passado.';
        responseMessageDiv.style.color = 'red';
        responseMessageDiv.style.display = 'block';
        return;
      }

      if (new Date(data_final_evento) <= new Date(data_evento)) {
        responseMessageDiv.textContent = 'A data final do evento não pode ser anterior ou igual à data do evento.';
        responseMessageDiv.style.color = 'red';
        responseMessageDiv.style.display = 'block';
        return;
      }

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
            data_final_evento,
            porcentagem_lado_a,
            porcentagem_lado_b,
            descricao_event,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          responseMessageDiv.textContent = data.message;
          responseMessageDiv.style.color = 'green';
          responseMessageDiv.style.display = 'block';
          alert("Evento criado com sucesso.");
          window.location.href = "/welcome";
        } else {
          responseMessageDiv.textContent = `Erro: ${data.message || data.error}`;
          responseMessageDiv.style.color = 'red';
          responseMessageDiv.style.display = 'block';
        }
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        responseMessageDiv.textContent = 'Erro no servidor.';
        responseMessageDiv.style.color = 'red';
        responseMessageDiv.style.display = 'block';
      }
    });
  }
});
