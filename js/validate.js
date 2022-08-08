export function validate(input) {
    const typeOfInput = input.dataset.tipo;

    if(validator[typeOfInput]) {
        validator[typeOfInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('formcontato__container--invalido');
        input.parentElement.querySelector('.contato__erro__mensagem').innerHTML = '';
    } else {
        input.parentElement.classList.add('formcontato__container--invalido');
        input.parentElement.querySelector('.contato__erro__mensagem').innerHTML = showErrorMessage(typeOfInput, input);
    }
};

const typesOfError = ['valueMissing', 'typeMismatch'];

const errorMessage = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.Ex.:name@dominio.com'
    },
    assunto: {
        valueMissing: 'O campo de assunto não pode estar vazio.'
    },
    mensagem: {
        valueMissing: 'O campo de mensagem não pode estar vazio.'
    }
};

const validator = {
    birthDate:input => validateBirthDate(input)
};

function showErrorMessage(typeOfInput, input) {
    let message = '';
    typesOfError.forEach(error => {
        if(input.validity[error]) {
            message = errorMessage[typeOfInput][error]
        }
    });

    return message;
};

function validateBirthDate(input) {
    const dateReceived = new Date(input.value);
    let message = '';

    if(!moreThan18(dateReceived)) {
        message = 'Você deve ser maior que 18 anos para se cadastrar.';
    }

    input.setCustomValidity(message);
};

function moreThan18(data) {
    const todaysDate = new Date();
    const dateMore18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dateMore18 <= todaysDate;
};

