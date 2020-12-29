
function scrollToBottom() {
    let logWrapper = document.querySelector('#logWrapper');
    logWrapper.scrollTo({ top: 100000, behavior: "smooth"}); 
}

function appendLog(type, message) {
    const time = getFormattedDate();
    const text = `[${time}] \t(${type}) ${message}`;

    let logElement = document.createElement("p");
    logElement.className = "log";
    logElement.innerText = text;

    const target = document.getElementById('logWrapper');
    target.appendChild(logElement);

    scrollToBottom();
}