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

  // 📍 Location fetch
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

    // ⏱ Backup
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


// ✅ MAIN FLOW (Sheet → WhatsApp)
function showSuccessAndSend(name, mobile, pickup, drop, note, locationLink) {

  document.getElementById("rideForm").style.display = "none";
  document.getElementById("successBox").style.display = "block";

  // ✅ STEP 1: Send to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbzsFOw5L8Xnchu090iOwtnQpZUjVC5HZV4p7DQCf2mEU0mLRx8JWzW5NSx1XI5a6gM5_g/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      mobile: mobile,
      pickup: pickup,
      drop: drop,
      note: note,
      location: locationLink
    })
  });

  // ✅ STEP 2: WhatsApp after slight delay
  setTimeout(() => {
    sendToWhatsApp(name, mobile, pickup, drop, note, locationLink);
  }, 1200);
}


// 📲 WhatsApp sender
function sendToWhatsApp(name, mobile, pickup, drop, note, locationLink) {

  const message = `🚕 *RAHI Ride Request*

👤 Name: ${name}
📞 Mobile: ${mobile}
📍 Pickup: ${pickup}
📍 Drop: ${drop}
📝 Note: ${note}

📌 Live Location:
${locationLink}`;

  const encoded = encodeURIComponent(message);
  const phoneNumber = "919277405966";

  const url = `https://wa.me/${phoneNumber}?text=${encoded}`;

  window.location.href = url;
}
