const links = document.querySelectorAll('.nav a');
const checkbox = document.getElementById('sidebar-active');

links.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1175) {
      checkbox.checked = false;
    }
  });
});

document.addEventListener('scroll', ()=>{
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50){
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
})

const rebootButton = document.getElementById('rebootButton');

rebootButton.addEventListener('click', ()=>{
    limpiarLocalStorage();
    location.reload();
})