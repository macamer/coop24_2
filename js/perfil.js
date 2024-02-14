'use strict';
import { errorNoRegistro, validaObligatorio, validaEmail, repetirContrasenya} from "./valida.js";

if (sessionStorage.getItem("nombreUsuario") == "") {
  errorNoRegistro();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    let nombre = document.getElementById("nombre");
    nombre.innerHTML = sessionStorage.getItem("nombreUsuario");

    //window.addEventListener("load", () => {
    let btnEnviar = document.getElementById("enviar");
    let btnCancelar = document.getElementById("cancel");
    let errorMessage = document.getElementById("errorMessage");
    let errorContainer = document.getElementById("error");
    let name = document.getElementById("name");
    let ape = document.getElementById("ape");
    let email = document.getElementById("email");
    let contra = document.getElementById("contra");
    let contra2 = document.getElementById("contra2");
    let idUsuario = sessionStorage.getItem("idUsuario");
    let file = document.getElementById("file");

    mostrarPerfil(idUsuario);

    //PULSAR BOTON ENVIAR
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      limpiarErrores(errorMessage, errorContainer);
      if (validaObligatorio(name))
        if (validaObligatorio(ape))
          if (validaEmail(email))
            if (validaObligatorio(contra))
              if (repetirContrasenya(contra, contra2)) {
                //if (comprobarCorreo(email))
                enviar(idUsuario, name, ape, email, contra, file);
              }
    });

    //boton cancelar
    btnCancelar.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });

    //boton logout
    document.getElementById("logout").addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.setItem("nombreUsuario", "");
      sessionStorage.setItem("idUsuario", "");
      window.location.href = "index.html";
    });
  });
}
////////////////////////////////////////////////////
function mostrarPerfil(idUsuario) {
  var datos = new FormData();
  datos.append("opcion", "SC");
  datos.append("idsocio", idUsuario);
  console.log(idUsuario);

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();
  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        console.log(solicitud.responseText);
        if (solicitud.responseText.trim() !== null) {
          mostrarDatos(JSON.parse(solicitud.responseText));
        } else {
          Swal.fire({
            icon: "error",
            title: "No se han encontrado los datos",
          });
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
//////////////////////////////////////////////////////////////////
const mostrarDatos = (perfil) => {
  let name = document.getElementById("name");
  let ape = document.getElementById("ape");
  let email = document.getElementById("email");
  let inputArchivo = document.getElementById("file");
  let imageArchivo = document.getElementById("imgfile");

  name.value = perfil[0].nombre;
  ape.value = perfil[0].apellidos;
  email.value = perfil[0].email;

  //visualizar imagen

  imageArchivo.src = "socios/" + perfil[0].foto;
  imageArchivo.name = perfil[0].foto;
  console.log("name: " + imageArchivo.name);
  console.log("src: " + imageArchivo.src);
  inputArchivo.addEventListener("change", function () {
    archivo = this.files[0];
    if (archivo.type.match("image.*")) {
      let tmpPath = URL.createObjectURL(archivo);
      imageArchivo.setAttribute("src", tmpPath);
      imageArchivo.name = archivo.name;
      console.log("name change: " + archivo.name);
    } else {
      alert("No es un archivo de imagen");
    }
  });
};

///////////////////////////////////////////////////////////////
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

function repetirContrasenya(campo1, campo2) {
  let correcto = true;
  if (campo1.value !== campo2.value) {
    campo2.value = "";
    mostrarError("Las contraseñas no coinciden", campo2);
    correcto = false;
  }
  return correcto;
}*/

////////////////////////////////////////////////////////////
function enviar(idUsuario, name, ape, email, contra, file) {
  let imageArchivo = document.getElementById("imgfile");
  var datos = new FormData();
  datos.append("opcion", "MS");
  datos.append("idsocio", idUsuario);
  datos.append("nombre", name.value);
  datos.append("apellidos", ape.value);
  datos.append("email", email.value);
  datos.append("password", contra.value);
  if (file.files[0] == null) {
    datos.append("foto", imageArchivo.name);
  } else {
    datos.append("foto", file.files[0]);
  }

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();
  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() === "ok") {
          alert("Datos registrados");
          Swal.fire({
            title: "Usuario Registrado",
            text: "datos modificados",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              document.querySelector("form").submit();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de registro",
            text: "No se ha podido registrar el Usuario",
          });
        }
      } else {
        throw new Error("Error en la solicitud: " + solicitud.status);
      }
    } catch (error) {
      alert(error.message);
    }
  });
  solicitud.open("POST", url, true);
  solicitud.send(datos);
}

//////////////////////////////////////////////
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
