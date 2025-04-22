

document.addEventListener("DOMContentLoaded", () => {
    const cliente = localStorage.getItem("nombreCliente");
    const mesa = localStorage.getItem("numeroMesa");
    document.getElementById("cliente").textContent = `Cliente: ${cliente} | Mesa: ${mesa}`;
  
    // Categorías fijas basadas en tu base de datos
    const categorias = [
      { id: 1, nombre: "Pizza", image:"/frontend/img/categorias/pizza.jpg" },
      { id: 2, nombre: "Hamburguesa", image:"/frontend/img/categorias/hamburguesa.jpg" },
      { id: 3, nombre: "Perro", image:"/frontend/img/categorias/hotdog.jpg" },
      { id: 4, nombre: "Salchipapa", image:"/frontend/img/categorias/salchipapas.jpg" },
      { id: 5, nombre: "Platos a la carta", image:"/frontend/img/categorias/platos.jpg" },
      { id: 6, nombre: "Bebida", image:"/frontend/img/categorias/bebidas.jpg" }
    ];
  
    const contenedor = document.getElementById("categorias");
  
    categorias.forEach(categoria => {
      const div = document.createElement("div");
      div.classList.add("categoria");

      // Agregar imagen de fondo usando inline style
      div.style.backgroundImage = `url('${categoria.image}')`;
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";

      // Crear un span para el texto encima de la imagen
      const span = document.createElement("span");
      span.textContent = categoria.nombre;
      div.appendChild(span);

      div.addEventListener("click", () => {
        // Al hacer clic, redirige a la vista de productos por categoría
        window.location.href = `productos.html?categoria=${categoria.id}&nombre=${encodeURIComponent(categoria.nombre)}`;
      });
      contenedor.appendChild(div);
    });
  });
  
  