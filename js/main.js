import i18Obj from './translate.js';
let phrase = document.getElementById('phrase')
let chuck = document.getElementById('main_chuck')
let firstLoad = true
let curClick = 0
let randNum = 0
const chuckModal = new bootstrap.Modal(document.getElementById('chuckModalContainer'))
const chuckImg = document.getElementById('chuck')
document.addEventListener("DOMContentLoaded", () => {
    getPhrases()
    getRandomInt()
    let lang = document.querySelector('input[name="lang_switch"]:checked').value;
    console.log(lang)
})

async function getPhrases() {
    let response = await fetch("https://takahooly.net/random.php");
    if (response.ok) {
        let json = await response.json();
        phrase.textContent = json.phrase;
        firstLoad = !firstLoad
        chuck.style.animation = firstLoad ? "rotation 2s infinite linear" : "scale .5s infinite linear"
        curClick++
        if (curClick === randNum){
            curClick = 0
            chuckModal.show()
            chuckImg.src = "img/" + randNum + ".gif"
            getRandomInt()
        }
    } else {
        alert("Ошибка! " + response.status);
    }
}

function getRandomInt() {
    randNum = Math.floor(Math.random() * 3) + 1;
}

function translatePage(lang) {
    document.querySelectorAll('[data-i18]').forEach(el => {
        el.textContent = i18Obj[lang][el.dataset.i18];
    })
}

function setLang(lang = 'ru') {
    localStorage.setItem('lang', lang);
    translatePage(lang)
}

function getLang() {
    return localStorage.getItem('lang') ?? 'ru'
}