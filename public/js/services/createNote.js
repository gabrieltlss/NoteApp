export default async function createNote(title, content) {
    const result = await fetch("https://noteapp-58ox.onrender.com/home/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    return result;
}