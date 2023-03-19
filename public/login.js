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
            const message = document.getElementById('root');
            message.innerHTML = `${data.message}`;
            message.style = "background-color: rgb(242, 215, 148)";
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

// button animations 
backToHome.addEventListener('mouseover', () => {
    backToHome.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
backToHome.addEventListener('mouseout', () => {
    backToHome.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});

loginButton.addEventListener('mouseover', () => {
    loginButton.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
loginButton.addEventListener('mouseout', () => {
    loginButton.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});