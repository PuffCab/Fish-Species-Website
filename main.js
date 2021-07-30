// console.log(data)
// const requestOptions = {
//     method: 'GET',
//     redirect: 'follow',

// };
// const url =
//   "https://cab-cors-anywhere.herokuapp.com/https://www.fishwatch.gov/api/species";
// function getData() {
//   fetch(url)
//     .then((response) => {
//       //   console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       //   console.log(data);
//       loadFunctions(data);
//       // setEventListeners(data)
//     });
// }
// getData();

//turn fetch in async/await

const getDataAsync = async () => {
  const response = await fetch(
    "https://cab-cors-anywhere.herokuapp.com/https://www.fishwatch.gov/api/species"
  );
  console.log("response : >>", response);
  console.log("now");
  const data = await response.json();
  console.log(`data>>`, data);
  loadFunctions(data);
};
getDataAsync();
// Locate window path and execute CreateTable funcion if we are in the right one
const currentLocation = window.location.pathname;
console.log(currentLocation);

function loadFunctions(data) {
  if (currentLocation == "/fishRegions.html") {
    createTable(data);
    dropdown(data);
    setEventListeners(data);
  } else if (currentLocation == "/fishInfo.html") {
    createCards(data);
    searchBarFunction(data);

    // createModal(data)
  } else {
    console.log("no ejecuto createTable");
  }
}

// Create Table Fisheries Regions //
function createTable(data) {
  const tBody = document.getElementById("fish-data");
  tBody.innerHTML = "";

  for (i = 0; i < data.length; i++) {
    let row = document.createElement("tr");

    let tdName = document.createElement("td");
    let tdSciName = document.createElement("td");
    let tdLocation = document.createElement("td");
    let tdFishRegion = document.createElement("td");
    let tdHarvest = document.createElement("td");

    tdName.innerHTML = data[i]["Species Name"];
    tdSciName.innerHTML = data[i]["Scientific Name"];
    tdLocation.innerHTML = data[i].Availability;
    tdFishRegion.innerHTML = data[i]["NOAA Fisheries Region"];
    tdHarvest.innerHTML = data[i]["Harvest Type"];

    tBody.appendChild(row);

    row.appendChild(tdName);
    row.appendChild(tdSciName);
    row.appendChild(tdLocation);
    row.appendChild(tdFishRegion);
    row.appendChild(tdHarvest);
  }
  // console.log("createTable() run")
}
// End of Fisheries Regions Table

// DROPDOWN HARVEST TYPE FUNCTION
function dropdown(data) {
  let selectType = document.getElementById("harvestType"); //selecciono el Id del dropdown
  // console.log(selectType)

  var harvStyleArray = []; //creo Array con todos los harvest styles (todos repitiendo)

  for (var a = 0; a < data.length; a++) {
    // itero para extraer todos los valores de harvest style
    var allTypes = data[a]["Harvest Type"];

    harvStyleArray.push(allTypes);
    // console.log(harvStyleArray)

    var repetedStyle = []; // creo la variable para almacenar los repetidos

    for (var b = 0; b < harvStyleArray.length; b++) {
      // itero sobre el array creado con todos los valores de Harvest Style

      for (var c = b + 1; c < harvStyleArray.length; c++) {
        // comparo con el mismo, empezando por la siguiente posicion
        if (harvStyleArray[b] == harvStyleArray[c]) {
          // si tienen el mismo index , son el mismo
          if (!repetedStyle.includes(harvStyleArray[b])) {
            //si el valor repetido no se incluye en el array
            repetedStyle.push(harvStyleArray[b]); // insertar ese valor en el de repetidos,
          }
        }
      }
    }
  }
  for (var d = 0; d < repetedStyle.length; d++) {
    // por ahora relleno el dropdown con todos los valores de harvest type. no con los unicos.

    var option = document.createElement("option"); //creo el valor "option" del dropdown, para cada uno de los Style repetidos
    option.innerHTML = repetedStyle[d];
    option.value = repetedStyle[d];
    selectType.appendChild(option);
  }

  // console.log("harvestType() run")
}
// END dropdown harvest type

