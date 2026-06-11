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