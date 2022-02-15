const i18Obj = {
    "ru": {
        "lang_ru": "English",
        "lang_en": "По другому",
        "more_chuck": "Больше Чака!",
        "chuck_header": "Чак",
        "close": "Закрыть",
    },
    "en": {
        "lang_ru": "Русский",
        "lang_en": "English",
        "more_chuck": "Get me more Chuck's!",
        "chuck_header": "Chuck",
        "close": "Close",
    },
}
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
    initLangSwitch()
})

async function getPhrases() {
    let isRu = getLang() === 'ru'
    let url = isRu ? 'https://takahooly.net/random.php' : 'https://api.icndb.com/jokes/random?escape=javascript'
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        let text = isRu ? json.phrase : json.value.joke
        phrase.textContent = text;
        firstLoad = !firstLoad
        chuck.style.animation = firstLoad ? "rotation 2s infinite linear" : "scale .5s infinite linear"
        curClick++
        if (curClick === randNum) {
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

function initLangSwitch() {
    let switcher = document.getElementById('lang')
    switcher.addEventListener('click', e => {
        e.preventDefault()
        switcher.dataset.lang = (switcher.dataset.lang === 'ru') ? 'en' : 'ru'
        setLang(switcher.dataset.lang)
    })
}