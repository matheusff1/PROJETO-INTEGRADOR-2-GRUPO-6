"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var userEmail = new URLSearchParams(window.location.search).get('email');
    if (!userEmail) {
        window.location.href = 'index.html';
    }
    else {
        var userEmailElement = document.getElementById('user-email');
        if (userEmailElement) {
            userEmailElement.textContent = "Bem-vindo, ".concat(userEmail);
        }
        updateBalance(userEmail);
    }
    var addBalanceBtn = document.getElementById('add-balance-btn');
    if (addBalanceBtn) {
        addBalanceBtn.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var amountInput, nameInput, cardNumberInput, codNumberInput, dataExpeInput, nameCard, cardNumber, codNumber, dataExpe, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amountInput = document.getElementById('add-balance-amount');
                        nameInput = document.getElementById('register-nomeCartao');
                        cardNumberInput = document.getElementById('register-nuCartao');
                        codNumberInput = document.getElementById('register-cod');
                        dataExpeInput = document.getElementById('register-dataExp');
                        nameCard = nameInput.value;
                        cardNumber = cardNumberInput.value;
                        codNumber = codNumberInput.value;
                        dataExpe = dataExpeInput.value;
                        amount = parseFloat(amountInput.value);
                        if (!(nameCard !== "" && cardNumber !== "" && codNumber !== "" && dataExpe !== "" && !isNaN(amount) && amount > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateBalanceInDatabase(userEmail, amount)];
                    case 1:
                        _a.sent();
                        updateBalance(userEmail);
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Por favor, preencha todos os campos corretamente.");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    // Função para saque via conta-corrente
    var removeBalanceAccountBtn = document.getElementById('remove-balance-btn-account');
    if (removeBalanceAccountBtn) {
        removeBalanceAccountBtn.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var amountInput, bankInput, agencyInput, accountInput, bank, agency, account, amount, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amountInput = document.getElementById('remove-balance-amount-account');
                        bankInput = document.getElementById('register-bank');
                        agencyInput = document.getElementById('register-agency');
                        accountInput = document.getElementById('register-accountd');
                        bank = bankInput.value;
                        agency = agencyInput.value;
                        account = accountInput.value;
                        amount = parseFloat(amountInput.value);
                        if (!(bank && agency && account && !isNaN(amount) && amount > 0)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, removeBalanceFromDatabase(userEmail, amount)];
                    case 2:
                        _a.sent();
                        updateBalance(userEmail);
                        alert("Saque via conta-corrente realizado com sucesso!");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        alert("Erro ao realizar o saque. Tente novamente.");
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        alert("Preencha todos os campos corretamente.");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }
    // Função para saque via Pix
    var removeBalancePixBtn = document.getElementById('remove-balance-btn-pix');
    if (removeBalancePixBtn) {
        removeBalancePixBtn.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var amountInput, pixInput, pix, amount, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amountInput = document.getElementById('remove-balance-amount-pix');
                        pixInput = document.getElementById('register-keyPix');
                        pix = pixInput.value;
                        amount = parseFloat(amountInput.value);
                        if (!(pix && !isNaN(amount) && amount > 0)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, removeBalanceFromDatabase(userEmail, amount)];
                    case 2:
                        _a.sent();
                        updateBalance(userEmail);
                        alert("Saque via Pix realizado com sucesso!");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        alert("Erro ao realizar o saque. Tente novamente.");
                        console.error(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        alert("Preencha todos os campos corretamente.");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }
});
function updateBalance(email) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, balance, balanceElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/wallet/get-balance", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    balance = parseFloat(data.balance);
                    if (!isNaN(balance)) {
                        balanceElement = document.getElementById('current-balance');
                        if (balanceElement) {
                            balanceElement.textContent = "Saldo atual: R$ ".concat(balance.toFixed(2));
                        }
                    }
                    else {
                        console.error('O saldo retornado não é um número válido:', data.balance);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Erro ao obter saldo:', response.statusText);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateBalanceInDatabase(email, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/wallet/add-balance', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, amount: amount })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Erro ao adicionar saldo:', response.statusText);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function removeBalanceFromDatabase(email, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/wallet/remove-balance', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, amount: amount })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Erro ao remover saldo:', response.statusText);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
