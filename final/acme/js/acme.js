console.log('My Java is working');
var page ='';

//Fetch the Data//
let urlJSON = "/final/acme/js/acme.json";
fetchData(urlJSON);

function fetchData(urlJSON){
fetch(urlJSON)
 .then(function(response) {
   if(response.ok){
     return response.json();
   }
   throw new ERROR('Network response was not OK.');
 })
 .then(function(data){
   //Check the data object was retrieved
   console.log(data);
   //create and hold array
let navItem = [];
for(let i = 0; i < data.Navigation.navData.length; i++){
    navItem[i] = data.Navigation.navData[i];
}

// Call fillNav function
fillNav(navItem);
})
}

function fillNav(navItem){
let ul = document.getElementById("nav_bar");
// Create and fill nav items
for(let i = 0; i < navItem.length; i++){
  //finds place to put stuff
    let li = document.createElement("li");
    //creates text node
    let text = document.createTextNode(navItem[i]);
    //puts text node in li
    li.appendChild(text);
    //makes class on li cordinte with page info
    li.setAttribute("id", "nav" + navItem[i]);
    //puts li in ul to create nav
    ul.appendChild(li);
}
//listeners
clickListeners();
}
function clickListeners(){
  //when clicked will call home 
  document.getElementById("navHome").addEventListener("click", clickHome);

  //when Anvils are clicked, will call navClick() function
  let anvils = document.querySelector("#navAnvils");
  anvils.addEventListener('click', navClick);
  anvils.myParam = 'Anvils';

   //When Explosives is clicked, call navClick() function
   let explosives = document.querySelector("#navExplosives");
   explosives.addEventListener('click', navClick);
   explosives.myParam = 'Explosives';

   // When Decoys is clicked, call navClick() function
    let decoys = document.querySelector("#navDecoys");
    decoys.addEventListener("click", navClick);
    decoys.myParam = "Decoys";

    // When Traps is clicked, call navClick() function
    let traps = document.querySelector("#navTraps");
    traps.addEventListener("click", navClick);
    traps.myParam = "Traps";


}
function clickHome(){
  //Displays home page
  document.getElementById('section1').setAttribute('class', '');
  document.getElementById('sale_items').setAttribute('class', 'hide');
  document.getElementById('page_title').innerHTML = 'Home | Acme Products';
}
function navClick(event){
  fetch(urlJSON)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
      throw new Error('Network response did not work');
    })
    .then(function(data){
      //hide section1 and show new
      document.getElementById('section1').setAttribute('class', "hide");
      document.getElementById('sale_items').setAttribute('class','');

      let d = data[event.target.myParam];
//sets classes to item to display other pages
            document.getElementById("productTitle").innerHTML = d.name;
            document.getElementById("productPicture").setAttribute("src", d.path);
            document.getElementById("productDescription").innerHTML = d.description;
            document.getElementById("pruductManufacturer").innerHTML = d.manufacturer;
            document.getElementById("productReviews").innerHTML = d.reviews + "/5 stars";
            document.getElementById("productPrice").innerHTML = "Price: $" + d.price;
            document.getElementById('page_title').innerHTML = d.name +' | Acme Products';

    })
  }
