// Utilizado para cadastrar o objeto com os dados do usuário
let user = [];

// Utilizado no redirecionamento de página -> cadastro para login ao cadastrar-se
const host = location.origin;

const btnRegister = document.querySelector('[type="submit"]');

btnRegister.addEventListener('click', (e) => {

    e.preventDefault();

    let fullName = document.getElementById('fullname').value;
    let birthday = document.getElementById('birthday').value;
    let cpf = document.getElementById('cpf').value;
    let cel = document.getElementById('cel').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {

        // Se todos os dados obrigatórios forem preenchidos, salva no localStorage
        if (validation(fullName, birthday, cpf, email, password)) {
            register(fullName, birthday, cpf, cel, email, password);

            alert('Cadastro realizado com sucesso! \nRealize o login a seguir.')

            // Redireciona para pág de login
            setTimeout(() => {
                // Quando estiver rodando localmente -> Descomentar o 1º location e comentar o 2º
                // window.location.href = `${host}/pages/public/login.html`;
                window.location.href = `${host}/BrStore/pages/public/login.html`;
            }, 100);
        }

    } catch (e) {
        alert(e.message)
    }

});


const validation = (nome, dataNasc, cpf, email, senha) => {

        // Verificação se é maior de idade se baseando apenas no ano
    // Data de nascimento inserida no form
    let birth = new Date(dataNasc);

    // Data atual
    var currentDate = new Date();

     // Calcule a idade da pessoa
     var age = currentDate.getFullYear() - birth.getFullYear();

    if (nome == "") {
        throw new Error('O campo Nome Completo não pode ser vazio.');
    } else if (dataNasc == "") {
        throw new Error('O campo Data de Nascimento não pode ser vazio.');
        
    } else if (age < 18) {
        throw new Error('Apenas usuários com idade igual ou superior a 18 anos podem se cadastrar no site.');

    } else if (cpf == "") {
        throw new Error('O campo CPF não pode ser vazio.');
    }
    else if (email == "") {
        throw new Error('O campo E-mail não pode ser vazio.');
    }
    else if (senha == "") {
        throw new Error('O campo Senha não pode ser vazio.');
    }

    return true; // Se não houver campos inválidos
}

function register(nome, dataNasc, cpf, telefone, email, senha) {

    // Add objeto no array users
    user.push({
        nome,
        dataNasc,
        cpf,
        telefone,
        email,
        senha
    });

    // Insere o registro no localStorage
    // localStorage.setItem("usuarios", JSON.stringify({users}));
    localStorage.setItem("usuarios", JSON.stringify(user));

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
