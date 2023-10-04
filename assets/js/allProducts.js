const allProducts = [

    {
        id: 1,
        productImage: "http://127.0.0.1:5500/assets/images/shirt.jpg",
        productName: "Camisa Masculina",
        oldPrice: "R$ 45,00",
        newPrice: "R$ 30,00"
    },
    {
        id: 2,
        productImage: "http://127.0.0.1:5500/assets/images/dress.jpg",
        productName: "Vestido",
        oldPrice: "R$ 80,00",
        newPrice: "R$ 60,00"
    },
    {
        id: 3,
        productImage: "http://127.0.0.1:5500/assets/images/joia.jpg",
        productName: "Jóia",
        oldPrice: "R$ 500,99",
        newPrice: "R$ 350,00"
    },
    {
        id: 4,
        productImage: "http://127.0.0.1:5500/assets/images/cel.png",
        productName: "Celular",
        oldPrice: "R$ 1500,00",
        newPrice: "R$ 999,00"
    }


];


const listProducts = document.querySelector('.products-list');

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
                <span class="old-price">${prod.oldPrice}</span>
            </div>

            <div class="price-now">
                <h5 class="new-price">R${prod.newPrice}</h5>
            </div>

            <button class="add-bag">
                <i class="bi bi-bag-fill"></i>
                Adicionar à sacola
            </button>
        </div>

    </div>
    
    `;

});