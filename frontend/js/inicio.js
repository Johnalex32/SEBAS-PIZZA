document.getElementById("formularioInicio").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const mesa = document.getElementById("mesa").value;
  
    if(nombre.trim() !== "" && mesa.trim() !== "") {
      // Guarda en localStorage para usarlo luego en el pedido
      localStorage.setItem("nombreCliente", nombre);
      localStorage.setItem("numeroMesa", mesa);
  
      // Redirige al menú principal
      window.location.href = "menu.html";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
  