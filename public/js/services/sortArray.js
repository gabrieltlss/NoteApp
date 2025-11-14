export function sortRecent(array) {
    return array.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
}

export function sortOldest(array) {
    return array.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
}