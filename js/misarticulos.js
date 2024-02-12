"use strict";
import { crearElemento, crearElementoTexto } from "./crearElement.js";

document.addEventListener("DOMContentLoaded", function () {
  let nombre = document.getElementById("nombre");
  nombre.innerHTML = localStorage.getItem("nombreUsuario");
  let contenedor = document.getElementById("articulos");

  window.addEventListener("load", () => {
    jsonArticulos(contenedor);
  });
});

////////////////////////////////////////////////////////////////
function jsonArticulos(contenedor) {
  let idUsuario = localStorage.getItem("idUsuario");
  var datos = new FormData();
  datos.append("opcion", "SV");
  datos.append("idsocio", idUsuario);

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();

  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() !== "error") {
          mostrarArticulos(JSON.parse(solicitud.responseText), contenedor);
        } else {
          contenedor.innerHTML = "";
          contenedor.innerHTML +=
            "<div class='container my 5 text-center'><h5> No hay artículos </h5> </div>";
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

const mostrarArticulos = (articulos, contenedor) => {
  let artEnVenta = articulos.filter((elem) => elem.estado == "D");
  let artVendidos = articulos.filter((elem) => elem.estado == "V");

  contenedor.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos elementos

  // Crear un contenedor para cada fila
  let filaContainer = document.createElement("div");
  filaContainer.classList.add("fila");
  contenedor.appendChild(filaContainer);

  let contadorProductos = 0;
  //////////////////////////////////////////////
  //articulos en venta
  artEnVenta.forEach((articulo) => {
    if (contadorProductos % 3 === 0 && contadorProductos !== 0) {
      // Crear un nuevo contenedor para cada fila
      filaContainer = crearElemento("div", contenedor);
      filaContainer.classList.add("fila");
      contenedor.appendChild(filaContainer);
    }

    // Crear un contenedor para cada producto
    let contenedorP = crearElemento("div", filaContainer);
    contenedorP.classList.add("contenedorP");
    contenedorP.classList.add("border");
    contenedorP.classList.add("border-success");
    contenedorP.classList.add("rounded");
    contenedorP.classList.add("border-2");

    let producto = crearElemento("div", contenedorP);
    producto.classList.add("producto");
    producto.value = articulo.id;

    // Crear elementos para mostrar la información del producto
    let imagen = crearElemento("img", producto);
    imagen.classList.add("img-fluid");
    imagen.classList.add("border");
    imagen.src = "archivos/" + articulo.imagen; // Ajusta la ruta según tu estructura de archivos
    imagen.alt = articulo.descripcion;

    let nombre = crearElementoTexto(articulo.nombre, "p", producto);
    nombre.classList.add("nombre"); // Ajusta según tu necesidad

    let precio = crearElementoTexto(
      "Precio: $" + parseFloat(articulo.precio).toFixed(2),
      "p",
      producto
    );
    precio.classList.add("precio");
    let idarticulo = articulo.id;

    let btnGrup = crearElemento("div", producto);
    btnGrup.classList.add("btn-group");

    let botonMod = crearElemento("button", btnGrup);
    botonMod.classList.add("btn");
    botonMod.classList.add("btn-success");
    botonMod.textContent = "Modificar";
    botonMod.id = "mod";
    botonMod.addEventListener("click", (e) => {
      e.preventDefault();
      modArticulo(idarticulo);
      console.log("Producto modificar: " + idarticulo);
    });

    let botonBorrar = crearElemento("button", btnGrup);
    botonBorrar.classList.add("btn");
    botonBorrar.classList.add("btn-danger");
    botonBorrar.textContent = "Borrar";
    botonBorrar.id = "borrar";
    botonBorrar.addEventListener("click", (e) => {
      e.preventDefault();
      preguntaBorrar(idarticulo);
      console.log("Producto a borrar: " + articulo.idarticulo);
    });

    // Incrementar el contador de productos
    contadorProductos++;
  });

  //////////////////////////////////////////////
  //articulos vendidos
  artVendidos.forEach((articulo) => {
    if (contadorProductos % 3 === 0 && contadorProductos !== 0) {
      // Crear un nuevo contenedor para cada fila
      filaContainer = crearElemento("div", contenedor);
      filaContainer.classList.add("fila");
      contenedor.appendChild(filaContainer);
    }

    // Crear un contenedor para cada producto
    let contenedorP = crearElemento("div", filaContainer);
    contenedorP.classList.add("contenedorP");
    contenedorP.classList.add("border");
    contenedorP.classList.add("border-secondary");
    contenedorP.classList.add("rounded");
    contenedorP.classList.add("border-2");

    let producto = crearElemento("div", contenedorP);
    producto.classList.add("producto");
    producto.value = articulo.id;

    // Crear elementos para mostrar la información del producto
    let imagen = crearElemento("img", producto);
    imagen.classList.add("img-fluid");
    imagen.classList.add("border");
    imagen.src = "archivos/" + articulo.imagen; // Ajusta la ruta según tu estructura de archivos
    imagen.alt = articulo.descripcion;

    let nombre = crearElementoTexto(articulo.nombre, "p", producto);
    nombre.classList.add("nombre"); // Ajusta según tu necesidad

    let precio = crearElementoTexto(
      "Precio: $" + parseFloat(articulo.precio).toFixed(2),
      "p",
      producto
    );
    precio.classList.add("precio");

    let botonVendido = crearElemento("button", producto);
    botonVendido.classList.add("btn");
    botonVendido.classList.add("btn-secondary");
    botonVendido.textContent = "Vendido";
    botonVendido.id = "vend";
    botonVendido.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Artículo vendido",
        text: "No se pueden hacer modificaciones",
        icon: "info",
      });
    });
    // Incrementar el contador de productos
    contadorProductos++;
  });
};

