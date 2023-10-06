// Pega todos os usuários salvos no localStorage, caso não exista retorna um array vazio
const getRegisteredUsers = () => { return JSON.parse(localStorage.getItem("usuarios")) || [] };


// Pega os usuários salvos no localStorage
const userObj = getRegisteredUsers();


// Pega as informações de login do usuário do localStorage para comparar com os dados do form
let userEmail;
let userPassword;

if(userObj.length !== 0) {
    // Informações para login
    userEmail = userObj[0].email;
    userPassword = userObj[0].senha;
}


const btnLogar = document.querySelector('[type="submit"]');

btnLogar.addEventListener('click', (e) => {

    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {

        // Se todos os dados obrigatórios forem preenchidos, salva no localStorage
        if (validation(email, password)) {

            if(email === userEmail && password === userPassword) {
                alert('Usuário validado com sucesso!')
                
                // Redireciona para pág do usuário logado
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/pages/users/client/user.html";
                }, 1000);

            } else {
                
                alert('Usuário não localizado!');
            }


        }

    } catch (e) {
        alert(e.message)
    }

});


const validation = (email, senha) => {

    if (email == "") {
        throw new Error('O campo E-mail não pode ser vazio.');
    }
    else if (senha == "") {
        throw new Error('O campo Senha não pode ser vazio.');
    }

    return true; // Se não houver campos inválidos
}



// Exibe/Oculta senha
let iconShowPassword = document.querySelector('.input-area .bi');

iconShowPassword.addEventListener('click', () => {

    let inputType = document.getElementById('password');

    if (inputType.getAttribute('type') === 'password') {

        inputType.setAttribute('type', 'text');

        iconShowPassword.classList.remove('bi-eye-slash-fill');
        iconShowPassword.classList.add('bi-eye-fill');

    } else {

        inputType.setAttribute('type', 'password');
        iconShowPassword.classList.remove('bi-eye-fill');
        iconShowPassword.classList.add('bi-eye-slash-fill');

    }

});