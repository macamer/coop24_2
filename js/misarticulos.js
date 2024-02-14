"use strict";
import { crearElemento, crearElementoTexto} from "./crearElement.js";
import {limpiarErrores,validaObligatorio,validaSelect,errorNoRegistro,successSwal,errorSwal,precioDecimales, errorSwalPag} from "./valida.js";

if (sessionStorage.getItem("idUsuario") == "") {
  errorNoRegistro();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log(sessionStorage.getItem("idUsuario"));
    let nombre = document.getElementById("nombre");
    nombre.innerHTML = sessionStorage.getItem("nombreUsuario");

    window.addEventListener("load", () => {
      jsonArticulos();
    });

    //boton logout
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("nombreUsuario", "");
      sessionStorage.setItem("idUsuario", "");
      window.location.href = "index.html";
    });
  });
}

////////////////////////////////////////////////////////////////
////MOSTRAR ARTICULOS -->
function jsonArticulos() {
  let idUsuario = sessionStorage.getItem("idUsuario");
  var datos = new FormData();
  datos.append("opcion", "SV");
  datos.append("idsocio", idUsuario);
  fetch("php/coop24.php", { method: "POST", body: datos })
      .then((response) => {
        if (!response.ok) {
          errorSwal("Error", "Error en la solicitud");
        }
        return response.text(); // convertir respuesta a texto
      })
      .then((data) => {
        if (data.trim() === "error") {
          console.log(data);
          // No hay artículos disponibles
          document.getElementById("articulos").innerHTML = "<div class='container my 5 text-center'><h5> No hay artículos </h5> </div>";
          document.getElementById("vendidos").innerHTML = "<div class='container my 5 text-center'><h5> No hay artículos </h5> </div>";
        } else {
          // La respuesta contiene datos de artículos
          const jsonData = JSON.parse(data);
        console.log("Respuesta del servidor:", data);
          mostrarVenta(jsonData, 1);
          mostrarVendidos(jsonData, 1);
        } 
      })
      .catch((error) => {
        errorSwal("Error", error);
        console.error("Error: ", error);
      });
}

