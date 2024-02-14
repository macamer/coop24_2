
"use strict";
import { limpiarErrores, validaObligatorio, validaEmail, successSwalTimer } from "./valida.js";

document.addEventListener("DOMContentLoaded", function () {
  let email = document.getElementById("email");
  let contra = document.getElementById("contra");

  //AL ENVIAR
  window.addEventListener("load", () => {
    let btnEnviar = document.getElementById("enviar");
    let errorMessage = document.getElementById("errorMessage");
    let errorContainer = document.getElementById("error");

    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      limpiarErrores(errorMessage, errorContainer);

      if (validaEmail(email))
        if (validaObligatorio(contra)) {
          enviar();
        }
    });
  });
/*
  function limpiarErrores(errores, errorContainer) {
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

  function validaObligatorio(campo) {
    let correcto = true;
    //var nomexpreg = /^([a-zA-Z\s-]{2,15})$/; //entre 2 y 15 carácteres
    if (campo.value === "" || campo.value === null) {
      mostrarError("Debe introducir " + campo.name, campo);
      correcto = false;
    }
    return correcto;
  }

  function validaEmail(campo) {
    let correcto = true;
    var emailexpreg = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!emailexpreg.test(campo.value)) {
      mostrarError("Debe introducir un correo válido", campo);
      correcto = false;
    }
    return correcto;
  }
*/
  function enviar() {
    var datos = new FormData();
    datos.append("opcion", "SR");
    datos.append("email", email.value);
    datos.append("password", contra.value);

    let url = "php/coop24.php";
    var solicitud = new XMLHttpRequest();

    solicitud.addEventListener("load", function () {
      try {
        console.log("Estado de la solicitud: ", solicitud.status);
        console.log("Respuesta del servidor: ", solicitud.responseText);
        if (solicitud.status === 200) {
          if (solicitud.responseText.trim() !== "error") {
            let respuesta = JSON.parse(solicitud.responseText); //converit a JSON
            let nombreUsuario = respuesta[0].nombre;
            let idUsuario = respuesta[0].id;

            sessionStorage.setItem("nombreUsuario", nombreUsuario); 
            sessionStorage.setItem("idUsuario", idUsuario); 
            successSwalTimer("Usuario Registrado", "Ya puedes entrar en la tienda");
          } else {
            Swal.fire({
              icon: "error",
              title: "Acceso denegado",
              text: "Usuario no registrado",
            }).then((result) => {
              if (result.isConfirmed) {
            window.location.href = "registro.html";}});
          }
        } else {
          throw new Error("Error en la solicitud: " + solicitud.status);
        }
      } catch (error) {
        alert(error.message);
      }
    });
    solicitud.open("POST", url, true);
    solicitud.send(datos); //del FormData
  }
});
