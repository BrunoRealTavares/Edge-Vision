describe('EdgeSecurity - Painel de Controle de Acesso', () => {
  
  beforeEach(() => {
    // Substitua pela URL onde seu projeto está rodando localmente
    cy.visit('http://127.0.0.1:5501/Edge-Vision/pages/controle.html'); 
  });

  describe('Renderização e Elementos da Tela', () => {
    it('Deve exibir o título do sistema e os itens do menu na sidebar', () => {
      cy.get('.brand h2').should('contain', 'EdgeSecurity');
      cy.get('.menu-item').should('have.length', 6);
      cy.get('.menu-item.active').should('contain', 'Controle de acesso');
    });

    it('Deve exibir o alerta de câmera offline na sidebar', () => {
      cy.get('.alert-box').within(() => {
        cy.get('.alert-title').should('contain', 'Status do monitoramento');
        cy.get('p').should('contain', 'Câmera 3 offline');
      });
    });

    it('Deve exibir os cards de métricas com os valores corretos', () => {
      // Total de Acessos
      cy.get('.card').eq(0).within(() => {
        cy.get('.card-title').should('contain', 'Total de Acessos');
        cy.get('.card-value').should('contain', '6');
      });

      // Acessos Permitidos
      cy.get('.card').eq(1).within(() => {
        cy.get('.card-title').should('contain', 'Acessos Permitidos');
        cy.get('.card-value').should('contain', '5');
      });

      // Acessos Negados
      cy.get('.card').eq(2).within(() => {
        cy.get('.card-title').should('contain', 'Acessos Negados');
        cy.get('.card-value').should('contain', '1');
      });
    });

    it('Deve exibir a tabela com os registros iniciais', () => {
      cy.get('#tabelaAcessos tbody tr').should('have.length', 6);
      
      // Valida a primeira linha (João Silva)
      cy.get('#tabelaAcessos tbody tr').first().within(() => {
        cy.get('td').eq(0).should('contain', 'João Silva');
        cy.get('td').eq(1).should('contain', 'A-1234');
        cy.get('td').eq(5).should('contain', 'Permitido');
      });
    });
  });

  describe('Funcionalidade de Busca e Filtro (JavaScript)', () => {
    it('Deve filtrar as linhas da tabela ao buscar por um nome específico', () => {
      // Digita "Maria" no campo de busca
      cy.get('#inputBusca').type('Maria');

      // Apenas a linha da Maria deve ficar visível, as outras devem ter display: none
      cy.get('#tabelaAcessos tbody tr').each(($el) => {
        const nome = $el.find('td').eq(0).text();
        if (nome.includes('Maria')) {
          cy.wrap($el).should('be.visible');
        } else {
          cy.wrap($el).should('not.be.visible');
        }
      });
    });

    it('Deve filtrar as linhas ao buscar por um número de crachá', () => {
      // Digita um crachá específico
      cy.get('#inputBusca').type('A-1237');

      // Verifica se apenas a linha da Ana Oliveira está visível
      cy.get('#tabelaAcessos tbody tr').filter(':visible').should('have.length', 1);
      cy.get('#tabelaAcessos tbody tr').filter(':visible').contains('Ana Oliveira');
    });

    it('Deve ser case-insensitive (ignorar maiúsculas/minúsculas) na busca', () => {
      // Digita em letras minúsculas o nome que está em maiúsculo no HTML
      cy.get('#inputBusca').type('joão silva');

      cy.get('#tabelaAcessos tbody tr').filter(':visible').should('have.length', 1);
      cy.get('#tabelaAcessos tbody tr').filter(':visible').contains('João Silva');
    });

    it('Deve ocultar todas as linhas se nenhum registro for encontrado', () => {
      cy.get('#inputBusca').type('Nome Inexistente');
      
      // Garante que todas as linhas estão com style="display: none;"
      cy.get('#tabelaAcessos tbody tr').should('not.be.visible');
    });
  });

  describe('Componentes Extras e Acessibilidade', () => {
    it('Deve renderizar o botão flutuante de ajuda', () => {
      cy.get('.help-floating-btn').should('be.visible').and('contain', '?');
    });

    it('Deve carregar o widget do VLibras', () => {
      cy.get('[vw]').should('exist');
      cy.get('[vw-access-button]').should('exist');
    });
  });
});