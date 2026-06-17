// js/sidebar.js

document.addEventListener("DOMContentLoaded", () => {
    const dynamicContent = document.getElementById("dynamic-content");
    const navItems = document.querySelectorAll(".nav-item");

    // Mapa de inicializadores: cada página tem sua própria função init
    const pageInits = {
        "Inicio": initInicio,
        "funcoes": initFuncoes,
        "controle": initControle,
        "adicionar": initAdicionar,
        "relatorios": initRelatorios,
    };

    function carregarPagina(idPagina) {
        let arquivo = idPagina.toLowerCase();
        if (arquivo === "inicio") arquivo = "Inicio";

        fetch(`../pages/${arquivo}.html`)
            .then(response => {
                if (!response.ok) throw new Error(`Arquivo não encontrado: ${arquivo}.html`);
                return response.text();
            })
            .then(html => {
                if (dynamicContent) {
                    dynamicContent.innerHTML = html;
                }

                // Renderiza ícones Lucide nos novos elementos injetados
                if (window.lucide) window.lucide.createIcons();

                // Chama a função de inicialização da página correspondente
                const initFn = pageInits[arquivo];
                if (typeof initFn === "function") {
                    initFn();
                }
            })
            .catch(err => {
                console.error("Erro no carregamento dinâmico:", err);
                if (dynamicContent) {
                    dynamicContent.innerHTML = `
                        <div class="main-inner" style="padding:20px;">
                            <p style="color:#dc2626;font-weight:600;">
                                ⚠ Erro ao carregar "${arquivo}.html".
                            </p>
                            <small style="color:#64748b;">
                                Verifique se o arquivo existe em <code>/pages/${arquivo}.html</code>
                                e se o projeto está rodando via Live Server (não abrindo o arquivo direto).
                            </small>
                        </div>`;
                }
            });
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            carregarPagina(item.getAttribute("data-id"));
        });
    });

    // Carrega a página inicial
    carregarPagina("Inicio");
});

// Botão Sair
document.addEventListener("click", (e) => {
    if (e.target.closest("#btnSair") || e.target.closest(".logout-btn")) {
        localStorage.removeItem("logado");
        window.location.href = "../../index.html";
    }
});

// ─── FUNÇÕES DE INICIALIZAÇÃO DE CADA PÁGINA ──────────────────────────────────

function initInicio() {
    // Hover interativo nos cards de funcionários
    document.querySelectorAll('.employee-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px)';
            item.style.transition = '0.3s ease';
            item.style.boxShadow = '0 10px 25px rgba(15,23,42,0.08)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0px)';
            item.style.boxShadow = 'none';
        });
    });

    // Pulsação do badge "AO VIVO"
    const liveBadge = document.querySelector('.live-badge');
    if (liveBadge) {
        setInterval(() => {
            liveBadge.style.opacity = '0.6';
            setTimeout(() => { liveBadge.style.opacity = '1'; }, 500);
        }, 1000);
    }
}

function initFuncoes() {
    const functionCards = [
        { id: 1, title: "Gerenciar Câmeras", description: "Configure e monitore todas as câmeras do sistema", icon: "camera", accent: "#3b82f6", accentLight: "#eff6ff" },
        { id: 2, title: "Usuários e Permissões", description: "Gerencie usuários e defina níveis de acesso", icon: "users", accent: "#9333ea", accentLight: "#faf5ff" },
        { id: 3, title: "Sistema de Alertas", description: "Configure notificações e alertas de segurança", icon: "bell", accent: "#ca8a04", accentLight: "#fefce8" },
        { id: 4, title: "Relatórios", description: "Gere e exporte relatórios de atividades", icon: "file-text", accent: "#16a34a", accentLight: "#f0fdf4" },
        { id: 5, title: "Configurações", description: "Ajustes gerais do sistema de segurança", icon: "settings", accent: "#4b5563", accentLight: "#f9fafb" },
        { id: 6, title: "Zonas de Segurança", description: "Defina e monitore áreas restritas", icon: "shield", accent: "#dc2626", accentLight: "#fef2f2" },
        { id: 7, title: "Monitor de Atividades", description: "Visualize atividades em tempo real", icon: "activity", accent: "#ea580c", accentLight: "#fff7ed" },
        { id: 8, title: "Backup e Armazenamento", description: "Gerencie gravações e backups", icon: "database", accent: "#4f46e5", accentLight: "#eef2ff" },
    ];

    const grid = document.getElementById("cardsGrid");
    if (!grid) return;

    grid.innerHTML = ""; // Limpa antes de renderizar (evita duplicação ao reentrar na página)

    functionCards.forEach(card => {
        const el = document.createElement("div");
        el.className = "function-card";
        el.innerHTML = `
            <div class="card-top-line"></div>
            <div class="card-icon-wrap" style="background:${card.accentLight}; border:1px solid ${card.accent}22;">
                <i data-lucide="${card.icon}" style="color:${card.accent};"></i>
            </div>
            <div class="card-title">${card.title}</div>
            <div class="card-desc">${card.description}</div>
            <div class="card-arrow">
                <i data-lucide="chevron-right" style="color:${card.accent};"></i>
            </div>`;

        const topLine  = el.querySelector(".card-top-line");
        const iconWrap = el.querySelector(".card-icon-wrap");

        el.addEventListener("mouseenter", () => {
            el.style.background  = card.accentLight;
            el.style.borderColor = card.accent + "55";
            el.style.boxShadow   = `0 8px 32px 0 ${card.accent}22, 0 2px 8px 0 rgba(0,0,0,0.04)`;
            topLine.style.background  = card.accent;
            iconWrap.style.background = card.accent + "22";
        });
        el.addEventListener("mouseleave", () => {
            el.style.background  = "#ffffff";
            el.style.borderColor = "#e5e7eb";
            el.style.boxShadow   = "0 1px 4px 0 rgba(0,0,0,0.04)";
            topLine.style.background  = "transparent";
            iconWrap.style.background = card.accentLight;
        });

        grid.appendChild(el);
    });

    if (window.lucide) window.lucide.createIcons();
}

