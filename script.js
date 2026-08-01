const button = document.getElementById('change-theme');

button.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
