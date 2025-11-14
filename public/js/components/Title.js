export default function Title(title) {
    const noteTitle = document.createElement("h2");
    noteTitle.className = "w3-center w3-animate-opacity";
    noteTitle.id = "empty-note";
    noteTitle.textContent = title;
    return noteTitle;
}