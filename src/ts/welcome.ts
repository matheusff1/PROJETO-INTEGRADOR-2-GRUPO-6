document.addEventListener('DOMContentLoaded', async () => {
  const userEmail = sessionStorage.getItem('loggedInEmail');
  alert("Usuário autenticado: " + userEmail);

  if (userEmail) {
    const userEmailElement = document.getElementById('user-email');

    if (userEmailElement) {
      userEmailElement.textContent = `Bem-vindo, ${userEmail}`;
    }

    try {
      const response = await fetch(`/users/check-admin?email=${encodeURIComponent(userEmail)}`);

      if (response.ok) {
        const data = await response.json();

        if (data.isAdmin) {
          window.location.href = '/admpage?email=' + encodeURIComponent(userEmail);
        }
      } else {
        console.error('Erro ao verificar status de administrador:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao verificar status de administrador:', error);
    }
  } else {
    window.location.href = '/';
    return; 
  }

  const myWalletBtn = document.getElementById('my-wallet-btn');

  if (myWalletBtn) {
    myWalletBtn.addEventListener('click', () => {
      window.location.href = '/mywallet?email=' + encodeURIComponent(userEmail);
    });
  }

  const newEventBtn = document.getElementById('new-event-btn');

  if (newEventBtn) {
    newEventBtn.addEventListener('click', () => {
      window.location.href = '/newevent?email=' + encodeURIComponent(userEmail);
    });
  }

  const betBtn = document.getElementById('bet-btn');
  
  if (betBtn) {
    betBtn.addEventListener('click', () => {
      window.location.href = '/bet?email=' + encodeURIComponent(userEmail);
    });
  }
  const searchInput = document.querySelector<HTMLInputElement>('#busca');
  const highlightsContainer = document.querySelector<HTMLDivElement>('.highlights');

  if (searchInput && highlightsContainer) {
    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            highlightsContainer.innerHTML = `
                <div class="text-center">Digite algo para buscar eventos.</div>
            `;
            return;
        }

        try {
            const response = await fetch(`/events/search/${encodeURIComponent(searchTerm)}`);

            if (!response.ok) {
                if (response.status === 404) {
                    highlightsContainer.innerHTML = `
                        <div class="text-center">Nenhum evento encontrado para "${searchTerm}".</div>
                    `;
                } else {
                    throw new Error('Erro ao buscar eventos');
                }
                return;
            }

            const events = await response.json();

            highlightsContainer.innerHTML = events
                .map((event: { nome_evento: string; lado_a: string; lado_b: string }) => {
                    return `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${event.nome_evento}</h5>
                                    <p class="card-text">
                                        <strong>Lado A:</strong> ${event.lado_a}<br>
                                        <strong>Lado B:</strong> ${event.lado_b}
                                    </p>
                                    <a href="#" class="btn btn-primary">Detalhes</a>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .join('');
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            highlightsContainer.innerHTML = `
                <div class="text-center text-danger">Erro ao buscar eventos. Tente novamente mais tarde.</div>
            `;
        }
    });
}
});