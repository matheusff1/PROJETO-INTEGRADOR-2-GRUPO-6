document.addEventListener('DOMContentLoaded', async () => {
  const userEmail = sessionStorage.getItem('loggedInEmail');

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
});