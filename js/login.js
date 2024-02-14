
"use strict";
import { limpiarErrores, validaObligatorio, validaEmail, successSwalTimer, errorSwal, errorSwalPag } from "./valida.js";

document.addEventListener("DOMContentLoaded", function () {
  let email = document.getElementById("email");
  let contra = document.getElementById("contra");

  window.addEventListener("load", () => {
    let btnEnviar = document.getElementById("enviar");
    let errorMessage = document.getElementById("errorMessage");
    let errorContainer = document.getElementById("error");
    //boton de enviar
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      limpiarErrores(errorMessage, errorContainer);

      if (validaEmail(email))
        if (validaObligatorio(contra)) {
          enviar();
        }
    });
  });

  function enviar() {
    var datos = new FormData();
    datos.append("opcion", "SR");
    datos.append("email", email.value);
    datos.append("password", contra.value);
    fetch("php/coop24.php", { method: "POST", body: datos })
    .then((response) => {
        console.log("Estado de la solicitud: ", response.status);
        if (response.ok) {
            return response.text(); // Obtener el texto de la respuesta
        } else {
            errorSwal("Error en la solicitud", response.status);
        }
    }).then((text) => {
      if (text.trim() !== "error") {
        let respuesta = JSON.parse(text); // Convertir a JSON
        sessionStorage.setItem("nombreUsuario", respuesta[0].nombre); 
        sessionStorage.setItem("idUsuario", respuesta[0].id); 
        successSwalTimer("Usuario Registrado", "Ya puedes entrar en la tienda");
      } else {
        errorSwalPag("Usuario no registrado","Debes registrarte","registro.html")
      }
    })
    .catch((error) => {
      errorSwal("Error", error);
      console.error("Error: ", error);
    });
  }
});
    /*let url = "php/coop24.php";
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
  }*/

