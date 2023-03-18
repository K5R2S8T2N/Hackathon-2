const goToLogin = document.getElementById("goToLogin");
const goToRegister = document.getElementById("goToRegister");
goToRegister.addEventListener('click', () => {
    window.location.href="registration.html"
})

goToLogin.addEventListener('click', () => {
    window.location.href="login.html"
});