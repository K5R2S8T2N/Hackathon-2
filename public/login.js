const loginButton = document.getElementById('loginBtn');
const username = document.getElementById('usernameLogin');
const password = document.getElementById('passwordLogin');
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const user = username.value;
    const pass = password.value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        if(data.message == 'login successful'){
            window.location.href="entries.html"
        } else {
            document.getElementById('root').innerHTML = `${data.message}`;
        }
    })
    .catch((err) => console.log(err))
    
    username.value = '';
    password.value = '';
});


// back to home button
const backToHome = document.getElementById('backToHome');
backToHome.addEventListener("click", () => {
    window.location.href="/";
})