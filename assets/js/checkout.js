// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };


// Pega os produtos add à sacola -> salvos no localStorage
const bagProducts = getBagProduct();


// Salva novo produto
const saveBagProducts = (bag) => { return localStorage.setItem('checkout', JSON.stringify(bag)); };


// HEADER -> Indicação da qtd de produtos adicionados à sacola e Aside

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
            <i class="bi bi-dash-square-fill" key="${prod.id}"></i>
            <span class="item-quantity">1</span>
            <i class="bi bi-plus-square-fill" key="${prod.id}"></i>

        </td>

        <td>
            R$ <span class="total-price">${prod.newPrice.toFixed(2)}</span>
        </td>


        <td>
            <i class="bi bi-trash3-fill" key="${prod.id}"></i>
        </td>
        </tr>
`;

    });




// Incremento e decremento da qtd de produtos
let incrementItem = document.querySelectorAll('.bi-plus-square-fill');
let decrementItem = document.querySelectorAll('.bi-dash-square-fill');
let valueTotalItem = document.querySelectorAll('span.item-quantity');
let quantityItem = valueTotalItem;


// Incrementa
incrementItem.forEach(increment => {

    let key;

    increment.addEventListener("click", e => {

        key = parseInt(e.target.getAttribute('key'));

        console.log('Increment', key)

        quantityItem = parseInt(quantityItem[key - 1].textContent);

        // console.log(quantityItem)

    });

});


// Decrementa
decrementItem.forEach(decrement => {

    let key;

    decrement.addEventListener("click", e => {

        key = parseInt(e.target.getAttribute('key'));

        console.log('Decrement', key)

        quantityItem = parseInt(quantityItem[key - 1].textContent);
        console.log(quantityItem)

        if (quantityItem[key] <= 1) {
            alert("A quantidade de produto não pode ser menor que 1.")
        } else {
            quantityItem--;
            valueTotalItem.innerHTML = quantityItem;
        }


    });

});






const trashIcon = document.querySelectorAll('.bi-trash3-fill');
let key;

trashIcon.forEach(removeProd => {

    removeProd.addEventListener('click', () => {

        key = parseInt(removeProd.getAttribute('key'));
        console.log(key)


        // Monta uma nova lista excluindo o item removido dos favoritos
        let updateBagList = bagProducts.filter(item => item.id !== key);


        // Atualiza a list da bag (checkout) no localStorage
        saveBagProducts(updateBagList);

        setTimeout(() => {
            location.reload(); // Recarrega a página para renderizar a lista atualizada
        }, 100)



        /*
              // Exibe opção para confirmar se realmente deseja remover da lista
              const removeList = confirm(`Você realmente deseja remover este produto da lista?`);
      
              // Caso clique em ok (true) -> atualiza a lista no localStorage e recarrega a página com a atualização
              if(removeList) {
                  saveFavoriteProducts(updateFavoriteList); // Atualiza lista no localStorage
      
                  setTimeout(() => {
                      location.reload(); // Recarrega a página para renderizar a lista atualizada
                  }, 100)
              }
      */

    });

});



// Finalização da compra

const btnFinalizePurchase = document.querySelector('form#payment-method button[type=submit]');
let paymentMethod = document.querySelectorAll('#payment-method [name="payment_method"]');


let cardType = ""; // Vai armazenar o tipo de pagamento

paymentMethod.forEach(inputRadio => {

    inputRadio.addEventListener('change', e => {

        cardType = e.target.value;

    });

});


btnFinalizePurchase.addEventListener('click', (e) => {

    e.preventDefault();

    if (cardType !== "") {

        alert(`Seu pagamento com o ${cardType} está sendo processado...`);
        alert('Compra finalizada com sucesso!');

        // Atualiza a list da bag (checkout) no localStorage
        saveBagProducts([]);

        window.location.reload(); // Recarrega a página

    } else {
        alert('Escolha a opção de pagamento.');
    }

});

