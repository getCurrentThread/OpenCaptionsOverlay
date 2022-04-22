
function scrollToBottom() {
    let logWrapper = document.querySelector('#logWrapper');
    logWrapper.scrollTo({ top: 100000, behavior: "smooth"}); 
}

let logIndex = -1;
let globalLog = [];

function addLog(time, type, message) {
    const log = {
        index: ++logIndex,
        time: time,
        type: type,
        message: message,
    };
    globalLog.push(log);
}

function appendLog(type, message) {
    const time = getFormattedDate().substr(11);

    let tr = document.createElement("tr");

    let tdTime = document.createElement("td");
    tdTime.innerText = `[${time}]`;

    let tdType = document.createElement("td");
    tdType.innerText = `(${type})`;

    let tdMessage = document.createElement("td");
    tdMessage.innerText = message;

    tr.appendChild(tdTime);
    tr.appendChild(tdType);
    tr.appendChild(tdMessage);

    const target = document.getElementById('logBody');
    target.appendChild(tr);

    if(target.getElementsByTagName("tr").length > 300) {
        target.removeChild(target.getElementsByTagName("tr")[0]);
    }

    scrollToBottom();
    addLog(time, type, message);
}

function downloadLog() {
    let content = '';
    let filename = 'oc_log_' + getFormattedDate().substr(0,10) + '.txt';

    globalLog.map(function(item) {
        content += `[${item.time}] (${item.type}) ${item.message}\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }