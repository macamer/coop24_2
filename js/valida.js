export function limpiarErrores(errores, errorContainer) {
  // Limpiar mensajes de error anteriores
  errores.innerHTML = "";
  errorContainer.style.display = "none";
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
