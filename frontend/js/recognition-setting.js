const pickrFont = Pickr.create({
    el: '.color-picker-font',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],

    lockOpacity: true,

    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        }
    },

    i18n: {
       'btn:save': '선택',
       'btn:cancel': '취소',
       'btn:clear': '초기화',
    }
}).on('save', (color, instance) => {
    setFontColor(color.toHEXA().toString());
});

const pickrBg = Pickr.create({
    el: '.color-picker-bg',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],

    lockOpacity: true,

    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        }
    },

    i18n: {
       'btn:save': '선택',
       'btn:cancel': '취소',
       'btn:clear': '초기화',
    }
}).on('save', (color, instance) => {
    setBackgroundColor(color.toHEXA().toString());
});

const pickrBorder = Pickr.create({
    el: '.color-picker-border',
    theme: 'nano', // or 'monolith', or 'nano'

    lockOpacity: true,

    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        }
    },

    i18n: {
       'btn:save': '선택',
       'btn:cancel': '취소',
       'btn:clear': '초기화',
    }
}).on('save', (color, instance) => {
    setBorderColor(color.toHEXA().toString());
});

function toggleTab(target) {
    document.querySelectorAll(".tab-item").forEach(function (el) {
        el.classList.remove("active");
    });
    document.querySelectorAll(".setting-card").forEach(function (el) {
        el.classList.add("d-none");
    })

    if(target == "font") {
        document.getElementById("tabFont").classList.add("active");
        document.getElementById("settingFont").classList.remove("d-none");
    } else if(target == "bg") {
        document.getElementById("tabBg").classList.add("active");
        document.getElementById("settingBg").classList.remove("d-none");
    } else if(target == "border") {
        document.getElementById("tabBorder").classList.add("active");
        document.getElementById("settingBorder").classList.remove("d-none");
    } else if(target == "profile") {
        document.getElementById("tabProfile").classList.add("active");
        document.getElementById("settingProfile").classList.remove("d-none");
    } else if(target == "etc") {
        document.getElementById("tabEtc").classList.add("active");
        document.getElementById("settingEtc").classList.remove("d-none");
    }
};

function setFontFamily(value) {
    localStorage.setItem("fontFamily", value);
}

function setFontSize(value) {
    if(!(value >= 1 && value <= 100)) return;
    localStorage.setItem("fontSize", value);
}

function setFontWeight(value) {
    localStorage.setItem("fontWeight", value);
}

function setFontColor(hex) {
    document.getElementById("displayFontColor").innerText = hex;
    localStorage.setItem("fontColor", hex);
}

function setFontStyle(value) {
    localStorage.setItem("fontStyle", value ? 'Italic' : 'inherit');
}

function setBackgroundColor(hex) {
    document.getElementById("displayBackgroundColor").innerText = hex;
    localStorage.setItem("backgroundColor", hex);
}

function setBackgroundOpacity(value) {
    if(!(value >= 0 && value <= 100)) return;
    const hex = Math.round(value * 0.01 * 255).toString(16);
    localStorage.setItem("backgroundOpacity", hex);
}

function setBackgroundAnimationEnable(checked) {
    localStorage.setItem("backgroundAnimationEnable", checked);
}

function setBorderColor(hex) {
    document.getElementById("displayBorderColor").innerText = hex;
    localStorage.setItem("borderColor", hex);
}

function setBorderWidth(value) {
    if(value < 0) return;
    localStorage.setItem("borderWidth", value);
}

function setBorderRadius(value) {
    let radius = 10000;
    if(value == 0) radius = 0;
    else if(value == 1) radius = 10;
    else if(value == 2) radius = 10000;

    localStorage.setItem("borderRadius", radius);
}

function setProfileEnable(checked) {
    localStorage.setItem("profileEnable", checked);
}

function setProfileType(type) {
    if(type == "link") {
        document.getElementById("settingProfileFileEnable").checked = false;
        localStorage.setItem("profileType", "link");
    } else if(type == "file") {
        document.getElementById("settingProfileLinkEnable").checked = false;
        localStorage.setItem("profileType", "file");
    } else {
        localStorage.setItem("profileType", "default");
    }
}

function setProfileLink(type) {
    if(type == "link") {
        const value = document.getElementById("settingProfileLink").value;
        localStorage.setItem("profileLink", value);
    } else {
        document.getElementById("settingProfileLink").value = "";
        localStorage.removeItem("profileLink");
    }
}

