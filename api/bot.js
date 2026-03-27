const SHEET_ID = "1CBVE5_5pAc5aeUytlaenFeoQDNCGg1qAqmlALUV7sh0";
const BOT_TOKEN = "8365935226:AAGTV3GtQBA-TvABozh5978PQIwLToFT9wo";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfl9JYg_tRE6EsoRDK1p-fYmVRFjQUepbDWkjt11KqkkSx_RsFHM3ijvumNb15nAjmlw/exec";
const CATALOG = [
  { name: "Astoria", url: "https://drive.google.com/file/d/13HVPmChNmmogfSWZu26i0tG4BN12z1zC/view" },
  { name: "Brasilia", url: "https://drive.google.com/file/d/1KJ5KlAQfFyGsHMvni4l16RW-ckMZRMoz/view" },
  { name: "Carimali", url: "https://drive.google.com/file/d/1aH4Zpg16MylL1ND9KLC1jOaco9hJ35Oo/view" },
  { name: "Casadio", url: "https://drive.google.com/file/d/1ZOlhWcthFQ0Dl5RFXnK77gt_k2QKXPH_/view" },
  { name: "Cimbali", url: "https://drive.google.com/file/d/104mi62fLWoC4s4AVsif20dFVWViIopp0/view" },
  { name: "Expobar", url: "https://drive.google.com/file/d/1f2KkJsRXAerc1t1KbdzIqWuAiytUk5zb/view" },
  { name: "Dalla Corte", url: "https://drive.google.com/file/d/1Rm12fHdIZhfai8dK7VPiqkkrEAh1kReB/view" },
  { name: "Elektra", url: "https://drive.google.com/file/d/1RJJ5g4KR38542KbUD4Qre4o7PPt8VvCy/view" },
  { name: "Faema", url: "https://drive.google.com/file/d/1IrP5sZ1pHDaYni1XYcGcTXUBxE9_hsDp/view" },
  { name: "La Marzocco", url: "https://drive.google.com/file/d/1yeRVE7Cxvnucpe-M_7fEwfKv8ZLH2wzj/view" },
  { name: "La San Marco", url: "https://drive.google.com/file/d/1mhwyb7q5RjcRuQLV3y2vs6K-gdpg1Jaj/view" },
  { name: "La Spaziale", url: "https://drive.google.com/file/d/16WpjzGOIz3NIYl1oHaXThPy0k4b29FXp/view" },
  { name: "Nuova Simonelli", url: "https://drive.google.com/file/d/1M5eUAGm7jGkNlnA7gtykEuKeV6LiGMiT/view" },
  { name: "Rancilio", url: "https://drive.google.com/file/d/1fbUy-wASJ8wEACqQ-LEkq--lzmH3hKFL/view" },
  { name: "Sanremo", url: "https://drive.google.com/file/d/1ZqypGkuFjTsMQK_aXM34x6Zbc99nOKhy/view" },
  { name: "SV Sab Italia", url: "https://drive.google.com/file/d/1GaUSBnL4fI_6cMANesm8pWzAi2x7VcHx/view" },
  { name: "Vibiemme", url: "https://drive.google.com/file/d/1CsBrtrsCuIgk78QUfBDYBNjIFLUw8bDN/view" },
  { name: "Victoria Arduino", url: "https://drive.google.com/file/d/1xivlnkDupN8BmSwv-LrzQP71H-iXTyYe/view" },
  { name: "Wega", url: "https://drive.google.com/file/d/1eokWIhVI1t3oCrau_yvVQOGkKyemU_w-/view" },
  { name: "WMF 1500s", url: "https://drive.google.com/file/d/1xSlo0JFM5PSyI-bZqDPQ6fS9E0H2RCBh/view" },
  { name: "WMF 5000s", url: "https://drive.google.com/file/d/1tGtoCMdcjvezn_n447IGWmDjbsdpPo7I/view" },
  { name: "WMF Bistro", url: "https://drive.google.com/file/d/1pGs93Ksj00sCSuC-T9DDl1S6Yv9HwCN_/view" },
  { name: "WMF 8000s", url: "https://drive.google.com/file/d/1LlgeGjgkN4h1jD3osKWb8fRvHdUOqqT1/view" },
  { name: "Phedra", url: "https://drive.google.com/file/d/1uiraRyHbPSGRj9Bxoy14lPfzI5j5G-vE/view" },
  { name: "Iper", url: "https://drive.google.com/file/d/1pto0ZZ-giCSuVPCWtksOz2YIPpgIPcZA/view" },
  { name: "F11", url: "https://drive.google.com/file/d/1ChVA-FGNwr13qtjf0hVM-kVncKmkyxGH/view" },
  { name: "F12", url: "https://drive.google.com/file/d/1lG_ozDPgn0a0vAR6xOOlQocRj-c_iirs/view" },
  { name: "Jettino JL24", url: "https://drive.google.com/file/d/1qVxrCXwXIKNnV4MT1RqynC0NtGzpqWaC/view" },
  { name: "Coffeebar", url: "https://drive.google.com/file/d/1MsXGOrfTGNLCexwslU0O_04eoG7cgJLa/view" }
];

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: "📋 Маршрут" }, { text: "📥 Вхідні" }],
    [{ text: "📊 Статус" }, { text: "📚 Каталог" }]
  ],
  resize_keyboard: true,
  persistent: true
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("OK");
  const update = req.body;
  if (update.message) await handleMessage(update.message);
  else if (update.callback_query) await handleCallback(update.callback_query);
  res.status(200).send("OK");
}

