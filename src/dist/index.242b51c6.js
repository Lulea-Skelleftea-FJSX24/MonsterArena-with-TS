console.log("hello world");
let monsters = [];
async function getMonsters() {
    try {
        const response = await fetch("./monsters.json");
        console.log("hello world222222");
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log("hello world33333");
        const characterList = document.getElementById("catalog");
        monsters = data;
        console.log("hello world4444444");
        monsters.forEach((character)=>{
            const characterDiv = document.createElement("div");
            characterDiv.innerHTML = `
              <h2>${character.name}</h2>
             <img src="${character.image}" alt="${character.name}" width = "200">
             <p><strong>Speciality:</strong> ${character.speciality}</p>
             <p><strong>Health:</strong> ${character.health}</p>
             <p><strong>Damage:</strong> ${character.damage}</p>
             <button id="addToTeamBtn${character.id}"onclick="laggTillILag(${character.id})">Choose me!</button>
           `;
            characterList?.appendChild(characterDiv);
            if (valtLag.some((monster)=>monster.id === character.id)) {
                const addButton = document.querySelector(`#addToTeamBtn${character.id}`);
                if (addButton) addButton.disabled = true;
            }
        });
    } catch (error) {
        console.error("Error", error);
    }
}
getMonsters();
// NYA SCRIPTET FÖR VALDA MONSTER----------------------------------------------------------
let valtLag = JSON.parse(localStorage.getItem("valtLag") || "[]");
function laggTillILag(id) {
    if (valtLag.length >= 3) return;
    if (valtLag.some((monster)=>monster.id === id)) return;
    const valtMonster = monsters.find((monster)=>monster.id === id);
    // todo
    let addBtnDissable = document.getElementById(`addToTeamBtn${valtMonster?.id}`);
    // type objet
    console.log(typeof addBtnDissable);
    addBtnDissable.disabled = true;
    valtLag.push(valtMonster);
    sparaLag();
    visaValtLag();
}
// Visa valt lag med specifika färger för varje position
function visaValtLag() {
    const lagDiv = document.getElementById("valt-lag");
    lagDiv.innerHTML = "";
    valtLag.forEach((monster, index)=>{
        const monsterDiv = document.createElement("div");
        monsterDiv.classList.add("card");
        monsterDiv.innerHTML = ` <h2>${monster.name}</h2>
       <img src="${monster.image}" alt="${monster.name}" width = "200">
       <p><strong>Speciality:</strong> ${monster.speciality}</p>
       <p><strong>Health:</strong> ${monster.health}</p>
       <p><strong>Damage:</strong> ${monster.damage}</p>
            
            <button class="delete-button" onclick="taBortFranLag(${monster.id})">Remove</button>
        `;
        lagDiv.appendChild(monsterDiv);
    });
    const tommaRutor = 3 - valtLag.length;
    for(let i = 0; i < tommaRutor; i++){
        const tomRuta = document.createElement("div");
        tomRuta.classList.add("tom-ruta");
        lagDiv.appendChild(tomRuta);
    }
}
function taBortFranLag(id) {
    valtLag = valtLag.filter((monster)=>monster.id !== id);
    const valtMonster = monsters.find((monster)=>monster.id === id);
    let addBtnDissable = document.getElementById(`addToTeamBtn${valtMonster.id}`);
    addBtnDissable.disabled = false;
    sparaLag();
    visaValtLag();
}
function rensaLag() {
    valtLag = [];
    // document.querySelectorAll("button[disabled]").forEach((button: NodeList) => (button.disabled = false));
    let test = document.querySelectorAll("button[disabled]").forEach((button)=>console.log(typeof button));
    console.log(test);
    console.log();
    sparaLag();
    visaValtLag();
}
function sparaLag() {
    localStorage.setItem("valtLag", JSON.stringify(valtLag));
}
window.onload = function() {
    // visaKatalog();
    visaValtLag();
};

//# sourceMappingURL=index.242b51c6.js.map
