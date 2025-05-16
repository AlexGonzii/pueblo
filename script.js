// Coordenadas del punto de interés
const puntos = [
  { nombre: "Xana", lat: 43.53779144138988, lng: -5.634317296148588, url: "img/trasgu.png" },
  { nombre: "Trasgu", lat: 43.53736774871342, lng: -5.635168098916726, url: "img/trasgu.png" },
  { nombre: "Trasgu Moderno", lat: 43.537575345355, lng: -5.634614677200744, url: "img/trasgu.png" },
  { nombre: "Xana Moderna", lat: 43.53740891279097, lng: -5.634715167256559, url: "img/trasgu.png" },
  { nombre: "Nuberu", lat: 43.537541184266516, lng: -5.633684652618118, url: "img/trasgu.png" },
  { nombre: "Cuélebre", lat: 43.53750263415643, lng: -5.633910836576425, url: "img/trasgu.png" },
  {nombre: "4", lat:43.52567989312455, lng: -5.6815715503132385, url: "img/trasgu.png" },
  {nombre: "5", lat:43.52577542548395, lng:-5.675305790301615, url: "img/trasgu.png" }
];

// URLs de mapas
const basica = 'https://api.maptiler.com/maps/streets/style.json?key=aD1i3AUWKXjP9B8oymC7';
const hibrida = 'https://api.maptiler.com/maps/hybrid/style.json?key=aD1i3AUWKXjP9B8oymC7';
let vistaActual = basica;
let seguimientoID = null;
let marcadorUsuario = null;

// Inicializar el mapa
const map = new maplibregl.Map({
  container: 'mapa',
  style: basica,
  center: [-5.6342014631553985, 43.5373875201621],
  zoom: 17.5
});

// Variable del marcador del usuario
let marca = null;

// Botón de localización
document.getElementById('boton-localizacion').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo({ center: [longitude, latitude], zoom: 17 });
        if (marca) {
          marca.setLngLat([longitude, latitude]);
        } else {
          marca = new maplibregl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .setPopup(new maplibregl.Popup().setText("Tú estás aquí"))
            .addTo(map);
        }
      },
      () => alert('No se pudo obtener tu ubicación')
    );
  }
});

// Añadir marcadores con popup y superposición de imagen decorativa
puntos.forEach(punto => {
  // Marcador interactivo con popup
  const marker = new maplibregl.Marker({ color: 'blue' })
    .setLngLat([punto.lng, punto.lat])
    .addTo(map);

  // Imagen decorativa encima del marcador
  if(punto.url){
  const imgOverlay = document.createElement('img');
    imgOverlay.src = punto.url;
    imgOverlay.style.width = '30px';
    imgOverlay.style.height = '30px';
    imgOverlay.style.border = 'none';
    imgOverlay.style.background = 'none';
    imgOverlay.style.pointerEvents = 'none';
    imgOverlay.style.cursor = 'pointer';

  // Añadir marcador con offset hacia arriba (Y negativo)
  new maplibregl.Marker({ element: imgOverlay, offset: [0, -20] }) // sube 35px
    .setLngLat([punto.lng, punto.lat])
    .addTo(map);
  }
  // Evento de clic en el marcador
  marker.getElement().addEventListener('click', () => {
    if (marca) {
      const userCoords = [marca.getLngLat().lng, marca.getLngLat().lat];
      const destinoCoords = [punto.lng, punto.lat];

      // Calcular la distancia entre el marcador y el usuario
      const distancia = turf.distance(turf.point(userCoords), turf.point(destinoCoords), { units: 'meters' });

      // Si la distancia es menor o igual a 20 metros
      if (distancia <= 20) {
        // Redirigir o abrir nueva ventana
        window.location.href = "movil.html";
      } else {
        alert("Estás demasiado lejos para interactuar con este marcador.");
      }
    } else {
      alert("Tu ubicación no ha sido detectada.");
    }
  });
});

// Botón para cambiar estilo del mapa
const boton = document.getElementById("boton-imagen");
boton.addEventListener("click", function () {
  if (vistaActual === basica) {
    map.setStyle(hibrida);
    vistaActual = hibrida;
    boton.src = "img/gijon2.jpg";
  } else {
    map.setStyle(basica);
    vistaActual = basica;
    boton.src = "img/gijon.jpg";
  }
});
