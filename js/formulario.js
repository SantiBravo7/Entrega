const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
const campos = {
    nombre : false,
    usuario:false,
    password:false,
    correo:false
}

const validarFormulario = (e) =>{
    switch(e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
    }
}


const validarCampo = (expresion, input, campo) => {
            if (expresion.test(input.value)){
                document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
                campos[campo] = true;
            } else{
                document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
                document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
                document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
                campos[campo] = false;
}
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario );
})

formulario.addEventListener('submit', (e)=> {
    e.preventDefault();

    
    if(campos.nombre && campos.usuario && campos.password && campos.correo)   {
        formulario.reset();


        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 2000);
        
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
        icono.classList.remove('formulario__grupo-correcto')
        })
    }else {
        document.getElementById('grupo__mensaje').classList.add('formulario__mensaje-activo')
    }
});


