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

  // ✅ Disable button + UX
  const btn = document.getElementById("submitBtn");
  btn.innerText = "Processing...";
  btn.disabled = true;

  // ✅ Show success screen instantly
  document.getElementById("rideForm").style.display = "none";
  document.getElementById("successBox").style.display = "block";

  // 📍 Default location text (fast fallback)
  let locationLink = "Location not available";

  // ⚡ Send immediately (no delay waiting for GPS)
  sendToWhatsApp(name, mobile, pickup, drop, note, locationLink);

  // 📍 Try to get real location in background (max 2 sec)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        const liveLink = `https://www.google.com/maps?q=${lat},${long}`;

        // 👉 Optional: console log (future use)
        console.log("Live Location:", liveLink);
      },
      function () {
        console.log("Location permission denied");
      },
      { timeout: 2000 }
    );
  }
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

  const phoneNumber = "919277405966"; // 👈 change if needed

  const url = `https://wa.me/${phoneNumber}?text=${encoded}`;

  // ⏱ Smooth UX delay (1 sec)
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}
