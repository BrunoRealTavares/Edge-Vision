// ── Data ──────────────────────────────────────────────────────────────────────

const functionCards = [
  {
    id: 1,
    title: "Gerenciar Câmeras",
    description: "Configure e monitore todas as câmeras do sistema",
    icon: "camera",
    accent: "#3b82f6",
    accentLight: "#eff6ff",
  },
  {
    id: 2,
    title: "Usuários e Permissões",
    description: "Gerencie usuários e defina níveis de acesso",
    icon: "users",
    accent: "#9333ea",
    accentLight: "#faf5ff",
  },
  {
    id: 3,
    title: "Sistema de Alertas",
    description: "Configure notificações e alertas de segurança",
    icon: "bell",
    accent: "#ca8a04",
    accentLight: "#fefce8",
  },
  {
    id: 4,
    title: "Relatórios",
    description: "Gere e exporte relatórios de atividades",
    icon: "file-text",
    accent: "#16a34a",
    accentLight: "#f0fdf4",
  },
  {
    id: 5,
    title: "Configurações",
    description: "Ajustes gerais do sistema de segurança",
    icon: "settings",
    accent: "#4b5563",
    accentLight: "#f9fafb",
  },
  {
    id: 6,
    title: "Zonas de Segurança",
    description: "Defina e monitore áreas restritas",
    icon: "shield",
    accent: "#dc2626",
    accentLight: "#fef2f2",
  },
  {
    id: 7,
    title: "Monitor de Atividades",
    description: "Visualize atividades em tempo real",
    icon: "activity",
    accent: "#ea580c",
    accentLight: "#fff7ed",
  },
  {
    id: 8,
    title: "Backup e Armazenamento",
    description: "Gerencie gravações e backups",
    icon: "database",
    accent: "#4f46e5",
    accentLight: "#eef2ff",
  },
];

// ── Render Cards ──────────────────────────────────────────────────────────────

function renderCards() {
  const grid = document.getElementById("cardsGrid");

  functionCards.forEach((card) => {
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
      </div>
    `;

    // Hover effects
    const topLine  = el.querySelector(".card-top-line");
    const iconWrap = el.querySelector(".card-icon-wrap");

    el.addEventListener("mouseenter", () => {
      el.style.background    = card.accentLight;
      el.style.borderColor   = card.accent + "55";
      el.style.boxShadow     = `0 8px 32px 0 ${card.accent}22, 0 2px 8px 0 rgba(0,0,0,0.04)`;
      topLine.style.background  = card.accent;
      iconWrap.style.background = card.accent + "22";
    });

    el.addEventListener("mouseleave", () => {
      el.style.background    = "#ffffff";
      el.style.borderColor   = "#e5e7eb";
      el.style.boxShadow     = "0 1px 4px 0 rgba(0,0,0,0.04)";
      topLine.style.background  = "transparent";
      iconWrap.style.background = card.accentLight;
    });

    grid.appendChild(el);
  });
}

// ── Sidebar Navigation ────────────────────────────────────────────────────────

function initNav() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all
      navItems.forEach((b) => {
        b.classList.remove("active");
        const dot = b.querySelector(".nav-dot");
        if (dot) dot.remove();
      });

      // Set active on clicked
      btn.classList.add("active");

      // Add dot indicator
      if (!btn.querySelector(".nav-dot")) {
        const dot = document.createElement("span");
        dot.className = "nav-dot";
        btn.appendChild(dot);
      }
    });
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  initNav();

  // Render all Lucide icons
  lucide.createIcons();
});
