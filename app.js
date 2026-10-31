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
  "2026-10-12": [
    {
      "name": "Отжимания",
      "count": "10×3",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Австралийские",
      "count": "4×3",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Планка",
      "count": "30 сек×3",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Лодочка",
      "count": "10×2",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Удары",
      "count": "30 сек×3",
      "done": true,
      "rewarded": true
    }
  ],
  "2026-10-13": [
    {
      "name": "Спринт",
      "count": "40м×4",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Прыжки в длину",
      "count": "5×3",
      "done": true,
      "rewarded": true
    },
    {
      "name": "Выпрыгивания",
      "count": "8×3",
      "done": true,
      "rewarded": true
    }
  ],
  "2026-10-14": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-15": [
    {
      "name": "Отжимания",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "6×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "30 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-16": [
    {
      "name": "Бег",
      "count": "1.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-17": [
    {
      "name": "Приседания",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "10×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-18": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-19": [
    {
      "name": "Отжимания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "5×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "35 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "12×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-20": [
    {
      "name": "Спринт",
      "count": "40м×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "10×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-21": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-22": [
    {
      "name": "Отжимания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "8×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "40 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "35 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-23": [
    {
      "name": "Бег",
      "count": "1.8 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-24": [
    {
      "name": "Приседания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "12×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-25": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-26": [
    {
      "name": "Отжимания",
      "count": "14×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "6×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "40 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "15×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-27": [
    {
      "name": "Спринт",
      "count": "40м×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "10×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-28": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-29": [
    {
      "name": "Отжимания",
      "count": "14×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "8×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "40 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-30": [
    {
      "name": "Бег",
      "count": "2 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-10-31": [
    {
      "name": "Приседания",
      "count": "25×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "25×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-01": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-02": [
    {
      "name": "Отжимания",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "6×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "45 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "15×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-03": [
    {
      "name": "Спринт",
      "count": "40м×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "10×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-04": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-05": [
    {
      "name": "Отжимания",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "40 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "45 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-06": [
    {
      "name": "Бег",
      "count": "2 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-07": [
    {
      "name": "Приседания",
      "count": "25×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "25×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-08": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-09": [
    {
      "name": "Отжимания",
      "count": "16×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "7×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "50 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "30 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-10": [
    {
      "name": "Спринт",
      "count": "50м×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-11": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-12": [
    {
      "name": "Отжимания",
      "count": "16×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "40 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "50 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-13": [
    {
      "name": "Бег",
      "count": "2.2 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-14": [
    {
      "name": "Приседания",
      "count": "28×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "28×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-15": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-16": [
    {
      "name": "Отжимания",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "8×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "55 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "40 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-17": [
    {
      "name": "Спринт",
      "count": "50м×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-18": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-19": [
    {
      "name": "Отжимания",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "55 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-20": [
    {
      "name": "Бег",
      "count": "2.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-21": [
    {
      "name": "Приседания",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-22": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-23": [
    {
      "name": "Разгрузка: отжимания",
      "count": "12×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: австралийские",
      "count": "5×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: планка",
      "count": "35 сек×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-24": [
    {
      "name": "Разгрузка: спринт",
      "count": "30м×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: прыжки",
      "count": "5×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-25": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-26": [
    {
      "name": "Разгрузка: отжимания",
      "count": "12×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: удары",
      "count": "30 сек×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-27": [
    {
      "name": "Разгрузка: бег",
      "count": "1.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-28": [
    {
      "name": "Разгрузка: приседания",
      "count": "20×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: пресс",
      "count": "20×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-29": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-11-30": [
    {
      "name": "Отжимания",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "8×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "55 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "40 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-01": [
    {
      "name": "Спринт",
      "count": "50м×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-02": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-03": [
    {
      "name": "Отжимания",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "60 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-04": [
    {
      "name": "Бег",
      "count": "2.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-05": [
    {
      "name": "Приседания",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-06": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-07": [
    {
      "name": "Отжимания",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "9×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "60 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-08": [
    {
      "name": "Спринт",
      "count": "50м×7",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "15×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-09": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-10": [
    {
      "name": "Отжимания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "12×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "60 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-11": [
    {
      "name": "Бег",
      "count": "2.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-12": [
    {
      "name": "Приседания",
      "count": "32×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "32×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-13": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-14": [
    {
      "name": "Отжимания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "65 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "50 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-15": [
    {
      "name": "Спринт",
      "count": "50м×8",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "15×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-16": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-17": [
    {
      "name": "Отжимания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "14×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "50 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "65 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-18": [
    {
      "name": "Бег",
      "count": "2.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-19": [
    {
      "name": "Приседания",
      "count": "35×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "35×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×6",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-20": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-21": [
    {
      "name": "Разгрузка: отжимания",
      "count": "15×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: австралийские",
      "count": "6×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: планка",
      "count": "40 сек×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-22": [
    {
      "name": "Разгрузка: спринт",
      "count": "40м×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: прыжки",
      "count": "5×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-23": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-24": [
    {
      "name": "Разгрузка: отжимания",
      "count": "15×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: удары",
      "count": "30 сек×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-25": [
    {
      "name": "Разгрузка: бег",
      "count": "1.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-26": [
    {
      "name": "Разгрузка: приседания",
      "count": "25×2",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Разгрузка: пресс",
      "count": "25×2",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-27": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-28": [
    {
      "name": "Отжимания",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "9×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "60 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-29": [
    {
      "name": "Спринт",
      "count": "50м×6",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "12×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-30": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2026-12-31": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-01": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-02": [
    {
      "name": "Приседания",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "15×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "30×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-03": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-04": [
    {
      "name": "Отжимания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "65 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "20×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "45 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-05": [
    {
      "name": "Спринт",
      "count": "50м×7",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×5",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпрыгивания",
      "count": "15×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-06": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-07": [
    {
      "name": "Отжимания",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Отжимания узким хватом",
      "count": "14×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "50 сек×4",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "65 сек×3",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-08": [
    {
      "name": "Бег",
      "count": "2.5 км",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-09": [
    {
      "name": "Приседания",
      "count": "32×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Выпады",
      "count": "18×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Пресс",
      "count": "32×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×6",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-10": [
    {
      "name": "Отдых",
      "count": "—",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-11": [
    {
      "name": "Отжимания",
      "count": "24×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Австралийские",
      "count": "10×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Планка",
      "count": "70 сек×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Лодочка",
      "count": "22×3",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Удары",
      "count": "50 сек×4",
      "done": false,
      "rewarded": false
    }
  ],
  "2027-01-12": [
    {
      "name": "Спринт",
      "count": "50м×8",
      "done": false,
      "rewarded": false
    },
    {
      "name": "Прыжки в длину",
      "count": "5×6",
      "done": false,
      "rewarded": false
    }
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
    // Если уже получали награду сегодня или болеем — выходим
    if (state.lastRewardDay === today || state.sickDay === today) return;

    let s = state.streakSimple; 
    let p = state.streakPro; 
    let lines = [];
    
    // Берем текущий множитель
    const mult = getMultiplier(); 

    // 1. Считаем обычные (делим на 2 нацело, чтобы не жирно было)
    let commonReward = Math.floor((s + p) / 2) * mult;

    // 2. Считаем редкие (делим на 10 и 20 нацело, как ты просил //)
    let rareReward = (Math.floor(p / 10) + Math.floor(s / 20)) * mult;
    
    // 3. Считаем эпические
    let epicReward = (Math.floor(p / 100) + Math.floor(s / 200)) * mult;
    
    // 4. Считаем легендарные
    let legendReward = (Math.floor(p / 500) + Math.floor(s / 1000)) * mult;

    // Формируем красивый список для попапа
    if (commonReward > 0) lines.push(`+${commonReward} обычных`);
    if (rareReward > 0) lines.push(`+${rareReward} редких`);
    if (epicReward > 0) lines.push(`+${epicReward} эпических`);
    if (legendReward > 0) lines.push(`+${legendReward} легендарных`);

    // Если хоть что-то начислили — показываем попап
    if (lines.length > 0) {
        state.lastRewardDay = today; // Запоминаем, что награду за сегодня уже дали
        
        showPopup("НАГРАДА ЗА СТРИК", lines.join('<br>'), () => {
            // Когда нажал "Забрать" — добавляем рыбки
            state.fish.common += commonReward;
            state.fish.rare += rareReward;
            state.fish.epic += epicReward;
            state.fish.legend += legendReward;
            
            save(); 
            updateUI();
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
const aqPrices = [ {t:"common",p:100}, {t:"common",p:300}, {t:"rare",p:18}, {t:"epic",p:1}, {t:"epic",p:3}, {t:"epic",p:9}, {t:"epic",p:27}, {t:"legend",p:1} ];
const aqRates = [ {t:"common",r:1}, {t:"common",r:3}, {t:"rare",r:1}, {t:"rare",r:3}, {t:"epic",r:1}, {t:"epic",r:3}, {t:"legend",r:1}, {t:"legend",r:3} ];

function updateAquariumUI() {
    const text = document.getElementById('aq-text');
    if (state.aquariumLevel === 0) { 
        text.innerText = "Аквариум: не куплен"; 
    } else {
        const rate = [ {t:"common",r:1}, {t:"common",r:3}, {t:"rare",r:1}, {t:"rare",r:3}, {t:"epic",r:1}, {t:"epic",r:3}, {t:"legend",r:1}, {t:"legend",r:3} ][state.aquariumLevel - 1];
        const names = {common:"обыч", rare:"ред", epic:"эпик", legend:"лег"};
        text.innerText = `Ур.${state.aquariumLevel}\n+${rate.r} ${names[rate.t]}/час`;
    }
}

function collectAquarium() {
    if (state.aquariumLevel === 0) return showPopup("!", "Сначала купи в магазине", ()=>{});

    const last = state.lastAquariumTime ? new Date(state.lastAquariumTime) : new Date();
    const now = new Date();
    const hours = (now - last) / 1000 / 3600;
    
    // Жестко задаем, что дает каждый уровень (без ссылок на старые массивы)
    const rates = [
        {t:"common", r:1}, {t:"common", r:3}, 
        {t:"rare", r:1}, {t:"rare", r:3}, 
        {t:"epic", r:1}, {t:"epic", r:3}, 
        {t:"legend", r:1}, {t:"legend", r:3}
    ];
    
    // Берем нужный уровень (вычитаем 1, т.к. массив с 0, а уровни с 1)
    const currentRate = rates[state.aquariumLevel - 1];
    
    // Считаем заработок
    const earned = Math.floor(hours * currentRate.r);

    if (earned > 0) {
        // Начисляем валюту по правильному названию (common, rare и т.д.)
        state.fish[currentRate.t] += earned;
        state.lastAquariumTime = now.toISOString();
        save(); updateUI();
        
        // Красивые названия для всплывашки
        const ruNames = {common:'обычных', rare:'редких', epic:'эпик', legend:'легенд'};
        showPopup("Аквариум", `+${earned} ${ruNames[currentRate.t]}`, ()=>{});
    } else {
        showPopup("Аквариум", "Пока пусто (подожди час)", ()=>{});
    }
}

// --- МАГАЗИН И ОБМЕН ---
function openShop() {
    let html = "<h3>Фоны</h3>";
    const bgs = ["Синий (50 об.)", "Закат (200 об.)", "Ночь (500 об.)", "Лес (2 ред.)", "Космос (5 ред.)", "Вода (15 ред.)", "Аврора (3 эпик.)", "Огонь (10 эпик.)", "Галактика (1 лег.)", "Легенда (3 лег.)"];
    const bgPrices = [{t:"common",p:50},{t:"common",p:200},{t:"common",p:500},{t:"rare",p:2},{t:"rare",p:5},{t:"rare",p:15},{t:"epic",p:3},{t:"epic",p:10},{t:"legend",p:1},{t:"legend",p:3}];
    
    bgs.forEach((name, i) => { 
        let canAfford = state.fish[bgPrices[i].t] >= bgPrices[i].p;
        let btnStyle = canAfford ? "" : "style='opacity: 0.5;'";
        html += `<div class="shop-row"><span>${name}</span><button ${btnStyle} onclick="buyBg(${i})">Купить</button></div>`; 
    });
    
    html += "<h3>Множитель</h3>";
    if (state.multiplierLevel >= 10) { 
        html += `<div class="shop-row"><span>МАКС (×1024)</span></div>`; 
    } else {
        let basePrice = 10 * Math.pow(3, state.multiplierLevel);
        let curIdx = 0, price = basePrice; 
        const curTypes = ["common", "rare", "epic", "legend"];
        
        while(price > 50 && curIdx < 3) { 
            price = Math.floor(price / 50) * 2; 
            curIdx++; 
        }
        
        let canAfford = state.fish[curTypes[curIdx]] >= price;
        let btnStyle = canAfford ? "" : "style='opacity: 0.5;'";
        let typeNames = {common:"об.", rare:"ред.", epic:"эпик.", legend:"лег."};
        
        html += `<div class="shop-row"><span>×${Math.pow(2, state.multiplierLevel+1)} (${price} ${typeNames[curTypes[curIdx]]})</span><button ${btnStyle} onclick="buyMult()">Купить</button></div>`;
    }
    
    html += "<h3>Аквариум</h3>";
    if (state.aquariumLevel >= aqPrices.length) { 
        html += `<div class="shop-row"><span>МАКС</span></div>`; 
    } else { 
        const p = aqPrices[state.aquariumLevel]; 
        let canAfford = state.fish[p.t] >= p.p;
        let btnStyle = canAfford ? "" : "style='opacity: 0.5;'";
        let typeNames = {common:"об.", rare:"ред.", epic:"эпик.", legend:"лег."};
        html += `<div class="shop-row"><span>Ур.${state.aquariumLevel+1} (${p.p} ${typeNames[p.t]})</span><button ${btnStyle} onclick="buyAq()">Купить</button></div>`; 
    }
    
    showModal("Магазин", html, [{text: "Закрыть", action: closeModal}]);
}

function buyBg(id) {
    const p = [{t:"common",p:50},{t:"common",p:200},{t:"common",p:500},{t:"rare",p:2},{t:"rare",p:5},{t:"rare",p:15},{t:"epic",p:3},{t:"epic",p:10},{t:"legend",p:1},{t:"legend",p:3}][id];
    if(state.fish[p.t] >= p.p) { 
        state.fish[p.t] -= p.p; 
        state.background = id; 
        save(); updateUI(); closeModal(); 
    } else {
        showPopup("!", "Не хватает!", ()=>{});
    }
}

function buyMult() {
    if (state.multiplierLevel >= 10) return;

    let basePrice = 10 * Math.pow(3, state.multiplierLevel);
    let curIdx = 0, price = basePrice; 
    const curTypes = ["common", "rare", "epic", "legend"];

    while(price > 50 && curIdx < 3) { 
        price = Math.floor(price / 50) * 2; 
        curIdx++; 
    }

    if (state.fish[curTypes[curIdx]] >= price) { 
        state.fish[curTypes[curIdx]] -= price; 
        state.multiplierLevel++; 
        save(); updateUI(); openShop(); 
    } else {
        showPopup("!", `Не хватает! Нужно ${price} (${curTypes[curIdx]})`, ()=>{});
    }
}

function buyAq() {
    const p = aqPrices[state.aquariumLevel];
    if (state.fish[p.t] >= p.p) {
        state.fish[p.t] -= p.p; state.aquariumLevel++;
        if (state.aquariumLevel === 1) state.lastAquariumTime = new Date().toISOString();
        save(); updateUI(); openShop();
    } else { 
        showPopup("!", `Не хватает! Нужно ${p.p} (${p.t})`, ()=>{}); 
    }
}

function openExchange() {
    let html = `
    <div class="shop-row"><span>50 Об. → 1 Ред.</span><button onclick="exch('common','rare',50)">Обменять</button></div>
    <div class="shop-row"><span>1 Ред. → 50 Об.</span><button onclick="exch('rare','common',1,50)">Обменять</button></div>
    <div class="shop-row"><span>50 Ред. → 1 Эпик.</span><button onclick="exch('rare','epic',50)">Обменять</button></div>
    <div class="shop-row"><span>1 Эпик. → 50 Ред.</span><button onclick="exch('epic','rare',1,50)">Обменять</button></div>
    <div class="shop-row"><span>50 Эпик. → 1 Лег.</span><button onclick="exch('epic','legend',50)">Обменять</button></div>
    <div class="shop-row"><span>1 Лег. → 50 Эпик.</span><button onclick="exch('legend','epic',1,50)">Обменять</button></div>`;
    showModal("Обмен", html, [{text: "Закрыть", action: closeModal}]);
}

function exch(from, to, cost, reward = 1) {
    if (state.fish[from] >= cost) { 
        state.fish[from] -= cost; 
        state.fish[to] += reward; 
        save(); updateUI(); openExchange(); 
    } else { 
        showPopup("!", `Не хватает! Нужно ${cost} (${from})`, ()=>{}); 
    }
}

function showModal(title, html, buttons) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = html;
    const btnContainer = document.getElementById('modal-buttons'); btnContainer.innerHTML = "";
    buttons.forEach(b => {
        const btn = document.createElement('button'); btn.className = "modal-btn"; btn.innerText = b.text; btn.onclick = b.action; btnContainer.appendChild(btn);
    });
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }
function showPopup(title, text, onClose) { showModal(title, `<p>${text}</p>`, [{text: "ОК", action: () => { onClose(); closeModal(); }}]); }
function showConfirm(title, text, onYes) { showModal(title, `<p>${text}</p>`, [{text: "Да", action: () => { onYes(); closeModal(); }}, {text: "Нет", action: closeModal}]); }

window.onload = () => {
    checkStreakOnLoad();
    setInterval(() => { if (state.lastDay !== todayStr() && state.sickDay !== todayStr()) checkStreakOnLoad(); }, 60000);
};
