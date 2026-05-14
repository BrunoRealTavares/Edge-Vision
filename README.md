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
Crie seus arquivos HTML e CSS. Quando TERMINAR  SUA PÁGINA, envie do seu PC para o GitHub:

````Bash
git add .
````
````Bash
git commit -m "Explique o que você fez"
````
````Bash
git push origin feature/nome-da-sua-branch
````