function initControle() {
    const accessData = [
        { nome: "João Silva",          cracha: "A-1234", horario: "08:15", data: "29/04/2026", local: "Portão Principal",   status: "Permitido" },
        { nome: "Maria Santos",        cracha: "A-1235", horario: "08:20", data: "29/04/2026", local: "Portão Principal",   status: "Permitido" },
        { nome: "Pedro Costa",         cracha: "A-1236", horario: "08:25", data: "29/04/2026", local: "Portão Secundário",  status: "Permitido" },
        { nome: "Usuário Desconhecido",cracha: "N/A",    horario: "08:30", data: "29/04/2026", local: "Portão Principal",   status: "Negado"    },
        { nome: "Ana Oliveira",        cracha: "A-1237", horario: "08:35", data: "29/04/2026", local: "Portão Principal",   status: "Permitido" },
        { nome: "Carlos Mendes",       cracha: "A-1238", horario: "09:00", data: "29/04/2026", local: "Portão Secundário",  status: "Permitido" },
    ];

    const tableBody  = document.getElementById("tableBody");
    const searchInput = document.getElementById("searchInput");
    if (!tableBody || !searchInput) return;

    function renderTable(data) {
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.nome}</td>
                <td>${item.cracha}</td>
                <td>${item.horario}</td>
                <td>${item.data}</td>
                <td>${item.local}</td>
                <td><span class="status-pill ${item.status.toLowerCase()}">${item.status}</span></td>
            </tr>`).join("");
        updateCounters(data);
    }

    function updateCounters(data) {
        const total   = data.length;
        const allowed = data.filter(i => i.status === "Permitido").length;
        const denied  = data.filter(i => i.status === "Negado").length;
        const tEl = document.getElementById("total-count");
        const aEl = document.getElementById("allowed-count");
        const dEl = document.getElementById("denied-count");
        if (tEl) tEl.innerText = total;
        if (aEl) aEl.innerText = allowed;
        if (dEl) dEl.innerText = denied;
    }

    searchInput.addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        renderTable(accessData.filter(item =>
            item.nome.toLowerCase().includes(term) ||
            item.cracha.toLowerCase().includes(term)
        ));
    });

    renderTable(accessData);
}

function initAdicionar() {
    // novoDespacho fica disponível globalmente para o onclick do botão no HTML
    window.novoDespacho = function() {
        alert("Abrindo formulário de cadastro para um novo despacho.");
    };
}

function initRelatorios() {
    const btnGerar  = document.getElementById("btnGerar");
    const btnPdf    = document.getElementById("btnPdf");
    const btnExcel  = document.getElementById("btnExcel");
    if (!btnGerar) return;

    btnGerar.addEventListener("click", () => {
        const tipo    = document.getElementById("tipoRelatorio").value;
        const dataIn  = document.getElementById("dataInicial").value;
        const dataFim = document.getElementById("dataFinal").value;
        if (!dataIn || !dataFim) {
            alert("Por favor, selecione o período completo (Data Inicial e Final).");
            return;
        }
        alert(`Buscando dados para: ${tipo}\nPeríodo: ${dataIn} até ${dataFim}`);
    });

    btnPdf.addEventListener("click",   () => alert("Iniciando download do relatório em PDF..."));
    btnExcel.addEventListener("click", () => alert("Gerando planilha Excel..."));
}