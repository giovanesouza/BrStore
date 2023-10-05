
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

        console.log(e.target)
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

