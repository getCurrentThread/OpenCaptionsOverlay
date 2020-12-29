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
    } else if(target == "etc") {
        document.getElementById("tabEtc").classList.add("active");
        document.getElementById("settingEtc").classList.remove("d-none");
    }
};