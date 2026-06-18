describe('Testes da Página de Funções Principais - Edge Vision', () => {

  beforeEach(() => {
    // Abre a página de funções a partir do servidor local ativo
    cy.visit('/src/pages/funcoes.html');
  });

  it('Deve carregar o cabeçalho e a estrutura de ações rápidas', () => {
    // 1. Valida se o título principal e subtítulo da página estão visíveis
    cy.contains('h1', 'Funções Principais').should('be.visible');
    cy.contains('p', 'Acesso rápido às principais funcionalidades do sistema').should('be.visible');

    // 2. Garante que o container onde os cards dinâmicos serão renderizados existe no DOM
    cy.get('#cardsGrid').should('exist');

    // 3. Valida a seção de Ações Rápidas e se todos os botões importantes estão na tela
    cy.contains('h2', 'Ações Rápidas').should('be.visible');

    // Verifica o botão azul de Adicionar Câmera
    cy.get('.btn-blue').should('be.visible').and('contain', 'Adicionar Nova Câmera');

    // Verifica o botão verde de Criar Usuário
    cy.get('.btn-green').should('be.visible').and('contain', 'Criar Novo Usuário');

    // Verifica o botão roxo de Exportar Relatório
    cy.get('.btn-purple').should('be.visible').and('contain', 'Exportar Relatório');
  });
});