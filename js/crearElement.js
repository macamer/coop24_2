
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