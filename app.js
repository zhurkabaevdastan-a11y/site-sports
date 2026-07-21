const EVENTS = [
  {
    id: "futsal-2027",
    title: "Чемпионат КТЖ по футзалу",
    date: "01–04",
    month: "апреля 2027",
    icon: "⚽",
    description: "Командный турнир среди филиалов и дочерних организаций КТЖ.",
    disciplines: ["Футзал — мужская команда"]
  },
  {
    id: "volleyball-2027",
    title: "Чемпионат КТЖ по волейболу",
    date: "27–30",
    month: "апреля 2027",
    icon: "🏐",
    description: "Соревнования региональных мужских и женских команд.",
    disciplines: ["Волейбол — мужская команда", "Волейбол — женская команда"]
  },
  {
    id: "summer-games-2027",
    title: "Летняя спартакиада КТЖ",
    date: "2027",
    month: "дата уточняется",
    icon: "🏅",
    description: "Главные индивидуальные и командные дисциплины летнего сезона.",
    disciplines: ["Тоғызқұмалақ", "Асық ату", "Настольный теннис", "Армрестлинг", "Лёгкая атлетика", "Шахматы"]
  }
];



const PHOTO_ALBUMS = [
  { year: "2023", sport: "Футзал", icon: "⚽", description: "Материалы турниров и командных соревнований." },
  { year: "2023", sport: "Волейбол", icon: "🏐", description: "Фотографии матчей и награждения." },
  { year: "2023", sport: "Спартакиада", icon: "🏅", description: "Сборные соревнования КТЖ." },

  { year: "2024", sport: "Марафон и бег", icon: "🏃", description: "Забеги, старты и финишные моменты." },
  { year: "2024", sport: "Футзал", icon: "⚽", description: "Командные матчи и лучшие эпизоды." },
  { year: "2024", sport: "Волейбол", icon: "🏐", description: "Игры региональных команд." },
  { year: "2024", sport: "Баскетбол", icon: "🏀", description: "Матчи и церемонии награждения." },
  { year: "2024", sport: "IX Спартакиада Самрук-Қазына", icon: "🥇", description: "Победа сборной КТЖ в общекомандном зачёте." },

  { year: "2025", sport: "Марафон и бег", icon: "🏃", description: "Корпоративные забеги и тренировки." },
  { year: "2025", sport: "Футзал", icon: "⚽", description: "Чемпионаты и региональные турниры." },
  { year: "2025", sport: "Волейбол", icon: "🏐", description: "Матчи мужских и женских команд." },
  { year: "2025", sport: "Национальные виды спорта", icon: "♟️", description: "Тоғызқұмалақ, асық ату и другие дисциплины." },
  { year: "2025", sport: "X Спартакиада Самрук-Қазына", icon: "🏆", description: "Повторная победа команды КТЖ." },

  { year: "2026", sport: "КТЖ Марафон", icon: "🏃", description: "Фото участников, дистанций и награждения." },
  { year: "2026", sport: "Футзал", icon: "⚽", description: "Матчи чемпионата КТЖ." },
  { year: "2026", sport: "Волейбол", icon: "🏐", description: "Игры региональных команд КТЖ." },
  { year: "2026", sport: "Баскетбол", icon: "🏀", description: "Чемпионат и призёры соревнований." },
  { year: "2026", sport: "Летняя спартакиада", icon: "🏅", description: "Тоғызқұмалақ, асық ату, настольный теннис, армрестлинг, лёгкая атлетика и шахматы." },
  { year: "2026", sport: "Плавание", icon: "🏊", description: "Отборочные старты и участники сборной." }
];

const INSTRUCTORS = [
  { region: "Астана", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Акмола", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Костанай", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Караганда", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Семей", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Оскемен", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Алматы", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Алтынколь", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Достык", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Жамбыл", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Шымкент", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Кызылорда", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Актобе", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Уральск", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Илецк", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Атырау", name: "ФИО уточняется", phone: "", email: "" },
  { region: "Мангистау", name: "ФИО уточняется", phone: "", email: "" }
];


const STATUS_LABELS = { new: "Новая", review: "На рассмотрении", approved: "Подтверждена", rejected: "Отклонена", cancelled: "Отменена" };
function getEventTitle(eventId){ return EVENTS.find(item=>item.id===eventId)?.title || eventId; }
function escapeHtml(value){ return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }

const cfg = window.KTZ_CONFIG || {};
const isConfigured = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey && !cfg.demoMode);
const supabaseClient = isConfigured
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)
  : null;

