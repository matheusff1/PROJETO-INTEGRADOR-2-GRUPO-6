document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get('email');

    if (!userEmail) {
        window.location.href = '/';
        return;
    }

    const response = await fetch('/events/pending');
    const events: { 
        id: number; 
        nome_evento: string; 
        lado_a: string; 
        lado_b: string; 
        data_evento: string 
    }[] = await response.json();

    const tableBody = document.querySelector('#events-table');

    if (tableBody) {
        events.forEach(event => {
            const row = document.createElement('tr');
            row.id = `event-row-${event.id}`;
            row.innerHTML = `
                <td>${event.nome_evento}</td>
                <td>${event.lado_a}</td>
                <td>${event.lado_b}</td>
                <td>${new Date(event.data_evento).toLocaleString('pt-BR')}</td>
                <td>
                    <button onclick="rejectEvent(${event.id}, '${userEmail}')">Reprovar</button>
                </td>`;
            tableBody.appendChild(row);
        });
    }
});

async function rejectEvent(eventId: number, userEmail: string): Promise<void> {
    const motivo = prompt('Digite o motivo da rejeição:');
    if (!motivo) {
        alert('Motivo da rejeição é obrigatório!');
        return;
    }

    try {
        const response = await fetch(`/events/reject/${eventId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ motivo, userEmail })
        });

        if (response.ok) {
            alert('Evento rejeitado com sucesso!');
            console.log(`Evento rejeitado por: ${userEmail}`);
            const row = document.querySelector(`#event-row-${eventId}`);
            if (row) {
                row.remove();
            }
        } else {
            alert('Erro ao rejeitar o evento.');
        }
    } catch (error) {
        console.error('Erro ao rejeitar o evento:', error);
        alert('Ocorreu um erro ao tentar rejeitar o evento.');
    }
}
