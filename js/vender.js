"use strict";
import {
  limpiarErrores,
  validaObligatorio,
  validaSelect,
  errorNoRegistro,
} from "./valida.js";

if (sessionStorage.getItem("nombreUsuario") == "") {
  errorNoRegistro();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    let nombre = document.getElementById("nombre");
    nombre.innerHTML = sessionStorage.getItem("nombreUsuario");
    // Establecer el valor en el input
    document.getElementById("vendedor").value =
      sessionStorage.getItem("nombreUsuario");

    console.log(sessionStorage.getItem("idUsuario"));
    console.log("nombre usuario: " + sessionStorage.getItem("nombreUsuario"));

    //visualizar imagen
    let inputArchivo = document.getElementById("file");
    let imageArchivo = document.getElementById("imgfile");
    inputArchivo.addEventListener("change", function () {
      let archivo = this.files[0];
      if (archivo.type.match("image.*")) {
        let tmpPath = URL.createObjectURL(archivo);
        imageArchivo.setAttribute("src", tmpPath);
      } else {
        alert("No es un archivo de imagen");
      }
    });
    let articulo = document.getElementById("articulo");
    let precio = document.getElementById("precio");
    let selector = document.getElementById("categoria");
    let file = document.getElementById("file");
    let descr = document.getElementById("descr");

    window.addEventListener("load", () => {
      let btnEnviar = document.getElementById("enviar");
      let errorMessage = document.getElementById("errorMessage");
      let errorContainer = document.getElementById("error");

      enviarSelect(selector);
      btnEnviar.addEventListener("click", (e) => {
        e.preventDefault();
        limpiarErrores(errorMessage, errorContainer);

        if (validaSelect(selector))
          if (validaObligatorio(file))
            if (validaObligatorio(articulo))
              if (validaObligatorio(precio))
                if (validaObligatorio(descr)) {
                  enviar();
                }
      });
    });
    
    //boton logout
    window.addEventListener("load", () => {
      document.getElementById("logout").addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.setItem("nombreUsuario", "");
        sessionStorage.setItem("idUsuario", "");
        window.location.href = "index.html";
      });
    });

    function enviarSelect() {
      var datos = new FormData();
      datos.append("opcion", "TC");

      let url = "php/coop24.php";
      var solicitud = new XMLHttpRequest();

      solicitud.addEventListener("load", function () {
        try {
          if (solicitud.status === 200) {
            if (solicitud.responseText.trim() !== "error") {
              mostrarCategoria(JSON.parse(solicitud.responseText));
            } else {
              alert("No hay Artículos");
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

    // Función que maneja la respuesta y actualiza el select
    function mostrarCategoria(art) {
      let selector = document.getElementById("categoria");

      art.forEach((art) => {
        let opcion = document.createElement("option");
        opcion.value = art.id;
        opcion.text = art.nombre;
        opcion.classList.add("categoria");
        selector.appendChild(opcion);
      });

      console.log("Valor seleccionado: " + selector.value);
    }

    function enviar() {
      var datos = new FormData();
      datos.append("opcion", "RA");
      datos.append("categoria", selector.value);
      datos.append("nombre", articulo.value);
      datos.append("precio", precio.value);
      datos.append("imagen", file.files[0]);
      datos.append("descripcion", descr.value);
      datos.append("vendedor", sessionStorage.getItem("idUsuario"));

      let url = "php/coop24.php";
      var solicitud = new XMLHttpRequest();

      solicitud.addEventListener("load", function () {
        try {
          if (solicitud.status === 200) {
            if (solicitud.responseText.trim() === "ok") {
              //alert("Datos registrados");
              Swal.fire({
                title: "Artículo registrado",
                text: "ya se encuentra disponible en la tienda",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              throw new Error(solicitud.responseText.trim());
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
}
