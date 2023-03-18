const diaryEntriesContainer = document.getElementById('diaryEntries');
const logoutButton = document.getElementById("logoutBtn");

// get entries
fetch('http://localhost:3000/entries', {
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
.then((info) => {
    console.clear();
    while (diaryEntriesContainer.firstChild) {
        diaryEntriesContainer.removeChild(element.firstChild);
    } 
    console.log(info);
    info.data.forEach(note => {
        if(note){
            const entry = document.createElement('div');
            entry.className = 'diaryEntry';
            const text = document.createElement('div');
            text.innerHTML = `${note}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = "delete";
            entry.append(text);
            entry.append(deleteBtn);
            diaryEntriesContainer.append(entry);
            console.log(note);

            // delete entry 
            deleteBtn.addEventListener('click', () => {
                fetch('http://localhost:3000/deleteNote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        notes: note,
                    }),
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data.message);
                })
                .catch((err) => console.log(err))
                entry.remove();
                });
        }
    });
})
.catch((err) => console.log(err))

// logout 
logoutButton.addEventListener("click", () => {
    diaryEntriesContainer.innerHTML = "";
    fetch('http://localhost:3000/logout', {
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
    .then((info) => {
        console.log(info.message);
        window.location.href="/";
    })
    .catch((err) => console.log(err))
});

// if page closed 
window.addEventListener("onunload", () => {
    diaryEntriesContainer.innerHTML = '';
    console.clear();
    fetch('http://localhost:3000/logout', {
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
    .then((info) => {
        console.log(info.message);
    })
    .catch((err) => console.log(err))
});

// new entry
const newEntry = document.getElementById('newEntry');
newEntry.addEventListener('click', () => {
    window.location.href="editEntry.html"
})