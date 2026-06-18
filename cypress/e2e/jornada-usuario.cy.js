describe('Testes de Fluxo Completo - Edge Vision', () => {

    // Executa antes de cada teste para abrir o site na página inicial
    beforeEach(() => {
        // Abre a página inicial de login usando a porta ativa do servidor
        cy.visit('/index.html');
    });

    it('Deve garantir a acessibilidade e navegação completa pelo sistema', () => {
        // 1. Valida o título na página inicial (index.html)
        cy.contains('Acesso Secure').should('be.visible');

        // 2. Verifica o VLibras aqui no index, onde ele está instalado!
        cy.get('[vw]', { timeout: 10000 }).should('exist');
        cy.get('[vw-access-button]', { timeout: 10000 }).should('be.visible');

        // 3. Segue a navegação para as outras páginas do sistema
        cy.visit('/src/pages/inicio.html');
        cy.url().should('include', 'inicio.html');

        cy.visit('/src/pages/relatorios.html');
        cy.url().should('include', 'relatorios.html');

        cy.visit('/src/pages/controle.html');
        cy.url().should('include', 'controle.html');

        cy.visit('/src/pages/funcoes.html');
        cy.url().should('include', 'funcoes.html');

        cy.visit('/src/pages/adicionar.html');
        cy.url().should('include', 'adicionar.html');
    });
});