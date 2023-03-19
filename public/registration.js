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
        root.style = "background-color: rgb(242, 215, 148)";
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
            root.style = "background-color: rgb(242, 215, 148)";
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

// button animations 
backToHome.addEventListener('mouseover', () => {
    backToHome.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
backToHome.addEventListener('mouseout', () => {
    backToHome.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});

registerButton.addEventListener('mouseover', () => {
    registerButton.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
registerButton.addEventListener('mouseout', () => {
    registerButton.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});