document.addEventListener("DOMContentLoaded", function () {
  let nombre = document.getElementById("nombre");
  nombre.innerHTML = localStorage.getItem("nombreUsuario");
  // Establecer el valor en el input
  document.getElementById("vendedor").value =
    localStorage.getItem("nombreUsuario");
let idUsuario = localStorage.getItem('idUsuario');

    console.log(localStorage.getItem("idUsuario"));
    console.log('nombre usuario: '+localStorage.getItem("nombreUsuario"));

  //visualizar imagen
  let inputArchivo = document.getElementById("file");
  let imageArchivo = document.getElementById("imgfile");
  inputArchivo.addEventListener("change", function () {
    archivo = this.files[0];
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
  let descr = document.getElementById('descr');

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
              if (validaObligatorio(descr))
                {
                  enviar();
                }
    });
  });

  function limpiarErrores(errores, errorContainer) {
    // Limpiar mensajes de error anteriores
    errores.innerHTML = "";
    errorContainer.style.display = "none";
  }

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

  function enviar(){
    var datos = new FormData();
    datos.append('opcion', 'RA');
    datos.append('categoria', selector.value);
    datos.append('nombre', articulo.value);
    datos.append('precio', precio.value);
    datos.append('imagen', file.files[0]);
    datos.append('descripcion', descr.value);
    datos.append('vendedor', localStorage.getItem('idUsuario'));

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
              icon: "success"
          }).then((result) => {
              if (result.isConfirmed) {
            window.location.reload();}})
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

///////////////////////////////////////////////////
//-- VALIDACIONES ---

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
    if (!campo || campo.value === "" || campo.value === null) {
      mostrarError("Debe introducir " + campo.name, campo);
      correcto = false;
    }
    return correcto;
  }

  function validaSelect(selector) {
    let correcto = true;
    if (selector.value == -1) {
      mostrarError("Debe seleccionar una categoria", selector);
      correcto = false;
    }
    return correcto;
  }


});
