export default function removeTitle(noteContainer) {
    const noteTitle = document.getElementById("empty-note");
    if (noteTitle) { noteContainer.removeChild(noteTitle) }
}