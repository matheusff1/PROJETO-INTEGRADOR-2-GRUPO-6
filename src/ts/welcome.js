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
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, userEmailElement, response, data, error_1, myWalletBtn, newEventBtn, betBtn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userEmail = sessionStorage.getItem('loggedInEmail');
                if (!userEmail) return [3 /*break*/, 8];
                userEmailElement = document.getElementById('user-email');
                if (userEmailElement) {
                    userEmailElement.textContent = "Bem-vindo, ".concat(userEmail);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch("/users/check-admin?email=".concat(encodeURIComponent(userEmail)))];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (data.isAdmin) {
                    window.location.href = '/admpage?email=' + encodeURIComponent(userEmail);
                }
                return [3 /*break*/, 5];
            case 4:
                console.error('Erro ao verificar status de administrador:', response.statusText);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Erro ao verificar status de administrador:', error_1);
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                window.location.href = '/';
                return [2 /*return*/];
            case 9:
                myWalletBtn = document.getElementById('my-wallet-btn');
                if (myWalletBtn) {
                    myWalletBtn.addEventListener('click', function () {
                        window.location.href = '/mywallet?email=' + encodeURIComponent(userEmail);
                    });
                }
                newEventBtn = document.getElementById('new-event-btn');
                if (newEventBtn) {
                    newEventBtn.addEventListener('click', function () {
                        window.location.href = '/newevent?email=' + encodeURIComponent(userEmail);
                    });
                }
                betBtn = document.getElementById('bet-btn');
                if (betBtn) {
                    betBtn.addEventListener('click', function () {
                        window.location.href = '/bet?email=' + encodeURIComponent(userEmail);
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
