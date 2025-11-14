export default function BarButton(content, color, title) {
    const button = document.createElement("button");
    button.title = title;
    button.className = `material-symbols-outlined w3-button w3-${color} note-btn`;
    button.textContent = content;
    return button;
}