function maskCel(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }

    input.value = value;
}


function maskCPF(input) {
    let value = input.value.replace(/\D/g, '');

    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');

    input.value = value;
}

function maskCEP(input) {
    let value = input.value.replace(/\D/g, '');

    value = value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');

    input.value = value;
}