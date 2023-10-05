
// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getFavoriteProducts = () => { return JSON.parse(localStorage.getItem('favoritos')) || [] };

// Salva novo produto
const saveFavoriteProducts = (favorite) => { return localStorage.setItem('favoritos', JSON.stringify(favorite)); };



// Elemento card
let cardProduct = document.querySelectorAll('.product-card');


cardProduct.forEach(item => {

    const heart = "bi-suit-heart-fill";
    let key;


    item.addEventListener('click', e => {

        if (e.target.classList.contains(heart) && !e.target.classList.contains('favorite')) {
            key = e.target.getAttribute('key'); // pega a chave do produto

            e.target.classList.add('favorite'); // Add a classe favorite (coração azul)


            // Pega os produtos favoritos salvos no localStorage
            const favoriteProducts = getFavoriteProducts();

            const newFavoriteProduct = allProducts[key]; // Pega os dados do produto a ser salvo

            // console.log(newFavoriteProduct)

            favoriteProducts.push(newFavoriteProduct); // Adiciona produto à lista

            saveFavoriteProducts(favoriteProducts); // atualiza lista no localStorage

        }

        else {

            // Remove a classe favorite (coração volta a ser cinza)
            e.target.classList.remove('favorite');
            key = e.target.getAttribute('key');

        }


    });

});




// Página Favoritos

if (location.href === 'http://127.0.0.1:5500/pages/users/client/favoritos.html') {

    // Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
    const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };

    const updateTotalItems = () => {

        // Pega os produtos add à sacola -> salvos no localStorage
        const bagProducts = getBagProduct();


        const totalBagItemsHeader = document.querySelector('.total-items-bag');
        totalBagItemsHeader.innerHTML = bagProducts.length;
    }

    updateTotalItems();





    // Pega os produtos favoritos salvos no localStorage
    const favoriteProducts = getFavoriteProducts();

    const listProducts = document.querySelector('.favorites-list');
    // console.log("Nenhum produto adicionado!")

    // Operador ternário para renderizar informações na pág de favoritos conforme status do localStorage
    favoriteProducts.length === 0 ? listProducts.insertAdjacentHTML("afterend", `<div>Nenhum produto adicionado!<div>`) :

        favoriteProducts.map((prod, key) => {

            listProducts.innerHTML += `
            <div class="product-card" key="${prod.id}">

            <div class="card-product-image">
                <img src="${prod.productImage}" alt="Imagem produto" />
                <i class="bi bi-suit-heart-fill" key="${prod.id}"></i>
            </div>

            <div class="card-product-info">
                <h4 class="product-name">${prod.productName}</h4>

                <div class="price-before">
                    <span class="old-price">R$ ${prod.oldPrice.toFixed(2)}</span>
                </div>

                <div class="price-now">
                    <h5 class="new-price">R$ ${prod.newPrice.toFixed(2)}</h5>
                </div>

                <button class="add-bag">
                    <i class="bi bi-bag-fill"></i>
                    Adicionar à sacola
                </button>
            </div>

        </div>
            
    `;

        });

}