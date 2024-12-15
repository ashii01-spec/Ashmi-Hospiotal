// Get the button and form elements
const btn_proceed = document.getElementById("btn_proceed");
const fullName = document.getElementById("fullName");
const phoneNumber = document.getElementById("phoneNumber");
const nicNumber = document.getElementById("nicNumber");
const durationDose = document.getElementById("durationDose");

// Add a click event listener to the button
btn_proceed.addEventListener("click", function () {
    // Validate form fields
    if (!fullName.value.trim()) {
        alert("Please enter your full name.");
        return;
    }
    if (!phoneNumber.value.trim() || phoneNumber.value.length < 10) {
        alert("Please enter a valid phone number with at least 10 digits.");
        return;
    }
    if (!nicNumber.value.trim()) {
        alert("Please enter your NIC number.");
        return;
    }
    if (!durationDose.value.trim()) {
        alert("Please enter the duration or dose.");
        return;
    }

    localStorage.setItem("Full Name", fullName.value);
    localStorage.setItem("Phone Number", phoneNumber.value);
    localStorage.setItem("NIC Number", nicNumber.value);
    localStorage.setItem("Duration or Dose", durationDose.value);

    // Redirect to the order.html page if validation passes
    window.location.href = "./order.html";
});