let currentUser = null;
let currentProfile = {};
let currentRole = "participant";
let adminRows = [];
let adminFilteredRows = [];
let demoApplications = JSON.parse(localStorage.getItem("ktz_demo_applications") || "[]");
let demoUser = JSON.parse(localStorage.getItem("ktz_demo_user") || "null");

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 3200);
}

function showMessage(el, text, error = false) {
  el.textContent = text;
  el.classList.toggle("error", error);
  el.classList.remove("hidden");
}

function navigate(view) {
  if (view === "admin" && currentRole !== "admin") { toast("Доступ разрешён только администратору"); view = currentUser ? "events" : "home"; }
  $$(".view").forEach(el => el.classList.remove("active"));
  const target = $(`#view-${view}`); if (target) target.classList.add("active");
  $$(".bottom-nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  $("#mobileDrawer")?.classList.add("hidden"); $("#mobileMenuToggle")?.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "applications") loadApplications();
  if (view === "profile") loadProfile();
  if (view === "admin") loadAdminDashboard();
}

$$("[data-view]").forEach(btn => btn.addEventListener("click", () => {
  const view = btn.dataset.view;
  if (["applications", "profile", "admin"].includes(view) && !currentUser) {
    openAuth("login");
    return;
  }
  navigate(view);
}));

function renderEvents() {
  $("#eventGrid").innerHTML = EVENTS.map(event => `
    <article class="event-card">
      <div class="date">${event.date}<small>${event.month}</small></div>
      <div class="icon">${event.icon}</div>
      <h2>${event.title}</h2>
      <p>${event.description}</p>
      <div class="disciplines">${event.disciplines.join(" • ")}</div>
      <div class="event-actions">
        <button class="button primary apply-btn" data-event="${event.id}">Подать заявку</button>
        <a class="button secondary photo-link" data-photo-event="${event.id}" href="#" target="_blank" rel="noopener">Фото</a>
      </div>
    </article>
  `).join("");

  $$(".apply-btn").forEach(btn => btn.addEventListener("click", () => openApplication(btn.dataset.event)));

  $$(".photo-link").forEach(link => {
    const eventId = link.dataset.photoEvent;
    const photoUrl = cfg.eventPhotoUrls?.[eventId] || "";
    if (photoUrl) {
      link.href = photoUrl;
    } else {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Фотоальбом этого события пока не добавлен");
      });
    }
  });
}

function renderInstructors() {
  const root = $("#instructorGrid");
  root.innerHTML = INSTRUCTORS.map((item, index) => `
    <article class="instructor-card">
      <span class="region-number">${String(index + 1).padStart(2, "0")}</span>
      <h2>${item.region}</h2>
      <p>${item.name}</p>
      <div class="instructor-contacts">
        ${item.phone ? `<a href="tel:${item.phone.replace(/[^+\d]/g, "")}">${item.phone}</a>` : `<span>Телефон будет добавлен</span>`}
        ${item.email ? `<a href="mailto:${item.email}">${item.email}</a>` : `<span>Email будет добавлен</span>`}
      </div>
    </article>
  `).join("");
}

function updateAuthUI() {
  const loggedIn = Boolean(currentUser); const isAdmin = loggedIn && currentRole === "admin";
  $$(".guest-only").forEach(el => el.classList.toggle("hidden", loggedIn));
  $$(".auth-only").forEach(el => el.classList.toggle("hidden", !loggedIn));
  $$(".admin-only").forEach(el => el.classList.toggle("hidden", !isAdmin));
  $("#userBadge").textContent = loggedIn ? `${currentUser.email}${isAdmin ? " • admin" : ""}` : "";
  $(".mobile-bottom-nav")?.classList.toggle("has-admin", isAdmin);
}

function openAuth(mode = "login") {
  $("#authModal").classList.remove("hidden");
  setAuthTab(mode);
}

function closeAuth() {
  $("#authModal").classList.add("hidden");
  $("#authMessage").classList.add("hidden");
}

