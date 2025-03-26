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


