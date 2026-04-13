// Script.js - Geolocation and Google Maps Link Generation for WhatsApp Ride Requests

function generateWhatsAppLink() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const message = 'I am here: Google Maps Link';
            const link = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
            const encodedMessage = encodeURIComponent(message + '\n' + link);
            const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
            window.open(whatsappUrl);
        }, function() {
            alert('Geolocation access denied.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function for "View Map" button
function openLocation() {
    generateWhatsAppLink();
}

// Function for "Chat Now" button
function openWhatsApp() {
    generateWhatsAppLink();
}