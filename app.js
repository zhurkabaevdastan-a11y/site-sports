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

const cfg = window.KTZ_CONFIG || {};
const isConfigured = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey && !cfg.demoMode);
const supabaseClient = isConfigured
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)
  : null;

let currentUser = null;
let currentProfile = {};
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
  $$(".view").forEach(el => el.classList.remove("active"));
  const target = $(`#view-${view}`);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "applications") loadApplications();
  if (view === "profile") loadProfile();
}

$$("[data-view]").forEach(btn => btn.addEventListener("click", () => {
  const view = btn.dataset.view;
  if ((view === "applications" || view === "profile") && !currentUser) {
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
      <button class="button primary apply-btn" data-event="${event.id}">Подать заявку</button>
    </article>
  `).join("");

  $$(".apply-btn").forEach(btn => btn.addEventListener("click", () => openApplication(btn.dataset.event)));
}

function updateAuthUI() {
  const loggedIn = Boolean(currentUser);
  $$(".guest-only").forEach(el => el.classList.toggle("hidden", loggedIn));
  $$(".auth-only").forEach(el => el.classList.toggle("hidden", !loggedIn));
  $("#userBadge").textContent = loggedIn ? currentUser.email : "";
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
  updateAuthUI();
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
    updateAuthUI();
    closeAuth();
    navigate("profile");
  }
});

$("#logoutBtn").addEventListener("click", async () => {
  if (isConfigured) await supabaseClient.auth.signOut();
  localStorage.removeItem("ktz_demo_user");
  currentUser = null;
  updateAuthUI();
  navigate("home");
});

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

async function initialize() {
  renderEvents();
  $("#modeNote").textContent = isConfigured
    ? "Рабочий режим: данные сохраняются в Supabase."
    : "Демо-режим: данные сохраняются только в этом браузере. Подключите Supabase для настоящей базы.";

  if (isConfigured) {
    const { data } = await supabaseClient.auth.getSession();
    currentUser = data.session?.user || null;
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      updateAuthUI();
    });
  } else {
    currentUser = demoUser;
  }
  updateAuthUI();
}

initialize();
