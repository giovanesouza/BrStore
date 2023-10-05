// Página Favoritos

const hostName = location.hostname; // Pega a URL do link sem os diretórios

// HEADER -> Indicação da qtd de produtos adicionados à sacola

// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProducts = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };

// Qtd total de itens da sacola
const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProducts();


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
        <div class="product-card" key="${prod.id}">

        <div class="card-product-image">
            <img src="${prod.productImage}" alt="Imagem produto" />
            <i class="bi bi-suit-heart-fill favorite" key="${prod.id}"></i>
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
                <i class="bi bi-bag-fill" key="${prod.id}"></i>
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
        if(removeList) {
            saveFavoriteProducts(updateFavoriteList); // Atualiza lista no localStorage

            setTimeout(() => {
                location.reload(); // Recarrega a página para renderizar a lista atualizada
            }, 100)
        }

    });

});

