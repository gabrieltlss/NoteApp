export default async function getUserInfo() {
    try {
        const user = await fetch("https://noteapp-58ox.onrender.com/home/user");
        return await user.json();
    } catch (error) {
        console.log(error);
    }
}