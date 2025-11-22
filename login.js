const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    alert('Please fill in both email and password.');
    return;
  }

  // Dummy validation - replace with real auth call
  if (email === "admin@example.com" && password === "password123") {
    alert("✅ Login successful!");
    // Redirect to dashboard or main page
    window.location.href = "index.html";
  } else {
    alert("❌ Invalid email or password.");
  }
});
