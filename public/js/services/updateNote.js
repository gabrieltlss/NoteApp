export default async function updateNote(noteId, status) {
    const result = await fetch(`https://noteapp-58ox.onrender.com/home/update/${noteId}/${status}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    });

    return result;
}