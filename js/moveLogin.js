"use strict";
const moveLoginButton = document.getElementById('btn-login');
moveLoginButton === null || moveLoginButton === void 0 ? void 0 : moveLoginButton.addEventListener('click', () => {
    location.href = '/pages/login.html';
});
