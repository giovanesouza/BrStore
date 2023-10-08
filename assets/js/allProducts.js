const listProducts = document.querySelector('.products-list');

let allProducts = []; // Guarda todos os produtos da API

// Pega todos os produtos
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


// Pega os produtos por categoria
/*
const getProductsByCategory = (category) => {

    const url = `https://fakestoreapi.com/products/category/${category}`;

    return fetch(url)
        .then(data => data.json())
        .then(products => {
            
            return products;

            // allProducts.push(...products); // Salva os produtos da API (objetos) e deixa-os disponíveis p/ aplicação (Usando spread para adicionar produtos individuais)

        })
        .catch(e => console.log(e))

}

*/

const renderProducts = async (category) => {

    listProducts.innerHTML = '';

    let inputCategorias = document.querySelectorAll(`[data-category]`);

    try {

        console.log('aguardando requisição...')

        // const categoria = await getProductsByCategory(category); // Aguarda o resultado da requisição e guarda as informações

        const allProd = await getAllProducts(); // Aguarda o resultado da requisição e guarda as informações

        // console.log(`O nome da categoria é: ${category}`)

        inputCategorias.forEach(cat => {

            let category;

            cat.addEventListener('change', e => {

                category = e.target.getAttribute('data-category'); // Pega o nome da categoria

                let AllProd = document.querySelectorAll('div.product-card');
                // let AllCategories = AllProd.getAttribute('data-category');


                let isChecked = e.target.checked; // Verifica se está checado


                // Muda o nome da categoria conforme input checked (Como o nome é em inglÊs, será inserido um em português)
                let categoryName = category;
                let nameCat;

                switch (categoryName) {
                    case `electronics`:
                        nameCat = 'Eletrônicos';
                        break;
                    case `jewelery`:
                        nameCat = 'Jóias';
                        break;
                    case `men's clothing`:
                        nameCat = 'Roupas Masculinas';
                        break;
                    case `women's clothing`:
                        nameCat = 'Roupas Femininas';
                        break;
                }


                // Percorre os produtos para pegar o atributo data-category e comparar com o valor do data-category do input
                for (let i = 0; i <= AllProd.length; i++) {

                    // console.log(AllProd[i].getAttribute('data-category'))

                    let categ = AllProd[i].getAttribute('data-category');


                    if (categ !== category) {

                        if (isChecked) {
                            document.querySelector('h1').innerHTML = `${nameCat}`;
                            AllProd[i].style.display = 'none'; // Todos os produtos que sejam != ao checked somem da tela
                            console.log(isChecked);
                        } else {
                            document.querySelector('h1').innerHTML = `Nossos produtos`;
                            AllProd[i].style.display = 'block';
                        }


                    }


                }


            });



        });



        // Listagem dos produtos na página principal (index)
        allProducts.map((prod, key) => {

            listProducts.innerHTML += `
            
                <div class="product-card" key="${prod.id}" data-category="${prod.category}">
        
                <div class="card-product-image">
                    <img src="${prod.image}" alt="${prod.title}" />
                    <i class="bi bi-suit-heart-fill" key="${key}"></i>
                </div>
        
                <div class="card-product-info">
                <!-- .slice(0, 16): Padroniza o tamanho dos títulos -->
                    <h4 class="product-name">${prod.title.slice(0, 16)}</h4>
        
                    <div class="price-before">
                        <span class="old-price">R$ ${(prod.price * 5).toFixed(2)}</span>
                    </div>
        
                    <div class="price-now">
                        <h5 class="new-price">R$ ${(prod.price * 3).toFixed(2)}</h5>
                    </div>
        
                    <button class="add-bag" key="${key}">
                        <i class="bi bi-bag-fill"></i>
                        Adicionar à sacola
                    </button>
                </div>
        
            </div>
            
            `;

        });


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


                // Verifica se o item já foi adicionado à sacola
                let onBag = bagProducts.filter(prod => { return prod.id === addToBag.id });

                // console.log('Está na sacola: ', onBag.length);

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




    } catch (e) {
        console.log(e);
    }


}


// Carrega todos os produtos na página
renderProducts();



// Pega todos os produtos salvos no localStorage, caso não exista retorna um array vazio
const getBagProduct = () => { return JSON.parse(localStorage.getItem('checkout')) || [] };

// Salva novo produto
const saveBagProducts = (bag) => { return localStorage.setItem('checkout', JSON.stringify(bag)); };



let totalItems = 0;


const updateTotalItems = () => {
    // Pega os produtos add à sacola -> salvos no localStorage
    const bagProducts = getBagProduct();

    const totalBagItemsHeader = document.querySelector('.total-items-bag');
    totalBagItemsHeader.innerHTML = bagProducts.length;
}

updateTotalItems();
