console.log('My Java is working');
var page ='';


//Fetching the Data//
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
// Create an array to hold nav items
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
//engage listeners
clickListeners();
}
function clickListeners(){
  //when clicked will call home function
  document.getElementById("navHome").addEventListener("click", clickHome);

  //when clicked will call navClick() function
  let anvils = document.querySelector("#navAnvils");//This selects the css selector 'navAnvils' that we made with JS above
  anvils.addEventListener('click', navClick);
  anvils.myParam = 'Anvils';

   //when clicked will call navClick() function
   let explosives = document.querySelector("#navExplosives");//This selects the css selector 'navExplosives' that we made with JS above
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
  document.getElementById('content_title').setAttribute('class', '');
  document.getElementById('sale_items').setAttribute('class', 'hide');
  document.getElementById('pageTitle').innerHTML = 'Home | Acme Products';
}
function navClick(event){
  fetch(URL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
      throw new Error('Network response was not OK.');
    })
    .then(function(data){
      //hide mainContent and show new
      document.getElementById('content_title').setAttribute('class', "hide");
      document.getElementById('sale_items').setAttribute('class','');

      //Set t to data.event's parameter passed from click event (Explosives, Traps, etc)
      let o = data[event.target.myParam];
      let q =data
//sets classes to item to display other pages
            document.getElementById("productTitle").innerHTML = o.name;
            document.getElementById("productPicture").setAttribute("src", o.path);
            document.getElementById("productDescription").innerHTML = o.description;
            document.getElementById("productManufacturer").innerHTML = o.manufacturer;
            document.getElementById("productReviews").innerHTML = o.reviews + "/5 stars";
            document.getElementById("productPrice").innerHTML = "Price: $" + o.price;
            document.getElementById('page_title').innerHTML = o.name +' | Acme Products';

    })
  }
