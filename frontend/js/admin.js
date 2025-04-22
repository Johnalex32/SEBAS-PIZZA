document.addEventListener("DOMContentLoaded", () => {
    const listaPedidos = document.getElementById("listaPedidos");
    const listaMenu = document.getElementById("listaMenu");
  
    const formAgregar = document.getElementById("formAgregar");
    const nombreInput = document.getElementById("nombreProducto");
    const precioInput = document.getElementById("precioProducto");

  
    // Cargar pedidos
    function cargarPedidos() {
      fetch("http://localhost:3000/api/pedidos")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          listaPedidos.innerHTML = "";
          data.forEach(p => {
            const div = document.createElement("div");
    
            // Detalles del pedido
            const pedidoDetalles = `
              <h3>Pedido de ${p.nombre} (Mesa ${p.idMesa})</h3>
              <p>Total: $${parseFloat(p.total).toFixed(2)}</p>
              <p>Productos:</p>
              <ul>
                ${p.productos.map(detalle => `
                  <li>
                    ${detalle.productoNombre ? detalle.productoNombre : "Producto desconocido"} - 
                    Cantidad: ${detalle.cantidad} - 
                    Subtotal: $${parseFloat(detalle.subtotal || 0).toFixed(2)} 
                    ${detalle.ingredientes.length > 0 ? `<br><strong>Ingredientes:</strong> ${detalle.ingredientes.join(', ')}` : ''}
                  </li>
                `).join('')}
              </ul>
              <button class="eliminar-pedido" data-id="${p.idPedido}">🗑 Eliminar Pedido</button>
            `;
    
            div.innerHTML = pedidoDetalles;
            listaPedidos.appendChild(div);
          });
        })
        .catch(err => {
          console.error(err);
          alert("Error al obtener los pedidos.");
        });
    }

    // Escuchar clics para eliminar pedidos
listaPedidos.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar-pedido")) {
    const id = e.target.dataset.id;
    const confirmar = confirm("¿Estás seguro de eliminar este pedido?");
    if (confirmar) {
      fetch(`http://localhost:3000/api/pedidos/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(() => {
          alert("Pedido eliminado.");
          cargarPedidos();
        })
        .catch(err => {
          console.error(err);
          alert("Error al eliminar el pedido.");
        });
    }
  }
});
  
    // Cargar menú
    function cargarMenu() {
      fetch("http://localhost:3000/api/productos")
        .then(res => res.json())
        .then(productos => {
          listaMenu.innerHTML = "";
          productos.forEach(prod => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <span>${prod.nombre} (${prod.categoria}) - $${prod.precio}</span>
            <button data-id="${prod.idProducto}">Eliminar</button>`;
            listaMenu.appendChild(div);
          });
        });
    }
  
    // Agregar producto
    formAgregar.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevo = {
        nombre: nombreInput.value,
        precio: parseFloat(precioInput.value),
        idCategoria: parseInt(categoriaProducto.value) 
      };
      
  
      fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      })
        .then(res => res.json())
        .then(() => {
          formAgregar.reset();
          cargarMenu();
        });
    });
    //poner categoria al agregar el producto 
    function cargarCategorias() {
      fetch("http://localhost:3000/api/categorias")
        .then(res => res.json())
        .then(categorias => {
          const select = document.getElementById("categoriaProducto");
          select.innerHTML = '<option value="">Selecciona una categoría</option>'; // limpiar antes
          categorias.forEach(c => {
            const option = document.createElement("option");
            option.value = c.idCategoria;
            option.textContent = c.nombre;
            select.appendChild(option);
          });
        })
        .catch(err => {
          console.error("Error al cargar categorías:", err);
          alert("No se pudieron cargar las categorías.");
        });
    };
    //poner ingredientes al agregar producto 
    function cargarIngredientes() {
      fetch("http://localhost:3000/api/ingredientes")
        .then(res => res.json())
        .then(ingredientes => {
          const select = document.getElementById("ingredientesProducto");
          select.innerHTML = ''; // limpia antes de llenar
          ingredientes.forEach(i => {
            const option = document.createElement("option");
            option.value = i.idIngrediente;
            option.textContent = i.nombre;
            select.appendChild(option);
          });
        })
        .catch(err => {
          console.error("Error al cargar ingredientes:", err);
          alert("No se pudieron cargar los ingredientes.");
        });
    }

    
    // Eliminar producto
    listaMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const id = e.target.dataset.id;
        fetch(`http://localhost:3000/api/productos/${id}`, {
          method: "DELETE"
        })
          .then(() => cargarMenu());
      }
    });
  
    // Cambiar entre pestañas
    const btnPedidos = document.getElementById("btnPedidos");
    const btnMenu = document.getElementById("btnMenu");
  
    const seccionPedidos = document.getElementById("seccionPedidos");
    const seccionMenu = document.getElementById("seccionMenu");
  
    btnPedidos.addEventListener("click", () => {
      seccionPedidos.classList.add("active");
      seccionMenu.classList.remove("active");
      btnPedidos.classList.add("active");
      btnMenu.classList.remove("active");
      cargarPedidos();
    });
  
    btnMenu.addEventListener("click", () => {
      seccionMenu.classList.add("active");
      seccionPedidos.classList.remove("active");
      btnMenu.classList.add("active");
      btnPedidos.classList.remove("active");
      cargarMenu();
    });
  
    // Cargar la primera pestaña por defecto
    cargarPedidos();
    cargarCategorias();
    cargarIngredientes();
  });
  
  