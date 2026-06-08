// Garante que o script só rode depois que a página HTML carregar por completo
document.addEventListener('DOMContentLoaded', () => {
    
    // Captura os elementos necessários do HTML através dos IDs criados
    const inputBusca = document.getElementById('inputBusca');
    const tabela = document.getElementById('tabelaAcessos');
    
    // Obtém todas as linhas (tr) de dentro do corpo (tbody) da tabela
    const linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Adiciona o evento de monitoramento ao digitar no input de busca
    inputBusca.addEventListener('keyup', function() {
        // Converte o termo pesquisado para letras minúsculas (evita problemas com maiúsculas/minúsculas)
        const termoBusca = inputBusca.value.toLowerCase();

        // Loop que passa por cada linha da tabela
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i];
            
            // Pega o conteúdo da primeira coluna [0] (Nome) e segunda coluna [1] (Crachá)
            const colunaNome = linha.getElementsByTagName('td')[0].textContent.toLowerCase();
            const colunaCracha = linha.getElementsByTagName('td')[1].textContent.toLowerCase();

            // Verifica se o termo digitado existe dentro da string do Nome OU do Crachá
            if (colunaNome.includes(termoBusca) || colunaCracha.includes(termoBusca)) {
                linha.style.display = ""; // Se encontrar algo, mantém a linha visível
            } else {
                linha.style.display = "none"; // Se não encontrar, esconde a linha do usuário
            }
        }
    });
});