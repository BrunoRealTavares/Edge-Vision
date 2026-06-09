# 🛡️ Edge-Vision: Sentinela de Segurança Industrial
> **Repositório Oficial do Projeto de Monitoramento e Prevenção de Acidentes.**

---

## 👥 Organização do Time (Full-Stack Squad)
Nesta etapa, todos os membros atuam no desenvolvimento técnico e na gestão do projeto:

* **Felipe (Scrum Master):** Gestão de integração, conflitos de código e Desenvolvimento da tela **Funções Principais**.
* **Bruno (Product Owner):** Visão do produto, requisitos de negócio e Desenvolvimento da tela **Relatórios**.
* **Eduardo Michel:** Desenvolvimento da Tela **Início (Dashboard)**.
* **Pedro Lucas:** Desenvolvimento da Tela de **Login**.
* **Cassio:** Desenvolvimento do **Controle de Acesso**.
* **Arthur Pereira:** Desenvolvimento de **Adicionar Despachos**.

---

## 🚀 Guia de Configuração (Passo a Passo)
##SEMPRE QUE COPIAREM UM CÓDIGO E ENVIAREM SE CASO DE ERRO COPIE A MENSAGEM DE ERRO E COLOQUE NO GEMINI E VEJA COMO PROSSEGUIR##

Siga estas etapas para preparar seu ambiente de trabalho no VS Code.

### 1. Clonando o Repositório
Abra o seu terminal (ou CMD) e digite:
```bash
git clone https://github.com/BrunoRealTavares/Edge-Vision.git
````
### 2. Configurar o Terminal (Git Bash no VS Code)
Para evitar erros do PowerShell, configure o Git Bash:

1- No VS Code, abra o terminal integrado (Ctrl + ').

2- Clique na setinha para baixo (ao lado do símbolo de + no terminal).

3- Clique em Select Default Profile (Selecionar Perfil Padrão).

4- Escolha Git Bash.

5- Feche o terminal e abra novamente. Ele deve exibir o símbolo $ em vez de PS.

### 3. Identificação no Computador Local (Obrigatório)
O Git precisa saber quem está fazendo as alterações no PC. Rode isso no terminal:

````Bash
git config user.name "Seu Nome e Sobrenome"

````
`````Bash
git config user.email "seu.email@exemplo.com"
``````

### 4. Criando sua Branch Local
O código não vai direto para o GitHub. Cada membro cria um galho no próprio computador:

Pedro Lucas:
````````Bash 
git checkout -b feature/login
````````
Eduardo Michel:
````Bash
git checkout -b feature/inicio
````
Felipe:
````Bash
git checkout -b feature/funcoes
````
Cassio:
````Bash
git checkout -b feature/controle
````
Arthur Pereira:
`````Bash
git checkout -b feature/adicionar
``````
Bruno:
`````Bash
git checkout -b feature/relatorios
``````
### 5. Fluxo de Trabalho (Local -> Nuvem)
## 🎨 Uso Obrigatório do CSS Global (Padrão Visual)

Para garantir que o Edge-Vision tenha um design unificado e profissional, nós criamos o arquivo `css/global.css`. **Ele já contém a fonte oficial (DM Sans) e todas as cores do projeto.** Nenhum desenvolvedor deve inventar ou copiar códigos HEX de cores avulsas. Vocês **devem** usar as variáveis do Global CSS.

### 1. Como importar na sua página:
Dentro do `<head>` do seu arquivo HTML (na pasta `pages/`), adicione o link para o CSS global *antes* do seu CSS específico:
```html
<link rel="stylesheet" href="../css/global.css">
````
````html
<link rel="stylesheet" href="../css/sua-tela.css">
````

Crie seus arquivos HTML e CSS. 

### Pedro Lucas (Login):
**pages/login.html
css/login.css
js/login.js**

### Eduardo Michel (Início/Dashboard):
**pages/inicio.html
css/inicio.css
js/inicio.js**

### Felipe (Funções Principais):
**pages/funcoes.html
css/funcoes.css
js/funcoes.js**

### Cassio (Controle de Acesso):
**pages/controle.html
css/controle.css
js/controle.js**

### Arthur Pereira (Adicionar Despachos):
**pages/adicionar.html
css/adicionar.css
js/adicionar.js**

### Bruno (Relatórios):
**pages/relatorios.html
css/relatorios.css
js/relatorios.js**

Quando TERMINAR  SUA PÁGINA, envie do seu PC para o GitHub:

````Bash
git add .
````
````Bash
git commit -m "Explique o que você fez"
````
````Bash
git push origin feature/nome-da-sua-branch
````


##HTML
<!-- COPIAR A PARTIR DAQUI PARA COLOCAR NO TOPO DO <main> -->
<header class="topbar d-flex justify-content-between align-items-center" style="padding: 1.5rem 2rem; border-bottom: 1px solid #eaeef3; background-color: #ffffff;">
    <div class="user-welcome">
        <h1 class="fw-bold text-dark mb-1" style="font-size: 24px; margin: 0;">Olá!</h1>
        <p class="text-secondary mb-0 small" style="font-size: 14px;">Bem-vindo ao painel de monitoramento</p>
    </div>

    <div class="user-profile d-flex align-items-center">
        <div class="info text-end me-3">
            <span class="name d-block fw-bold text-dark" style="font-size: 13px; line-height: 1.2;">Meu perfil</span>
            <small class="role text-muted d-block" style="font-size: 11px;">Administrador</small>
        </div>
        <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
            style="width: 38px; height: 38px; background-color: #0d6efd;">
            <i class="bi bi-person" style="font-size: 18px;"></i>
        </div>
        <i class="bi bi-chevron-down text-secondary ms-2" style="font-size: 11px;"></i>
    </div>
</header>
<!-- FIM DO BLOCO DA TOPBAR -->

##CSS

/* --- BLOCO DA TOPBAR PARA COMPARTILHAR --- */
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 15px 30px;
    border-bottom: 1px solid #eaeef3;
    min-height: 70px;
}

.topbar .user-welcome h1 {
    font-size: 24px;
    color: #1e293b;
    margin: 0;
}

.topbar .user-welcome p {
    font-size: 13px;
    color: #64748b;
    margin: 0;
}

.topbar .user-profile {
    cursor: pointer;
    user-select: none;
}

.topbar .user-profile .info .name {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
}

.topbar .user-profile .info .role {
    font-size: 11px;
    color: #94a3b8;
}

.topbar .user-profile .avatar {
    width: 38px;
    height: 38px;
    background-color: #0d6efd;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.topbar .user-profile:hover .avatar {
    background-color: #0b5ed7; /* Efeito de hover discreto no avatar */
}

##Javascript

// --- LOGICA DA TOPBAR PARA COMPARTILHAR ---
document.addEventListener("DOMContentLoaded", () => {
    const userProfile = document.querySelector(".user-profile");

    if (userProfile) {
        userProfile.addEventListener("click", () => {
            // Aqui entra a lógica caso queiram abrir um menu dropdown de perfil no futuro
            console.log("Perfil do administrador clicado!");
        });
    }
});

