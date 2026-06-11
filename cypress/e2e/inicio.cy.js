describe('Testes do Painel de Monitoramento - Inicio', () => {
  
  beforeEach(() => {
    // Visita a página inicial do seu projeto antes de cada teste.
    // NOTA: Ajuste o caminho se o seu servidor local usar uma URL diferente (ex: http://127.0.0.1:5500/pages/Inicio.html)
    cy.visit('/Edge-Vision/pages/Inicio.html'); 
  });

  it('1. Deve carregar os elementos principais do cabeçalho com sucesso', () => {
    // Valida se os textos de boas-vindas estão visíveis
    cy.get('.header-left h1').should('contain', 'Olá!');
    cy.get('.header-left p').should('contain', 'Bem-vindo ao painel de monitoramento');
    
    // Verifica se o menu de perfil administrador está presente
    cy.get('.profile-name').should('be.visible').and('contain', 'Meu perfil');
    cy.get('.profile-role').should('be.visible').and('contain', 'Administrador');
  });

  it('2. Deve abrir e fechar o menu dropdown do perfil ao clicar', () => {
    // O dropdown deve iniciar oculto
    cy.get('#profileDropdown').should('not.be.visible');

    // Clica para abrir o menu
    cy.get('#profileToggle').click();
    cy.get('#profileDropdown').should('be.visible');

    // Clica fora (no main da página) para garantir que ele fecha sozinho
    cy.get('main').click();
    cy.get('#profileDropdown').should('not.be.visible');
  });

  it('3. Deve controlar a transmissão de vídeo ao clicar no botão Play/Pause', () => {
    // O feed de vídeo deve iniciar ativo e sem a classe 'paused'
    cy.get('#videoStream').should('be.visible').and('not.have.class', 'paused');
    cy.get('#videoFallback').should('not.be.visible');

    // Clica no botão para pausar a transmissão
    cy.get('#btnPlayPause').click();

    // Valida se a imagem ficou opaca (blur) e a mensagem de fallback apareceu
    cy.get('#videoStream').should('have.class', 'paused');
    cy.get('#videoFallback').should('be.visible').and('contain', 'Transmissão Pausada');

    // Clica novamente para retomar o vídeo
    cy.get('#btnPlayPause').click();
    cy.get('#videoStream').should('not.have.class', 'paused');
    cy.get('#videoFallback').should('not.be.visible');
  });

  it('4. Deve validar o funcionamento visual do Botão de Acessibilidade por Áudio', () => {
    // O botão deve iniciar no estado padrão de espera
    cy.get('#btnOuvir')
      .should('be.visible')
      .and('not.have.class', 'falando-ativo');
    cy.get('#textoAudio').should('contain', 'Ouvir Painel');

    // Clica para ativar a leitura de voz da Web Speech API
    cy.get('#btnOuvir').click();

    // Garante que o botão mudou de estado visual para "executando/parar"
    cy.get('#btnOuvir').should('have.class', 'falando-ativo');
    cy.get('#textoAudio').should('contain', 'Parar Leitura');

    // Clica novamente para cancelar/parar a reprodução do áudio
    cy.get('#btnOuvir').click();

    // O botão deve resetar para o estado inicial
    cy.get('#btnOuvir').should('not.have.class', 'falando-ativo');
    cy.get('#textoAudio').should('contain', 'Ouvir Painel');
  });

  it('5. Deve verificar se a grade de funcionários no expediente está preenchida', () => {
    // Garante que os cards com os horários dos colaboradores foram renderizados na tela
    cy.get('.employees-grid').should('be.visible');
    cy.get('.employee-card').should('have.length.at.least', 1);
    cy.get('.card-label').first().should('contain', 'Horário');
  });
});