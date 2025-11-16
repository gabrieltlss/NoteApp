export default async function deleteUser(email, password) {
    const result = await fetch(`https://noteapp-58ox.onrender.com/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return result;
}