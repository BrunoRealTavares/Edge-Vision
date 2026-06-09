// js/relatorios.js

document.addEventListener("DOMContentLoaded", () => {
    const btnGerar = document.getElementById("btnGerar");
    const btnPdf = document.getElementById("btnPdf");
    const btnExcel = document.getElementById("btnExcel");

    btnGerar.addEventListener("click", () => {
        const tipo = document.getElementById("tipoRelatorio").value;
        const dataIn = document.getElementById("dataInicial").value;
        const dataFim = document.getElementById("dataFinal").value;

        if (!dataIn || !dataFim) {
            alert("Por favor, selecione o período completo (Data Inicial e Final).");
            return;
        }

        alert(`Buscando dados no servidor para: ${tipo} \nPeríodo: ${dataIn} até ${dataFim}`);
    });

    btnPdf.addEventListener("click", () => {
        alert("Iniciando download do relatório em PDF...");
    });

    btnExcel.addEventListener("click", () => {
        alert("Gerando planilha Excel...");
    });
});

function toggleTooltip(element) {

    // Se a coluna clicada já estiver ativa, apenas fecha o balão
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        return;
    }

    // Remove a classe 'active' de todas as colunas para fechar qualquer outro balão aberto
    document.querySelectorAll('.chart-col').forEach(col => {
        col.classList.remove('active');
    });

    // Ativa o balão apenas na coluna que foi clicada
    element.classList.add('active');
}

// Fecha todos os balões automaticamente se o utilizador clicar em qualquer outro lugar da tela
document.addEventListener('click', function (event) {

    // Verifica se o clique foi fora de uma coluna do gráfico
    if (!event.target.closest('.chart-col')) {
        document.querySelectorAll('.chart-col').forEach(col => {
            col.classList.remove('active');
        });
    }
}, true);