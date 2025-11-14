export default function Form() {
    const w3Section = () => {
        const section = document.createElement("div");
        section.className = "w3-section";
        return section;
    }

    const form = document.createElement("form");
    form.id = "delete-form";
    form.className = "w3-padding";

    const section1 = w3Section();
    const emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.textContent = "E-mail:";
    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.name = "email";
    emailInput.id = "email";
    emailInput.className = "w3-input";
    emailInput.required = true;
    section1.append(emailLabel, emailInput);

    const section2 = w3Section();
    const passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.textContent = "Senha:";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.id = "password";
    passwordInput.className = "w3-input";
    passwordInput.required = true;
    section2.append(passwordLabel, passwordInput);

    const section3 = w3Section();
    const button = document.createElement("button");
    button.type = "submit";
    button.className = "w3-button w3-red";
    button.id = "deleteUser";
    button.textContent = "Excluir";
    const feedback = document.createElement("span");
    feedback.className = "w3-margin-left w3-small w3-text-red";
    feedback.id = "delete-user-feedback";
    section3.append(button, feedback);

    form.append(section1, section2, section3);

    return form;
}