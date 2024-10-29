document.getElementById('eventId')?.addEventListener('change', async () => {

  const params = new URLSearchParams(window.location.search);
  const userEmail = params.get('email');
  console.log("EMAIL ATIVO: ",userEmail);

  if (!userEmail) {
    window.location.href = '/'; 
    return;
  }

  const eventId = (document.getElementById('eventId') as HTMLInputElement).value;
  const winningSideSelect = document.getElementById('winningSide') as HTMLSelectElement;
  const messageDiv = document.getElementById('message') as HTMLDivElement;

  if (eventId) {
    try {
      const response = await fetch(`/events/details/${eventId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        messageDiv.innerText = 'Evento não encontrado.';
        return;
      }

      const eventData = await response.json();
      const ladoA = eventData.lado_a;
      const ladoB = eventData.lado_b;

      winningSideSelect.innerHTML = '';

      const optionA = document.createElement('option');
      optionA.value = 'A';
      optionA.textContent = ladoA;
      winningSideSelect.appendChild(optionA);

      const optionB = document.createElement('option');
      optionB.value = 'B';
      optionB.textContent = ladoB;
      winningSideSelect.appendChild(optionB);

    } catch (error) {
      console.error('Erro ao obter os detalhes do evento:', error);
      messageDiv.innerText = 'Erro ao carregar o evento. Tente novamente mais tarde.';
    }
  }
});

document.getElementById('closeEventForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const eventId = (document.getElementById('eventId') as HTMLInputElement).value;
  const winningSide = (document.getElementById('winningSide') as HTMLSelectElement).value;
  const messageDiv = document.getElementById('message') as HTMLDivElement;

  if (!winningSide) {
    messageDiv.innerText = 'Por favor, selecione o lado vencedor.';
    return;
  }

  try {
    const response = await fetch(`/events/close/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winningSide })
    });

    const data = await response.json();
    messageDiv.innerText = data.message;

    if (response.ok) {
      (document.getElementById('eventId') as HTMLInputElement).value = '';
      (document.getElementById('winningSide') as HTMLSelectElement).innerHTML = '<option value="">Selecione o lado vencedor</option>';
    }
  } catch (error) {
    console.error('Erro ao encerrar evento:', error);
    messageDiv.innerText = 'Erro ao encerrar evento. Tente novamente mais tarde.';
  }
});
