let phrase = document.getElementById('phrase')
let chuck = document.getElementById('main_chuck')
let firstLoad = true
let curClick = 0
let randNum = 0
const chuckModal = new bootstrap.Modal(document.getElementById('chuckModalContainer'))
document.addEventListener("DOMContentLoaded", () => {
    getPhrases()
    randNum = getRandomInt()
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
        }
    } else {
        alert("Ошибка! " + response.status);
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 3) + 1;
}