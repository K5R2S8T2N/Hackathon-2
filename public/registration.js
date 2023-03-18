const registerButton = document.getElementById('registerBtn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const root = document.getElementById('root');
registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    const user = username.value;
    const pass = password.value;
    if(user.length == 0 || pass.length == 0){
        root.innerHTML = 'please enter a valid username and password';
    }else{
        fetch('http://localhost:3000/register', {
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
            document.getElementById('root').innerHTML = `${data.message}`;
        })
        .catch((err) => console.log(err))
    }
    username.value = '';
    password.value = '';
});

// back to home button
const backToHome = document.getElementById('backToHome');
backToHome.addEventListener("click", () => {
    window.location.href="/";
})