var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productCountInput = document.getElementById('productCountInput');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var productContainer;
if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);
}
else {
    productContainer = [];
}


function add() {
    if (checkProductName()) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            count: productCountInput.value,
        }
        productContainer.push(product);
        localStorage.setItem('myProducts', JSON.stringify(productContainer));
        clearForm();
        displayProducts(productContainer);
    }
    else {
        // alert('Sorry')
        productNameInput.placeholder = `Ivalid...`
        productCategoryInput.placeholder = `Ivalid...`
        productPriceInput.placeholder = `Ivalid...`
        productCountInput.placeholder = `Ivalid...`
    }

}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productCountInput.value = "";
}

function displayProducts(productList) {
    var cartona = ``;
    for (var i = 0; i < productList.length; i++) {
        cartona += `
         <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].count}</td>
            <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProducts(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>
         `;
    }
    document.getElementById('tableBody').innerHTML = cartona;
}


function searchProducts(searchTerm) {
    var searchResult = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}

function deleteProducts(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    displayProducts(productContainer);
}
let x = 0;
function setFormForUpdate(updateIndex) {
    x = updateIndex;
    productNameInput.value = productContainer[updateIndex].name;
    productPriceInput.value = productContainer[updateIndex].price;
    productCategoryInput.value = productContainer[updateIndex].category;
    productCountInput.value = productContainer[updateIndex].count;
    addBtn.classList.add('d-none');
    updateBtn.classList.replace('d-none', 'd-inline-block');
}
function updatePro() {
    productContainer[x].name = productNameInput.value;
    productContainer[x].price = productPriceInput.value;
    productContainer[x].category = productCategoryInput.value;
    productContainer[x].count = productCountInput.value;
    addBtn.classList.replace('d-none', 'd-inline-block');
    updateBtn.classList.add('d-none');
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    clearForm();
    displayProducts(productContainer);
}
function checkProductName() {
    let regx = /^\w{2,15}$/
    if (regx.test(productNameInput.value) & regx.test(productPriceInput.value) & regx.test(productCategoryInput.value) & regx.test(productCountInput.value)) {
        return true
    }
    else {
        return false
    }
}