function clickProfileFile() {
    document.getElementById("settingProfileFile").click();
}

function setProfileFile(target) { 
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document.getElementById("dataProfileFile").value = reader.result.substr(0,20) + "...";
        localStorage.setItem("profileFile", reader.result);
        target.value = "";
    };
    reader.onerror = function (error) {
        localStorage.removeItem("profileFile");
        console.log('Error: ', error);
        target.value = "";
    }; 
}

function removeProfileFile() {
    document.getElementById("dataProfileFile").value = "";
    localStorage.removeItem("profileFile");
}

function setProfileRadius(value) {
    let radius = 10000;
    if(value == 0) radius = 0;
    else if(value == 1) radius = 10;
    else if(value == 2) radius = 10000;

    localStorage.setItem("profileRadius", radius);
}

function setProfileRadiusEnable(checked) {
    localStorage.setItem("profileRadiusEnable", checked);
}

function initStorage() {
    setFontFamily('Jua');
    setFontSize(20);
    setFontWeight(400);
    setFontColor('#000000');
    setFontStyle('inherit');

    setBackgroundColor('#ffffff');
    setBackgroundOpacity(70);
    setBackgroundAnimationEnable(true);

    setBorderColor('#95BBDF');
    setBorderWidth(2);
    setBorderRadius(100000);
    
    setProfileEnable(true);
    setProfileType('default');
    setProfileRadius(100000);
    setProfileRadiusEnable(true);

    initSettings();
}

function initSettings() {
    document.querySelector(`#settingFontFamily [value='${localStorage.getItem("fontFamily")}']`).selected = true;
    document.querySelector(`#settingFontWeight [value='${localStorage.getItem("fontWeight")}']`).selected = true;
    document.getElementById("settingFontSize").value = localStorage.getItem("fontSize");
    document.getElementById("settingFontStyle").checked = localStorage.getItem("fontStyle") === 'inherit';

    document.getElementById("settingBackgroundOpacity").value = Math.round(parseInt(localStorage.getItem("backgroundOpacity"), 16) * 100 / 255);
    document.getElementById("settingBackgorundAnimationEnable").checked = localStorage.getItem("backgroundAnimationEnable");

    document.getElementById("settingBorderWidth").value = localStorage.getItem("borderWidth");
    if(localStorage.getItem("borderRadius") === "0") document.getElementsByName("border-radius")[0].checked = true;
    else if(localStorage.getItem("borderRadius") === "10") document.getElementsByName("border-radius")[1].checked = true;
    else if(localStorage.getItem("borderRadius") === "10000") document.getElementsByName("border-radius")[2].checked = true;
    else document.getElementsByName("border-radius")[2].checked = true;
    
    setTimeout(function() {
        pickrFont.setColor(localStorage.getItem("fontColor"), false);
        pickrBg.setColor(localStorage.getItem("backgroundColor"), false);
        pickrBorder.setColor(localStorage.getItem("borderColor"), false);
    }, 1000);

    document.getElementById("settingProfileEnable").checked = localStorage.getItem("profileEnable") == 'true';
    document.getElementById("settingProfileLinkEnable").checked = localStorage.getItem("profileType") === 'link';
    document.getElementById("settingProfileLink").value = localStorage.getItem("profileLik");
    document.getElementById("settingProfileFileEnable").checked = localStorage.getItem("profileType") === 'file';
    document.getElementById("dataProfileFile").value = localStorage.getItem("profileFile").substr(0,20) + "...";
    if(localStorage.getItem("profileRadius") === "0") document.getElementsByName("profile-radius")[0].checked = true;
    else if(localStorage.getItem("profileRadius") === "10") document.getElementsByName("profile-radius")[1].checked = true;
    else if(localStorage.getItem("profileRadius") === "10000") document.getElementsByName("profile-radius")[2].checked = true;
    else document.getElementsByName("profile-radius")[2].checked = true;
    document.getElementById("settingProfileBorderEnable").checked = localStorage.getItem("profileBorderEnable") == 'true';

    
}

function clearSettings() {
    initStorage();
}

(function() {
    if(localStorage.getItem("fontFamily") === null) {
        initStorage();
    } else {
        initSettings();
    }
})();
