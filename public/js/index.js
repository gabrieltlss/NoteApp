import Account from "./components/Account/Account.js";
import { Alert } from "./components/Alert.js";
import Bar from "./components/Bar.js";
import BarButton from "./components/BarButton.js";
import Note from "./components/Note.js";
import Title from "./components/Title.js";
import createNote from "./services/createNote.js";
import deleteNote from "./services/deleteNote.js";
import filterArray from "./services/filterArray.js";
import getUserInfo from "./services/getUserinfo.js";
import removeTitle from "./services/removeTitle.js";
import { sortRecent, sortOldest } from "./services/sortArray.js";
import updateNote from "./services/updateNote.js";

// Funcionalidades da página
const menuBtn = document.getElementById("menu-btn");
menuBtn.addEventListener("click", () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('w3-hide');
    sidebar.classList.toggle('w3-show');
});

const filterBtn = document.getElementById("filter-btn");
filterBtn.addEventListener("click", () => {
    document.querySelector("#filter-dropdown").classList.toggle("w3-show");
});

const createNoteBtn = document.getElementById("create-note-btn");
createNoteBtn.addEventListener("click", () => {
    document.getElementById("note-modal").style.display = "block";
})

const closeModalBtn = document.getElementById("close-modal");
closeModalBtn.addEventListener("click", () => {
    document.getElementById("note-modal").style.display = "none";
})


// CRUD nas notas e renderização de elementos gráficos.
let currentPage = "home";
let userNotes = [];
let archivedNotes = [];
const noteContainer = document.getElementById("notes-container");
const filterContainer = document.getElementById("filter-container");

// Obter notas ao iniciar aplicação
addEventListener("DOMContentLoaded", async () => {
    try {
        const result = await fetch("http://localhost:3000/home/getNotes");
        const notes = await result.json();

        userNotes = notes.filter((note) => note.status !== "archived");
        archivedNotes = notes.filter((note) => note.status === "archived");

        if (userNotes.length === 0) {
            return noteContainer.appendChild(Title("Não há notas criadas. Cheque as notas arquivadas."));
        }

        for (let i = 0; i < userNotes.length; i++) { renderNewNote(userNotes[i]) }

    } catch (error) {
        console.log("Erro ao obter notas.");
    }
})

// Página Home
const homeBtn = document.getElementById("home-btn");
homeBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    currentPage = "home";
    noteContainer.replaceChildren();
    createNoteBtn.style.display = 'block';
    filterContainer.style.display = 'block';

    if (userNotes.length === 0) {
        noteContainer.appendChild(Title("Não há notas criadas. Cheque as notas arquivadas."));
        return;
    }

    for (let i = 0; i < userNotes.length; i++) { renderNewNote(userNotes[i]) }
    return;
})

// Página de notas arquivadas.
const archivedBtn = document.getElementById("archived-btn");
archivedBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    currentPage = "archived";
    noteContainer.replaceChildren();
    filterContainer.style.display = 'block';
    createNoteBtn.style.display = 'none';

    if (archivedNotes.length === 0) {
        noteContainer.appendChild(Title("Não há notas arquivadas."));
        return;
    }

    for (let i = 0; i < archivedNotes.length; i++) { renderNewNote(archivedNotes[i]) }
    return;
})

// Página Conta
const accountBtn = document.getElementById("user-account");
accountBtn.addEventListener("click", async (ev) => {
    ev.preventDefault();
    noteContainer.replaceChildren();
    createNoteBtn.style.display = 'none';
    filterContainer.style.display = 'none';

    const user = await getUserInfo();
    const accountInfo = Account(user);

    noteContainer.append(accountInfo);
})


