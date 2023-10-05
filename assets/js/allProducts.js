const allProducts = [

    {
        id: 1,
        productImage: "http://127.0.0.1:5500/assets/images/shirt.jpg",
        productName: "Camisa Masculina",
        oldPrice: 45.00,
        newPrice: 30.00
    },
    {
        id: 2,
        productImage: "http://127.0.0.1:5500/assets/images/dress.jpg",
        productName: "Vestido",
        oldPrice: 80.00,
        newPrice: 60.00
    },
    {
        id: 3,
        productImage: "http://127.0.0.1:5500/assets/images/joia.jpg",
        productName: "Jóia",
        oldPrice: 500.99,
        newPrice: 350.00
    },
    {
        id: 4,
        productImage: "http://127.0.0.1:5500/assets/images/cel.png",
        productName: "Celular",
        oldPrice: 1500.00,
        newPrice: 999.00
    }


];

const listProducts = document.querySelector('.products-list');

// Listagem dos produtos na página principal (index)
allProducts.map((prod, key) => {

    listProducts.innerHTML += `
    
        <div class="product-card" key="${prod.id}">

        <div class="card-product-image">
            <img src="${prod.productImage}" alt="Imagem produto" />
            <i class="bi bi-suit-heart-fill" key="${key}"></i>
        </div>

        <div class="card-product-info">
            <h4 class="product-name">${prod.productName}</h4>

            <div class="price-before">
                <span class="old-price">R$ ${prod.oldPrice.toFixed(2)}</span>
            </div>

            <div class="price-now">
                <h5 class="new-price">R$ ${prod.newPrice.toFixed(2)}</h5>
            </div>

            <button class="add-bag" key="${key}">
                <i class="bi bi-bag-fill"></i>
                Adicionar à sacola
            </button>
        </div>

    </div>
    
    `;

});





// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };

// Salva novo produto
const saveBagProducts = (bag) => { return localStorage.setItem('checkout', JSON.stringify(bag)); };



let totalItems = 0;


// Add produto à sacola
const btnBuy = document.querySelectorAll('.add-bag');

btnBuy.forEach(item => {

    let key;


    item.addEventListener('click', e => {

        // Pega o id do produto
        key = e.target.getAttribute('key');

        // Pega os produtos add à sacola -> salvos no localStorage
        const bagProducts = getBagProduct();

        const addToBag = allProducts[key]; // Pega os dados do produto a ser salvo

        // console.log(addToBag)

        bagProducts.push(addToBag); // Adiciona produto à lista

        saveBagProducts(bagProducts); // atualiza lista no localStorage

        // Exibe msg informando que houve a add do produto à sacola
        alert(`O item ${allProducts[key].productName} foi adicionado à sacola com sucesso!`);

        updateTotalItems();

    });

});


const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProduct();

    const totalBagItemsHeader = document.querySelector('.total-items-bag');
    totalBagItemsHeader.innerHTML = bagProducts.length;
}

updateTotalItems();