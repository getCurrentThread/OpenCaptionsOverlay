const TEXT_TIMEOUT_DURATION = 4 * 1000;

const FINAL_STR_DOM = document.getElementById('finalStr');
const INTERIM_DOM = document.getElementById('interim');
const CC_CONTAINER_DOM = document.getElementsByClassName('cc-container')[0];
const TEXT_TRANSITION_DOM = document.getElementsByClassName('text-transition')[0];
const TEXT_TRANSITION_WRAPPER_DOM = document.getElementsByClassName('text-transition-wrapper')[0];

var socket = null;

var last_final_str = "";
var last_interim = "";
var text_timeout_timer = null;

function addTransitionEndEventListener(el, callback) {
    el.addEventListener('webkitTransitionEnd', callback, false);
    el.addEventListener('transitionend', callback, false);
    el.addEventListener('msTransitionEnd', callback, false);
    el.addEventListener('oTransitionEnd', callback, false);
}

function getHeight(el) {
    return parseFloat(getComputedStyle(el, null).height.replace("px", ""))
}

function getWidth(el) {
    return parseFloat(getComputedStyle(el, null).width.replace("px", ""))
}

function setHeight(el, val) {
    if (typeof val === "function") val = val();
    if (typeof val === "string") el.style.height = val;
    else el.style.height = val + "px";
}

function setWidth(el, val) {
    if (typeof val === "function") val = val();
    if (typeof val === "string") el.style.width = val;
    else el.style.width = val + "px";
}

function listenSocket() {
    const url_params = new URLSearchParams(window.location.search);
    const channel_id = url_params.get('channel');

    if (channel_id === null) {
        updateCaption("⚠️ 채널 정보를 받아올 수 없습니다 ⚠️", "");
        return;
    }

    socket = io(HOST + "overlay/" + channel_id, {
        transports: ['websocket']
    });
    socket.on('reconnect_attempt', function () {
        socket.io.opts.transports = ['polling', 'websocket'];
    });
    socket.on('json', function (data) {
        updateCaption(data.final_str, data.interim);
    });
}


function updateCaption(final_str, interim) {
    if (final_str != '' && last_final_str != final_str) {
        updateFinalStr(final_str);
    }
    if (interim.length == 0) {
        hideInterim();
    } else {
        updateInterim(interim);
    }
    updateTextTransitionGroup();
}

function updateFinalStr(final_str) {
    last_final_str = final_str;
    FINAL_STR_DOM.textContent = final_str;
    showFinalStr();
    setTextTimeoutTimer();
}

function updateInterim(interim) {
    last_interim = interim;
    INTERIM_DOM.textContent = interim;
    showInterim();
}

function cancelTextTimeoutTimer() {
    if (text_timeout_timer != null) {
        clearTimeout(text_timeout_timer)
    }
}

function setTextTimeoutTimer() {
    cancelTextTimeoutTimer()
    text_timeout_timer = setTimeout(doTextTimeout, TEXT_TIMEOUT_DURATION);
}

function doTextTimeout() {
    if (isInterimShowing()) {
        hideFinalStr();
    } else {
        hideContainer();
    }
    updateTextTransitionGroup();
}

function updateTextTransitionGroup() {
    const height = getHeight(TEXT_TRANSITION_DOM);
    const width = getWidth(TEXT_TRANSITION_DOM);
    setHeight(TEXT_TRANSITION_WRAPPER_DOM, height);
    setWidth(TEXT_TRANSITION_WRAPPER_DOM, width);
}

function isFinalStrShowing() {
    return FINAL_STR_DOM.style.display != 'none';
}

function hideFinalStr() {
    FINAL_STR_DOM.style.display = 'none';
    if (!isInterimShowing()) {
        hideContainer();
    }
}

function showFinalStr() {
    FINAL_STR_DOM.style.display = '';
    if (!isContainerShowing()) {
        showContainer();
    }
}

function isInterimShowing() {
    return INTERIM_DOM.style.display != 'none';
}

function hideInterim() {
    INTERIM_DOM.style.display = 'none';
    if (!isFinalStrShowing()) {
        hideContainer();
    }
}

function showInterim() {
    INTERIM_DOM.style.display = '';
    if (!isContainerShowing()) {
        showContainer();
    }
}

function isContainerShowing() {
    return !CC_CONTAINER_DOM.classList.contains('hide');
}

function hideContainer() {
    CC_CONTAINER_DOM.classList.add('hide');
}

function showContainer() {
    CC_CONTAINER_DOM.classList.remove('hide');
}

hideFinalStr();
hideInterim();
listenSocket();
addTransitionEndEventListener(CC_CONTAINER_DOM, function (event) {
    if (!isContainerShowing()) {
        hideFinalStr();
        updateTextTransitionGroup();
    }
});