// back button 
const backBtn= document.getElementById('backToEntriesList');
backBtn.addEventListener('click', () => {
    window.location.href="entries.html"
})

// save entry 
const saveBtn = document.getElementById("saveBtn");
let entryText = document.getElementById("entryText");
let message = document.getElementById('root');
entryText.addEventListener('change', (e) => {
    e.preventDefault();
    message.innerHTML = "";

})
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    text = entryText.value;
    fetch('http://localhost:3000/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            note: text,
        }),
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        message.innerHTML = `${data.message}`;
    })
    .catch((err) => console.log(err))
    
    entryText.value = '';
})