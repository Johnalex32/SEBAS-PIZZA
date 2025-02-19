  // Función para cambiar entre plantillas
  function cambiarPlantilla(nombrePlantilla) {
    const contenidoDiv = document.getElementById('contenido');
    const plantilla = document.querySelector(`template.${nombrePlantilla}`);
    
    if (plantilla && contenidoDiv) {
        contenidoDiv.innerHTML = plantilla.innerHTML;
    } else {
        console.error('Plantilla o contenedor no encontrado.');
    }
}

// Configurar eventos para botones
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        const boton = event.target.closest('button[data-plantilla]');
        if (boton) {
            const plantilla = boton.getAttribute('data-plantilla');
            cambiarPlantilla(plantilla);
        }
    });
});


function toggleDropdown(button) {
    closeAllDropdowns(); // Cierra todas las listas antes de abrir una nueva
    let dropdownContent = button.nextElementSibling;
    dropdownContent.classList.toggle("show");
}

function changePrice(option, price) {
    let dropdownContainer = option.closest(".dropdown-container");
    let priceButton = dropdownContainer.querySelector(".price-button");
    priceButton.innerText = "Precio: $" + price;
    dropdownContainer.querySelector(".dropdown-content").classList.remove("show");
}

function closeAllDropdowns() {
    let dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(dropdown => dropdown.classList.remove("show"));
}

// Cierra los menús si el usuario hace clic fuera de ellos
window.onclick = function(event) {
    if (!event.target.matches("button")) {
        closeAllDropdowns();
    }
};