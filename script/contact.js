const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const error = document.getElementById('error');
const charCount = document.getElementById('char-count');
const form = document.getElementById('contact-form');
const formErrors = document.getElementById('form-errors');

const nameRegExp = /^[A-Za-z\s]+$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

let form_errors = [];

function addError(field, mes){
    form_errors.push({field: field, error: mes});
    error.innerText = mes;
}

function updateCharCount() {
    const maxChars = message.maxLength;
    const currLength = message.value.length;
    const remainingChars = maxChars - currLength;
    charCount.innerText = `${currLength}/${maxChars}`;

    if(remainingChars < 0) {
        addError('message', 'You have exceeded the maximum character limit');
    } 
    else {
        error.innerText = '';
    }
}

nameInput.addEventListener('input', function(){
    if(nameInput.value.length == 0){
        addError('name', 'Please enter your name');
    }
    else if(!nameRegExp.test(nameInput.value)){
        addError('name', 'Name must contain only letters');
    } else{
        error.innerText = '';
    }
});

email.addEventListener('input', function(){
    if(email.value.length == 0){
        addError('email', 'Please enter your email');
    } else{
        error.innerText = '';
    }
});

message.addEventListener('input', updateCharCount);

message.addEventListener('input', function(){
    if(message.value.length == 0){
        console.log(message.value.length);
        addError('message', 'Please add a message');
    } else{
        error.innerText = '';
    }
});

updateCharCount();

form.addEventListener('submit', function(e){
    if(!emailRegExp.test(email.value)){
        addError('email', 'Please enter a valid email');
    } else{
        error.innerText = '';
    }

    formErrors.value = JSON.stringify(form_errors);
});