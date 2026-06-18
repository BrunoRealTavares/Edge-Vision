describe('Testes da Página de Controle de Acesso - Edge Vision', () => {

    beforeEach(() => {
        // Abre a página de controle de acesso usando o servidor local ativo
        cy.visit('/src/pages/controle.html');
    });

    it('Deve carregar os contadores, a barra de busca e a tabela de registros', () => {
        // 1. Valida o título e subtítulo da seção de registros
        cy.contains('h3', 'Registro de Controle de Acesso').should('be.visible');
        cy.contains('span', 'Histórico de entradas e saídas').should('be.visible');

        // 2. Garante que os cards de estatísticas (contadores) estão na tela
        cy.contains('p', 'Total de Acessos').should('be.visible');
        cy.get('#total-count').should('be.visible');

        cy.contains('p', 'Acessos Permitidos').should('be.visible');
        cy.get('#allowed-count').should('be.visible');

        cy.contains('p', 'Acessos Negados').should('be.visible');
        cy.get('#denied-count').should('be.visible');

        // 3. Testa a barra de pesquisa (verifica se existe e permite digitar um crachá)
        cy.get('#searchInput')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Buscar por nome ou crachá...')
            .type('Crachá Teste 123');

        // 4. Valida se a tabela estrutural e seu corpo (onde entram os dados) existem
        cy.get('#accessTable').should('exist');
        cy.get('#tableBody').should('exist');

        // 5. Verifica se as colunas principais do cabeçalho da tabela foram renderizadas
        cy.get('#accessTable th').eq(0).should('contain', 'Nome');
        cy.get('#accessTable th').eq(1).should('contain', 'Crachá');
        cy.get('#accessTable th').eq(5).should('contain', 'Status');
    });
});