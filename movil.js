
document.getElementById("cerrar").addEventListener("click", function(){
    window.location.href = "mapa.html";
});

const raButton = document.getElementById('ra');
const objetoButton = document.getElementById('objeto');

// Evento para RA
raButton.addEventListener('click', () => {
    // Si RA no está activo, activarlo y desactivar Objeto
    if (!raButton.classList.contains('active')) {
        raButton.classList.add('active');
        objetoButton.classList.remove('active');
    }
});

// Evento para Objeto
objetoButton.addEventListener('click', () => {
    // Si Objeto no está activo, activarlo y desactivar RA
    if (!objetoButton.classList.contains('active')) {
        objetoButton.classList.add('active');
        raButton.classList.remove('active');
    }
});

navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: "environment" // Esto pide la cámara trasera
    }
})
    .then(stream => {
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error("Error al acceder a la cámara:", err);
    });
