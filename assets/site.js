(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const sidebar = $("#sidebar");
  const backdrop = $("#backdrop");
  const openBtn = $("#menuBtn");
  const closeBtn = $("#closeBtn");

  function setSidebar(open) {
    if (!sidebar) return;
    sidebar.classList.toggle("active", open);
    if (backdrop) backdrop.classList.toggle("active", open);
    if (openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.style.overflow = open ? "hidden" : "";
  }

  function toggleSidebar() {
    setSidebar(!sidebar?.classList.contains("active"));
  }

  openBtn?.addEventListener("click", toggleSidebar);
  closeBtn?.addEventListener("click", () => setSidebar(false));
  backdrop?.addEventListener("click", () => setSidebar(false));

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setSidebar(false);
  });

  // Close after clicking any sidebar link (mobile-friendly)
  $$(".sidebar a").forEach((a) => {
    a.addEventListener("click", () => setSidebar(false));
  });

  // Fill version button labels from each page's meta[name="version"]
  const currentVersion = $('meta[name="version"]')?.getAttribute("content") || "";
  const currentSlot = $("#currentVersionSlot");
  if (currentSlot && currentVersion) currentSlot.textContent = `v${currentVersion}`;

  // Add active state for current path if author forgot
  const path = location.pathname.replace(/\/+$/, "") || "/";
  $$(".nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
    if (href === path) a.classList.add("active");
  });

  // Improve keyboard behavior on cards with role=link
  $$(".video-card[role='link']").forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
})();

