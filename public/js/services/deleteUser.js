export default async function deleteUser(email, password) {
    const result = await fetch(`http://localhost:3000/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return result;
}