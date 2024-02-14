
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

export function mostrarElementos(contenedor,id,direccionImagen,descr,nombre,precio,boton,contadorProductos) {

      let filaContainer;
      if (contadorProductos % 3 === 0) {
        filaContainer = crearElemento("div", contenedor);
        filaContainer.classList.add("fila");
      }

      const contenedorP = crearElemento("div", filaContainer);
      contenedorP.classList.add("contenedorP");

      let producto = crearElemento("div", contenedorP);
      producto.classList.add("producto", "container");
      producto.value = id;

      let imagen = crearElemento("img", producto);
      imagen.classList.add("img-fluid", "border");
      imagen.src = direccionImagen; // Ajusta la ruta según tu estructura de archivos
      imagen.alt = descr;

      let nom = crearElementoTexto(nombre, "p", producto);
      nom.classList.add("nombre"); // Ajusta según tu necesidad

      let precioP = crearElementoTexto("Precio: $" + parseFloat(precio).toFixed(2),"p",producto);
      precioP.classList.add("precio");
      
      boton();

      // Incrementar el contador de productos
      contadorProductos++;
}