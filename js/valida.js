export function limpiarErrores(errores, errorContainer) {
  // Limpiar mensajes de error anteriores
  errores.innerHTML = "";
  errorContainer.style.display = "none";
}

export function limpiarStorage(){
  sessionStorage.setItem("nombreUsuario", "");
  sessionStorage.setItem("idUsuario", "");
}

function mostrarError(mens, campo) {
  let errorMessage = document.getElementById("errorMessage");
  let errorContainer = document.getElementById("error");
  errorMessage.innerHTML = mens;
  errorContainer.style.display = "flex";
  errorContainer.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
  campo.focus();
}

export function validaObligatorio(campo) {
  let correcto = true;
  //var nomexpreg = /^([a-zA-Z\s-]{2,15})$/; //entre 2 y 15 carácteres
  if (campo.value === "" || campo.value === null) {
    mostrarError("Debe introducir " + campo.name, campo);
    correcto = false;
  }
  return correcto;
}

export function validaEmail(campo) {
  let correcto = true;
  var emailexpreg = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  if (!emailexpreg.test(campo.value)) {
    mostrarError("Debe introducir un correo válido", campo);
    correcto = false;
  }
  return correcto;
}

export function validaSelect(selector) {
  let correcto = true;
  if (selector.value == -1) {
    mostrarError("Debe seleccionar una categoria", selector);
    correcto = false;
  }
  return correcto;
}

export function errorNoRegistro(){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No puedes entrar sin Registrarte",
    showCancelButton: true,
    confirmButtonText: "Registrar",
    cancelButtonText: "Login"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "registro.html";
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "login.html";
    }
  });
  
}

export function repetirContrasenya(campo1, campo2) {
  let correcto = true;
  if (campo1.value !== campo2.value) {
    campo2.value = "";
    mostrarError("Las contraseñas no coinciden", campo2);
    correcto = false;
  }
  return correcto;
}

export function errorSwal(titulo, mensaje, pagina){
  Swal.fire({
    icon: "error",
    title: titulo,
    text: mensaje,
  })
}

export function errorSwalPag(titulo, mensaje, pagina){
  Swal.fire({
    icon: "error",
    title: titulo,
    text: mensaje,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = pagina;
    }})
}

export function successSwal(titulo, mensaje){
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
  }).then((result) => {
    if (result.isConfirmed) {
        document.querySelector("form").submit();
    }})
}

export function successSwalTimer(titulo, mensaje){
  Swal.fire({
    position: "top",
    icon: "success",
    title: titulo,
    text: mensaje,
    width: 500,
    padding: "2em",

    showConfirmButton: false,
    timer: 1500,
    backdrop: `
    rgba(0, 0, 0, 0.5)
  `,
  }).then((result) => {document.querySelector("form").submit();});

}

export function precioDecimales(precio){
  precio.addEventListener("blur", function() {
    let valor = parseFloat(this.value);
    if (!isNaN(valor)) {
      valor = valor.toFixed(2);
      this.value = valor;
    }
  });
}