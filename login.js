// public/login.js
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      // Store token or redirect user
      // localStorage.setItem('token', data.token);
      // window.location.href = 'tracker.html';
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred while logging in.');
  }
});
