describe('EdgeSecurity - Painel de Monitoramento e Acessibilidade', () => {
  beforeEach(() => {
    // Acesse o seu arquivo local do projeto
    cy.visit('http://127.0.0.1:5501/Edge-Vision/pages/Inicio.html'); 
  });

  it('Deve renderizar os elementos principais do layout corretamente', () => {
    cy.get('.sidebar-brand').should('contain.text', 'EdgeSecurity');
    cy.get('.welcome h1').should('contain.text', 'Olá!');
    cy.get('.profile-role').should('contain.text', 'Administrador');
  });

  it('Deve exibir o feed da câmera de segurança com a tag "AO VIVO"', () => {
    cy.get('.badge-live').should('be.visible').and('contain.text', 'AO VIVO');
    cy.get('.feed-img').should('be.visible');
  });

  it('Deve carregar com sucesso o widget e o botão de acesso do VLibras', () => {
    cy.get('[vw]').should('have.class', 'enabled');
    cy.get('[vw-access-button]').should('be.visible');
  });
});