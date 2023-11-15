import { API } from 'aws-amplify';

document.getElementById('health-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento de envío predeterminado

    // Recopilar datos del formulario
    let formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Enviar datos al servidor usando AWS Amplify
    API.post('API', '/prod', { // Asegúrate de que 'API' y '/prod' coincidan con tu configuración de Amplify
        body: data
    })
    .then(response => {
        mostrarResultados(response);
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud: ' + error.message); // Mostrar error al usuario
    });
});

function mostrarResultados(data) {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;

    // Mostrar el modal
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Código para manejar el cierre del modal
let closeButton = document.querySelector(".close");
closeButton.onclick = function() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
