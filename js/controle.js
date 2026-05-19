// Dados simulados baseados na sua imagem
const accessData = [
    { nome: "João Silva", cracha: "A-1234", horario: "08:15", data: "29/04/2026", local: "Portão Principal", status: "Permitido" },
    { nome: "Maria Santos", cracha: "A-1235", horario: "08:20", data: "29/04/2026", local: "Portão Principal", status: "Permitido" },
    { nome: "Pedro Costa", cracha: "A-1236", horario: "08:25", data: "29/04/2026", local: "Portão Secundário", status: "Permitido" },
    { nome: "Usuário Desconhecido", cracha: "N/A", horario: "08:30", data: "29/04/2026", local: "Portão Principal", status: "Negado" },
    { nome: "Ana Oliveira", cracha: "A-1237", horario: "08:35", data: "29/04/2026", local: "Portão Principal", status: "Permitido" },
    { nome: "Carlos Mendes", cracha: "A-1238", horario: "09:00", data: "29/04/2026", local: "Portão Secundário", status: "Permitido" }
];

const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');

// Função para renderizar a tabela
function renderTable(data) {
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.nome}</td>
                <td>${item.cracha}</td>
                <td>${item.horario}</td>
                <td>${item.data}</td>
                <td>${item.local}</td>
                <td><span class="status-pill ${item.status.toLowerCase()}">${item.status}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    updateCounters(data);
}

// Função para atualizar os cards de estatísticas baseados no que está visível
function updateCounters(data) {
    const total = data.length;
    const allowed = data.filter(i => i.status === "Permitido").length;
    const denied = data.filter(i => i.status === "Negado").length;

    document.getElementById('total-count').innerText = total;
    document.getElementById('allowed-count').innerText = allowed;
    document.getElementById('denied-count').innerText = denied;
}

// Evento de busca/filtro
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filteredData = accessData.filter(item => 
        item.nome.toLowerCase().includes(term) || 
        item.cracha.toLowerCase().includes(term)
    );
    renderTable(filteredData);
});

// Inicialização
renderTable(accessData);