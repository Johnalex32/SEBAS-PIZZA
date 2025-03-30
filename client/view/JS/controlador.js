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
        window.scrollTo(0, 0);
    });
});


// configuracion para el resgistro de inicio 
document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.querySelector('.btnRegister');

    btnRegister.addEventListener('click', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById('nombre').value.trim();
        const numeroMesa = document.getElementById('numeroMesa').value.trim();

        if (!nombre || !numeroMesa) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    numeroMesa: numeroMesa
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Registro exitoso');
                console.log('✅ Datos guardados:', data);
            } else {
                alert(`❌ Error: ${data.error || 'Ocurrió un error inesperado'}`);
            }
        } catch (error) {
            console.error('❌ Error en la solicitud:', error);
            alert('❌ Error en la conexión con el servidor.');
        }
    });
});



