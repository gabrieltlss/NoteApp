export default function filterArray(array, noteId) {
    return array.filter((note) => note.id !== noteId);
}