//INICIO create Fish info cards
let elementNumber = [];
function createCards(data) {
  let cardContainer = document.getElementById("cardContainer");

  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

    let imgFish = document.createElement("img");
    imgFish.setAttribute("class", "card-img-top");
    let imgUrl = data[i]["Species Illustration Photo"].src;
    // console.log(imgUrl)
    imgFish.setAttribute("src", imgUrl);

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    let hCardTitle = document.createElement("h5");
    hCardTitle.innerHTML = data[i]["Scientific Name"];

    let pCardText = document.createElement("p");
    pCardText.setAttribute("class", "card-text");
    pCardText.innerHTML = "a.k.a " + data[i]["Species Name"];

    let divBtnGrop = document.createElement("div");
    divBtnGrop.setAttribute("class", "btn-group btn-group-sm");

    let aInfoButtonLeft = document.createElement("a");
    aInfoButtonLeft.setAttribute("class", "btn btn-secondary");
    aInfoButtonLeft.innerHTML = "more pics";
    aInfoButtonLeft.setAttribute("data-toggle", "modal");
    aInfoButtonLeft.setAttribute("data-target", "#myModalSlider");
    aInfoButtonLeft.setAttribute("id", i);

    let aInfoButtonRight = document.createElement("a");
    aInfoButtonRight.setAttribute("class", "btn btn-secondary");
    aInfoButtonRight.setAttribute("href", "#");
    aInfoButtonRight.setAttribute("data-toggle", "modal");
    aInfoButtonRight.setAttribute("data-target", "#myModal");
    aInfoButtonRight.setAttribute("id", i);
    aInfoButtonRight.innerHTML = "Nutrional Info";

    cardContainer.appendChild(divCard);
    divCard.appendChild(imgFish);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(hCardTitle);
    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(divBtnGrop);
    divBtnGrop.appendChild(aInfoButtonLeft);
    divBtnGrop.appendChild(aInfoButtonRight);

    // trigger modal card and populate with info
    let elementNumber = aInfoButtonRight.id;

    aInfoButtonRight.onclick = function () {
      console.log("right btn clicked");
      let cardNumber = aInfoButtonRight.id;
      let modalTitle = document.getElementById("modalTitle");
      let modalBodyCal = document.getElementById("data-one");
      let modalBodyCholesterol = document.getElementById("data-two");
      let modalBodyFat = document.getElementById("data-three");
      let modalBodyProtein = document.getElementById("data-four");
      let modalBodySelenium = document.getElementById("data-five");
      let modalBodySodium = document.getElementById("data-six");

      modalTitle.innerHTML = data[cardNumber]["Species Name"];
      modalBodyCal.innerHTML =
        "Calories : " + data[cardNumber]["Calories"] + " Kcal";
      modalBodyCholesterol.innerHTML =
        "Cholesterol : " + data[cardNumber]["Cholesterol"];
      modalBodyFat.innerHTML = "Fat, Total : " + data[cardNumber]["Fat, Total"];
      modalBodyProtein.innerHTML = "Protein : " + data[cardNumber]["Protein"];
      modalBodySelenium.innerHTML =
        "Selenium : " + data[cardNumber]["Selenium"];
      modalBodySodium.innerHTML = "Sodium : " + data[cardNumber]["Sodium"];
    };

    //MODAL SLIDER

    aInfoButtonLeft.onclick = function () {
      let sliderContainer = document.getElementById("container");
      // let divItemActive = document.getElementById('itemActive')

      let itemNumber = aInfoButtonLeft.id;
      //   console.log(itemNumber);
      for (let x = 0; x < data[itemNumber]["Image Gallery"].length; x++) {
        if (data[itemNumber]["Image Gallery"] === null) {
          console.log("no pictures");
        } else {
          let itemActive = document.createElement("div");
          itemActive.setAttribute("class", "item active");

          let imgActive = document.createElement("img");
          let imagenActive = data[itemNumber]["Image Gallery"][0].src;
          imgActive.setAttribute("src", imagenActive);

          sliderContainer.appendChild(itemActive);
          itemActive.appendChild(imgActive);
          //   console.log(data[i]["Image Gallery"][x].alt);

          let itemNotActive = document.createElement("div");
          itemNotActive.setAttribute("class", "item");

          let imgNotActive = document.createElement("img");
          let imagenNotActive = data[itemNumber]["Image Gallery"][x].src;
          imgNotActive.setAttribute("src", imagenNotActive);

          sliderContainer.appendChild(itemNotActive);
          itemNotActive.appendChild(imgNotActive);

          let caption = document.createElement("div");
          caption.setAttribute("class", "carousel-caption");
          let description = document.createElement("p");
          description.innerHTML = data[itemNumber]["Image Gallery"][x].alt;

          //   console.log(imagenNotActive);
        }
      }
    };
  }
  //   console.log("createCards() run");
}

