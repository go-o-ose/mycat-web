// --- ИНИЦИАЛИЗАЦИЯ ДАННЫХ ---
const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

let state = JSON.parse(localStorage.getItem('catSave')) || {
    streakSimple: 0,
    streakPro: 0,
    lastDay: "",
    lastRewardDay: "",
    proRewardDay: "",
    sickDay: "",
    background: 0,
    multiplierLevel: 0,
    aquariumLevel: 0,
    lastAquariumTime: "",
    fish: { common: 0, rare: 0, epic: 0, legend: 0 }
};

// Задания (Базовые на сегодня. В будущем можно менять)
let tasksData = JSON.parse(localStorage.getItem('catTasks')) || {
    [todayStr()]: [
        { name: "Отжимания", count: "20×2", done: false, rewarded: false },
        { name: "Приседания", count: "30×3", done: false, rewarded: false },
        { name: "Планка", count: "60 сек", done: false, rewarded: false }
    ]
};

const save = () => {
    localStorage.setItem('catSave', JSON.stringify(state));
    localStorage.setItem('catTasks', JSON.stringify(tasksData));
};

// --- ВСПОМОГАТЕЛЬНЫЕ ---
const colors = [
    "#d9ebfc", "#ffcc99", "#1a1a33", "#66cc80", "#1a0d4d", 
    "#3380cc", "#9966e6", "#ff6633", "#4d1a80", "#e6b333"
];

function getMultiplier() {
    return Math.pow(2, state.multiplierLevel);
}

// --- ЛОГИКА СТРИКОВ ---
function checkStreakOnLoad() {
    const today = todayStr();
    if (state.sickDay === today) return; // Болеем, ничего не трогаем

    if (state.lastDay === "") {
        state.streakSimple = 1;
        state.lastDay = today;
        state.fish.common += 2;
    } else if (state.lastDay !== today) {
        // Проверка на пропуск (если разница больше 1 дня, стрик сгорает)
        const last = new Date(state.lastDay);
        const now = new Date(today);
        const diffDays = Math.ceil(Math.abs(now - last) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            state.streakSimple += 1;
            state.fish.common += 2 + Math.floor(state.streakSimple / 3);
        } else if (diffDays > 1) {
            state.streakSimple = 1;
            state.streakPro = 0;
            state.proRewardDay = "";
            state.fish.common += 2;
        }
        state.lastDay = today;
    }
    save();
    updateUI();
}

// --- ОТРИСОВКА ИНТЕРФЕЙСА ---
function updateUI() {
    document.body.style.backgroundColor = colors[state.background] || colors[0];
    document.getElementById('info').innerText = `Стрик: ${state.streakSimple} | Про: ${state.streakPro} | ×${getMultiplier()}`;
    
    for (let k in state.fish) {
        document.getElementById(`fish-${k}`).innerText = state.fish[k];
    }
    
    renderTasks();
    updateAquariumUI();
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = "";
    const todayTasks = tasksData[todayStr()] || [];

    if (todayTasks.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>Нет заданий на сегодня</p>";
        return;
    }

    todayTasks.forEach((task, index) => {
        const row = document.createElement('div');
        row.className = 'task-row';
        
        const text = document.createElement('span');
        text.innerText = `${task.name} — ${task.count}`;
        
        const cb = document.createElement('div');
        cb.className = `custom-checkbox ${task.done ? 'checked' : ''}`;
        cb.onclick = () => toggleTask(index);

        row.appendChild(text);
        row.appendChild(cb);
        list.appendChild(row);
    });
}

// --- ЗАДАНИЯ И НАГРАДЫ ---
function toggleTask(index) {
    const today = todayStr();
    const task = tasksData[today][index];
    const newDone = !task.done;

    if (state.sickDay === today) {
        task.done = newDone; // Если болеем, просто ставим галочку без наград
        save(); renderTasks(); return;
    }

    if (newDone && !task.rewarded) {
        state.fish.common += 1 * getMultiplier();
        task.rewarded = true;
        showPopup("Успех!", `+${1 * getMultiplier()} обычных`, () => {});
    }

    task.done = newDone;
    save();
    updateUI();
    checkAllDone();
}

function checkAllDone() {
    const today = todayStr();
    const todayTasks = tasksData[today] || [];
    if (todayTasks.length === 0) return;

    const allDone = todayTasks.every(t => t.done);

    if (allDone && state.proRewardDay !== today && state.sickDay !== today) {
        state.proRewardDay = today;
        state.streakPro += 1;
        let reward = (5 + Math.floor(state.streakPro / 2)) * getMultiplier();
        
        showPopup("ВСЁ ВЫПОЛНЕНО!", `Награда: +${reward} обычных`, () => {
            state.fish.common += reward;
            save(); updateUI();
        });
    }
    checkStreakRewards();
}

