// Página Favoritos

// HEADER -> Indicação da qtd de produtos adicionados à sacola

// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };


// Qtd total de itens da sacola
const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProduct();

    const totalBagItemsHeader = document.querySelector('.total-items-bag');
    totalBagItemsHeader.innerHTML = bagProducts.length;
}

updateTotalItems();




// Pega lista de favoritos (localStorage)
const getFavoriteProducts = () => { return JSON.parse(localStorage.getItem('favoritos')) || [] };


// Utilizado para atualizar a lista
const saveFavoriteProducts = (favorite) => { return localStorage.setItem('favoritos', JSON.stringify(favorite)); };



// Pega os produtos favoritos salvos no localStorage
const favoriteProducts = getFavoriteProducts();

// Pega o container responsável pela lista dos produtos favoritos
const listProducts = document.querySelector('.favorites-list');



// Operador ternário para renderizar informações na pág de favoritos conforme status do localStorage
favoriteProducts.length === 0 ? listProducts.insertAdjacentHTML("afterend", `<div>Nenhum produto adicionado!<div>`) :

    favoriteProducts.map((prod, key) => {

        listProducts.innerHTML += `
        <div class="product-card" key="${prod.id}" data-category="${prod.category}">

        <div class="card-product-image">
            <img src="${prod.image}" alt="${prod.title}" />
            <i class="bi bi-suit-heart-fill favorite" key="${prod.id}"></i>
        </div>

        <div class="card-product-info">
            <h4 class="product-name">${prod.title.slice(0, 16)}</h4>

            <div class="price-before">
                <span class="old-price">R$ ${(prod.price * 5).toFixed(2)}</span>
            </div>

            <div class="price-now">
                <h5 class="new-price">R$ ${(prod.price * 3).toFixed(2)}</h5>
            </div>

            <button class="add-bag" key="${prod.id - 1}">
                <i class="bi bi-bag-fill"></i>
                Adicionar à sacola
            </button>
        </div>

    </div>`;

    });



const favorites = document.querySelectorAll('.favorite');

let key;
favorites.forEach(item => {

    item.addEventListener('click', () => {

        key = parseInt(item.getAttribute('key'));

        // Monta uma nova lista excluindo o item removido dos favoritos
        let updateFavoriteList = favoriteProducts.filter(item => item.id !== key);

        // Exibe opção para confirmar se realmente deseja remover da lista
        const removeList = confirm(`Você realmente deseja remover este produto da lista?`);

        // Caso clique em ok (true) -> atualiza a lista no localStorage e recarrega a página com a atualização
        if (removeList) {
            saveFavoriteProducts(updateFavoriteList); // Atualiza lista no localStorage

            setTimeout(() => {
                location.reload(); // Recarrega a página para renderizar a lista atualizada
            }, 100)
        }

    });

});




// Pega todos os produtos da API
const getAllProducts = () => {

    const url = `https://fakestoreapi.com/products/`;

    return fetch(url)
        .then(data => data.json())
        .then(products => {

            allProducts.push(...products);  // Salva os produtos da API (objetos) e deixa-os disponíveis p/ aplicação (Usando spread para adicionar produtos individuais)
            // return products;
        })
        .catch((e) => console.log(e))
}



// Salva novo produto
const saveBagProducts = (bag) => { return localStorage.setItem('checkout', JSON.stringify(bag)); };

let allProducts = []; // Guarda todos os produtos da API

getAllProducts();
// Adição de produtos à sacola pela pág favoritos


// Adiciona os ítens à bag
const btnBuy = document.querySelectorAll('.add-bag');

btnBuy.forEach(item => {

    let key;


    item.addEventListener('click', e => {

        // Pega o id do produto
        key = e.target.getAttribute('key');


        // Pega os produtos add à sacola -> salvos no localStorage
        const bagProducts = getBagProduct();


        const addToBag = allProducts[key]; // Pega os dados do produto a ser salvo


        console.log(bagProducts) // Lista os produtos adicionados À sacola

        console.log('Item que será adicionado: ', addToBag)


        // Verifica se o item já foi adicionado à sacola
        let onBag = bagProducts.filter(prod => { return prod.id === addToBag.id });

        console.log('Está na sacola: ', onBag.length);
        
                if (onBag.length === 1) {
                    alert(`O item ${allProducts[key].title} já está na sua sacola!`)
                } else {
        
                    // console.log(addToBag)
        
                    bagProducts.push(addToBag); // Adiciona produto à lista
        
                    saveBagProducts(bagProducts); // atualiza lista no localStorage
        
                    // Exibe msg informando que houve a add do produto à sacola
                    alert(`O item ${allProducts[key].title} foi adicionado à sacola com sucesso!`);
        
                }
     
        updateTotalItems();

    });

});
