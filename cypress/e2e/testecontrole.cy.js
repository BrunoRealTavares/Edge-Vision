describe('Dashboard de Controle de Acesso', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:5501/controle.html');
    });

    it('Deve carregar a página corretamente', () => {
        cy.contains('Olá!').should('be.visible');

        cy.contains('Bem-vindo ao painel de monitoramento')
            .should('be.visible');

        cy.contains('Meu perfil')
            .should('be.visible');

        cy.contains('Administrador')
            .should('be.visible');
    });

    it('Deve exibir os cards com os valores corretos', () => {

        cy.get('#total-count')
            .should('contain', '6');

        cy.get('#allowed-count')
            .should('contain', '5');

        cy.get('#denied-count')
            .should('contain', '1');
    });

    it('Deve exibir todos os registros na tabela', () => {

        cy.get('#tableBody tr')
            .should('have.length', 6);

        cy.contains('João Silva')
            .should('be.visible');

        cy.contains('Maria Santos')
            .should('be.visible');

        cy.contains('Usuário Desconhecido')
            .should('be.visible');
    });

    it('Deve filtrar registros por nome', () => {

        cy.get('#searchInput')
            .type('João');

        cy.get('#tableBody tr')
            .should('have.length', 1);

        cy.contains('João Silva')
            .should('be.visible');
    });

    it('Deve filtrar registros por crachá', () => {

        cy.get('#searchInput')
            .type('A-1237');

        cy.get('#tableBody tr')
            .should('have.length', 1);

        cy.contains('Ana Oliveira')
            .should('be.visible');
    });

    it('Deve atualizar os contadores após a busca', () => {

        cy.get('#searchInput')
            .type('Usuário');

        cy.get('#total-count')
            .should('contain', '1');

        cy.get('#allowed-count')
            .should('contain', '0');

        cy.get('#denied-count')
            .should('contain', '1');
    });

    it('Deve exibir o status Permitido corretamente', () => {

        cy.contains('.status', 'Permitido')
            .should('exist');
    });

    it('Deve exibir o status Negado corretamente', () => {

        cy.contains('.status', 'Negado')
            .should('exist');
    });

    it('Deve limpar a busca e restaurar todos os registros', () => {

        cy.get('#searchInput')
            .type('João');

        cy.get('#tableBody tr')
            .should('have.length', 1);

        cy.get('#searchInput')
            .clear();

        cy.get('#tableBody tr')
            .should('have.length', 6);

        cy.get('#total-count')
            .should('contain', '6');
    });

    it('Deve exibir o ícone de perfil', () => {

        cy.get('.avatar')
            .should('be.visible');
    });

});