// Foi implementado no arquivo allProducts - CÓDIGO V.1 - APENAS ADD AOS FAVORITOS

/*
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

        console.log('ok')

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

*/



/*

// CÓDIGO V.2 - ADD e remove da lista favoritos pela pág home

// Add de produto aos favoritos

        // Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
        const getFavoriteProducts = () => { return JSON.parse(localStorage.getItem('favoritos')) || [] };

        // Salva novo produto
        const saveFavoriteProducts = (favorite) => { return localStorage.setItem('favoritos', JSON.stringify(favorite)); };


        // Elemento card
        let cardProduct = document.querySelectorAll('.product-card');


        cardProduct.forEach(item => {

            const heart = "bi-suit-heart-fill";
            let key;

            // Pega os produtos favoritos salvos no localStorage
            const favoriteProducts = getFavoriteProducts();

            item.addEventListener('click', e => {

                // console.log(e.target)

                if (e.target.classList.contains(heart) && !e.target.classList.contains('favorite')) {
                    key = e.target.getAttribute('key'); // pega a chave do produto

                    e.target.classList.add('favorite'); // Add a classe favorite (coração azul)


                    const newFavoriteProduct = allProducts[key]; // Pega os dados do produto a ser salvo


                    // Verifica se o item já foi adicionado aos favoritos

                    let onFavorite = favoriteProducts.filter(prod => { return prod.id === newFavoriteProduct.id });

                    // console.log('Está na sacola: ', onBag.length);

                    if (onFavorite.length === 1) {
                        alert(`O item ${allProducts[key].title} já está nos favoritos!`);
                        
                    } else {

                        // console.log(newFavoriteProduct)

                        favoriteProducts.push(newFavoriteProduct); // Adiciona produto à lista

                        saveFavoriteProducts(favoriteProducts); // atualiza lista no localStorage

                        // Exibe msg informando que houve a add do produto à sacola
                        alert(`O item ${allProducts[key].title} foi adicionado aos favoritos com sucesso!`);

                    }



                } else {

                    const removeFavorite = allProducts[key]; // Pega os dados do produto a ser removido


                    // Monta uma nova lista excluindo o item removido dos favoritos
                    let updateFavoriteList = favoriteProducts.filter(item => item.id !== removeFavorite.id);


                    //  atualiza a lista no localStorage e recarrega a página com a atualização
                    saveFavoriteProducts(updateFavoriteList); // Atualiza lista no localStorage

                 
                    // Remove a classe favorite (coração volta a ser cinza)
                    e.target.classList.remove('favorite');

                }


            });

        });

*/