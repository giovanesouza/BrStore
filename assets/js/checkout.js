// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };


// Pega os produtos add à sacola -> salvos no localStorage
const bagProducts = getBagProduct();


// Salva novo produto
const saveBagProducts = (bag) => { return localStorage.setItem('checkout', JSON.stringify(bag)); };


// HEADER -> Indicação da qtd de produtos adicionados à sacola e Aside
const totalBagItemsHeader = document.querySelector('.total-items-bag');
const totalBagItemsAside = document.querySelector('#totalBagQuantityItems');

const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProduct();

    totalBagItemsHeader.innerHTML = bagProducts.length;
    totalBagItemsAside.innerHTML = bagProducts.length;
}
updateTotalItems();



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
            <img src="${prod.image}" alt="img produto" />
            <span class="product-name">${prod.title.slice(0, 12)}</span>
        </td>

        <td> R$ <span class="unit-price">${prod.price.toFixed(2)}</span> </td>

        <td>
            <i class="bi bi-dash-square-fill" key="${prod.id}"></i>
            <span class="item-quantity">1</span>
            <i class="bi bi-plus-square-fill" key="${prod.id}"></i>

        </td>

        <td>
            R$ <span class="total-price-item">${prod.price.toFixed(2)}</span>
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

// Incrementa
incrementItem.forEach((increment, index) => {

    increment.addEventListener('click', e => {

        // Pega a qtd do produto em questão
        let currentQuantity = parseInt(valueTotalItem[index].textContent);

        // console.log('Incrementando...', e.target.getAttribute('key'));
        // console.log('Quantidade atual:', currentQuantity);

        // Incrementa a quantidade
        currentQuantity++;

        // Atualiza o elemento HTML com a nova quantidade
        valueTotalItem[index].textContent = currentQuantity;

        // Atualiza o preço total
        updateTotalPrice();
    });
});


// Decrementa
decrementItem.forEach((decrement, index) => {

    decrement.addEventListener('click', e => {

        // Pega a qtd do produto em questão
        let currentQuantity = parseInt(valueTotalItem[index].textContent);

        //   console.log('Decrementando...', e.target.getAttribute('key'));
        //   console.log('Quantidade atual:', currentQuantity);

        // Verifica se a quantidade é maior que 1 antes de decrementar
        if (currentQuantity > 1) {
            currentQuantity--;

            // Atualiza o elemento HTML com a nova quantidade
            valueTotalItem[index].textContent = currentQuantity;

            // Atualiza o preço total
            updateTotalPrice();
        }


    });
});



// Cupom de desconto

const btnAplyCupom = document.querySelector('#aply-discount');

const CUPOM = '10%OFF'; // Aplica cupom de 15%
let cupomApplied = false;


btnAplyCupom.addEventListener('click', () => {

    // Verifica se o cupom é válido
    // Se retornar true
    if (discout())
        updateTotalPrice(); // Atualiza o preço


    console.log(discout())
});


const discout = () => {
    const inputCupom = document.querySelector('#cupom'); // Pega o elemento
    const cupomValue = (inputCupom.value).toUpperCase(); // Salva o valor do elemento

    if (cupomValue === CUPOM) {
        inputCupom.setAttribute('disabled', 'disabled'); // Caso o cupom seja válido, desabilita o input

        // Cupom válido -> Insere uma borda verde e fundo branco
        setTimeout(() => {
            inputCupom.style.border = '0.2rem solid #28A745';
            inputCupom.style.backgroundColor = '#fff';
        }, 100)

        // console.log(cupomValue);
        return true;

        // Cupom inválido -> borda vermelha e fundo branco
    } else if (cupomValue.length !== 0) {
        // Insere uma borda verde
        setTimeout(() => {
            inputCupom.style.backgroundColor = '#fff';
            inputCupom.style.border = '0.1rem solid #DC3545';
        }, 100)
    }

    return false;

}



// Função para atualizar o preço total com base na quantidade
function updateTotalPrice() {

    let totalPrice = 0;

    let valueTotalItem = document.querySelectorAll('span.item-quantity');
    let priceTotalItem = document.querySelectorAll('span.total-price-item');

    for (let i = 0; i < bagProducts.length; i++) {

        let quantity = parseInt(valueTotalItem[i].textContent);
        let price = parseFloat(bagProducts[i].price);
        let totalItemPrice = quantity * price;

        totalPrice += totalItemPrice;

        // Atualiza o elemento HTML com o novo preço total do item
        priceTotalItem[i].textContent = totalItemPrice.toFixed(2);
    }

    if (discout()) {
        const discountAmount = (totalPrice * (10 / 100)).toFixed(2); // valor do desconto
        totalPrice -= parseFloat(discountAmount);

        // Renderiza o valor do desconto na tela
        document.querySelector('#discount-value').innerHTML = discountAmount;

        cupomApplied = true;
    }


    // Atualiza o valor de itens (Header - bag - e Aside - info. de pagamento - )
    let totalItem = 0;

    document.querySelectorAll('span.item-quantity').forEach(item => {
        totalItem += parseInt(item.textContent); // Faz a soma do total de todos os itens
    })

    totalBagItemsHeader.innerHTML = totalItem;
    totalBagItemsAside.innerHTML = totalItem;
    // console.log(totalItem)


    // Atualiza os elementos HTML com os novos valores
    subtotal.innerHTML = totalPrice.toFixed(2);
    totalPriceItem.innerHTML = totalPrice.toFixed(2);
}


updateTotalPrice();




const trashIcon = document.querySelectorAll('.bi-trash3-fill');
let key;

trashIcon.forEach(removeProd => {

    removeProd.addEventListener('click', () => {

        key = parseInt(removeProd.getAttribute('key'));
        console.log(key)


        // Monta uma nova lista excluindo o item removido da sacola
        let updateBagList = bagProducts.filter(item => item.id !== key);

        const removeList = confirm(`Você realmente deseja remover este produto da sacola?`);

        // Caso clique em ok (true) -> atualiza a lista no localStorage e recarrega a página com a atualização
        if (removeList) {
            saveBagProducts(updateBagList); // Atualiza lista no localStorage

            setTimeout(() => {
                location.reload(); // Recarrega a página para renderizar a lista atualizada
            }, 100)
        }

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

    if (cardType !== "" && totalPriceItem.innerText !== "0.00") {

        alert(`Seu pagamento com o ${cardType} está sendo processado...`);
        alert('Compra finalizada com sucesso!');

        // Atualiza a list da bag (checkout) no localStorage
        saveBagProducts([]);

        window.location.reload(); // Recarrega a página

    } else if (totalPriceItem.innerText === "0.00") {
        alert('Seu carrinho está vazio. \nAdicione produtos para dar continuidade ao pagamento.');

    } else {
        alert('Escolha a opção de pagamento.');
    }

});