async function sendMessage(chatId, text, keyboard = null) {
  const body = { chat_id: chatId, text };
  if (keyboard) body.reply_markup = keyboard;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function answerCallback(queryId) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: queryId })
  });
}

async function callScript(action, params) {
  const url = SCRIPT_URL + "?action=" + action + "&" + new URLSearchParams(params);
  const res = await fetch(url);
  return res.json();
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  let text = msg.text || "";
  const userId = msg.from.id.toString();

  // Замінюємо кнопки на команди
  if (text === "📚 Каталог") {
  // Формуємо кнопки по 2 в ряд
  const rows = [];
  for (let i = 0; i < CATALOG.length; i += 2) {
    const row = [{ text: CATALOG[i].name, callback_data: `cat_${i}` }];
    if (CATALOG[i+1]) row.push({ text: CATALOG[i+1].name, callback_data: `cat_${i+1}` });
    rows.push(row);
  }
  await sendMessage(chatId, "📚 Вибери бренд/модель:", { inline_keyboard: rows });
  return;
}
  if (text === "📋 Маршрут") text = "/маршрут";
  if (text === "📥 Вхідні") text = "/вхідні";
  if (text === "📊 Статус") text = "/статус";

  const userInfo = await callScript("getUser", { userId });

  // /start для вже зареєстрованих
  if ((text === "/start" || text === "/старт") && userInfo.name) {
    await sendMessage(chatId, `👋 Привіт, ${userInfo.name}!`, MAIN_KEYBOARD);
    return;
  }

  // /start для нових
  if (text === "/start" || text === "/старт") {
    await sendMessage(chatId, "👋 Привіт! Введи своє ім'я як воно є в таблиці (наприклад: Хоцький Артур)");
    await callScript("setState", { userId, state: "awaiting_name" });
    return;
  }

  // Реєстрація імені
  if (userInfo.state === "awaiting_name") {
    await callScript("registerUser", { userId, name: text, chatId });
    await sendMessage(chatId, `✅ Зареєстровано як: ${text}\n\nОбирай дію:`, MAIN_KEYBOARD);
    return;
  }

  if (!userInfo.name) {
    await sendMessage(chatId, "Спочатку зареєструйся: /start");
    return;
  }

  // Коментар
  if (userInfo.state && userInfo.state.startsWith("comment_")) {
    const row = userInfo.state.replace("comment_", "");
    await callScript("addComment", { row, comment: text });
    await callScript("setState", { userId, state: "" });
    await sendMessage(chatId, "💬 Коментар додано!", MAIN_KEYBOARD);
    return;
  }

  if (text === "/маршрут") {
    const data = await callScript("getMyRoutes", { userName: userInfo.name });
    if (!data.calls || data.calls.length === 0) {
      await sendMessage(chatId, "📋 У тебе немає активних викликів сьогодні", MAIN_KEYBOARD);
      return;
    }
    for (const call of data.calls) {
      const keyboard = { inline_keyboard: [[
        { text: "✅ Виконано", callback_data: `done_${call.row}` },
        { text: "💬 Коментар", callback_data: `comment_${call.row}` },
        { text: "↩️ Повернути", callback_data: `return_${call.row}` }
      ]]};
      await sendMessage(chatId, call.text, keyboard);
    }
  } else if (text === "/вхідні") {
    const data = await callScript("getIncoming", {});
    if (!data.calls || data.calls.length === 0) {
      await sendMessage(chatId, "📭 Немає вхідних викликів", MAIN_KEYBOARD);
      return;
    }
    for (const call of data.calls) {
      const keyboard = { inline_keyboard: [[
        { text: "📥 Взяти в роботу", callback_data: `take_${call.row}` }
      ]]};
      await sendMessage(chatId, call.text, keyboard);
    }
  } else if (text === "/статус") {
    const data = await callScript("getStatus", { userName: userInfo.name });
    await sendMessage(chatId, `📊 Статистика:\n✅ Виконано: ${data.done}\n🔴 В роботі: ${data.active}\n📈 Всього: ${data.total} (${data.percent}%)`, MAIN_KEYBOARD);
  }
}

async function handleCallback(query) {
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();
  const data = query.data;
  await answerCallback(query.id);

  const userInfo = await callScript("getUser", { userId });

  if (data.startsWith("done_")) {
    const row = data.replace("done_", "");
    const status = await callScript("getRowStatus", { row });
    if (status.done) {
      await sendMessage(chatId, "⚠️ Виклик вже закритий!");
    } else {
      await callScript("markDone", { row });
      // Прибираємо кнопки з повідомлення
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: query.message.message_id,
          reply_markup: { inline_keyboard: [] }
        })
      });
      await sendMessage(chatId, "✅ Виклик закрито!");
    }
  } else if (data.startsWith("comment_")) {
    const row = data.replace("comment_", "");
    await callScript("setState", { userId, state: `comment_${row}` });
    await sendMessage(chatId, "💬 Введи коментар:");
  } else if (data.startsWith("return_")) {
    const row = data.replace("return_", "");
    await callScript("returnToIncoming", { row });
    await sendMessage(chatId, "↩️ Виклик повернено у вхідні!");
  } else if (data.startsWith("take_")) {
    const parts = data.split("_");
    const row = parts[1];
    await callScript("takeCall", { row, userName: userInfo.name });
    await sendMessage(chatId, "📥 Виклик взято в роботу!");
  }
  else if (data.startsWith("cat_")) {
  const idx = parseInt(data.replace("cat_", ""));
  const item = CATALOG[idx];
  if (item) {
    await sendMessage(chatId, `📚 ${item.name}\n\n🔗 Каталог деталей:\n${item.url}`);
  }
}
}
