function submitRide() {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const pickup = document.getElementById("pickup").value.trim();
  const drop = document.getElementById("drop").value.trim();
  const note = document.getElementById("note").value.trim();

  // ✅ Validation
  if (!name || !mobile || !pickup || !drop) {
    alert("Please fill all required fields");
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.innerText = "Getting Location...";
  btn.disabled = true;

  let sent = false;

  // 📍 Try getting location (max 4 sec)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        if (sent) return;

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const link = `https://www.google.com/maps?q=${lat},${long}`;

        sent = true;
        showSuccessAndSend(name, mobile, pickup, drop, note, link);
      },

      function () {
        if (!sent) {
          sent = true;
          showSuccessAndSend(name, mobile, pickup, drop, note, "Location not shared");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 4000
      }
    );

    // ⏱ Backup after 4 sec
    setTimeout(() => {
      if (!sent) {
        sent = true;
        showSuccessAndSend(name, mobile, pickup, drop, note, "Location not available");
      }
    }, 4000);

  } else {
    showSuccessAndSend(name, mobile, pickup, drop, note, "Location not supported");
  }
}

// ✅ Show success → then WhatsApp
function showSuccessAndSend(name, mobile, pickup, drop, note, locationLink) {

  document.getElementById("rideForm").style.display = "none";
  document.getElementById("successBox").style.display = "block";

  setTimeout(() => {
    sendToWhatsApp(name, mobile, pickup, drop, note, locationLink);
  }, 800);
}

// 📲 WhatsApp sender
function sendToWhatsApp(name, mobile, pickup, drop, note, locationLink) {

  const message = `🚕 *RAHI Ride Request*

👤 Name: ${name}
📞 Mobile: ${mobile}
📍 Pickup: ${pickup}
📍 Drop: ${drop}
📝 Note: ${note}

📌 Live Location (Tap to open):
${locationLink}`;

  const encoded = encodeURIComponent(message);
  const phoneNumber = "919277405966";

  const url = `https://wa.me/${phoneNumber}?text=${encoded}`;

  window.location.href = url;
}
