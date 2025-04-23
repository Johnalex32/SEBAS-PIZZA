const ADMIN_EMAIL = "admin@panel.com";
const ADMIN_PASSWORD = "123456";

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    errorMsg.textContent = "Correo o contraseña incorrectos.";
  }
}
