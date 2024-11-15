fetch("./monsters.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetch failed: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const catalog = document.getElementById("catalog");

    // Creates a seperate div for every monster
    data.forEach((monster) => {
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster-card");

      // Creates a new <p>-tag for info about every monster
      const infoParagraph = document.createElement("p");
      infoParagraph.classList.add("monster-info");

      if (monster.name === "Voidbringer") {
        infoParagraph.textContent = "A mysterious and fearsome creature that moves unseen in the darkness. Voidbringer harnesses the power of shadows to confuse its enemies, create illusions, and strike when least expected. With its sweeping scythe, it is a master of exploiting fear and uncertainty to its advantage.";
      } else if (monster.name === "Blaze Fury") {
        infoParagraph.textContent = "Is a scorching powerhouse, capable of unleashing fiery blasts that melt anything in their path. With an immunity to extreme heat, this monster thrives in the flames, turning battlefields into blazing infernos";
      } else if (monster.name === "Icy Phantom") {
        infoParagraph.textContent = "Is a chilling force of nature, summoning freezing winds that can stop enemies in their tracks. With the power to encase opponents in ice, it controls the battlefield with a deadly, cold precision";
      } else if (monster.name === "Thunderstrike") {
        infoParagraph.textContent = "Harnesses the raw power of storms, calling down lightning bolts and unleashing thunderous shocks. With the ability to control the skies, it strikes fear into enemies, delivering devastating electric attacks with every move";
      } else if (monster.name === "Venom Viper") {
        infoParagraph.textContent = "Strikes with deadly precision, injecting toxic venom that paralyzes its victims instantly. With its swift, serpentine movements and lethal toxins, it’s a master of disabling foes before delivering the final blow.";
      } else if (monster.name === "Earthshaker") {
        infoParagraph.textContent = "Is a colossal force of nature, capable of causing tremors with a single stomp. It commands the very earth beneath its feet, using powerful quakes and rock manipulation to crush its enemies and reshape the battlefield";
      } else if (monster.name === "Mystic Mirage") {
        infoParagraph.textContent = "Is a master illusionist, weaving deceptive mirages that confound and mislead foes. With its ability to blur reality and create false images, it thrives in chaos, leaving enemies unsure of what’s real and what’s a trap.";
      } else if (monster.name === "Soulmender") {
        infoParagraph.textContent = "Is a compassionate and powerful healer, channeling rejuvenating energy to restore the health of allies over time. With its soothing aura and life-giving abilities, it turns the tide of battle by keeping its team strong and in the fight.";
      }

      // Adds everything written inside the card, image, name and speciality
      monsterDiv.innerHTML = `
        <img src="${monster.image}" alt="${monster.name}" width="200">
        <h2>${monster.name}</h2>
        <p><strong>Speciality:</strong> ${monster.speciality}</p>
      `;

      // Adds the info before the health and damage
      monsterDiv.appendChild(infoParagraph);

      // Adds the health and damage on the card
      monsterDiv.innerHTML += `
        <p><strong>Health:</strong> ${monster.health}</p>
        <p><strong>Damage:</strong> ${monster.damage}</p>
      `;

      // Adds the card into the catalog
      catalog.appendChild(monsterDiv);
    });
  })
  .catch((error) => {
    console.error("Problem with the fetch operation", error);
  });
const h1Element = document.querySelector('h1');
h1Element.textContent = "Monster Catalog";