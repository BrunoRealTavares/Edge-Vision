// js/login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.getElementById("togglePasswordIcon");

    // ── 1. LÓGICA PARA EXIBIR / OCULTAR A SENHA (ÍCONE DO OLHO) ──
    if (togglePasswordIcon && passwordInput) {
        togglePasswordIcon.addEventListener("click", () => {
            // Se o input for do tipo password, muda para text (revela a senha)
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePasswordIcon.classList.remove("fa-eye");
                togglePasswordIcon.classList.add("fa-eye-slash"); // Muda o ícone
            } else {
                // Se for text, volta para password (esconde a senha)
                passwordInput.type = "password";
                togglePasswordIcon.classList.remove("fa-eye-slash");
                togglePasswordIcon.classList.add("fa-eye"); // Volta o ícone original
            }
        });
    }

    // ── 2. LÓGICA DE VALIDAÇÃO E REDIRECIONAMENTO AUTOMÁTICO ──
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede a página de recarregar sozinha ao submeter

            const usernameValue = document.getElementById("username").value.trim();
            const passwordValue = passwordInput.value.trim();

            // REGRAS DE AUTENTICAÇÃO (Podes alterar o utilizador e a senha para o que o teu grupo quiser)
            const usuarioCorreto = "admin";
            const senhaCorreta = "1234";

            if (usernameValue === usuarioCorreto && passwordValue === senhaCorreta) {
                
                // Grava na memória temporária do navegador que o utilizador fez login com sucesso
                localStorage.setItem("logado", "true");

                // 🚀 REDIRECIONAMENTO AUTOMÁTICO PARA A TELA PRINCIPAL (INDEX COM A SIDEBAR)
                window.location.href = "index.html";

            } else {
                // Mensagem de alerta caso erre os dados
                alert("Utilizador ou Senha incorretos! Tente novamente.");
                
                // Limpa o campo de senha por segurança
                if (passwordInput) passwordInput.value = "";
            }
        });
    }
});