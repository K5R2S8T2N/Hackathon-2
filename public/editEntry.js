// save entry 
const saveBtn = document.getElementById("saveBtn");
let entryText = document.getElementById("entryText");
let message = document.getElementById('root');
entryText.addEventListener('change', (e) => {
    e.preventDefault();
    message.innerHTML = "";
    message.style.background = "none";

})

// no characters left message 
const noCharLeft = document.getElementById('noCharLeft');
entryText.addEventListener('input', (e) => {
    e.preventDefault();
    message.innerHTML = "";
    message.style.background = "none";
    if (entryText.value.length > 300 ){
        noCharLeft.innerHTML = "Entry is too long";
        noCharLeft.style = "border: 2px solid rgb(207, 174, 118); background-color: rgb(248, 242, 209)";
    } else {
        noCharLeft.innerHTML = `Number of characters left: ${300 - entryText.value.length}`;
        noCharLeft.style = "border: 2px solid rgb(207, 174, 118); background-color: rgb(248, 242, 209)";
    }
});

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    text = entryText.value;
    if (text.length <= 300){
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
            message.style = "background: rgb(235, 210, 148); border: 2px solid rgb(145, 91, 58)";
        })
        .catch((err) => console.log(err))
        entryText.value = '';
        noCharLeft.innerHTML = '';
        noCharLeft.style = "border: none; background-color: none";
    } else {
        entryText.value = text;
    }
})

// load entry when editing 
window.addEventListener('load', () => {
    fetch('http://localhost:3000/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        }),
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        entryText.value = `${data.note}`;
    })
    .catch((err) => console.log(err))
});

// back button 
const backBtn= document.getElementById('backToEntriesList');
backBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/backToEntries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        }),
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data.message);
    })
    .catch((err) => console.log(err))

    window.location.href="entries.html"
    entryText.value = '';
    noCharLeft.innerHTML = '';
    noCharLeft.style = "border: none; background-color: none";
})

// button animations 
backBtn.addEventListener('mouseover', () => {
    backBtn.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
backBtn.addEventListener('mouseout', () => {
    backBtn.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});

saveBtn.addEventListener('mouseover', () => {
    saveBtn.style = 'background: rgb(215, 180, 119); border-color: rgb(157, 106, 43); color: rgb(134, 101, 54)';
});
saveBtn.addEventListener('mouseout', () => {
    saveBtn.style = 'background: rgb(238, 219, 176); border-color: rgb(187, 143, 67); color: rgb(155, 118, 64)';
});