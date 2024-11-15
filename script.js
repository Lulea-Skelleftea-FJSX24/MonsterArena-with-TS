const monsters = [
    { id: 1, name: "Shadow Reaper", speciality: "Masters shadows to cloak and deceive enemies." },
    { id: 2, name: "Blaze Fury", speciality: "Breathes fire hotter than lava and can withstand extreme heat." },
    { id: 3, name: "Frostbite Phantom", speciality: "Controls icy winds and can freeze opponents in their tracks." },
    { id: 4, name: "Thunderstrike", speciality: "Generates powerful thunderstorms and electric shocks." },
    { id: 5, name: "Venom Viper", speciality: "Releases toxic venom that can paralyze foes instantly." },
    { id: 6, name: "Earthshaker", speciality: "Creates earthquakes with a single stomp and manipulates rocks." },
    { id: 7, name: "Mystic Mirage", speciality: "Illusionist who can create mirages to confuse and mislead enemies." },
    { id: 8, name: "Soulmender", speciality: "Heals allies by channeling rejuvenating energy, restoring health over time." }
];

let valtLag = JSON.parse(localStorage.getItem('valtLag')) || [];

// Visa monsterkatalog med neutral färg
function visaKatalog() {
    const katalog = document.getElementById('katalog');
    katalog.innerHTML = '';
    monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.classList.add('card');
        monsterDiv.innerHTML = `
            <span><strong>${monster.name}</strong></span>
            <p style="font-size: 0.8em; padding: 5px;">${monster.speciality}</p>
            <button class="delete-button" onclick="laggTillILag(${monster.id})">Välj</button>
        `;
        katalog.appendChild(monsterDiv);
    });
}
function laggTillILag(id) {
    if (valtLag.length >= 3) {
        return;
    }
    if (valtLag.some(monster => monster.id === id)) {
        return;
    }

    const valtMonster = monsters.find(monster => monster.id === id);
    valtLag.push(valtMonster);
    sparaLag();
    visaValtLag();
}

// Visa valt lag med specifika färger för varje position
function visaValtLag() {
    const lagDiv = document.getElementById('valt-lag');
    lagDiv.innerHTML = '';

    valtLag.forEach((monster, index) => {
        const monsterDiv = document.createElement('div');
        monsterDiv.classList.add('card');

        // Tilldela en färg baserat på position i laget
        if (index === 0) {
            monsterDiv.classList.add('blue-team');
        } else if (index === 1) {
            monsterDiv.classList.add('red-team');
        } else if (index === 2) {
            monsterDiv.classList.add('green-team');
        } else if (index === 3) {
            monsterDiv.classList.add('yellow-team');
        }

        monsterDiv.innerHTML = `
            <span><strong>${monster.name}</strong></span>
            <button class="delete-button" onclick="taBortFranLag(${monster.id})">Ta bort</button>
        `;
        lagDiv.appendChild(monsterDiv);
    });
    const tommaRutor = 3 - valtLag.length;
    for (let i = 0; i < tommaRutor; i++) {
        const tomRuta = document.createElement('div');
        tomRuta.classList.add('tom-ruta');
        lagDiv.appendChild(tomRuta);
    }
}

function taBortFranLag(id) {
    valtLag = valtLag.filter(monster => monster.id !== id);
    sparaLag();
    visaValtLag();
}

function rensaLag() {
    valtLag = [];
    sparaLag();
    visaValtLag();
}

function sparaLag() {
    localStorage.setItem('valtLag', JSON.stringify(valtLag));
}

window.onload = function() {
    visaKatalog();
    visaValtLag();
};
