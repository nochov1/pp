	var a = false;

     // Función para verificar la ubicación y controlar el acceso
function accesoPermitido(position) {
    document.documentElement.style.backgroundColor = 'none';
    document.documentElement.style.pointerEvents = 'auto'; 
    // Obtener las coordenadas del usuario
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;

    // Coordenadas permitidas 
    var latitudPermitida = -34.625444; // latitud permitida
    var longitudPermitida = -58.370306; //  longitud permitida

    // Verificar si las coordenadas están dentro del rango permitido 
    var rangoPermitido = 0.10; // Ajusta según sea necesario

    if (Math.abs(latitud - latitudPermitida) <= rangoPermitido && Math.abs(longitud - longitudPermitida) <= rangoPermitido) {
          document.querySelector('header').style.pointerEvents = 'auto';
    document.querySelector('.wrapper').style.pointerEvents = 'auto';
        console.log("Ubicación permitida. Puedes acceder a la página.");
    } else {
        alert("Acceso no autorizado. Serás redirigido.");
        window.location.href = "https://google.com"; // Reemplaza con tu dominio permitido
    }
       
}

// Función para manejar errores al obtener la ubicación o cuando el usuario rechaza el permiso
function errorObtenerUbicacion(error) {
    a = true;
       document.documentElement.style.backgroundColor = 'none';
    document.documentElement.style.pointerEvents = 'auto'; // Habilitar interacción

    // Restaurar la interacción específicamente para el header y el wrapper
    document.querySelector('header').style.pointerEvents = 'auto';
    document.querySelector('.wrapper').style.pointerEvents = 'auto';
   
    console.error("Error al obtener la ubicación:", error.message);

    alert("Porfavor, perimitinos tu ubicación para corrobar que estas en la oficina");
window.location.reload();

}

// Función principal para iniciar el proceso de verificación de ubicación
function verificarUbicacion() {
    document.documentElement.style.pointerEvents = 'none'; // Deshabilitar interacción en toda la página

    // Deshabilitar la interacción específicamente para el header y el wrapper
    document.querySelector('header').style.pointerEvents = 'none';
    document.querySelector('.wrapper').style.pointerEvents = 'none';

    navigator.geolocation.getCurrentPosition(accesoPermitido, errorObtenerUbicacion);
            
}

// Llamar a la función al cargar la página
verificarUbicacion();


     document.querySelector('.btn').addEventListener('click', function() {
            event.preventDefault(); // Evitar el envío predeterminado del formulario

            var qrCodeDiv = document.getElementById('qrcode');
            var texto = 'Hora: ' + new Date().toLocaleTimeString();;
            var qrcode = new QRCode(qrCodeDiv, {
                text: texto,
                width: 175,
                height: 175,
            });
	 		 		
 function actualizarCodigoQR() {
        texto = 'Hora: ' + new Date().toLocaleTimeString();
        qrcode.clear(); // Limpiar el código QR anterior
        qrcode.makeCode(texto); // Generar el nuevo código QR con el texto actualizado
    }

    // Actualizar el código QR inicialmente
    actualizarCodigoQR();

    // Establecer un intervalo para actualizar el código QR cada minuto
    setInterval(actualizarCodigoQR, 20000); 
  
    let formBoxQr = document.querySelector('.form-box.qr');
    formBoxQr.style.display = 'none';
        });

