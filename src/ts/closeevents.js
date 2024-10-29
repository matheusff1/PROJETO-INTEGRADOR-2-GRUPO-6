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
var _a, _b;
(_a = document.getElementById('eventId')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () { return __awaiter(void 0, void 0, void 0, function () {
    var params, userEmail, eventId, winningSideSelect, messageDiv, response, eventData, ladoA, ladoB, optionA, optionB, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = new URLSearchParams(window.location.search);
                userEmail = params.get('email');
                console.log("EMAIL ATIVO: ", userEmail);
                if (!userEmail) {
                    window.location.href = '/';
                    return [2 /*return*/];
                }
                eventId = document.getElementById('eventId').value;
                winningSideSelect = document.getElementById('winningSide');
                messageDiv = document.getElementById('message');
                if (!eventId) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("/events/details/".concat(eventId), {
                        method: 'GET',
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    messageDiv.innerText = 'Evento não encontrado.';
                    return [2 /*return*/];
                }
                return [4 /*yield*/, response.json()];
            case 3:
                eventData = _a.sent();
                ladoA = eventData.lado_a;
                ladoB = eventData.lado_b;
                winningSideSelect.innerHTML = '';
                optionA = document.createElement('option');
                optionA.value = 'A';
                optionA.textContent = ladoA;
                winningSideSelect.appendChild(optionA);
                optionB = document.createElement('option');
                optionB.value = 'B';
                optionB.textContent = ladoB;
                winningSideSelect.appendChild(optionB);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Erro ao obter os detalhes do evento:', error_1);
                messageDiv.innerText = 'Erro ao carregar o evento. Tente novamente mais tarde.';
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
(_b = document.getElementById('closeEventForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var eventId, winningSide, messageDiv, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                eventId = document.getElementById('eventId').value;
                winningSide = document.getElementById('winningSide').value;
                messageDiv = document.getElementById('message');
                if (!winningSide) {
                    messageDiv.innerText = 'Por favor, selecione o lado vencedor.';
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("/events/close/".concat(eventId), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ winningSide: winningSide })
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                messageDiv.innerText = data.message;
                if (response.ok) {
                    document.getElementById('eventId').value = '';
                    document.getElementById('winningSide').innerHTML = '<option value="">Selecione o lado vencedor</option>';
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error('Erro ao encerrar evento:', error_2);
                messageDiv.innerText = 'Erro ao encerrar evento. Tente novamente mais tarde.';
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
