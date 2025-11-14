export default async function updateNote(noteId, status) {
    const result = await fetch(`http://localhost:3000/home/update/${noteId}/${status}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    });

    return result;
}