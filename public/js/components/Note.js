export default function Note(note) {
    const noteElem = document.createElement("div");
    noteElem.className = "w3-card w3-display-container w3-animate-opacity w3-round-large note";
    noteElem.id = note.id;

    const title = document.createElement("h2");
    title.className = "w3-center";
    title.textContent = note.title;

    const paragraph = document.createElement("p");
    paragraph.className = "note-content";
    paragraph.textContent = note.content;

    noteElem.append(title, paragraph);

    return noteElem;
}