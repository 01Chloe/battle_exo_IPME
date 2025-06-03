class Perso {
  pvMax = 150;
  pv = 150;
  force = 10;
  name;
  house;
  percentOfLife = 100;
  resurectionNb = 1;

  constructor(name, house) {
    this.name = name;
    this.house = house;
    this.percentOfLife = this.percentOfLife;
  }
  randomForce() {
    let force = Math.floor(Math.random() * this.force + this.force / 2) + 1;
    return force;
  }

  attack(perso, tour) {
    let randomSuperFight = Math.floor(Math.random() * 10) + 1;
    let attackRandom = this.randomForce();

    if (randomSuperFight === 5) {
      perso.pv -= attackRandom * 3;
      if (perso.pv < 0) {
        perso.pv = 0;
      }
      let superFightInfo = document.createElement("p");
      superFightInfo.classList.add("colored-txt");
      superFightInfo.innerHTML = `Tour ${tour} : ${
        this.name
      } fait une super attaque à ${perso.name} pour ${
        attackRandom * 3
      } dégâts. Il reste ${perso.pv} PV à ${perso.name}`;
      battleInfos.insertAdjacentElement("beforeend", superFightInfo);
    } else {
      perso.pv -= attackRandom;
      if (perso.pv < 0) {
        perso.pv = 0;
      }
      let pInfo = document.createElement("p");
      pInfo.innerHTML = `Tour ${tour} : ${this.name} attaque ${perso.name} pour ${attackRandom} dégâts. Il reste ${perso.pv} PV à ${perso.name}`;
      battleInfos.insertAdjacentElement("beforeend", pInfo);
    }

    this.percentOfLife = Math.floor((this.pv * 100) / 150);
  }

  resurection(tour) {
    this.pv = this.pvMax;
    let lifeInfo = document.createElement("p");
    lifeInfo.innerHTML = `Tour ${tour} : ${this.name} a regagné toute sa vie`;
    lifeInfo.classList.add("colored-txt");
    battleInfos.insertAdjacentElement("beforeend", lifeInfo);
  }
}

const witcherOneName = document.querySelector("#witcherOne");
const witcherTwoName = document.querySelector("#witcherTwo");
const witcherOneHouse = document.querySelector("#houseOne");
const witcherTwoHouse = document.querySelector("#houseTwo");
const displayWitcherOneName = document.querySelector(".witcher-one-name");
const displayWitcherOneHouse = document.querySelector(".witcher-one-house");
const displayWitcherTwoName = document.querySelector(".witcher-two-name");
const displayWitcherTwoHouse = document.querySelector(".witcher-two-house");
const battleContainer = document.querySelector(".battle-container");
const battleInfos = document.querySelector(".battle-infos");
const witcherOneLife = document.querySelector(".witcher-one-life");
const witcherTwoLife = document.querySelector(".witcher-two-life");

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  startBattle();

  witcherOneName.value = "";
  witcherTwoName.value = "";
  witcherOneHouse.value = "";
  witcherTwoHouse.value = "";
});

function startBattle() {
  let perso1 = new Perso(witcherOneName.value, witcherOneHouse.value);
  let perso2 = new Perso(witcherTwoName.value, witcherTwoHouse.value);

  battleContainer.classList.remove("hide");

  displayWitcherOneName.innerHTML = witcherOneName.value;
  displayWitcherOneHouse.innerHTML = witcherOneHouse.value;
  displayWitcherTwoName.innerHTML = witcherTwoName.value;
  displayWitcherTwoHouse.innerHTML = witcherTwoHouse.value;

  let i = 1;
  let intervalId = setInterval(() => {
    if (perso1.pv > 0 && perso2.pv > 0) {
      perso1.attack(perso2, i);
      witcherTwoLife.style.width = perso2.percentOfLife + "%";
      if (perso2.percentOfLife >= 50) {
        witcherTwoLife.style.backgroundColor = "#00bd13";
      } else if (perso2.percentOfLife >= 15) {
        witcherTwoLife.style.backgroundColor = "#ffaa0e";
      } else {
        witcherTwoLife.style.backgroundColor = "#dd0000";
      }
      i++;
      if (perso2.pv > 0) {
        perso2.attack(perso1, i);
        witcherOneLife.style.width = perso1.percentOfLife + "%";
        if (perso1.percentOfLife >= 50) {
          witcherOneLife.style.backgroundColor = "#00bd13";
        } else if (perso1.percentOfLife >= 15) {
          witcherOneLife.style.backgroundColor = "#ffaa0e";
        } else {
          witcherOneLife.style.backgroundColor = "#dd0000";
        }
        i++;
      }
      if (perso1.pv <= perso1.pvMax / 2 && perso1.resurectionNb === 1) {
        perso1.resurection(i);
        perso1.resurectionNb = 0;
        i++;
      }
      if (perso2.pv <= perso2.pvMax / 2 && perso2.resurectionNb === 1) {
        perso2.resurection(i);
        perso2.resurectionNb = 0;
        i++;
      }
    } else {
      clearInterval(intervalId);

      let winner;
      if (perso1.pv > perso2.pv) {
        winner = perso1;
        loser = perso2;
        witcherTwoLife.style.width = 0;
      } else {
        winner = perso2;
        loser = perso1;
        witcherOneLife.style.width = 0;
      }
      let result = document.createElement("p");
      result.innerHTML = `💥 ${winner.name} (${winner.house}) a vaincu ${
        loser.name
      } (${loser.house}) en ${i - 1} tours !`;
      battleInfos.insertAdjacentElement("beforeend", result);
    }
  }, 500);
}
