describe('Testes da Página Adicionar Despachos - Edge Vision', () => {

  beforeEach(() => {
    // Abre a página de adicionar despachos usando o servidor local ativo
    cy.visit('/src/pages/adicionar.html');
  });

  it('Deve carregar o cabeçalho, o botão de novo despacho e a lista de registros recentes', () => {
    // 1. Valida o título principal e subtítulo do topo da página
    cy.contains('h2', 'Adicionar Despachos').should('be.visible');
    cy.contains('p', 'Registre entradas, saídas e ocorrências').should('be.visible');

    // 2. Verifica se o botão de "Novo Despacho" está visível e clicável
    cy.get('.btn-novo-despacho')
      .should('be.visible')
      .and('contain', 'Novo Despacho');

    // 3. Valida a seção de Despachos Recentes e o painel escuro
    cy.contains('h3', 'Despachos Recentes').should('be.visible');
    cy.get('.dark-panel-header').should('be.visible');

    // 4. Garante que os funcionários e seus respectivos status foram renderizados corretamente
    cy.contains('.employee-name', 'João Silva').should('be.visible');
    cy.contains('.pill-green', 'Aprovado').should('be.visible');

    cy.contains('.employee-name', 'Pedro Costa').should('be.visible');
    cy.contains('.pill-yellow', 'Pendente').should('be.visible');

    // 5. Verifica se o layout renderizou o total de 4 cards de despacho na lista
    cy.get('.row-despacho-card').should('have.length', 4);
  });
});