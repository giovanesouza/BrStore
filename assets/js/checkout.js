// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };


// Pega os produtos add à sacola -> salvos no localStorage
const bagProducts = getBagProduct();



const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProduct();

    const totalBagItemsHeader = document.querySelector('.total-items-bag');
    const totalBagItemsAside = document.querySelector('#totalBagQuantityItems');
    totalBagItemsHeader.innerHTML = bagProducts.length;
    totalBagItemsAside.innerHTML = bagProducts.length;
}

updateTotalItems();




let totalPrice = 0;

for (let bag of bagProducts) {

    totalPrice += bag.newPrice;
}


const subtotal = document.querySelector('#subtotal');
const totalPriceItem = document.querySelector('#totalPriceItem');

subtotal.innerHTML = totalPrice.toFixed(2);
totalPriceItem.innerHTML = totalPrice.toFixed(2);




const listItems = document.querySelector('#list-items tbody');


// Renderização condicional: Se não houver itens na sacola, exibe a msg abaixo, senão exibe-os

bagProducts.length === 0 ? listItems.insertAdjacentHTML("afterend",
    `<tr>
        <td colspan="5" style="padding-top: 2rem;">
            Sua sacola está vazia.
        </td>
    </tr>`) : bagProducts.map((prod, key) => {

        // console.log(item)

        listItems.innerHTML += `
        <tr key="${prod.id}">
        <td class="product-img-name">
            <img src="${prod.productImage}" alt="img produto" />
            <span class="product-name">${prod.productName}</span>
        </td>

        <td> R$ <span class="unit-price">${prod.newPrice.toFixed(2)}</span> </td>

        <td>
            <i class="bi bi-dash-square-fill"></i>
            <span class="item-quantity">1</span>
            <i class="bi bi-plus-square-fill"></i>

        </td>

        <td>
            R$ <span class="total-price">${prod.newPrice.toFixed(2)}</span>
        </td>


        <td>
            <i class="bi bi-trash3-fill" key="${key}"></i>
        </td>
        </tr>
`;

    });



let addItem = document.querySelectorAll('.bi-plus-square-fill');
let removeItem = document.querySelectorAll('.bi-dash-square-fill');
let valueTotalItem = document.querySelectorAll('.item-quantity');

let quantityItem;


for (let i = 0; i < removeItem.length; i++) {

    let quantityItem = parseInt(valueTotalItem[i].innerText);

    removeItem[i].addEventListener('click', () => {

        // console.log(quantityItem)
        if (quantityItem > 1) {
            valueTotalItem[i].innerHTML -= 1;
        }

    });

}









// Remove o produto da bag (Apenas do HTML)
const trashIcon = document.querySelectorAll('.bi-trash3-fill');

trashIcon.forEach(item => {


    let bagProduct = document.querySelectorAll('tbody tr');
    let key; // Salva a chave do icon clicado


    item.addEventListener('click', (e) => {

        key = e.target.getAttribute('key');

        bagProduct[key].remove(); // Remove o item 

    });

});





