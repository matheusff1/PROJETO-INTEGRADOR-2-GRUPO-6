document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('email');

  if (userEmail) {
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      userEmailElement.textContent = `Bem-vindo, ${userEmail}!`;
    }
  } else {
    window.location.href = '/'; 
    return; 
  }

  const approveEventsBtn = document.getElementById('approve-events-btn');
  if (approveEventsBtn) {
    approveEventsBtn.addEventListener('click', () => {
      window.location.href = '/approveevents?email=' + encodeURIComponent(userEmail!);
    });
  }
  
  const rejectEventsBtn = document.getElementById('reject-events-btn');
  if (rejectEventsBtn) {
    rejectEventsBtn.addEventListener('click', () => {
      window.location.href = '/rejectevents?email=' + encodeURIComponent(userEmail!);
    });
  }

  const closeEventsBtn = document.getElementById('close-events-btn');
  if (closeEventsBtn) {
    closeEventsBtn.addEventListener('click', () => {
      window.location.href = '/closeevents?email=' + encodeURIComponent(userEmail!);
    });
  }
});