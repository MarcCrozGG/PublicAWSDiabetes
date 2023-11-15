document.getElementById('health-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir el comportamiento de envío predeterminado
    
    // Recopilar datos del formulario
    let formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Enviar datos al servidor
    fetch('https://5zkno94cj7.execute-api.us-east-2.amazonaws.com/prod', { // URL de tu API Gateway
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Agrega aquí cualquier otro header que tu API requiera
        },
        body: JSON.stringify(data)  // Convertir datos a formato JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();  // Convertir respuesta a formato JSON
    })
    .then(data => {
        // Mostrar los datos en el modal
        mostrarResultados(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error al procesar la solicitud: ' + error.message); // Mostrar error al usuario
    });
});

function mostrarResultados(data) {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    if (Array.isArray(data)) {
        data.forEach(row => {
            outputDiv.innerHTML += `<pre>${JSON.stringify(row, null, 2)}</pre>`;
        });
    } else {
        outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    // Mostrar el modal
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Cerrar el modal al hacer clic en el botón de cerrar
    let closeButton = document.querySelector(".close");
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
