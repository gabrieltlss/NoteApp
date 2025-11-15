export function checkEmailInput(email) {
    if (email.match(/\w{2,}@[a-zA-Z]{2,}.[a-zA-z]{2,}/gm) === null)
        return false;
    return true;
}
export function checkPasswordInput(password) {
    if (password.length < 8 ||
        password.match(/\d/g) === null ||
        password.match(/\w/g) === null ||
        password.match(/\s/g) !== null ||
        password.match(/[^\w\d\s!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~\\]/g) !== null)
        return false;
    return true;
}
export function checkNameInput(name) {
    if (name.length <= 1 ||
        name.length > 255 ||
        name.match(/[^\p{L}\s]/ug) !== null)
        return false;
    return true;
}
export function formatName(name) {
    const arrString = name.trim().split(" ");
    const filterSpaces = arrString.filter(elem => elem !== "");
    const joined = filterSpaces.join(" ");
    return joined;
}
