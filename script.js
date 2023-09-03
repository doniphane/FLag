const cardContainer = document.querySelector(".card-container");
let sortMethod = "croissant";
let searchTerm = "";

function sortData(countries) {
  countries.sort((l1, l2) => {
    if (sortMethod === "croissant") {
      return l1.population - l2.population;
    } else if (sortMethod === "décroissant") {
      return l2.population - l1.population;
    } else if (sortMethod === "alphabetique") {
      return l1.translations.fra.common.localeCompare(l2.translations.fra.common);
    }
  });
}

document.getElementById("triCroissant").addEventListener("click", () => {
  sortMethod = "croissant";
  Pays(); 
});

document.getElementById("triDecroissant").addEventListener("click", () => {
  sortMethod = "décroissant"; 
  Pays();
});

document.getElementById("triAlphabetique").addEventListener("click", () => {
  sortMethod = "alphabetique";
  Pays();
});

document.getElementById("debutInput").addEventListener("input", function () {
  document.getElementById("finSpan").innerText = this.value;
  Pays();
});

document.getElementById("inputSearch").addEventListener("input", function () {
  searchTerm = this.value.toLowerCase();
  Pays();
});

async function Pays() {
  const apiUrl = `https://restcountries.com/v3.1/all`;
  const result = await fetch(apiUrl);
  const countries = await result.json();

  sortData(countries);

  cardContainer.innerHTML = "";

  const ValeurSlice = Math.min(countries.length, document.getElementById("debutInput").value);

  countries
    .filter(pays => pays.translations.fra.common.toLowerCase().includes(searchTerm))
    .slice(0, ValeurSlice)
    .forEach(pays => {
      const card = document.createElement("div");
      card.classList.add("carte");

      card.innerHTML = `
        <img src="${pays.flags.png}" alt="Drapeau de ${pays.translations.fra.common}">
        <h2>${pays.translations.fra.common}</h2>
        <p>Population : ${pays.population} habitants</p>
        <p>Capital : ${pays.capital}</p>
      `;

      cardContainer.appendChild(card);
    });
}

Pays();
