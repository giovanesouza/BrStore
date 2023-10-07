const getLocation = () => JSON.parse(localStorage.getItem('city')) || [];

const city = getLocation();

let inputCEP = document.querySelector('#cep');


// Verifica se o usuário já tem um CEP inserido 
if (city.length === 0)
    inputCEP.value = 'Informe o seu CEP';
else
    inputCEP.value = city;



inputCEP.addEventListener('keyup', (e) => {

    let cep = inputCEP.value; // Pega o valor digitado no input cep
    console.log(cep)

    if (cep.length === 9) {
        searchAddress(cep); // Busca o endereço pelo CEP
    }


})

// Faz a requisição na API VIACEP
const searchAddress = (cep) => {
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(res => res.json())
        .then(FullAddres => {
           
            showAddress(FullAddres); // Exibe mensagem de sucesso ou erro
        });
}


function showAddress(data) {

    if (data.erro) {
        alert('CEP não localizado!');

    } else {

        inputCEP.value = city;

        localStorage.setItem('city', JSON.stringify(data.localidade))
        window.location.reload(); // recarrega a pág para atualizar a cidade no header (mesmo local onde o cep é inserido)
    }

}


