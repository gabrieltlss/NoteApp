export default async function createNote(title, content) {
    const result = await fetch("http://localhost:3000/home/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    return result;
}