// INICIO SEARCH BAR
function searchBarFunction(data) {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    let commonNames = document.querySelectorAll("p.card-text");
    let scientificNames = document.querySelectorAll("h5");
    const inputValue = searchInput.value.toUpperCase();
    console.log(inputValue);
    // console.log(allNames);
    let fishCards = document.getElementsByClassName("card");
    for (let i = 0; i < commonNames.length; i++) {
      let fishComName = commonNames[i].textContent;
      let fishSciName = scientificNames[i].textContent;
      // console.log(fishCards)
      // console.log(fishName)
      if (
        fishComName.toUpperCase().indexOf(inputValue) > -1 ||
        fishSciName.toUpperCase().indexOf(inputValue) > -1
      ) {
        fishCards[i].style.display = "block";
      } else {
        fishCards[i].style.display = "none";
      }
    }
  });
}
// FIN SEARCH BAR

// DROPDOWN

function setEventListeners(data) {
  // ANCHOR PREGUNTA...si hago const = setEventListeners = (data)=> da error de cannt accs before initalization ...porque intnta accdr la const bfore defined...why??

  let harvestTypeValue = document
    .getElementById("harvestType")
    .addEventListener("change", (event) => {
      checkbox(data);
    });
  // console.log(harvestTypeValue)

  let checkBoxes = document.querySelectorAll(
    "input[type=checkbox][name=region]"
  );

  Array.from(checkBoxes).forEach(function (oneCheckBox) {
    oneCheckBox.addEventListener("change", function () {
      checkbox(data);
    });
  });
}

function checkbox(data) {
  let harvestTypeValue = document.querySelector("#harvestType").value;

  let checkBoxes = document.querySelectorAll(
    "input[type=checkbox][name=region]"
  );
  let optionChecked = [];

  checkBoxes.forEach(function (oneCheckBox) {
    optionChecked = Array.from(checkBoxes) //convert to array to filter and map
      .filter((i) => i.checked) // use array.filter to remove unchecked ones
      .map((i) => i.value); // use array.map to extract checked values
    // console.log(optionChecked)
  });
  filtering(data, optionChecked, harvestTypeValue);
}

// FILTERING - filter by option checked and dropdown selected

function filtering(data, optionChecked, harvestTypeValue) {
  // console.log(data);
  // console.log('dropdown',harvestTypeValue)
  // console.log('checkbox', optionChecked)

  let filteredResults = [];
  if (optionChecked.length === 0 && harvestTypeValue === "all") {
    filteredResults = data;
    // console.log('if 1->')
  } else if (optionChecked.length === 0 && harvestTypeValue != "all") {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["Harvest Type"] == harvestTypeValue) {
        filteredResults.push(data[i]);
        // console.log('if 2->')
      }
    }
  } else if (optionChecked.length != 0 && harvestTypeValue === "all") {
    for (let i = 0; i < data.length; i++) {
      shouldAdd = true;
      optionChecked.forEach((option) => {
        if (!data[i]["NOAA Fisheries Region"].includes(option)) {
          shouldAdd = false;
        }
      });
      if (shouldAdd) {
        filteredResults.push(data[i]);
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      shouldAdd = true; // ANCHOR logica SO. Revisar
      optionChecked.forEach((option) => {
        if (!data[i]["NOAA Fisheries Region"].includes(option)) {
          shouldAdd = false;
        }
      });
      if (shouldAdd && data[i]["Harvest Type"] == harvestTypeValue) {
        filteredResults.push(data[i]);
      }
    }
  }

  // console.log(filteredResults)
  createTable(filteredResults);
}
