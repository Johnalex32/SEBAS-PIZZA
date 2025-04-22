document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const lista = document.getElementById("listaPedido");
  const totalElem = document.getElementById("totalPedido");

  function renderPedido() {
    lista.innerHTML = "";
    let total = 0;
  
    carrito.forEach((item, index) => {
      const subtotal = Number(item.subtotal) || 0; 
  
      const div = document.createElement("div");
      div.classList.add("item");
  
      div.innerHTML = `
        <span>${item.nombre}</span>
        <span>
          <input type="number" min="1" value="${item.cantidad}" data-index="${index}" />
          $${subtotal.toFixed(2)}
        </span>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
  
      lista.appendChild(div);
      total += subtotal;
    });
  
    totalElem.textContent = `$${Number(total).toFixed(2)}`; 
  }
  

  // Cambiar cantidad
lista.addEventListener("input", (e) => {
  if (e.target.type === "number") {
    const index = parseInt(e.target.dataset.index);
    const nuevaCantidad = parseInt(e.target.value);

    if (nuevaCantidad >= 1) {
      carrito[index].cantidad = nuevaCantidad;
      carrito[index].subtotal = nuevaCantidad * carrito[index].precio;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderPedido();
    }
  }
});

// Eliminar producto
lista.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderPedido();
  }

});



  // Botón atrás
  document.getElementById("btnAtras").addEventListener("click", () => {
    window.location.href = "menu.html";
  });

  // ✅ Confirmar pedido (CORREGIDO)
  document.getElementById("btnConfirmar").addEventListener("click", () => {
    const nombreCliente = document.getElementById("nombreCliente").value.trim();
    const idMesa = parseInt(document.getElementById("mesaCliente").value);
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!nombreCliente || !idMesa || carrito.length === 0) {
      alert("Completa todos los campos y agrega productos.");
      return;
    }

    const total = carrito.reduce((sum, item) => sum + Number(item.subtotal), 0);

    fetch("http://localhost:3000/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pedido: {
        idMesa,
        nombre: nombreCliente,
        total
      },
      items: carrito.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }))
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("¡Pedido enviado con éxito!");
        localStorage.removeItem("carrito");
        window.location.href = "inicio.html";
      })
      .catch(err => {
        console.error(err);
        alert("Error al enviar el pedido.");
      });
  });

  renderPedido();
});