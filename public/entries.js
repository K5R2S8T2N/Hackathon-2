const diaryEntriesContainer = document.getElementById('diaryEntries');
const logoutButton = document.getElementById("logoutBtn");
// displaying signed in user
const userTitle =document.getElementById('userTitle');

// get entries
window.addEventListener('load', () => {
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
            diaryEntriesContainer.removeChild(diaryEntriesContainer.firstChild);
        } 
        console.log(info);
        userTitle.innerHTML = `${info.user}`;
        info.data.forEach(note => {
            if(note){
                const entry = document.createElement('div');
                entry.className = 'diaryEntry';
                const text = document.createElement('div');
                text.innerHTML = `${note}`;
                text.className = 'diaryText';
                const editBtn = document.createElement('button');
                editBtn.innerHTML = "edit";
                editBtn.className = 'entryButtons';
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = "delete";
                deleteBtn.className = 'entryButtons';
                const buttonsDiv = document.createElement('div');
                buttonsDiv.id = 'entryButtonsDiv';
                entry.append(text);
                buttonsDiv.append(editBtn);
                buttonsDiv.append(deleteBtn);
                entry.append(buttonsDiv);
                
                diaryEntriesContainer.append(entry);
                console.log(note);

                // button animations 
                editBtn.addEventListener('mouseover', () => {
                    editBtn.style = 'background: rgb(197, 162, 111);; color: rgb(91, 51, 21); border-color: rgb(133, 85, 21)'; 
                });
                editBtn.addEventListener('mouseout', () => {
                    editBtn.style = 'background: rgb(222, 195, 155);color: rgb(123, 86, 58); border-color: rgb(171, 124, 62)';
                });
                deleteBtn.addEventListener('mouseover', () => {
                    deleteBtn.style = 'background: rgb(197, 162, 111);; color: rgb(91, 51, 21); border-color: rgb(133, 85, 21)'; 
                });
                deleteBtn.addEventListener('mouseout', () => {
                    deleteBtn.style = 'background: rgb(222, 195, 155);color: rgb(123, 86, 58); border-color: rgb(171, 124, 62)';
                });

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

                // edit entry 
                editBtn.addEventListener('click', () => {
                    fetch('http://localhost:3000/editedNote', {
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
                    window.location.href="editEntry.html"
                })
            }
        });
    })
    .catch((err) => console.log(err))
});

// logout 
logoutButton.addEventListener("click", () => {
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
        userTitle.innerHTML = "";
        while (diaryEntriesContainer.firstChild) {
            diaryEntriesContainer.removeChild(diaryEntriesContainer.firstChild);
        } 
        console.clear();
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
});

// button animations 
newEntry.addEventListener('mouseover', () => {
    newEntry.style = "background: rgb(213, 178, 108); color: rgb(120, 74, 10); border-color: rgb(154, 122, 82);"
});
newEntry.addEventListener('mouseout', () => {
    newEntry.style = "background: rgb(233, 209, 155); color: rgb(156, 106, 37); border-color: rgb(190, 149, 95);"
});
logoutButton.addEventListener('mouseover', () => {
    logoutButton.style = "background: rgb(213, 178, 108); color: rgb(120, 74, 10); border-color: rgb(154, 122, 82);"
});
logoutButton.addEventListener('mouseout', () => {
    logoutButton.style = "background: rgb(233, 209, 155); color: rgb(156, 106, 37); border-color: rgb(190, 149, 95);"
});