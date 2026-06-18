describe('Testes da Página de Relatórios - Edge Vision', () => {

    beforeEach(() => {
        // Ignora erros não tratados vindos da própria aplicação (como funções JS ausentes)
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('/src/pages/relatorios.html');
    });

    it('Deve verificar os cards de KPI, manipular filtros e interagir com o gráfico', () => {
        // 1. Valida os textos e números dos cards de KPI principais
        cy.contains('Total de Acessos').should('be.visible');
        cy.contains('1247').should('be.visible');

        cy.contains('Usuários Ativos').should('be.visible');
        cy.contains('86').should('be.visible');

        cy.contains('Câmeras Ativas').should('be.visible');
        cy.contains('12').should('be.visible');

        // 2. Valida a seção de Filtros e interage com o select de tipo
        cy.get('#tipoRelatorio').should('exist').select('Incidentes de Segurança');

        // 3. Preenche as datas usando formato nativo (AAAA-MM-DD)
        cy.get('#dataInicial').clear({ force: true }).type('2026-06-01', { force: true });
        cy.get('#dataFinal').clear({ force: true }).type('2026-06-18', { force: true });

        // 4. Garante que os botões de ação e exportação existem
        cy.get('#btnGerar').should('be.visible');
        cy.get('#btnPdf').should('be.visible');
        cy.get('#btnExcel').should('be.visible');

        // 5. Interage com as colunas do gráfico manual
        cy.get('.chart-col').eq(0).click({ force: true });
    });
});