function setAuthTab(mode) {
  const login = mode === "login";
  $("#loginTab").classList.toggle("active", login);
  $("#signupTab").classList.toggle("active", !login);
  $("#loginForm").classList.toggle("hidden", !login);
  $("#signupForm").classList.toggle("hidden", login);
  $("#authMessage").classList.add("hidden");
}

$("#loginOpen").addEventListener("click", () => openAuth("login"));
$("#signupOpen").addEventListener("click", () => openAuth("signup"));
$("#heroSignup").addEventListener("click", () => openAuth("signup"));
$("#authClose").addEventListener("click", closeAuth);
$("#loginTab").addEventListener("click", () => setAuthTab("login"));
$("#signupTab").addEventListener("click", () => setAuthTab("signup"));

$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const email = fd.get("email").trim();
  const password = fd.get("password");

  if (!isConfigured) {
    const saved = JSON.parse(localStorage.getItem("ktz_demo_credentials") || "null");
    if (!saved || saved.email !== email || saved.password !== password) {
      showMessage($("#authMessage"), "Демо-аккаунт не найден или пароль неверный. Сначала зарегистрируйтесь.", true);
      return;
    }
    demoUser = { id: "demo-user", email };
    localStorage.setItem("ktz_demo_user", JSON.stringify(demoUser));
    currentUser = demoUser;
    updateAuthUI();
    closeAuth();
    toast("Вход выполнен в демо-режиме");
    navigate("events");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    showMessage($("#authMessage"), error.message, true);
    return;
  }
  currentUser = data.user;
  await loadCurrentRole();
  closeAuth();
  navigate("events");
});

$("#signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const email = fd.get("email").trim();
  const password = fd.get("password");
  const firstName = fd.get("first_name").trim();
  const lastName = fd.get("last_name").trim();

  if (!isConfigured) {
    localStorage.setItem("ktz_demo_credentials", JSON.stringify({ email, password }));
    localStorage.setItem("ktz_demo_profile", JSON.stringify({ first_name: firstName, last_name: lastName }));
    demoUser = { id: "demo-user", email };
    localStorage.setItem("ktz_demo_user", JSON.stringify(demoUser));
    currentUser = demoUser;
    updateAuthUI();
    closeAuth();
    toast("Демо-аккаунт создан");
    navigate("profile");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { first_name: firstName, last_name: lastName } }
  });
  if (error) {
    showMessage($("#authMessage"), error.message, true);
    return;
  }
  if (!data.session) {
    showMessage($("#authMessage"), "Аккаунт создан. Проверьте почту и подтвердите адрес.");
  } else {
    currentUser = data.user;
    await loadCurrentRole();
    closeAuth();
    navigate("profile");
  }
});

$("#logoutBtn").addEventListener("click", async () => {
  if (isConfigured) await supabaseClient.auth.signOut();
  localStorage.removeItem("ktz_demo_user");
  currentUser = null;
  currentRole = "participant";
  updateAuthUI();
  navigate("home");
});


async function loadCurrentRole() {
  currentRole = "participant";
  if (!currentUser) { updateAuthUI(); return currentRole; }
  if (!isConfigured) { currentRole = "admin"; updateAuthUI(); return currentRole; }
  const { data, error } = await supabaseClient.from("profiles").select("role").eq("id", currentUser.id).maybeSingle();
  if (error) console.error("Не удалось получить роль:", error); else if (data?.role) currentRole = data.role;
  updateAuthUI(); return currentRole;
}

async function loadProfile() {
  if (!currentUser) return;
  $("#profileEmail").value = currentUser.email || "";

  if (!isConfigured) {
    currentProfile = JSON.parse(localStorage.getItem("ktz_demo_profile") || "{}");
  } else {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", currentUser.id)
      .maybeSingle();
    if (error) toast(`Ошибка профиля: ${error.message}`);
    currentProfile = data || {};
  }

  const form = $("#profileForm");
  [...form.elements].forEach(el => {
    if (el.name && currentProfile[el.name] != null) el.value = currentProfile[el.name];
  });
}

