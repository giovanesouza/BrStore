const listProducts = document.querySelector('.products-list');

const loadProducts = () => {

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(allProducts => {
            console.log(allProducts)

            // Listagem dos produtos na página principal (index)
            allProducts.map((prod, key) => {

                listProducts.innerHTML += `
                
                    <div class="product-card" key="${prod.id}">
            
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

        });
}

loadProducts()




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