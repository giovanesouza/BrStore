const btnSendResume = document.querySelector('[type="submit"]');

btnSendResume.addEventListener('click', (e) => {

    e.preventDefault();

    let fullName = document.getElementById('fullname');
    let position = document.getElementById('position');
    let resume = document.getElementById('resume')


    try {

        // Se todos os dados obrigatórios forem preenchidos, exibe mensagem de sucesso
        if (validation(fullName.value, position.value, resume.value)) {
            alert('Currículo enviado com sucesso!');
        }
        
        // Limpa os dados após serem enviados
        fullName.value = '';
        position.value = '';
        resume.value = '';

    } catch (e) {
        alert(e.message)
    }



});


const validation = (nomeCompleto, cargo, curriculo) => {

    if (nomeCompleto == "") {
        throw new Error('O campo Nome Completo não pode ser vazio.');
    } else if (cargo == "") {
        throw new Error('O campo Cargo não pode ser vazio.');
    } else if (curriculo == "") {
        throw new Error('O campo Curríulo não pode ser vazio.');
    }


    return true; // Se não houver campos inválidos
}
