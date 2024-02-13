'use strict';
import { crearElemento, crearElementoTexto } from "./crearElement.js";

  document.getElementById("nombre").innerHTML = localStorage.getItem("nombreUsuario");

  window.addEventListener("load", () => {
    enviar();
  });

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

  const mostrarArticulos = (articulos, pagina) => {
    //filtro para que salgan solo los articulos de los demás vendedores
    articulos = articulos.filter((elem) => elem.vendedor != localStorage.getItem('idUsuario'));
    let contenedor = document.getElementById("articulos");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos elementos

    // Crear un contenedor para cada fila
    let filaContainer = document.createElement("div");
    filaContainer.classList.add("fila");
    contenedor.appendChild(filaContainer);

    let contadorProductos = 0;

    ////////////////////////////////////////////////////////////////
    let totalPaginas = Math.ceil(articulos.length / 6);
    if (pagina > totalPaginas){	pagina = totalPaginas
    }else if (pagina < 1) pagina = 1;
    let primeroIncluido = 6 * (pagina - 1);
    let ultimoExcluido = 6 + primeroIncluido;
    if (ultimoExcluido > articulos.length) ultimoExcluido = articulos.length;
    let jsonArticulosPagina = [...articulos].slice(primeroIncluido, ultimoExcluido);

    ////////////////////////////////////////////////////////////////

    jsonArticulosPagina.forEach((articulo) => {
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
      let idarticulo = articulo.id;

      let botonCompra = crearElemento("button", producto);
      botonCompra.classList.add("btn");
      botonCompra.classList.add("btn-info");
      botonCompra.textContent = "Comprar";
      botonCompra.id = "compra";
      botonCompra.addEventListener("click", (e) => {
        e.preventDefault();
        enviarCompra(idarticulo);
        console.log("Producto comprado: " + articulo.idarticulo);
      });

      // Incrementar el contador de productos
      contadorProductos++;
    });
  
  /////////////////////////////////////////////////
  let divPaginas = document.getElementById("paginas");
  divPaginas.innerHTML="";
  let divBtn= crearElemento('div',divPaginas);
  for ( let i=1; i<=totalPaginas; i++){
    let btn = crearElementoTexto(i,"button",divBtn);
    if (i == pagina) btn.classList.add("btn", "btn-secondary");
    else btn.classList.add("btn", "btn-info", "btn-paginator");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      pagina = i;
      mostrarArticulos(articulos, pagina);
    });
  }
}
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

//});
