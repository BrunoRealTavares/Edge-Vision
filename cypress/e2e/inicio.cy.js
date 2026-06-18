describe('Testes da Página de Início - Edge Vision', () => {

  beforeEach(() => {
    // Abre a página de início usando o servidor local ativo
    cy.visit('/src/pages/inicio.html');
  });

  it('Deve carregar os elementos do monitoramento e dados da dashboard', () => {
    // 1. Valida se o card da câmera principal e o título estão na tela
    cy.contains('h3', 'Câmera Principal').should('be.visible');
    cy.contains('Pátio - Área Externa').should('be.visible');

    // 2. Garante que o status "AO VIVO" e os logs de incidente estão aparecendo
    cy.contains('.live-badge', 'AO VIVO').should('be.visible');
    cy.contains('.log-title', 'SAFE-ZONE INCIDENT LOG').should('be.visible');
    cy.get('.camera-image').should('be.visible'); // Verifica se a tag da imagem renderizou

    // 3. Valida se o card de "Funcionários no expediente" carregou os blocos de dados
    cy.contains('h3', 'Funcionários no expediente').should('be.visible');
    cy.get('.employee-grid').should('exist');
    cy.get('.employee-item').should('have.length', 4); // Garante que os 4 cards de funcionários estão renderizados
  });
});