$("#profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return;
  const fd = new FormData(e.currentTarget);
  const profile = Object.fromEntries(fd.entries());
  profile.id = currentUser.id;
  profile.email = currentUser.email || null;
  if (currentProfile.role) profile.role = currentProfile.role;

  if (!isConfigured) {
    localStorage.setItem("ktz_demo_profile", JSON.stringify(profile));
    currentProfile = profile;
    toast("Профиль сохранён в демо-режиме");
    return;
  }

  const { error } = await supabaseClient.from("profiles").upsert(profile);
  if (error) toast(`Ошибка: ${error.message}`);
  else {
    currentProfile = profile;
    toast("Профиль сохранён");
  }
});

function openApplication(eventId) {
  if (!currentUser) {
    openAuth("login");
    return;
  }
  const event = EVENTS.find(x => x.id === eventId);
  $("#applicationForm [name=event_id]").value = event.id;
  $("#applyEventTitle").textContent = event.title;
  $("#disciplineSelect").innerHTML = event.disciplines.map(d => `<option>${d}</option>`).join("");
  $("#applyModal").classList.remove("hidden");
  $("#applyMessage").classList.add("hidden");
}

$("#applyClose").addEventListener("click", () => $("#applyModal").classList.add("hidden"));

$("#applicationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return;
  const fd = new FormData(e.currentTarget);
  const application = {
    user_id: currentUser.id,
    event_id: fd.get("event_id"),
    discipline: fd.get("discipline"),
    team_name: fd.get("team_name") || null,
    comment: fd.get("comment") || null,
    health_confirmed: true,
    status: "new"
  };

  if (!isConfigured) {
    application.id = crypto.randomUUID();
    application.created_at = new Date().toISOString();
    demoApplications.push(application);
    localStorage.setItem("ktz_demo_applications", JSON.stringify(demoApplications));
    $("#applyModal").classList.add("hidden");
    toast("Заявка сохранена в демо-режиме");
    navigate("applications");
    return;
  }

  const { error } = await supabaseClient.from("registrations").insert(application);
  if (error) {
    showMessage($("#applyMessage"), error.message, true);
    return;
  }
  $("#applyModal").classList.add("hidden");
  toast("Заявка отправлена");
  navigate("applications");
});

async function loadApplications() {
  if (!currentUser) return;
  let rows = [];

  if (!isConfigured) {
    rows = demoApplications.filter(x => x.user_id === currentUser.id);
  } else {
    const { data, error } = await supabaseClient
      .from("registrations")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });
    if (error) toast(`Ошибка: ${error.message}`);
    rows = data || [];
  }

  const root = $("#applicationList");
  if (!rows.length) {
    root.innerHTML = `<div class="empty">Вы пока не подавали заявки. Перейдите в раздел «События».</div>`;
    return;
  }

  root.className = "wrap application-list";
  root.innerHTML = rows.map(row => {
    const event = EVENTS.find(x => x.id === row.event_id);
    return `<article class="application-card">
      <div>
        <h3>${event?.title || row.event_id}</h3>
        <p>${row.discipline}${row.team_name ? ` • Команда: ${row.team_name}` : ""}</p>
      </div>
      <span class="status new">Новая заявка</span>
    </article>`;
  }).join("");
}


function renderPhotoArchive(year = "all") {
  const root = $("#photoGrid");
  const archiveUrl = cfg.photoArchiveUrl || "https://disk.yandex.ru/d/DJOG8JlXlgYrag";
  const items = year === "all"
    ? PHOTO_ALBUMS
    : PHOTO_ALBUMS.filter(item => item.year === year);

  root.innerHTML = items.map(item => `
    <article class="photo-card">
      <div class="photo-card-top">
        <span class="photo-icon">${item.icon}</span>
        <span class="photo-year">${item.year}</span>
      </div>
      <h2>${item.sport}</h2>
      <p>${item.description}</p>
      <a class="button secondary photo-open" href="${archiveUrl}" target="_blank" rel="noopener">
        Смотреть фото ↗
      </a>
    </article>
  `).join("");

  $("#allPhotosLink").href = archiveUrl;
}

function initPhotoFilters() {
  $$(".year-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".year-btn").forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderPhotoArchive(btn.dataset.photoYear);
    });
  });
}



