
document.addEventListener("DOMContentLoaded", () => {

  const noteField = document.getElementById("note");

  noteField.addEventListener("focus", () => {
    noteField.placeholder = "";
  });

  noteField.addEventListener("blur", () => {
    if (noteField.value.trim() === "") {
      noteField.placeholder =
        "Note: No. of passengers, Gender (optional)";
    }
  });

  window.submitRide = function () {

    if (sessionStorage.getItem("rideSubmitted")) {
      alert("Ride already submitted 👍");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();
    const note = noteField.value || "Not mentioned";
    const btn = document.getElementById("submitBtn");

    if (!name || !mobile || !pickup || !drop) {
      alert("Please fill all required fields");
      return;
    }

    btn.disabled = true;
    btn.innerText = "Detecting location... ⏳";

    let lat = "Not shared";
    let lon = "Not shared";

    const proceed = () => {

      fetch("https://script.google.com/macros/s/AKfycbzsFOw5L8Xnchu090iOwtnQpZUjVC5HZV4p7DQCf2mEU0mLRx8JWzW5NSx1XI5a6gM5_g/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, mobile, pickup, drop, note, lat, lon,
          time: new Date().toLocaleString()
        })
      });

      sessionStorage.setItem("rideSubmitted", "yes");

      document.getElementById("rideForm").style.display = "none";
      document.getElementById("successBox").style.display = "block";

      const message =
`🚕 RAHI Ride Request

👤 Name: ${name}
📞 Mobile: ${mobile}
📍 Pickup: ${pickup}
🎯 Drop: ${drop}
📝 Note: ${note}
📡 Location: https://maps.google.com/?q=${lat},${lon}`;

      window.open(
        "https://wa.me/919277405966?text=" +
        encodeURIComponent(message),
        "_self"
      );
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
          proceed();
        },
        () => proceed(),
        { timeout: 8000 }
      );
    } else {
      proceed();
    }
  };

});