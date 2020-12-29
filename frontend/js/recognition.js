const LANG = 'ko-KR';

const OVERLAY_NORMAL_DOM = document.getElementById('overlayNormal');
const OVERLAY_SANS_DOM = document.getElementById('overlaySans');

const MIC_TOGGLE_DOM = document.getElementById('micToggle');
const SANS_MODE_TOGGLE_DOM = document.getElementById('sansModeToggle');
const SANS_VOLUME_DOM = document.getElementById('sansVolume');

const FINAL_STR_DOM = document.getElementById('finalStr');
const INTERIM_DOM = document.getElementById('interim');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var socket = null;
var recognition = null;

var last_interim = '';

var is_mic_on = false;
var is_sans_mode = false;

function initRecognition() {
    recognition = new SpeechRecognition();
    recognition.lang = LANG;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = function (event) {
        setMicBadge('badge-error');
    }

    recognition.onaudiostart = function (event) {
        setMicBadge('badge-warning');
    }

    recognition.onsoundstart = function (event) {
        setMicBadge('badge-primary');
    }

    recognition.onspeechstart = function (event) {
        setMicBadge('badge-success');
    }

    recognition.onresult = function (event) {
        var interim = '';
        var final_str = '';
        var confidence = 0;
        var final_count = 0;

        for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                final_str += event.results[i][0].transcript;
                confidence += event.results[i][0].confidence;
                final_count += 1;
            } else {
                interim += event.results[i][0].transcript;
            }
        }

        updateCaption(final_str.trim(), interim.trim(), confidence);
    };

    recognition.onspeachend = function (event) {
        setMicBadge('badge-primary');
    }

    recognition.onsoundend = function (event) {
        setMicBadge('badge-warning');
    }

    recognition.onaudioend = function (event) {
        setMicBadge('badge-warning');
    }

    recognition.onend = function (event) {
        if (is_mic_on) {
            setMicBadge('badge-error');
            recognition.start();
        } else {
            setMicBadge('badge-red');
        }
    }

    MIC_TOGGLE_DOM.addEventListener('click', function () {
        toggleMic();
    });
    SANS_MODE_TOGGLE_DOM.addEventListener('change', function (e) {
        setSansMode(SANS_MODE_TOGGLE_DOM.checked);
    })
}

function toggleMic() {
    if (is_mic_on) {
        is_mic_on = false;
        MIC_TOGGLE_DOM.textContent = '인식 시작';
        MIC_TOGGLE_DOM.classList.remove('btn-error');
        MIC_TOGGLE_DOM.classList.add('btn-success');
        MIC_TOGGLE_DOM.classList.remove('badge');
        recognition.abort();
    } else {
        is_mic_on = true;
        MIC_TOGGLE_DOM.textContent = '인식 종료';
        MIC_TOGGLE_DOM.classList.remove('btn-success');
        MIC_TOGGLE_DOM.classList.add('btn-error');
        MIC_TOGGLE_DOM.classList.add('badge');
        recognition.start();
    }
}

function setSansMode(sans_mode) {
    is_sans_mode = sans_mode;
    if (is_sans_mode) {
        SANS_VOLUME_DOM.classList.remove('hidden');
        OVERLAY_NORMAL_DOM.classList.add('hidden');
        OVERLAY_SANS_DOM.classList.remove('hidden');
    } else {
        SANS_VOLUME_DOM.classList.add('hidden');
        OVERLAY_NORMAL_DOM.classList.remove('hidden');
        OVERLAY_SANS_DOM.classList.add('hidden');
    }
}

const SANS_QUEUE = [];
const SANS_SPEED = 80;
var is_sans_playing = false;
function enqueueSans(length) {
    SANS_QUEUE.push(length);
    if (!is_sans_playing) {
        playSans();
    }
}
function playSans() {
    if (SANS_QUEUE.length == 0) {
        is_sans_playing = false;
        return;
    }
    var length_raw = SANS_QUEUE.shift();
    is_sans_playing = true;

    var length = Math.ceil(length_raw * 0.8);

    for (var i = 0; i < length; i++) {
        setTimeout(function () {
            var sans_voice = new Audio("{{ url_for('static', filename='assets/sound/voice_sans.mp3') }}")
            sans_voice.volume = SANS_VOLUME_DOM.value / 100;
            sans_voice.play();
        }, i * SANS_SPEED);
    }
    setTimeout(playSans, (length + 1) * SANS_SPEED);
}

function setMicBadge(badge_type) {
    MIC_TOGGLE_DOM.classList.remove('badge-primary');
    MIC_TOGGLE_DOM.classList.remove('badge-success');
    MIC_TOGGLE_DOM.classList.remove('badge-warning');
    MIC_TOGGLE_DOM.classList.remove('badge-error');
    MIC_TOGGLE_DOM.classList.remove('badge-red');
    MIC_TOGGLE_DOM.classList.add(badge_type);
}

function listenSocket() {
    socket = io(HOST +"recognition", {
        transports: ['websocket']
    });
    socket.on('reconnect_attempt', function () {
        socket.io.opts.transports = ['polling', 'websocket'];
    });
    socket.on('message', function (data) {
        console.log(data);
    });
}


function updateCaption(final_str, interim, confidence) {
    if (socket === null || socket.disconnected) {
        return;
    }
    socket.send({
        'final_str': final_str,
        'interim': interim,
        'confidence': confidence
    });


    if (is_sans_mode) {
        var diff = interim.length - last_interim.length;
        if (diff > 0) {
            enqueueSans(diff);
        }
    }


    FINAL_STR_DOM.textContent = final_str;
    INTERIM_DOM.textContent = interim;

    last_interim = interim;

    if(final_str.trim()) {
        appendLog("message", final_str);
    }
}

listenSocket();
initRecognition();