function checkStreakRewards() {
    const today = todayStr();
    if (state.lastRewardDay === today || state.sickDay === today) return;

    let s = state.streakSimple;
    let p = state.streakPro;
    let lines = [];

    if (p >= 10) lines.push(`+${Math.floor(p/10)} редких (про)`);
    if (p >= 100) lines.push(`+${Math.floor(p/100)} эпик (про)`);
    if (p >= 500) lines.push(`+${Math.floor(p/500)} легенд (про)`);
    if (s >= 20) lines.push(`+${Math.floor(s/20)} редких (обыч)`);
    if (s >= 200) lines.push(`+${Math.floor(s/200)} эпик (обыч)`);
    if (s >= 1000) lines.push(`+${Math.floor(s/1000)} легенд (обыч)`);

    if (lines.length > 0) {
        state.lastRewardDay = today;
        showPopup("НАГРАДА ЗА СТРИК", lines.join('<br>'), () => {
            state.fish.rare += Math.floor(p/10) + Math.floor(s/20);
            state.fish.epic += Math.floor(p/100) + Math.floor(s/200);
            state.fish.legend += Math.floor(p/500) + Math.floor(s/1000);
            save(); updateUI();
        });
    }
}

// --- БОЛЕЗНЬ ---
function triggerSickDay() {
    const today = todayStr();
    if (state.sickDay === today) return showPopup("!", "Уже отмечено", ()=>{});

    showConfirm("Уверены?", "Задания не дадут рыбок, но стрик сохранится.", () => {
        state.sickDay = today;
        state.lastDay = today;
        const todayTasks = tasksData[today] || [];
        todayTasks.forEach(t => { t.done = false; t.rewarded = true; });
        save(); updateUI();
        showPopup("Болезнь", "Стрик сохранён. Выздоравливай!", ()=>{});
    });
}

// --- АКВАРИУМ ---
const aqPrices = [ {t:"c",p:100}, {t:"c",p:300}, {t:"r",p:18}, {t:"e",p:1}, {t:"e",p:3}, {t:"e",p:9}, {t:"e",p:27}, {t:"l",p:1} ];
const aqRates = [ {t:"c",r:1}, {t:"c",r:3}, {t:"r",r:1}, {t:"r",r:3}, {t:"e",r:1}, {t:"e",r:3}, {t:"l",r:1}, {t:"l",r:3} ];

function updateAquariumUI() {
    const text = document.getElementById('aq-text');
    if (state.aquariumLevel === 0) {
        text.innerText = "Аквариум: не куплен";
    } else {
        const rate = aqRates[state.aquariumLevel - 1];
        const names = {c:"обыч", r:"ред", e:"эпик", l:"лег"};
        text.innerText = `Ур.${state.aquariumLevel}\n+${rate.r} ${names[rate.t]}/час`;
    }
}

function collectAquarium() {
    if (state.aquariumLevel === 0) return showPopup("!", "Сначала купи в магазине", ()=>{});
    
    const last = state.lastAquariumTime ? new Date(state.lastAquariumTime) : new Date();
    const now = new Date();
    const hours = (now - last) / 1000 / 3600;
    
    const rate = aqRates[state.aquariumLevel - 1];
    const earned = Math.floor(hours * rate.r);

    if (earned > 0) {
        state.fish[rate.t] += earned;
        state.lastAquariumTime = now.toISOString();
        save(); updateUI();
        showPopup("Аквариум", `+${earned} ${rate.t === 'c'?'обычных':rate.t==='r'?'редких':rate.t==='e'?'эпик':'легенд'}`, ()=>{});
    } else {
        showPopup("Аквариум", "Пока пусто (подожди час)", ()=>{});
    }
}

// --- МАГАЗИН И ОБМЕН ---
function openShop() {
    let html = "<h3>Фоны</h3>";
    const bgs = ["Синий (50 c)", "Закат (200 c)", "Ночь (500 c)", "Лес (2 r)", "Космос (5 r)", "Вода (15 r)", "Аврора (3 e)", "Огонь (10 e)", "Галактика (1 l)", "Легенда (3 l)"];
    const bgPrices = [{t:"c",p:50},{t:"c",p:200},{t:"c",p:500},{t:"r",p:2},{t:"r",p:5},{t:"r",p:15},{t:"e",p:3},{t:"e",p:10},{t:"l",p:1},{t:"l",p:3}];
    
    bgs.forEach((name, i) => {
        html += `<div class="shop-row"><span>${name}</span><button onclick="buyBg(${i})">Купить</button></div>`;
    });

    // Множитель
    html += "<h3>Множитель</h3>";
    if (state.multiplierLevel >= 10) {
        html += `<div class="shop-row"><span>МАКС (×1024)</span></div>`;
    } else {
        let basePrice = 10 * Math.pow(3, state.multiplierLevel);
        let curIdx = 0, price = basePrice;
        const curTypes = ["c", "r", "e", "l"];
        while(price > 50 && curIdx < 3) {
            price = Math.floor(price / 50) * 2;
            curIdx++;
        }
        html += `<div class="shop-row"><span>×${Math.pow(2, state.multiplierLevel+1)} (${price} ${curTypes[curIdx]})</span><button onclick="buyMult()">Купить</button></div>`;
    }

    // Аквариум
    html += "<h3>Аквариум</h3>";
    if (state.aquariumLevel >= aqPrices.length) {
        html += `<div class="shop-row"><span>МАКС</span></div>`;
    } else {
        const p = aqPrices[state.aquariumLevel];
        html += `<div class="shop-row"><span>Ур.${state.aquariumLevel+1} (${p.p} ${p.t})</span><button onclick="buyAq()">Купить</button></div>`;
    }

    showModal("Магазин", html, [{text: "Закрыть", action: closeModal}]);
}

