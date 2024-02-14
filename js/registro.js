'use strict';
import { validaObligatorio, validaEmail, repetirContrasenya, errorSwal, successSwal} from "./valida.js";

document.addEventListener("DOMContentLoaded", function () {
  let name = document.getElementById("name");
  let ape = document.getElementById("ape");
  let email = document.getElementById("email");
  let contra = document.getElementById("contra");
  let contra2 = document.getElementById("contra2");

  //AL ENVIAR
  window.addEventListener("load", () => {
    let btnEnviar = document.getElementById("enviar");
    let errorMessage = document.getElementById("errorMessage");
    let errorContainer = document.getElementById("error");

    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      limpiarErrores(errorMessage, errorContainer);
      if (validaObligatorio(name))
        if (validaObligatorio(ape))
          if (validaEmail(email))
            //if (comprobarCorreo(email))
              if (validaObligatorio(contra))
                if (repetirContrasenya(contra, contra2)) {
                  enviar();
                  
                }
    });
  });

  function enviar() {
    var datos = new FormData();
    datos.append("opcion", "RS");
    datos.append("nombre", name.value);
    datos.append("apellidos", ape.value);
    datos.append("email", email.value);
    datos.append("password", contra.value);
    datos.append("repassword", contra2.value);

    fetch("php/coop24.php", { method: "POST", body: datos })
    .then((response) => {
      if (!response.ok) {
        errorSwal("Error", "error en la solicitud");
      }
      return response.json(); // convertir respuesta a JSON
    })
    .then(
      successSwal("Usuario Registrado", "Ya puedes acceder a la tienda")
    )
    .catch((error) => {
      errorSwal("Error", error);
    });
  }
});
    
/*
  function comprobarCorreo(campo) {
    let correcto = true;
    var datos = new FormData();
    datos.append("opcion", "SE");
    datos.append("email", campo.value);

    let url = "php/coop24.php";
    var solicitud = new XMLHttpRequest();

    solicitud.addEventListener("load", function () {
      try {
        if (solicitud.status === 200) {
          if (solicitud.responseText.trim() !== "error") {
            mostrarError("Ese correo ya ha sido registrado", campo);
            correcto = false;
          } else {
            console.log("Usuario no registrado");
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
    return correcto;
  }
*/

/*
    let url = "php/coop24.php";
    var solicitud = new XMLHttpRequest();
    solicitud.addEventListener("load", function () {
      try {
        if (solicitud.status === 200) {
          if (solicitud.responseText.trim() === "ok") {
            Swal.fire({
              title: "Usuario Registrado",
              text: "ya puedes acceder a la tienda",
              icon: "success"
          }).then((result) => {
              if (result.isConfirmed) {
                  document.querySelector("form").submit();
              }})
          } else {
            Swal.fire({
              icon: "error",
              title: "Error de registro",
              text: "No se ha podido registrar el Usuario",
            })
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
  */
