export default async function getUserInfo() {
    try {
        const user = await fetch("http://localhost:3000/home/user");
        return await user.json();
    } catch (error) {
        console.log(error);
    }
}