function buyBg(id) {
    const p = [{t:"c",p:50},{t:"c",p:200},{t:"c",p:500},{t:"r",p:2},{t:"r",p:5},{t:"r",p:15},{t:"e",p:3},{t:"e",p:10},{t:"l",p:1},{t:"l",p:3}][id];
    if(state.fish[p.t] >= p.p) {
        state.fish[p.t] -= p.p;
        state.background = id;
        save(); updateUI(); closeModal();
    } else showPopup("!", "Не хватает!", ()=>{});
}

function buyMult() {
    let base = 10 * Math.pow(3, state.multiplierLevel);
    let idx = 0, price = base;
    const types = ["c", "r", "e", "l"];
    while(price > 50 && idx < 3) { price = Math.floor(price/50)*2; idx++; }
    
    if (state.fish[types[idx]] >= price) {
        state.fish[types[idx]] -= price;
        state.multiplierLevel++;
        save(); updateUI(); openShop(); // Обновить окно
    } else showPopup("!", "Не хватает!", ()=>{});
}

function buyAq() {
    const p = aqPrices[state.aquariumLevel];
    if (state.fish[p.t] >= p.p) {
        state.fish[p.t] -= p.p;
        state.aquariumLevel++;
        if (state.aquariumLevel === 1) state.lastAquariumTime = new Date().toISOString();
        save(); updateUI(); openShop();
    } else showPopup("!", "Не хватает!", ()=>{});
}

function openExchange() {
    let html = `
    <div class="shop-row"><span>50 c → 1 r</span><button onclick="exch('c','r',50)">Обменять</button></div>
    <div class="shop-row"><span>1 r → 50 c</span><button onclick="exch('r','c',1,50)">Обменять</button></div>
    <div class="shop-row"><span>50 r → 1 e</span><button onclick="exch('r','e',50)">Обменять</button></div>
    <div class="shop-row"><span>1 e → 50 r</span><button onclick="exch('e','r',1,50)">Обменять</button></div>
    <div class="shop-row"><span>50 e → 1 l</span><button onclick="exch('e','l',50)">Обменять</button></div>
    <div class="shop-row"><span>1 l → 50 e</span><button onclick="exch('l','e',1,50)">Обменять</button></div>
    `;
    showModal("Обмен", html, [{text: "Закрыть", action: closeModal}]);
}

function exch(from, to, cost, reward = 1) {
    if (state.fish[from] >= cost) {
        state.fish[from] -= cost;
        state.fish[to] += reward;
        save(); updateUI();
        // Перерисовываем окно, чтобы цифры обновились
        openExchange(); 
    } else showPopup("!", "Не хватает!", ()=>{});
}

// --- МОДАЛЬНЫЕ ОКНА ---
function showModal(title, html, buttons) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = html;
    const btnContainer = document.getElementById('modal-buttons');
    btnContainer.innerHTML = "";
    
    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.className = "modal-btn";
        btn.innerText = b.text;
        btn.onclick = b.action;
        btnContainer.appendChild(btn);
    });
    
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function showPopup(title, text, onClose) {
    showModal(title, `<p>${text}</p>`, [{text: "Забрать", action: () => { onClose(); closeModal(); }}]);
}

function showConfirm(title, text, onYes) {
    showModal(title, `<p>${text}</p>`, [
        {text: "Да", action: () => { onYes(); closeModal(); }},
        {text: "Нет", action: closeModal}
    ]);
}

// --- ЗАПУСК ---
window.onload = () => {
    checkStreakOnLoad();
    setInterval(() => {
        // Если приложение открыто, раз в минуту проверяем наступил ли новый день
        if (state.lastDay !== todayStr() && state.sickDay !== todayStr()) {
            checkStreakOnLoad();
        }
    }, 60000);
};