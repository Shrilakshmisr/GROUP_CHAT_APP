document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;

  const userData = {
    name,
    email,
    phone,
    password
  };

  console.log('User Data:', userData);

  alert('Signup form submitted (no backend connected yet)');
});
