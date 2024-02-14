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

  function repetirContrasenya(campo1, campo2) {
    let correcto = true;
    if (campo1.value !== campo2.value) {
      campo2.value = "";
      mostrarError("Las contraseñas no coinciden", campo2);
      correcto = false;
    }
    return correcto;
  }

  function enviar() {
    var datos = new FormData();
    datos.append("opcion", "RS");
    datos.append("nombre", name.value);
    datos.append("apellidos", ape.value);
    datos.append("email", email.value);
    datos.append("password", contra.value);
    datos.append("repassword", contra2.value);

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
});