function normalizeAdminRow(row){ const p=row.profiles||{}; return {id:row.id,user_id:row.user_id,event_id:row.event_id,event_title:row.events?.title||getEventTitle(row.event_id),discipline:row.discipline||"",team_name:row.team_name||"",status:row.status||"new",created_at:row.created_at,first_name:p.first_name||"",last_name:p.last_name||"",middle_name:p.middle_name||"",email:p.email||"",phone:p.phone||"",region:p.region||"",department:p.department||"",position:p.position||"",employee_number:p.employee_number||""}; }
function adminFullName(row){ return [row.last_name,row.first_name,row.middle_name].filter(Boolean).join(" ") || "Профиль не заполнен"; }
function updateAdminMetrics(){ $("#adminTotalCount").textContent=adminRows.length; $("#adminNewCount").textContent=adminRows.filter(r=>r.status==="new").length; $("#adminApprovedCount").textContent=adminRows.filter(r=>r.status==="approved").length; $("#adminUserCount").textContent=new Set(adminRows.map(r=>r.user_id)).size; }
function applyAdminFilters(){ const q=($("#adminSearch")?.value||"").trim().toLowerCase(), eventId=$("#adminEventFilter")?.value||"", region=$("#adminRegionFilter")?.value||"", status=$("#adminStatusFilter")?.value||""; adminFilteredRows=adminRows.filter(r=>{ const h=[adminFullName(r),r.email,r.phone,r.department,r.position,r.employee_number,r.discipline,r.team_name].join(" ").toLowerCase(); return (!q||h.includes(q))&&(!eventId||r.event_id===eventId)&&(!region||r.region===region)&&(!status||r.status===status); }); renderAdminRows(); }
function statusOptions(row){ return Object.entries(STATUS_LABELS).map(([v,l])=>`<option value="${v}" ${row.status===v?"selected":""}>${l}</option>`).join(""); }
function renderAdminRows(){ const body=$("#adminTableBody"), cards=$("#adminMobileCards"); if(!adminFilteredRows.length){body.innerHTML='<tr><td colspan="8" class="admin-empty-cell">Заявки не найдены</td></tr>';cards.innerHTML='<div class="empty">Заявки не найдены</div>';return;} body.innerHTML=adminFilteredRows.map(r=>`<tr><td><strong>${escapeHtml(adminFullName(r))}</strong><small>${escapeHtml(r.phone||r.email||"Контакты не указаны")}</small></td><td>${escapeHtml(r.region||"—")}</td><td>${escapeHtml(r.department||"—")}</td><td>${escapeHtml(r.event_title)}</td><td>${escapeHtml(r.discipline)}</td><td>${escapeHtml(r.team_name||"—")}</td><td>${r.created_at?new Date(r.created_at).toLocaleDateString("ru-RU"):"—"}</td><td><select class="admin-status-select" data-registration-id="${escapeHtml(r.id)}">${statusOptions(r)}</select></td></tr>`).join(""); cards.innerHTML=adminFilteredRows.map(r=>`<article class="admin-registration-card"><div class="admin-card-head"><div><strong>${escapeHtml(adminFullName(r))}</strong><small>${escapeHtml(r.region||"Регион не указан")}</small></div><span>${r.created_at?new Date(r.created_at).toLocaleDateString("ru-RU"):""}</span></div><dl><div><dt>Событие</dt><dd>${escapeHtml(r.event_title)}</dd></div><div><dt>Дисциплина</dt><dd>${escapeHtml(r.discipline)}</dd></div><div><dt>Подразделение</dt><dd>${escapeHtml(r.department||"—")}</dd></div><div><dt>Телефон</dt><dd>${escapeHtml(r.phone||"—")}</dd></div><div><dt>Команда</dt><dd>${escapeHtml(r.team_name||"—")}</dd></div></dl><label>Статус<select class="admin-status-select" data-registration-id="${escapeHtml(r.id)}">${statusOptions(r)}</select></label></article>`).join(""); $$(".admin-status-select").forEach(s=>s.addEventListener("change",()=>updateRegistrationStatus(s.dataset.registrationId,s.value))); }
async function loadAdminDashboard(){ if(!currentUser||currentRole!=="admin"){navigate("events");return;} const msg=$("#adminMessage");msg.classList.add("hidden"); if(!isConfigured){adminRows=demoApplications.map(r=>normalizeAdminRow({...r,profiles:JSON.parse(localStorage.getItem("ktz_demo_profile")||"{}"),events:{title:getEventTitle(r.event_id)}}));} else { const {data,error}=await supabaseClient.from("registrations").select(`id,user_id,event_id,discipline,team_name,comment,status,created_at,profiles(first_name,last_name,middle_name,email,phone,region,department,position,employee_number),events(title)`).order("created_at",{ascending:false}); if(error){showMessage(msg,`Не удалось загрузить заявки: ${error.message}`,true);adminRows=[];}else adminRows=(data||[]).map(normalizeAdminRow); } const rs=$("#adminRegionFilter"), cur=rs.value, regs=[...new Set(adminRows.map(r=>r.region).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ru"));rs.innerHTML='<option value="">Все регионы</option>'+regs.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join("");rs.value=regs.includes(cur)?cur:"";updateAdminMetrics();applyAdminFilters(); }
async function updateRegistrationStatus(id,status){ if(currentRole!=="admin")return; if(!isConfigured){const t=demoApplications.find(x=>x.id===id);if(t)t.status=status;localStorage.setItem("ktz_demo_applications",JSON.stringify(demoApplications));}else{const {error}=await supabaseClient.from("registrations").update({status}).eq("id",id);if(error){toast(`Ошибка изменения статуса: ${error.message}`);await loadAdminDashboard();return;}} const r=adminRows.find(x=>x.id===id);if(r)r.status=status;updateAdminMetrics();applyAdminFilters();toast(`Статус изменён: ${STATUS_LABELS[status]}`); }
function csvValue(v){return `"${String(v??"").replaceAll('"','""')}"`;}
function exportAdminCsv(){ if(!adminFilteredRows.length){toast("Нет данных для выгрузки");return;} const headers=["ФИО","Email","Телефон","Регион","Подразделение","Должность","Табельный номер","Событие","Дисциплина","Команда","Статус","Дата заявки"]; const lines=[headers.map(csvValue).join(";"),...adminFilteredRows.map(r=>[adminFullName(r),r.email,r.phone,r.region,r.department,r.position,r.employee_number,r.event_title,r.discipline,r.team_name,STATUS_LABELS[r.status]||r.status,r.created_at?new Date(r.created_at).toLocaleString("ru-RU"):""].map(csvValue).join(";"))]; const blob=new Blob(["\uFEFF"+lines.join("\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=`ktzh-registrations-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url); }
function initializeAdminUI(){["adminSearch","adminEventFilter","adminRegionFilter","adminStatusFilter"].forEach(id=>{const el=$(`#${id}`);el?.addEventListener(id==="adminSearch"?"input":"change",applyAdminFilters);});$("#adminRefreshBtn")?.addEventListener("click",loadAdminDashboard);$("#adminExportBtn")?.addEventListener("click",exportAdminCsv);}

function initializeMobileUI() {
  const toggle = $("#mobileMenuToggle");
  const drawer = $("#mobileDrawer");

  toggle?.addEventListener("click", () => {
    const willOpen = drawer.classList.contains("hidden");
    drawer.classList.toggle("hidden", !willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });

  $("#mobileLoginOpen")?.addEventListener("click", () => openAuth("login"));
  $("#mobileSignupOpen")?.addEventListener("click", () => openAuth("signup"));
  $("#mobileRegisterFab")?.addEventListener("click", () => openAuth("signup"));

  $("#mobileLogoutBtn")?.addEventListener("click", async () => {
    if (isConfigured) await supabaseClient.auth.signOut();
    localStorage.removeItem("ktz_demo_user");
    currentUser = null;
    updateAuthUI();
    navigate("home");
  });

  drawer?.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (["applications", "profile", "admin"].includes(view) && !currentUser) {
        openAuth("login");
        return;
      }
      navigate(view);
    });
  });
}

async function initialize() {
  renderEvents();
  renderInstructors();
  renderPhotoArchive();
  initPhotoFilters();
  initializeMobileUI();
  initializeAdminUI();
  $("#modeNote").textContent = isConfigured
    ? "Рабочий режим: данные сохраняются в Supabase."
    : "Демо-режим: данные сохраняются только в этом браузере. Подключите Supabase для настоящей базы.";

  if (isConfigured) {
    const { data } = await supabaseClient.auth.getSession();
    currentUser = data.session?.user || null;
    await loadCurrentRole();
    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session?.user || null;
      await loadCurrentRole();
    });
  } else {
    currentUser = demoUser;
    currentRole = currentUser ? "admin" : "participant";
    updateAuthUI();
  }
}

initialize();