const mostrarVenta = (articulos, pagina) => {
  let artEnVenta = articulos.filter((elem) => elem.estado == "D");
  let contVenta = document.getElementById("articulos");
  contVenta.innerHTML = ""; 
  if(artEnVenta.length == 0){
    contVenta.innerHTML = "<div class='container my 5 text-center'><h5> No hay artículos </h5> </div>";
  } else {
    const elementosPorPagina = 3;
    let contadorProductos = 0;
    let filaContainer;
    const totalPaginas = Math.ceil(artEnVenta.length/elementosPorPagina);
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = pagina * elementosPorPagina;

    artEnVenta.slice(inicio, fin).forEach((articulo) => {
      
      if (contadorProductos % 3 === 0) {
        // Crear un nuevo contenedor para cada fila
        filaContainer = crearElemento("div", contVenta);
        filaContainer.classList.add("fila");
      }
      //contenedor para cada producto
      const contenedorP = crearElemento("div", filaContainer);
      contenedorP.classList.add("contenedorP");

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

      let precio = crearElementoTexto("Precio: $" + parseFloat(articulo.precio).toFixed(2),"p",producto);
      precio.classList.add("precio");

      let btnGrup = crearElemento("div", producto);
      btnGrup.classList.add("btn-group");

      //BOTON DE MODIFICAR
      let botonMod = crearElemento("button", btnGrup);
      botonMod.classList.add("btn","btn-success");
      botonMod.textContent = "Modificar";
      botonMod.id = "mod";
      botonMod.addEventListener("click", (e) => {
        e.preventDefault();
        modArticulo(articulo.id);
      });

    //BOTON DE BORRAR
    let botonBorrar = crearElemento("button", btnGrup);
    botonBorrar.classList.add("btn","btn-danger");
    botonBorrar.textContent = "Borrar";
    botonBorrar.id = "borrar";
    botonBorrar.addEventListener("click", (e) => {
      e.preventDefault();
      preguntaBorrar(articulo.id);
    });
  
    contadorProductos++;
  })
  
    let divPaginas = document.getElementById("pagina");
    divPaginas.innerHTML = ""; 
    let divBtn = document.createElement("div");
    divBtn.classList.add("paginator");
    divPaginas.appendChild(divBtn);
    for (let i = 1; i <= totalPaginas; i++) {
      let btn = crearElementoTexto(i, "button", divBtn);
      btn.classList.add("btn", "btn-paginator");
      if (i == pagina) btn.classList.add("btn-secundario");
      else btn.classList.add("btn-principal");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarVenta(artEnVenta, i);
      });
    }
  }
}
////////////////////////////////////////////////////////////////////////
const mostrarVendidos = (articulos, paginaV) => {
  let artVendidos = articulos.filter((elem) => elem.estado == "V");
  let contVendido = document.getElementById("vendidos");

  if(artVendidos.length == 0){
    contVendido.innerHTML="<div class='container my 5 text-center'><h5> No hay artículos </h5> </div>";
  } else {
    contVendido.innerHTML="";
    const elementosPorPagina = 3;
    let contadorProductosV = 0;
    let filaContainer;
    const totalPaginas = Math.ceil(artVendidos.length/elementosPorPagina);
    const inicioV = (paginaV - 1) * elementosPorPagina;
    const finV = paginaV * elementosPorPagina;

    artVendidos.slice(inicioV, finV).forEach((articulo) => {
      if (contadorProductosV % 3 === 0) {
        filaContainer = crearElemento("div", contVendido);
        filaContainer.classList.add("fila");
      }
      //contenedor para cada producto
      const contenedorP = crearElemento("div", filaContainer);
      contenedorP.classList.add("contenedorP");

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

      let precio = crearElementoTexto("Precio: $" + parseFloat(articulo.precio).toFixed(2),"p",producto);
      precio.classList.add("precio");

      let botonVendido = crearElemento("button", producto);
      botonVendido.classList.add("btn","btn-secondary");
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
       
    contadorProductosV++;
  })
  
    let divPaginas = document.getElementById("pagina2");
    divPaginas.innerHTML = ""; 
    let divBtnV = crearElemento("div", divPaginas);
    divBtnV.classList.add("paginator","boton2");
    for (let i = 1; i <= totalPaginas; i++) {
      let btnV = crearElementoTexto(i, "button", divBtnV);
      btnV.classList.add("btn", "btn-paginator","boton2");
      if (i == paginaV) btnV.classList.add("btn-secundario");
      else btnV.classList.add("btn-principal");

      btnV.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarVendidos(artVendidos, i);
      });
    }
  }
}

///////////////////////////////////////////////
///BORRAR --->
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
    if (result.isConfirmed)borrarArticulo(idarticulo); // Llama a la función para borrar el artículo después de que el usuario confirme
  });
}

function borrarArticulo(idarticulo){
  var datos = new FormData();
  datos.append("opcion", "BA");
  datos.append("idarticulo", idarticulo);

  fetch("php/coop24.php", { method: "POST", body: datos })
    .then((data) => {
      if (data.ok) successSwal("Artículo Borrado", "Tu artículo ha sido borrado");
      else errorSwalPag("Error","No sa he podido borrar","misarticulos.html")
    })
    .catch((error) => {errorSwal("Error", error);});
}


