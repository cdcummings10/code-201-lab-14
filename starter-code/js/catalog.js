/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i = 0; i < Product.allProducts.length; i++) {
    var newOption = document.createElement('option');
    newOption.textContent = Product.allProducts[i].name;
    newOption.value = Product.allProducts[i].name;
    selectElement.appendChild(newOption);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(e) {
  e.preventDefault();

  var itemChosen = e.target.items.value;
  var quantity = e.target.quantity.value;

  // Do all the things ...
  addSelectedItemToCart(itemChosen, quantity);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

//  Add the selected item and quantity to the cart
function addSelectedItemToCart(itemSelected, quantity) {
  // suss out the item picked from the select list
  for (var i = 0; i < Product.allProducts.length; i++){
    if (itemSelected === Product.allProducts[i].name){
      var choice = Product.allProducts[i];
    }
  }
  //  get the quantity
  //  using those, add one item to the Cart
  cart.addItem(choice, quantity);
}

// : Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCount = document.getElementById('itemCount');
  var savedCart = JSON.parse(localStorage.getItem('cart'));
  
  var totalItems = 0;
  for (var i = 0; i < savedCart.length; i++){
    totalItems += parseInt(savedCart[i].quantity);
  }

  itemCount.textContent = 'Items in Cart: ' + totalItems;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var itemCount = document.getElementById('cartContents');
  while (itemCount.firstChild){
    itemCount.removeChild(itemCount.firstChild);
  }

  var savedCart = JSON.parse(localStorage.getItem('cart'));
  // TODO: Add a new element to the cartContents div with that information
  var elTable = document.createElement('table');
  for (var i = 0; i < savedCart.length; i++){
    var elTr = document.createElement('tr');
    var img = document.createElement('img');
    img.src = savedCart[i].product.filePath;
    elTr.appendChild(img);

    var elTd1 = document.createElement('td');
    elTd1.textContent = savedCart[i].product.name;
    elTr.appendChild(elTd1);
    var elTd2 = document.createElement('td');
    elTd2.textContent = savedCart[i].quantity;
    elTr.appendChild(elTd2);
    elTable.appendChild(elTr);
  }
  itemCount.appendChild(elTable);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
