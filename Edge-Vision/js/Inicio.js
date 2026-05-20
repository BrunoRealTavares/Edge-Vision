const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
});

/* Hover interativo nos cards */
const employeeItems = document.querySelectorAll('.employee-item');

employeeItems.forEach(item => {

  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-4px)';
    item.style.transition = '0.3s ease';
    item.style.boxShadow = '0 10px 25px rgba(15,23,42,0.08)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0px)';
    item.style.boxShadow = 'none';
  });

});

/* Simulação de atualização ao vivo */
const liveBadge = document.querySelector('.live-badge');

setInterval(() => {

  liveBadge.style.opacity = '0.6';

  setTimeout(() => {
    liveBadge.style.opacity = '1';
  }, 500);

}, 1000);