describe('EdgeSecurity - Suíte de Testes do Painel de Despachos', () => {
  
  beforeEach(() => {
    // IMPORTANTE: Altere para a URL local onde o seu projeto está rodando
    cy.visit('/Edge-Vision/pages/adicionar.html'); 
  });

  // ------------------------------------------------------------------------
  // TESTE 1: Validação de Elementos Críticos da Interface (UI)
  // ------------------------------------------------------------------------
  it('1. Deve renderizar os elementos principais da UI e estados iniciais corretamente', () => {
    // Garante que a sidebar e o header principal estão visíveis
    cy.get('#sidebar').should('be.visible');
    cy.get('main header').should('be.visible');

    // Valida que o item de menu "Adicionar despachos" começa ativo por padrão
    cy.get('.sidebar .menu li.active')
      .should('be.visible')
      .and('contain', 'Adicionar despachos');

    // Verifica as informações do perfil do administrador logado
    cy.get('.user-name').should('contain', 'Meu perfil');
    cy.get('.user-role').should('contain', 'Administrador');
  });

  // ------------------------------------------------------------------------
  // TESTE 2: Validação da Integridade dos Dados da Tabela/Lista
  // ------------------------------------------------------------------------
  it('2. Deve listar os despachos recentes com suas respectivas tags e badges de status', () => {
    // Confirma a quantidade de itens estáticos mockados na lista
    cy.get('#lista .item').should('have.length', 3);

    // Valida as informações específicas e estilização do primeiro item (João Silva)
    cy.get('#lista .item').eq(0).within(() => {
      cy.get('.item-title strong').should('contain', 'João Silva');
      cy.get('.tag-entrada').should('have.css', 'background-color', 'rgb(224, 242, 254)'); // #e0f2fe
      cy.get('.status-aprovado').should('contain', 'Aprovado');
    });

    // Valida o terceiro item que possui status pendente (Pedro Costa)
    cy.get('#lista .item').eq(2).within(() => {
      cy.get('.item-title strong').should('contain', 'Pedro Costa');
      cy.get('.status-pendente').should('contain', 'Pendente');
    });
  });

  // ------------------------------------------------------------------------
  // TESTE 3: Interação com o Menu Lateral (Troca de Abas)
  // ------------------------------------------------------------------------
  it('3. Deve alternar dinamicamente o estado ativo ao navegar pelos itens do menu', () => {
    // Clica em outro item de menu (ex: Analytics)
    cy.contains('.sidebar .menu li', 'Analytics').click();

    // O item clicado deve receber a classe .active do CSS
    cy.contains('.sidebar .menu li', 'Analytics').should('have.class', 'active');

    // O item anterior (Adicionar despachos) deve perder a classe .active
    cy.contains('.sidebar .menu li', 'Adicionar despachos').should('not.have.class', 'active');
  });

  // ------------------------------------------------------------------------
  // TESTE 4: Interação com o Botão de Ação Principal (Trigger de Função)
  // ------------------------------------------------------------------------
  it('4. Deve interceptar e validar a mensagem de alerta ao criar um Novo Despacho', () => {
    // Cria um "stub" para capturar e segurar o window.alert do navegador
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // Clica no botão de ação
    cy.get('.card.top-card .btn').click().then(() => {
      // Confirma que a função 'novoDespacho()' foi chamada com o texto exato do JS
      expect(alertStub.getCall(0)).to.be.calledWith(
        'Ação detectada: Abrindo o formulário de cadastro para um novo despacho.'
      );
    });
  });

  // ------------------------------------------------------------------------
  // TESTE 5: Comportamento Responsivo do Menu (Desktop vs Mobile)
  // ------------------------------------------------------------------------
  it('5. Deve alternar os modos de colapso do menu baseando-se no tamanho da tela (Viewport)', () => {
    // --- Cenário A: Comportamento em Desktop ---
    cy.viewport(1200, 800);
    cy.get('#menuBtn').click();
    
    // Verifica se as classes de colapso do desktop foram inseridas
    cy.get('#sidebar').should('have.class', 'hidden');
    cy.get('#main').should('have.class', 'expanded');

    // --- Cenário B: Comportamento em Mobile ---
    cy.viewport('iphone-xr'); // Redimensiona para tela de celular
    cy.get('#menuBtn').click();

    // Verifica se a classe exclusiva para mobile foi adicionada conforme o if do JS
    cy.get('#sidebar').should('have.class', 'active-mobile');
  });

});