//////////////////////////////////////////////////////
//MODIFICAR ART --->
function modArticulo(idarticulo) {
  //MOSTRAR modSection OCULTAR articulos
  document.getElementById("verArticulos").style = "display:none;";
  document.getElementById("modSection").style = "display:block;";

  // Establecer el valor en el input del VENDEDOR
  document.getElementById("vendedor").value = sessionStorage.getItem("nombreUsuario");
  //BOTONES
  let btnCancelarMod = document.getElementById("cancelMod");
  let btnEnviarMod = document.getElementById("enviarMod");
  //ERRORES
  let errorMessage = document.getElementById("errorMessage");
  let errorContainer = document.getElementById("error");
  //FORMUALRIO
  let articulo = document.getElementById("articulo");
  let precio = document.getElementById("precio");
  let selector = document.getElementById("categoria");
  let file = document.getElementById("file");
  let descr = document.getElementById("descr");
  let inputArchivo = document.getElementById("file");
  
  mostrarArtMod(idarticulo);
  enviarSelect(selector);
  precioDecimales(precio);
  
  inputArchivo.addEventListener("change", function () {
    let archivo = this.files[0];
    if (archivo.type.match("image.*")) {
      let tmpPath = URL.createObjectURL(archivo);
      imageArchivo.setAttribute("src", tmpPath);
      imageArchivo.name = archivo.name;
    } else errorSwal("No es un archivo de imagen","Elige otro formato");
  });

  btnCancelarMod.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("verArticulos").style = "display:block;";
    document.getElementById("modSection").style = "display:none;";
    limpiarErrores(errorMessage, errorContainer);
  });

  btnEnviarMod.addEventListener("click", (e) => {
    e.preventDefault();
    limpiarErrores(errorMessage, errorContainer);
    if (validaSelect(selector))
      if (validaObligatorio(articulo))
        if (validaObligatorio(precio))
          if (validaObligatorio(descr)) 
            enviar(idarticulo, articulo, selector, descr, precio, file);
  });

  ////////////////////////////////////////////////////
  function mostrarArtMod(idarticulo) {
    var datos = new FormData();
    datos.append("opcion", "AC");
    datos.append("idarticulo", idarticulo);
    fetch("php/coop24.php", { method: "POST", body: datos })
      .then((response) => {
        if (!response.ok) errorSwal("Error", "Error en la solicitud");
        return response.json(); // convertir respuesta a JSON
      })
      .then((data) => {mostrarDatos(data);})
      .catch((error) => {errorSwal("Error", error);});
    }
  //////////////////////////////////////////////////////////////////
  const mostrarDatos = (art) => {
    let articulo = document.getElementById("articulo"); //nombre
    let precio = document.getElementById("precio");
    let selector = document.getElementById("categoria");
    let descr = document.getElementById("descr");
    let imageArchivo = document.getElementById("imgfile");

    selector.value = art[0].categoria;
    articulo.value = art[0].nombre;
    precio.value = parseFloat(art[0].precio).toFixed(2);
    descr.value = art[0].descripcion;
    //Visualiza imagen ARTICULO
    imageArchivo.src = "archivos/" + art[0].imagen;
    imageArchivo.name = art[0].imagen;
  };

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
      } catch (error) {alert(error.message);}
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
  }

  ////////////////////////////////////////////////////////////
  ///ENVIAR DATOS PARA MODIFICAR -->
  function enviar(idarticulo, articulo, categoria, descr, precio, file) {
    let imageArchivo = document.getElementById("imgfile");
    var datos = new FormData();
    datos.append("opcion", "MA");
    datos.append("idarticulo", idarticulo);
    datos.append("categoria", categoria.value);
    datos.append("nombre", articulo.value);
    datos.append("descripcion", descr.value);
    datos.append("precio", precio.value);
    //comprobar si se ha cambiado o no la imagen
    if (file.files[0] == null) datos.append("foto", imageArchivo.name);
    else datos.append("foto", file.files[0]);

    fetch("php/coop24.php", { method: "POST", body: datos })
    .then((data) => {
      if (data.ok) successSwal("Artículo modificado", "Los datos han sido registrados");
      else errorSwal("Error de registro", "No se han podido modificar los datos"); })
    .catch((error) => {errorSwal("Error", error);});
  }
}


    /*ENVIAR MODIFICAR DATOS
    let url = "php/coop24.php";
    var solicitud = new XMLHttpRequest();
    solicitud.addEventListener("load", function () {
      try {
        if (solicitud.status === 200) {
          if (solicitud.responseText.trim() === "ok") {
            successSwal("Artículo modificado", "Los datos han sido registrados")
          } else {
            errorSwal("Error de registro", "No se han podido modificar los datos");
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
}*/

  /* ENVIAR MOSTRAR ARTICULOS
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
}*/
/*
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
         errorSwal("Error","No se ha podido borrar");
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
*/
/*mostrar ARTICULOS MODIFICADOS
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
*/