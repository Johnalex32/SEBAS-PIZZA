document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idCategoria = urlParams.get("categoria");
  const nombreCategoria = urlParams.get("nombre");

  document.getElementById("tituloCategoria").textContent = nombreCategoria;

  // Botón atrás
  document.getElementById("btnAtras").addEventListener("click", () => {
    window.location.href = "menu.html";
  });

  // Botón carrito
  document.getElementById("btnCarrito").addEventListener("click", () => {
    window.location.href = "pedido.html";
  });

  // Obtener productos desde el backend
  fetch(`http://localhost:3000/api/productos/categoria/${idCategoria}`)
    .then(res => res.json())
    .then(productos => {
      const contenedor = document.getElementById("listaProductos");

      productos.forEach(producto => {
        console.log(producto); // 👈 revisa si ingredientes ya es array
        const div = document.createElement("div");
        div.classList.add("producto");

        const ingredientes = producto.ingredientes ? producto.ingredientes.join(", ") : "Sin ingredientes";

        div.innerHTML = `
          <h3>${producto.nombre}</h3>
          <div class="precio" data-id="${producto.idProducto}">$${producto.precio}</div>
          <div class="ingredientes">${ingredientes}</div>
          <button class="btn-agregar" data-id="${producto.idProducto}">+</button>
        `;

        contenedor.appendChild(div);
      });

      // Eventos después de cargar los productos

      contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("precio")) {
          e.target.classList.toggle("clickeado");
        }

        if (e.target.classList.contains("btn-agregar")) {
          const id = parseInt(e.target.dataset.id);
          let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

          const producto = productos.find(p => p.idProducto === id);
          const yaEsta = carrito.find(p => p.idProducto === id);

          if (yaEsta) {
            yaEsta.cantidad += 1;
            yaEsta.subtotal = yaEsta.precio * yaEsta.cantidad;
          } else {
            carrito.push({
              idProducto: producto.idProducto,
              nombre: producto.nombre,
              precio: producto.precio,
              cantidad: 1,
              subtotal: producto.precio
            });
          }

          localStorage.setItem("carrito", JSON.stringify(carrito));
          alert("Producto agregado al carrito");
        }
      });
    })
    .catch(error => {
      console.error("Error al obtener productos:", error);
    });
});