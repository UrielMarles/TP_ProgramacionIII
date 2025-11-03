// ==================== FUNCIONES GLOBALES ====================

// Cambiar estado de libro
async function cambiarEstadoLibro(id, activar) {
    const accion = activar ? 'activar' : 'desactivar';
    
    if (!confirm(`¿Está seguro que desea ${accion} este libro?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/libros/${id}/estado`, {
            method: 'PATCH'
        });
        
        if (response.ok) {
            alert(`Libro ${activar ? 'activado' : 'desactivado'} exitosamente`);
            location.reload();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error al cambiar el estado del libro');
        console.error(error);
    }
}

// Cambiar estado de juego
async function cambiarEstadoJuego(id, activar) {
    const accion = activar ? 'activar' : 'desactivar';
    
    if (!confirm(`¿Está seguro que desea ${accion} este juego?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/juegos/${id}/estado`, {
            method: 'PATCH'
        });
        
        if (response.ok) {
            alert(`Juego ${activar ? 'activado' : 'desactivado'} exitosamente`);
            location.reload();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error al cambiar el estado del juego');
        console.error(error);
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalConfirmar').style.display = 'none';
}

// Preview de imagen al seleccionar archivo
document.addEventListener('DOMContentLoaded', function() {
    const inputImagen = document.getElementById('imagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    let preview = document.querySelector('.preview-image');
                    if (!preview) {
                        preview = document.createElement('div');
                        preview.className = 'preview-image';
                        inputImagen.parentElement.appendChild(preview);
                    }
                    preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Validación del formulario de juego
const formJuego = document.getElementById('formJuego');
if (formJuego) {
    formJuego.addEventListener('submit', function(e) {
        const minJugadores = parseInt(document.getElementById('minJugadores').value);
        const maxJugadores = parseInt(document.getElementById('maxJugadores').value);
        
        if (maxJugadores < minJugadores) {
            e.preventDefault();
            alert('El máximo de jugadores debe ser mayor o igual al mínimo');
            return false;
        }
    });
}

console.log('✅ Admin JS cargado correctamente');