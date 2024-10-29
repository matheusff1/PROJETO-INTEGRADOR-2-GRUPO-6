"use strict";
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM totalmente carregado e analisado');
    var loginButton = document.getElementById('bLogin');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            console.log("Requisição para a tela de login");
            fetch('/login', {
                method: 'GET',
            })
                .then(function (response) {
                if (response.ok) {
                    window.location.href = '/login';
                }
                else {
                    console.error('Erro ao carregar a página de login.');
                }
            })
                .catch(function (error) {
                console.error('Erro na requisição de login:', error);
            });
        });
    }
    var registerButton = document.getElementById('bRegister');
    if (registerButton) {
        registerButton.addEventListener('click', function () {
            console.log("Requisição para a tela de cadastro");
            fetch('/register', {
                method: 'GET',
            })
                .then(function (response) {
                if (response.ok) {
                    window.location.href = '/register';
                }
                else {
                    console.error('Erro ao carregar a página de cadastro.');
                }
            })
                .catch(function (error) {
                console.error('Erro na requisição de cadastro:', error);
            });
        });
    }
});