//////////////////////////////////////////
function preguntaBorrar(idarticulo) {
  Swal.fire({
    title: "¿Quieres eliminar el artículo?",
    text: "No podrás revertir el proceso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      borrarArticulo(idarticulo); // Llama a la función para borrar el artículo después de que el usuario confirme
    }
  });
}

function borrarArticulo(idarticulo) {
  var datos = new FormData();
  datos.append("opcion", "BA");
  datos.append("idarticulo", idarticulo);

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();

  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() !== "error") {
          Swal.fire({
            title: "Borrado!",
            text: "Tu artículo ha sido eliminado",
            icon: "success",
          }).then(() => {
            // Recargar la página después de eliminar el artículo
            location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al borrar el artículo",
            text: "Por favor, inténtelo de nuevo",
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

//////////////////////////////////////////////////////
function modArticulo(idarticulo) {
  document.getElementById("articulos").style = "display:none;";
  document.getElementById("modSection").style = "display:block;";
  let btnCancelarMod = document.getElementById("cancelMod");
  let btnEnviarMod = document.getElementById("enviarMod");

  btnCancelarMod.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("articulos").style = "display:block;";
    document.getElementById("modSection").style = "display:none;";
  });

  btnEnviarMod.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarArtMod(idarticulo);
  });

  ////////////////////////////////////////////////////
  function mostrarArtMod(idarticulo) {
    var datos = new FormData();
    datos.append("opcion", "AC");
    datos.append("idarticulo", idarticulo);
    console.log(idarticulo);

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
  const mostrarDatos = (art) => {
    let articulo = document.getElementById("articulo"); //nombre
    let precio = document.getElementById("precio");
    let selector = document.getElementById("categoria");
    let file = document.getElementById("file");
    let descr = document.getElementById("descr");

    console.log(art[0].nombre);
    selector.value = art[0].categoria;
    articulo.value = art[0].nombre;
    precio.value = art[0].precio;
    file.src = art[0].imagen;
    descr.value = art[0].descripcion;

    /*
  //visualizar imagen

  imageArchivo.src = "socios/" + art[0].foto;
  imageArchivo.name = art[0].foto;
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
  });*/
  };
}
