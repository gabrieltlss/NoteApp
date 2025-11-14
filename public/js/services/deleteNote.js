export default async function deleteNote(noteId) {
    const deletedNote = await fetch(`http://localhost:3000/home/delete/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    return deletedNote;
}