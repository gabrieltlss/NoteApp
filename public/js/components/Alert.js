let alertTimeoutId = null;

function Alert() {
    clearInterval(alertTimeoutId);
    const previousAlert = document.getElementById("alert");
    previousAlert ? document.body.removeChild(previousAlert) : null;

    const alert = document.createElement("div");
    alert.id = "alert";
    alert.className = "w3-panel w3-display-bottommiddle w3-margin-bottom w3-note w3-animate-opacity w3-round-large";
    const alertText = document.createElement("p");
    alertText.textContent = "Não há notas para ordenação.";

    alert.appendChild(alertText);
    document.body.append(alert);

    alertTimeoutId = setTimeout(() => {
        document.body.removeChild(alert);
    }, 4 * 1000)
}

export { Alert };