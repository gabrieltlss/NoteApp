import deleteUser from "../../services/deleteUser.js";
import Form from "./Form.js";

function formatDate(date) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear();

    return `Data de criação: ${day}/${month + 1}/${year}`
}

export default function Account(user) {
    const container = document.createElement("div");
    container.className = "account-container";

    const userInfo = document.createElement("div");
    userInfo.className = "w3-container w3-center";

    const name = document.createElement("h1");
    name.className = "user-name";
    name.textContent = user.name;
    const email = document.createElement("p");
    email.textContent = `E-mail: ${user.email}`;
    const date = document.createElement("p");
    date.textContent = formatDate(new Date(user.createdAt));

    const modal = document.createElement("div");
    modal.className = "w3-modal";
    modal.id = "delete-modal";
    const modalContent = document.createElement("div");
    modalContent.className = "w3-modal-content";
    const modalHeader = document.createElement("div");
    modalHeader.className = "w3-container w3-info w3-center";
    const headerTitle = document.createElement("h3");
    headerTitle.textContent = "Excluir conta";

    const modalMessage = document.createElement("p");
    modalMessage.className = "w3-center w3-text-red"
    modalMessage.textContent = "Esta ação é irreversível";

    const modalFooter = document.createElement("footer");
    modalFooter.className = "w3-container w3-light-gray w3-padding";

    // Abrir e fechar modal.
    const openModalBtn = document.createElement("button");
    openModalBtn.className = "w3-button w3-asphalt";
    openModalBtn.textContent = "Exluir conta";
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
    const closeModalBtn = document.createElement("button");
    closeModalBtn.className = "w3-button w3-info w3-right";
    closeModalBtn.textContent = "Fechar";
    closeModalBtn.addEventListener("click", () => modal.style.display = "none");

    const form = Form();
    let deleteTimeout = null;
    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await deleteUser(email, password);
        const result = await response.json();

        if (result.errorMessage !== undefined) {
            clearTimeout(deleteTimeout);
            const feedback = document.getElementById("delete-user-feedback");
            feedback.textContent = result.errorMessage;
            ev.target.reset();
            deleteTimeout = setTimeout(() => { feedback.textContent = "" }, 4 * 1000);
            return;
        }

        if (result.success) { window.location.href = "/login" }
    })

    modalHeader.appendChild(headerTitle);
    modalFooter.appendChild(closeModalBtn);
    modalContent.append(modalHeader, form, modalMessage, modalFooter);
    modal.appendChild(modalContent);
    userInfo.append(name, email, date, openModalBtn);
    container.append(userInfo, modal);

    return container;
}