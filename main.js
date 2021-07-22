// console.log(data)
// const requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
    
// };
const url = "https://cab-cors-anywhere.herokuapp.com/https://www.fishwatch.gov/api/species";
function getData() {
    
    fetch(url).then(response => {
        console.log(response);
        return response.json()
    }).then(data => {
        console.log(data);
        loadFunctions (data)
        
    } )
}
getData()




// BORRAR esta parte abajo es para rendr data en la pagina seeAPIinfohtml
const body = document.querySelector('body');
const ul = document.createElement('ul');
body.appendChild(ul);
 

// const li = document.createElement('li');
// ul.appendChild(li)


// for (i = 0; i < data.length; i++) {

//     let li = data[i]['Species Name']

//      li = document.createElement('li');
//     ul.appendChild(li)
//     li.innerHTML = data[i]['NOAA Fisheries Region']

//     // if (data[i]["Species Name"] == true) {
//     //     count ++
//     // }

//     // // console.log(indexOf.data[i]["Species Name"])
//     // console.log(count)
//     console.log(li[1])
// }

// FIN above part // BORRAR

// Locate window path and execute CreateTable funcion if we are in the right one
const currentLocation = window.location.pathname
console.log(currentLocation)

function loadFunctions (data) {

        if (currentLocation == '/FishSpeciesWeb/fishRegions.html') {
            createTable(data)
            harvestTypes(data)
            } else if (currentLocation == '/FishSpeciesWeb/fishInfo.html') {
            createCards(data)
            // createModal(data)
            
         }
            else {
            console.log('no ejecuto createTable')
         }
    }



// Create Table Fisheries Regions // 
function createTable(data) {
    const tBody = document.getElementById('fish-data');
    
    for (i = 0; i < data.length; i++) {
        let row = document.createElement('tr');

        let tdName = document.createElement('td'); 
        let tdSciName = document.createElement('td');
        let tdLocation = document.createElement('td');
        let tdFishRegion = document.createElement('td');
        let tdHarvest = document.createElement('td');

        tdName.innerHTML = data[i]['Species Name'];
        tdSciName.innerHTML = data[i]['Scientific Name'];
        tdLocation.innerHTML = data[i].Availability;
        tdFishRegion.innerHTML = data[i]['NOAA Fisheries Region'];
        tdHarvest.innerHTML = data[i]['Harvest Type'];

        tBody.appendChild(row);

        row.appendChild(tdName);
        row.appendChild(tdSciName);
        row.appendChild(tdLocation);
        row.appendChild(tdFishRegion);
        row.appendChild(tdHarvest);
    }
    console.log("createTable() run")
    
}

// End of Fisheries Regions Table

// DROPDOWN HARVEST TYPE FUNCTION 

function harvestTypes(data) {
    let selectType = document.getElementById('harvestType') //selecciono el Id del dropdown
    // console.log(selectType)
    
    var harvStyleArray = []; //creo Array con todos los harvest styles (todos repitiendo)

    for (var a = 0; a < data.length; a++) {  // itero para extraer todos los valores de harvest style
        var allTypes = data[a]['Harvest Type']; 

        harvStyleArray.push(allTypes);
        // console.log(harvStyleArray)

        var repetedStyle = []; // creo la variable para almacenar los repetidos

        for (var b = 0; b < harvStyleArray.length; b++) { // itero sobre el array creado con todos los valores de Harvest Style

            for (var c = b + 1; c < harvStyleArray.length; c++) { // comparo con el mismo, empezando por la siguiente posicion
                if (harvStyleArray[b] == harvStyleArray[c]) { // si tienen el mismo index , son el mismo
                    if (!repetedStyle.includes(harvStyleArray[b])) { //si el valor repetido no se incluye en el array
                        repetedStyle.push(harvStyleArray[b]); // insertar ese valor en el de repetidos, 
                    }                
                }
            }
        }
    }
    for (var d = 0; d < repetedStyle.length; d++) { // por ahora relleno el dropdown con todos los valores de harvest type. no con los unicos.

        var option = document.createElement('option') //creo el valor "option" del dropdown, para cada uno de los Style repetidos
        option.innerHTML = repetedStyle[d];

        selectType.appendChild(option)
    }

    
    console.log("harvestType() run")
}

// END dropdown harvest type 

