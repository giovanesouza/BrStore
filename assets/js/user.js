// Pega todos os registros
let registeredUsers = localStorage.getItem("usuarios");

let userObj = JSON.parse(registeredUsers);


// Informações para login
let userFullName = userObj[0].nome.split(' '); // Corta o nome completo e transforma em um array
let userName = userFullName[0]; // Pega apenas o primeiro nome

let userBirthday = userObj[0].dataNasc;
let userCpf = userObj[0].cpf;
let userCel = userObj[0].telefone;
let userEmail = userObj[0].email;
let userPassword = userObj[0].senha;


// Preenche os dados do usuário nos campos
document.querySelector('#user_name').innerText = userName;

// Pega todos os nomes e concatena-os
for (let fullName of userFullName)
    document.getElementById('fullname').value += `${fullName} `;

document.getElementById('birthday').value = userBirthday;
document.getElementById('cpf').value = userCpf;
document.getElementById('cel').value = userCel;
document.getElementById('email').value = userEmail;
document.getElementById('password').value = userPassword;


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
