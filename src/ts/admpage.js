"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userEmail = urlParams.get('email');
    if (userEmail) {
        var userEmailElement = document.getElementById('user-email');
        if (userEmailElement) {
            userEmailElement.textContent = "Bem-vindo, ".concat(userEmail, "!");
        }
    }
    else {
        window.location.href = '/';
        return;
    }
    var approveEventsBtn = document.getElementById('approve-events-btn');
    if (approveEventsBtn) {
        approveEventsBtn.addEventListener('click', function () {
            window.location.href = '/approveevents?email=' + encodeURIComponent(userEmail);
        });
    }
    var closeEventsBtn = document.getElementById('close-events-btn');
    if (closeEventsBtn) {
        closeEventsBtn.addEventListener('click', function () {
            window.location.href = '/closeevents?email=' + encodeURIComponent(userEmail);
        });
    }
});
