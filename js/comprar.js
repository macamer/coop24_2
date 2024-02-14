"use strict";
import { crearElemento, crearElementoTexto } from "./crearElement.js";
import { errorNoRegistro, errorSwal, successSwal } from "./valida.js";

document.getElementById("nombre").innerHTML =
  sessionStorage.getItem("nombreUsuario");

if (sessionStorage.getItem("nombreUsuario") == "") {
  errorNoRegistro();
} else {
  window.addEventListener("load", () => {
    enviar();
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("nombreUsuario", "");
      sessionStorage.setItem("idUsuario", "");
      window.location.href = "index.html";
    });
  });

  /////////////////////////////////////////////////////
  function enviar() {
    //let contenedor = document.getElementById("articulos");
    var datos = new FormData();
    datos.append("opcion", "AV");

    fetch("php/coop24.php", { method: "POST", body: datos })
      .then((response) => {
        if (!response.ok) {
          errorSwal("Error", "Error en la solicitud");
        }
        return response.json(); // convertir respuesta a JSON
      })
      .then((data) => {
        mostrarArticulos(data, 1);
      })
      .catch((error) => {
        errorSwal("Error", error);
        console.error("Error: ", error);
      });
  }

  const mostrarArticulos = (articulos, pagina) => {
    //filtro para que salgan solo los articulos de los demás vendedores
    articulos = articulos.filter(
      (elem) => elem.vendedor != sessionStorage.getItem("idUsuario")
    );

    let contenedor = document.getElementById("articulos");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos elementos

    let filaContainer;
    let contadorProductos = 0;
    const elementosPorPagina = 6;
    const totalPaginas = Math.ceil(articulos.length/elementosPorPagina);
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = pagina * elementosPorPagina;

    /*PAGINACION
    let totalPaginas = Math.ceil(articulos.length / 8);
    if (pagina > totalPaginas) {
      pagina = totalPaginas;
    } else if (pagina < 1) pagina = 1;
    let primeroIncluido = 8 * (pagina - 1);
    let ultimoExcluido = 8 + primeroIncluido;
    if (ultimoExcluido > articulos.length) ultimoExcluido = articulos.length;
    let jsonArticulosPagina = [...articulos].slice(
      primeroIncluido,
      ultimoExcluido
    );
    */

    articulos.slice(inicio, fin).forEach((articulo) => {
    //jsonArticulosPagina.forEach((articulo) => {
      if (contadorProductos % 3 === 0) {
        // Crear un nuevo contenedor para cada fila
        filaContainer = crearElemento("div", contenedor);
        filaContainer.classList.add("fila");
      }
      //contenedor para cada producto
      const contenedorP = crearElemento("div", filaContainer);
      contenedorP.classList.add("contenedorP","border","border-secondary","rounded","border-2");

      let producto = crearElemento("div", contenedorP);
      producto.classList.add("producto", "container");
      producto.value = articulo.id;

      // Crear elementos para mostrar la información del producto
      let imagen = crearElemento("img", producto);
      imagen.classList.add("img-fluid", "border");
      imagen.src = "archivos/" + articulo.imagen; // Ajusta la ruta según tu estructura de archivos
      imagen.alt = articulo.descripcion;

      let nombre = crearElementoTexto(articulo.nombre, "p", producto);
      nombre.classList.add("nombre"); // Ajusta según tu necesidad

      let precio = crearElementoTexto(
        "Precio: $" + parseFloat(articulo.precio).toFixed(2),"p",producto
      );
      precio.classList.add("precio");

      let botonCompra = crearElemento("button", producto);
      botonCompra.classList.add("btn", "btn-info");
      botonCompra.textContent = "Comprar";
      botonCompra.id = "compra";
      botonCompra.addEventListener("click", (e) => {
        e.preventDefault();
        enviarCompra(articulo.id);
      });

      // Incrementar el contador de productos
      contadorProductos++;
    });

    /////////////////////////////////////////////////
    let divPaginas = document.getElementById("paginas");
    divPaginas.innerHTML = "";
    let divBtn = crearElemento("div", divPaginas);
    for (let i = 1; i <= totalPaginas; i++) {
      let btn = crearElementoTexto(i, "button", divBtn);
      btn.classList.add("btn", "btn-paginator");
      if (i == pagina) btn.classList.add("btn-secondary");
      else btn.classList.add("btn-info");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarArticulos(articulos, i);
      });
    }
  };


  function enviarCompra(idarticulo) {
    var datos = new FormData();
    datos.append("opcion", "CA");
    datos.append("idarticulo", idarticulo);

    fetch("php/coop24.php", { method: "POST", body: datos })
      .then((response) => {
        if (!response.ok) {
          errorSwal("Error", "Error en la solicitud")
        }
        successSwal("Artículo comprado", "pronto llegará un correo de confirmación");
      })
      .catch((error) => {
        errorSwal("Error", error);
        console.error("Error: ", error);
      });
  }
}

/*
//VISUALIZAR LOS ARTICULOS EN VENTA//
function enviar() {
  let contenedor = document.getElementById("articulos");
  var datos = new FormData();
  datos.append("opcion", "AV");

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();

  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() !== "error") {
          let datosJSON = JSON.parse(this.responseText);
          mostrarArticulos(datosJSON, 1);
        } else {
          //datosJSON = null;
          contenedor.innerHTML += "<div><h5> No hay artículos </h5> </div>";
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
/*
function enviarCompra(idarticulo) {
  var datos = new FormData();
  datos.append("opcion", "CA");
  datos.append("idarticulo", idarticulo);

  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();

  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() !== "error") {
          alert("Artículo comprado");
          Swal.fire({
            title: "Artículo comprado",
            text: "pronto llegará un correo de confirmación",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              document.querySelector("form").submit();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error en la compra",
            text: "vuelva a intentarlo",
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
*/