// Renderizar notas
function renderNewNote(note) {
    removeTitle(noteContainer);

    const noteElem = Note(note);
    const bar = Bar();

    const deleteBtn = BarButton("delete", "red", "Excluir");
    deleteBtn.addEventListener("click", async () => {
        try {
            const result = await deleteNote(note.id);
            const deletedNote = await result.json();

            if (currentPage === "home") {
                userNotes = filterArray(userNotes, deletedNote.id);
            } else if (currentPage === "archived") {
                archivedNotes = filterArray(archivedNotes, deletedNote.id);
            }

            const removeNote = document.getElementById(note.id);
            noteContainer.removeChild(removeNote);

            // Mensagem sobre a inexistência de notas ativas ou arquivadas.
            if (userNotes.length === 0 && currentPage === "home") {
                noteContainer.appendChild(Title("Não há notas criadas. Cheque as notas arquivadas."));
                return;
            }
            if (archivedNotes.length === 0 && currentPage === "archived") {
                noteContainer.appendChild(Title("Não há notas arquivadas."));
                return;
            }
        } catch (error) {
            console.log(error);
        }
    });

    let changeStatusBtn = null;
    if (currentPage === "home") {
        changeStatusBtn = BarButton("archive", "info", "Arquivar");
        changeStatusBtn.addEventListener("click", async () => {
            try {
                const result = await updateNote(note.id, "archived")
                const archived = await result.json();

                userNotes = filterArray(userNotes, note.id);
                archivedNotes.push(archived);

                const removenote = document.getElementById(note.id);
                noteContainer.removeChild(removenote);

                if (userNotes.length === 0) {
                    noteContainer.appendChild(Title("Não há notas criadas. Cheque as notas arquivadas."));
                }
            } catch (error) {
                console.log(error);
            }
        });
    } else if (currentPage === "archived") {
        changeStatusBtn = BarButton("archive", "green", "Desarquivar");
        changeStatusBtn.addEventListener("click", async () => {
            try {
                const result = await updateNote(note.id, "active");
                const unarchived = await result.json();

                archivedNotes = filterArray(archivedNotes, note.id);
                userNotes.push(unarchived);

                const removenote = document.getElementById(note.id);
                noteContainer.removeChild(removenote);

                if (archivedNotes.length === 0) {
                    noteContainer.appendChild(Title("Não há notas arquivadas."));
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    bar.append(changeStatusBtn, deleteBtn);
    noteElem.append(bar);
    noteContainer.appendChild(noteElem);
    return;
}

// Consumir api para a criação de notas
const form = document.getElementById("note-form");
let timeoutId = null;
form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    clearTimeout(timeoutId);

    const form = ev.currentTarget;
    const feedback = document.getElementById("form-feedback");
    const title = form.title.value;
    const content = form.content.value;

    try {
        feedback.style.color = "black";
        feedback.textContent = "Criando...";

        const result = await createNote(title, content);
        const note = await result.json();

        renderNewNote(note);
        userNotes.push(note);

        feedback.textContent = "Nota criada com sucesso.";
        feedback.style.color = "green";
        form.reset();

        timeoutId = setTimeout(() => {
            feedback.textContent = "";
            feedback.style.color = "black";
        }, 4 * 1000);

    } catch (error) {
        feedback.textContent = "Erro ao criar nota. Tente novamente.";
        feedback.style.color = "red";

        timeoutId = setTimeout(() => {
            feedback.textContent = "";
            feedback.style.color = "black";
        }, 4 * 1000);
    }
})

// Função de ordenação por data de criação
const sortRecentBtn = document.getElementById("sort-recent");
const sortOldestBtn = document.getElementById("sort-oldest");
sortRecentBtn.addEventListener("click", (ev) => {
    ev.preventDefault();

    if (currentPage === "home") {
        if (userNotes.length === 0) {
            Alert();
            return;
        }

        noteContainer.replaceChildren();
        userNotes = sortRecent(userNotes);
        console.log(userNotes);
        for (let i = 0; i < userNotes.length; i++) { renderNewNote(userNotes[i]) };
        return;
    }

    if (archivedNotes.length === 0) {
        Alert();
        return;
    }

    noteContainer.replaceChildren();
    archivedNotes = sortRecent(archivedNotes);
    console.log(archivedNotes);
    for (let i = 0; i < archivedNotes.length; i++) { renderNewNote(archivedNotes[i]) }
    return;
})

sortOldestBtn.addEventListener("click", (ev) => {
    ev.preventDefault();

    console.log("Antigos")
    if (currentPage === "home") {
        if (userNotes.length === 0) {
            Alert();
            return;
        }

        noteContainer.replaceChildren();
        userNotes = sortOldest(userNotes);
        console.log(userNotes);
        for (let i = 0; i < userNotes.length; i++) { renderNewNote(userNotes[i]) }
        return;
    }

    if (archivedNotes.length === 0) {
        Alert();
        return;
    }

    noteContainer.replaceChildren();
    archivedNotes = sortOldest(archivedNotes);
    console.log(archivedNotes);
    for (let i = 0; i < archivedNotes.length; i++) { renderNewNote(archivedNotes[i]) }
    return;
})