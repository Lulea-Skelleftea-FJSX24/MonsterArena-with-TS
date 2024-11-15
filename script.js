let monsters;
fetch("./monsters.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ok response" + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const characterList = document.getElementById("catalog");
    monsters = data;
    data.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.innerHTML = `
        <h2>${character.name}</h2>
       <img src="${character.image}" alt="${character.name}" width = "200">
       <p><strong>Speciality:</strong> ${character.speciality}</p>
       <p><strong>Health:</strong> ${character.health}</p>
       <p><strong>Damage:</strong> ${character.damage}</p>
       <button id="addToTeamBtn${character.id}"onclick="laggTillILag(${character.id})">Välj mig!</button>
     `;

      characterList.appendChild(characterDiv);
    });
  })
  .catch((error) => {
    console.log("Problem with the fetch operation", error);
  });

// NYA SCRIPTET FÖR VALDA MONSTER----------------------------------------------------------

let valtLag = JSON.parse(localStorage.getItem("valtLag")) || [];

function laggTillILag(id) {
  if (valtLag.length >= 3) {
    return;
  }
  if (valtLag.some((monster) => monster.id === id)) {
    return;
  }

  const valtMonster = monsters.find((monster) => monster.id === id);
  let addBtnDissable = document.getElementById(`addToTeamBtn${valtMonster.id}`);
  addBtnDissable.disabled = true;
  valtLag.push(valtMonster);
  sparaLag();
  visaValtLag();
}

// Visa valt lag med specifika färger för varje position
function visaValtLag() {
  const lagDiv = document.getElementById("valt-lag");
  lagDiv.innerHTML = "";

  valtLag.forEach((monster, index) => {
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("card");

    monsterDiv.innerHTML = ` <h2>${monster.name}</h2>
       <img src="${monster.image}" alt="${monster.name}" width = "200">
       <p><strong>Speciality:</strong> ${monster.speciality}</p>
       <p><strong>Health:</strong> ${monster.health}</p>
       <p><strong>Damage:</strong> ${monster.damage}</p>
            
            <button class="delete-button" onclick="taBortFranLag(${monster.id})">Ta bort</button>
        `;
    lagDiv.appendChild(monsterDiv);
  });
  const tommaRutor = 3 - valtLag.length;
  for (let i = 0; i < tommaRutor; i++) {
    const tomRuta = document.createElement("div");
    tomRuta.classList.add("tom-ruta");
    lagDiv.appendChild(tomRuta);
  }
}

function taBortFranLag(id) {
  valtLag = valtLag.filter((monster) => monster.id !== id);
  const valtMonster = monsters.find((monster) => monster.id === id);
  let addBtnDissable = document.getElementById(`addToTeamBtn${valtMonster.id}`);
  addBtnDissable.disabled = false;
  sparaLag();
  visaValtLag();
}

function rensaLag() {
  valtLag = [];
  sparaLag();
  visaValtLag();
}

function sparaLag() {
  localStorage.setItem("valtLag", JSON.stringify(valtLag));
}

window.onload = function () {
  // visaKatalog();
  visaValtLag();
};
