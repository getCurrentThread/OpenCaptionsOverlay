(function() {
    setInterval(function() {
        loadStorage();
    }, 1000);
})();

let fontFamily = '';
let fontWeight = '';
let fontSize = '';
let fontcolor = '';
let fontStyle = '';

let bgColor;
let bgOpacity;
let bgAnimeEnable;

let borderColor;
let borderWidth;
let borderStyle;

let profileEnable;
let profileType;
let profileLink;
let profileFile;
let profileStyle;
let profileBorderEnable;

function loadStorage() {
    fontFamily = localStorage.getItem("fontFamily");
    fontWeight = localStorage.getItem("fontWeight");
    fontSize = localStorage.getItem("fontSize");
    fontColor = localStorage.getItem("fontColor");
    fontStyle = localStorage.getItem("fontStyle");

    setFont();
}

function setFont() {
    document.getElementById("finalStr").style.fontFamily = fontFamily;
    document.getElementById("interim").style.fontFamily = fontFamily;
    document.getElementById("finalStr").style.fontWeight = fontWeight;
    document.getElementById("interim").style.fontWeight = fontWeight;
    document.getElementById("finalStr").style.fontSize = fontSize + 'px';
    document.getElementById("interim").style.fontSize = fontSize + 'px';
    document.getElementById("finalStr").style.color = fontColor;
    document.getElementById("interim").style.color = fontColor;
    document.getElementById("finalStr").style.fontStyle = fontStyle;
    document.getElementById("interim").style.fontStyle = fontStyle;
    
}