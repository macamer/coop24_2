
// - Funciones para crear elementos mediante el DOM -
// función para crear un elemento vacío mediante el DOM
export function crearElemento(tipo = "br", padre = contenido) {
  let elemento = document.createElement(tipo);
  padre.appendChild(elemento);
  return elemento;
}
// función para crear un elemento con contenido texto mediante el DOM
export function crearElementoTexto(texto = "Ejemplo", tipo = "div", padre = contenido) {
  let elemento = document.createElement(tipo);
  elemento.textContent = texto;
  padre.appendChild(elemento);
  return elemento;
}

export function enviarSelect() {
  var datos = new FormData();
  datos.append("opcion", "TC");
  console.log("estoy en enviar Select");
  let url = "php/coop24.php";
  var solicitud = new XMLHttpRequest();

  solicitud.addEventListener("load", function () {
    try {
      if (solicitud.status === 200) {
        if (solicitud.responseText.trim() !== "error") {
          mostrarCategoria(JSON.parse(solicitud.responseText));
        } else {
          errorSwal("Error","No hay categorias");
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
    console.log(opcion.value);
  });
}