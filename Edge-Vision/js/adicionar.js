document.addEventListener("DOMContentLoaded", () => {
    const userProfile = document.querySelector(".user-profile");
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main");

    // Lógica corrigida para alternar menu (suporta Desktop e Mobile)
    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener("click", () => {
            if (window.innerWidth > 768) {
                // No Desktop: Recolhe a lateral empurrando o conteúdo
                sidebar.classList.toggle("hidden");
                mainContent.classList.toggle("expanded");
            } else {
                // No Mobile: Sobrepõe a barra lateral na tela
                sidebar.classList.toggle("active-mobile");
            }
        });
    }

    if (userProfile) {
        userProfile.addEventListener("click", () => {
            console.log("Perfil do administrador clicado!");
        });
    }

    // Interatividade visual nos itens do menu
    const menuItems = document.querySelectorAll(".menu li");
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

/**
 * Função gatilho para o botão de criar um Novo Despacho
 */
function novoDespacho() {
    alert("Ação detectada: Abrindo o formulário de cadastro para um novo despacho.");
}