export default async function deleteNote(noteId) {
    const deletedNote = await fetch(`https://noteapp-58ox.onrender.com/home/delete/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    return deletedNote;
}