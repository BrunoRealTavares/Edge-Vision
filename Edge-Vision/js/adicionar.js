/**
 * Alterna a visibilidade do menu lateral (Sidebar)
 * Adapta o comportamento caso o usuário esteja no Desktop ou Mobile
 */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    
    // Identifica se a tela é de um dispositivo móvel (menor ou igual a 768px)
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('active-mobile');
    } else {
        sidebar.classList.toggle('hidden');
        main.classList.toggle('expanded');
    }
}

/**
 * Função gatilho para o botão de criar um Novo Despacho
 */
function novoDespacho() {
    alert("Ação detectada: Abrindo o formulário de cadastro para um novo despacho.");
    // Aqui você poderá futuramente programar a abertura de um Modal ou redirecionamento.
}