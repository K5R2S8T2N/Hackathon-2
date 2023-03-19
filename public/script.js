const goToLogin = document.getElementById("goToLogin");
const goToRegister = document.getElementById("goToRegister");
goToRegister.addEventListener('click', () => {
    window.location.href="registration.html"
})

goToLogin.addEventListener('click', () => {
    window.location.href="login.html"
});

goToLogin.addEventListener('mouseover', () => {
    goToLogin.style = 'background: rgb(219, 188, 130); border-color: rgb(235, 169, 82); color: rgb(132, 58, 19)';
})

goToLogin.addEventListener('mouseout', (e) => {
    goToLogin.style = 'background: rgb(242, 228, 188); border-color: burlywood; color: rgb(122, 60, 9)';
})

goToRegister.addEventListener('mouseover', () => {
    goToRegister.style = 'background: rgb(219, 188, 130); border-color: rgb(235, 169, 82); color: rgb(132, 58, 19)';
})

goToRegister.addEventListener('mouseout', (e) => {
    goToRegister.style = 'background: rgb(242, 228, 188); border-color: burlywood; color: rgb(122, 60, 9)';
})