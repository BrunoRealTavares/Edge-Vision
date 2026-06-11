describe('Testes do Painel de Monitoramento - Inicio', () => {
  
  beforeEach(() => {
    // Definido o link correto do seu Live Server na porta 5501
    cy.visit('http://127.0.0.1:5501/Edge-Vision/pages/Inicio.html'); 
  });

  it('1. Deve carregar os elementos principais do cabeçalho com sucesso', () => {
    cy.get('.header-left h1').should('contain', 'Olá!');
    cy.get('.header-left p').should('contain', 'Bem-vindo ao painel de monitoramento');
    cy.get('.profile-name').should('be.visible').and('contain', 'Meu perfil');
    cy.get('.profile-role').should('be.visible').and('contain', 'Administrador');
  });

  it('2. Deve abrir e fechar o menu dropdown do perfil ao clicar', () => {
    cy.get('#profileDropdown').should('not.be.visible');
    cy.get('#profileToggle').click();
    cy.get('#profileDropdown').should('be.visible');
    cy.get('main').click();
    cy.get('#profileDropdown').should('not.be.visible');
  });

  it('3. Deve controlar a transmissão de vídeo ao clicar no botão Play/Pause', () => {
    cy.get('#videoStream').should('be.visible').and('not.have.class', 'paused');
    cy.get('#videoFallback').should('not.be.visible');

    cy.get('#btnPlayPause').click();
    cy.get('#videoStream').should('have.class', 'paused');
    cy.get('#videoFallback').should('be.visible').and('contain', 'Transmissão Pausada');

    cy.get('#btnPlayPause').click();
    cy.get('#videoStream').should('not.have.class', 'paused');
    cy.get('#videoFallback').should('not.be.visible');
  });

  it('4. Deve validar o funcionamento visual do Botão de Acessibilidade por Áudio', () => {
    cy.get('#btnOuvir').should('be.visible').and('not.have.class', 'falando-ativo');
    cy.get('#textoAudio').should('have.text', 'Ouvir Painel');

    // Clica para ativar
    cy.get('#btnOuvir').click();

    // Valida as mudanças de estado
    cy.get('#btnOuvir').should('have.class', 'falando-ativo');
    cy.get('#textoAudio').should('have.text', 'Parar Leitura');

    // Clica para parar
    cy.get('#btnOuvir').click();
    cy.get('#btnOuvir').should('not.have.class', 'falando-ativo');
    cy.get('#textoAudio').should('have.text', 'Ouvir Painel');
  });

  it('5. Deve verificar se a grade de funcionários no expediente está preenchida', () => {
    // Aguarda e valida a existência dos componentes de dados
    cy.get('.employees-grid', { timeout: 6000 }).should('be.visible');
    cy.get('.employee-card', { timeout: 6000 }).should('have.length.at.least', 1);
  });
});