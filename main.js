const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // 7 a 14 numeros.
}
const campos  = {
    user: false,
    name: false,
    password: false,
    correo: false,
    telefono: false

}
const validardatos = (e) => {
    switch (e.target.name){
        case "usuario":
        validarCampo(expresiones.usuario, e.target, 'users');
        break;
        case "name":
            validarCampo(expresiones.nombre, e.target, 'name');
        
        break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword();
        break;
        case "password2":
            validarPassword();
            
           
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}

const validarCampo = (expresion,input,campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`group__${campo}`).classList.remove('form__group-incorret');
        document.getElementById(`group__${campo}`).classList.add('form__group-corret');
        document.querySelector(`#group__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${campo} .form__input-err`).classList.remove('form__input-err-active');
        campos[campo] = true;

    }else{
        document.getElementById(`group__${campo}`).classList.add('form__group-incorret');
        document.getElementById(`group__${campo}`).classList.remove('form__group-corret');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${campo} .form__input-err`).classList.add('form__input-err-active');
        campos[campo] = false;
    }
}
const validarPassword = ()=>{
    const input1 = document.getElementById('password');
    const input2 = document.getElementById('password2');

    if(input1.value !== input2.value){

        document.getElementById(`group__password2`).classList.add('form__group-incorret');
        document.getElementById(`group__password2`).classList.remove('form__group-corret');
        document.querySelector(`#group__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#group__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__password2 .form__input-err`).classList.add('form__input-err-active');
        campos['password'] = false;

    }else{
        document.getElementById(`group__password2`).classList.remove('form__group-incorret');
        document.getElementById(`group__password2`).classList.add('form__group-corret'); 
        document.querySelector(`#group__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#group__password2 .form__input-err`).classList.remove('form__input-err-active');
        campos['password'] = true;

    }
    /*
    
    
    */ 

}
    inputs.forEach((input)=>{
    input.addEventListener('keyup', validardatos);
    input.addEventListener('blur',validardatos);
    });

    form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const terminos = document.getElementById('terminos');

    if (campos.users && campos.name && campos.password && campos.correo && campos.telefono && terminos.checked){
    form.reset();
    
    document.getElementById('form__message-exito').classList.add('form__message-exito-active');
    setTimeout(()=>{
        document.getElementById('form__message-exito').classList.remove('form__message-exito-active');
    },5000);

    document.querySelectorAll('.form__group-corret').forEach((icono)=>{
        icono.classList.remove('form__group-corret');
    });
    }else{
        document.getElementById('form__message').classList.add('form__message-active');
        setTimeout(()=>{
            document.getElementById('form__message').classList.remove('form__message-active');
        },5000)
    }

});

