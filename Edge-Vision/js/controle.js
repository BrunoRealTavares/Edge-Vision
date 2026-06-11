const accessData = [
    ["João Silva","A-1234","08:15","29/04/2026","Portão Principal","Permitido"],
    ["Maria Santos","A-1235","08:20","29/04/2026","Portão Principal","Permitido"],
    ["Pedro Costa","A-1236","08:25","29/04/2026","Portão Secundário","Permitido"],
    ["Usuário Desconhecido","N/A","08:30","29/04/2026","Portão Principal","Negado"],
    ["Ana Oliveira","A-1237","08:35","29/04/2026","Portão Principal","Permitido"],
    ["Carlos Mendes","A-1238","09:00","29/04/2026","Portão Secundário","Permitido"]
];

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");


function renderTable(data) {

    tableBody.innerHTML = "";

    data.forEach(item => {

        tableBody.innerHTML += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
                <td>
                    <span class="status ${item[5].toLowerCase()}">
                        ${item[5]}
                    </span>
                </td>
            </tr>
        `;
    });

    document.getElementById("total-count").textContent = data.length;

    document.getElementById("allowed-count").textContent =
        data.filter(i => i[5] === "Permitido").length;

    document.getElementById("denied-count").textContent =
        data.filter(i => i[5] === "Negado").length;
}

searchInput.addEventListener("input", e => {

    const termo = e.target.value.toLowerCase();

    const filtrados = accessData.filter(item =>
        item[0].toLowerCase().includes(termo) ||
        item[1].toLowerCase().includes(termo)
    );

    renderTable(filtrados);
});

function lerPagina() {
    const texto = document.body.innerText;

    const fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";

    speechSynthesis.speak(fala);
}


renderTable(accessData);