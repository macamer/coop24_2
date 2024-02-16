'use strict';
import { limpiarErrores, errorNoRegistro, validaObligatorio, validaEmail, repetirContrasenya, limpiarStorage, errorSwal, successSwal} from "./valida.js";

if (sessionStorage.getItem("nombreUsuario") == "") {
  errorNoRegistro();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    let nombre = document.getElementById("nombre");
    nombre.innerHTML = sessionStorage.getItem("nombreUsuario");
    //recoger los datos
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
    let inputArchivo = document.getElementById("file");
    let imageArchivo = document.getElementById("imgfile");

    mostrarPerfil(idUsuario);
    //cambiar imagen
    inputArchivo.addEventListener("change", function () {
      let archivo = this.files[0];
      if (archivo.type.match("image.*")) {
        let tmpPath = URL.createObjectURL(archivo);
        imageArchivo.setAttribute("src", tmpPath);
        imageArchivo.name = archivo.name;
      } else {
        errorSwal("No es un archivo de imagen","Elige otro formato");
        this.value = null;
      }
    });

    //PULSAR BOTON ENVIAR
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      limpiarErrores(errorMessage, errorContainer);
      if (validaObligatorio(name))
        if (validaObligatorio(ape))
          if (validaEmail(email))
            if (validaObligatorio(contra))
              if (repetirContrasenya(contra, contra2)) 
                //if (comprobarCorreo(email))
                enviar(idUsuario, name, ape, email, contra, inputArchivo);
    });

    //boton cancelar
    btnCancelar.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });

    //boton logout
    document.getElementById("logout").addEventListener('click', (e) => {
      e.preventDefault();
      limpiarStorage();
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
  let contra = document.getElementById("contra");
  let imageArchivo = document.getElementById("imgfile");

  name.value = perfil[0].nombre;
  ape.value = perfil[0].apellidos;
  email.value = perfil[0].email;
  contra.value = perfil[0].password;

  //visualizar imagen
  imageArchivo.src = "socios/" + perfil[0].foto;
  imageArchivo.name = perfil[0].foto;
};

function enviar(idUsuario, name, ape, email, contra, file) {
  let imageArchivo = document.getElementById("imgfile");
  var datos = new FormData();
  datos.append("opcion", "MS");
  datos.append("idsocio", idUsuario);
  datos.append("nombre", name.value);
  datos.append("apellidos", ape.value);
  datos.append("email", email.value);
  datos.append("password", contra.value);
  if (file.files[0] == null) datos.append("foto", imageArchivo.name);
  else datos.append("foto", file.files[0]);

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();
  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() === "ok") {
          alert("Datos registrados");
          sessionStorage.setItem("nombreUsuario", name.value); 
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