//INICIO create Fish info cards
let elementNumber = [];
function createCards(data) {
    let cardContainer = document.getElementById('cardContainer');
    
    for (let i = 0; i < data.length; i++) {

        let divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');

        let imgFish = document.createElement('img');
        imgFish.setAttribute('class', 'card-img-top');
        let imgUrl = data[i]['Species Illustration Photo'].src
        // console.log(imgUrl)
        imgFish.setAttribute('src', imgUrl);

        let divCardBody = document.createElement('div');
        divCardBody.setAttribute('class', 'card-body');

        let hCardTitle = document.createElement('h5')
        hCardTitle.innerHTML = data[i]['Scientific Name'];
        

        let pCardText = document.createElement('p');
        pCardText.setAttribute('class', 'card-text');
        pCardText.innerHTML = 'a.k.a ' + data[i]['Species Name']

        let divBtnGrop = document.createElement('div')
        divBtnGrop.setAttribute('class', 'btn-group btn-group-sm');

        let aInfoButtonLeft = document.createElement('a');
        aInfoButtonLeft.setAttribute('class', 'btn btn-secondary');
        aInfoButtonLeft.innerHTML = 'more pics';
        aInfoButtonLeft.setAttribute('data-toggle', 'modal');
        aInfoButtonLeft.setAttribute('data-target', '#myModalSlider');
        // aInfoButtonLeft.setAttribute('rel', 'lightbox'); // for light box
        // aInfoButtonLeft.setAttribute('href', data[i]['Image Gallery'][i]['src']); // PROBLEM WITH NULLS for lightbox
        // console.log(data[0]['Image Gallery'][0]['src'])


        let aInfoButtonRight = document.createElement('a');
        aInfoButtonRight.setAttribute('class', 'btn btn-secondary');
        aInfoButtonRight.setAttribute('href', '#');
        aInfoButtonRight.setAttribute('data-toggle', 'modal');
        aInfoButtonRight.setAttribute('data-target', '#myModal');
        // aInfoButtonRight.setAttribute('onclick', createModal(data));
        aInfoButtonRight.setAttribute('id', i)
        aInfoButtonRight.innerHTML = 'Nutrional Info'

        cardContainer.appendChild(divCard);
        divCard.appendChild(imgFish);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(hCardTitle);
        divCardBody.appendChild(pCardText);
        divCardBody.appendChild(divBtnGrop);
        divBtnGrop.appendChild(aInfoButtonLeft);
        divBtnGrop.appendChild(aInfoButtonRight);

        // elementNumber.push(i);
        

        // trigger modal and populate with info
        let elementNumber = aInfoButtonRight.id
        
        aInfoButtonRight.onclick = function () {
            console.log('right btn clicked')
            let cardNumber = aInfoButtonRight.id
            let modalTitle = document.getElementById('modalTitle');
            let modalBodyCal = document.getElementById('data-one');
            let modalBodyCholesterol = document.getElementById('data-two');
            let modalBodyFat = document.getElementById('data-three');
            let modalBodyProtein = document.getElementById('data-four');
            let modalBodySelenium = document.getElementById('data-five');
            let modalBodySodium = document.getElementById('data-six');
            
            modalTitle.innerHTML = data[cardNumber]['Species Name'];
            modalBodyCal.innerHTML ='Calories : ' + data[cardNumber]['Calories'] + ' Kcal';
            modalBodyCholesterol.innerHTML = 'Cholesterol : ' + data[cardNumber]['Cholesterol'];
            modalBodyFat.innerHTML = 'Fat, Total : ' + data[cardNumber]['Fat, Total'];
            modalBodyProtein.innerHTML = 'Protein : ' + data[cardNumber]['Protein'];
            modalBodySelenium.innerHTML = 'Selenium : ' + data[cardNumber]['Selenium'];
            modalBodySodium.innerHTML = 'Sodium : ' + data[cardNumber]['Sodium'];

        }

        //MODAL SLIDER
            
        aInfoButtonLeft.onclick = function () {
            // console.log(data[i]['Image Gallery'][i]['src'])
                if (data[i]["Image Gallery"] != null) {
                for (let x = 0; x < data[i]["Image Gallery"].length; x++) {   
                    console.log(data[i]['Image Gallery'][x]["src"])
                }
            }

            // let divSliderActive = document.getElementById('sliderImg')
            // let imgSliderActive = document.createElement('img');
            // imgSliderActive.setAttribute('src', data[i]['Image Gallery'][i]['src']);
            // imgSliderActive.append(divSliderActive);
        }


    }
    console.log("createCards() run")
    
}
 


// INICIO SEARCH BAR

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    // let filter = searchInput.value.toUpperCase();
    let allNames = document.querySelectorAll('p.card-text');
    const inputValue = searchInput.value.toUpperCase();
    console.log(inputValue);
    console.log(allNames);
    let fishCards = document.getElementsByClassName('card')
    for (let i = 0; i < allNames.length; i++) {
        
        let fishName = allNames[i].textContent
        // console.log(fishCards)
        // console.log(fishName)
        if (fishName.toUpperCase().indexOf(inputValue) > -1) {
            fishCards[i].style.display = 'block';
        } else {
            fishCards[i].style.display = 'none';
        }

    }
})

// FIN SEARCH BAR


// DROPDOWN 

const harvestType = document.getElementById('harvestType');

    harvestType.addEventListener('select', () => {
        console.log('hola')
        
    }) 