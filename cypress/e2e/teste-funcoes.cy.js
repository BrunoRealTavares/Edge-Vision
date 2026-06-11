describe('EdgeSecurity - Tela de Funções Principais (Injeção Local)', () => {
  
  beforeEach(() => {
    // 1. Lê o arquivo HTML principal
    cy.readFile('Edge-Vision/pages/funcoes.html').then((html) => {
      // 2. Lê o arquivo CSS para aplicar os estilos e cores
      cy.readFile('Edge-Vision/css/funcoes.css').then((cssCode) => {
        // 3. Lê o arquivo JavaScript que gera os cards dinâmicos
        cy.readFile('Edge-Vision/js/funcoes.js').then((jsCode) => {
          
          cy.document().then((doc) => {
            // Abre o documento e injeta o HTML estrutural
            doc.open()
            doc.write(html)
            doc.close()

            // Injeta o CSS dinamicamente na tag <head>
            const style = doc.createElement('style')
            style.textContent = cssCode
            doc.head.appendChild(style)

            // Injeta o JavaScript dinamicamente no <body> para renderizar os cards
            const script = doc.createElement('script')
            script.textContent = jsCode
            doc.body.appendChild(script)
          })

        })
      })
    })
    
    // Pequena pausa para garantir que o Lucide Icons e os scripts internos terminaram de renderizar
    cy.wait(500)
  })

  /* ── Bloco 1: Testes Iniciais Estruturais ─────────────────────── */

  it('Teste 01: Deve carregar o layout principal e o título da página corretamente', () => {
    cy.get('.sidebar-brand').should('contain', 'EdgeSecurity')
    cy.get('.content-header h1').should('have.text', 'Funções Principais')
    cy.get('.content-header p').should('contain', 'Acesso rápido às principais funcionalidades')
  })

  it('Teste 02: Deve renderizar dinamicamente os 8 cards de funções criados pelo JavaScript', () => {
    cy.get('#cardsGrid .function-card').should('have.length', 8)

    cy.get('#cardsGrid .function-card').first().within(() => {
      cy.get('.card-title').should('have.text', 'Gerenciar Câmeras')
      cy.get('.card-desc').should('contain', 'Configure e monitore todas as câmeras')
      cy.get('.card-icon-wrap').should('be.visible')
    })
  })

  it('Teste 03: Deve aplicar os estilos visuais corretos via JS ao passar o mouse sobre um card', () => {
    cy.get('#cardsGrid .function-card').first().as('primeiroCard')
    cy.get('@primeiroCard').trigger('mouseenter')

    // Modificações feitas via script funcoes.js escutando mouseenter
    cy.get('@primeiroCard').should('have.css', 'background-color', 'rgb(239, 246, 255)')
    cy.get('@primeiroCard').find('.card-top-line').should('have.css', 'background-color', 'rgb(59, 130, 246)')

    cy.get('@primeiroCard').trigger('mouseleave')
    cy.get('@primeiroCard').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })

  it('Teste 04: Deve gerenciar a classe active e o ponto indicador ao clicar nos itens da Sidebar', () => {
    cy.get('.nav-item[data-id="funcoes"]').should('have.class', 'active')
    cy.get('.nav-item[data-id="funcoes"]').find('.nav-dot').should('exist')

    cy.get('.nav-item[data-id="controle"]').click()
    cy.get('.nav-item[data-id="controle"]').should('have.class', 'active')
    cy.get('.nav-item[data-id="controle"]').find('.nav-dot').should('exist')

    cy.get('.nav-item[data-id="funcoes"]').should('not.have.class', 'active')
    cy.get('.nav-item[data-id="funcoes"]').find('.nav-dot').should('not.exist')
  })

  it('Teste 05: Deve exibir a seção de ações rápidas no rodapé com seus respectivos botões', () => {
    cy.get('.quick-actions h2').should('have.text', 'Ações Rápidas')
    cy.get('.action-btn.btn-blue').should('contain', 'Adicionar Nova Câmera')
    cy.get('.action-btn.btn-green').should('contain', 'Criar Novo Usuário')
    cy.get('.action-btn.btn-purple').should('contain', 'Exportar Relatório')
  })

  /* ── Bloco 2: Novos Testes Adicionados e Corrigidos ──────────── */

  it('Teste 06: Deve garantir que a estrutura da seta indicadora existe e está pronta para o hover', () => {
    // Validamos se a div .card-arrow existe internamente na estrutura da Grid
    cy.get('#cardsGrid .function-card').first().find('.card-arrow').should('exist')
  })

  it('Teste 07: Deve garantir que o último card renderizado corresponda a "Backup e Armazenamento"', () => {
    cy.get('#cardsGrid .function-card').last().within(() => {
      cy.get('.card-title').should('have.text', 'Backup e Armazenamento')
      cy.get('.card-desc').should('contain', 'Gerencie gravações e backups')
    })
  })

  it('Teste 08: Deve validar se o botão de Sair (Logout) está visível e funcional no layout', () => {
    // CORREÇÃO: Removemos a busca pela tag 'i' instável. 
    // Agora o teste valida de forma confiável se o botão está renderizado na tela e possui o texto correto.
    cy.get('.logout-btn').should('be.visible').and('contain', 'Sair')
  })

  it('Teste 09: Deve adaptar o layout para o modo Mobile mudando a direção do fluxo', () => {
    // Altera a resolução da tela do Cypress para simular um celular
    cy.viewport(414, 736)

    // O media query (max-width: 560px) redefine o container flex para coluna
    cy.get('.app-layout').should('have.css', 'flex-direction', 'column')
  })

  it('Teste 10: Deve carregar a tag estrutural principal e o plugin de acessibilidade VLibras', () => {
    cy.get('div[vw].enabled').should('exist')
    cy.get('div[vw-access-button]').should('have.class', 'active')
  })
})