function submitRide() {
    // Form ke saare fields ko get karo
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();
    const note = document.getElementById("note").value.trim();

    // Validation: Sab fields required hain
    if (!name || !mobile || !pickup || !drop) {
        alert("❌ Please fill all fields!");
        return;
    }

    // Mobile number validation (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        alert("❌ Enter valid 10-digit mobile number!");
        return;
    }

    // WhatsApp message banao
    const message = `🚕 Ride Request\n\nName: ${name}\nMobile: ${mobile}\nPickup: ${pickup}\nDrop: ${drop}\nNote: ${note}`;

    // WhatsApp URL - direct redirect
    const whatsappURL = `https://wa.me/919277405966?text=${encodeURIComponent(message)}`;

    // Success screen dikhaao
    document.getElementById("rideForm").style.display = "none";
    document.getElementById("successBox").style.display = "block";

    // Immediately WhatsApp par redirect karo
    window.location.href = whatsappURL;
}