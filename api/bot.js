const SHEET_ID = "1CBVE5_5pAc5aeUytlaenFeoQDNCGg1qAqmlALUV7sh0";
const BOT_TOKEN = "8365935226:AAGTV3GtQBA-TvABozh5978PQIwLToFT9wo";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyREgranVhMNe03wX281RFasL1C6pQHfAAOkHeKAoWxN8rFpOx6FSCfZgkYn9ReqAl/exec";

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: "📋 Маршрут" }, { text: "📥 Вхідні" }],
    [{ text: "📊 Статус" }]
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
        { text: "📥 Взяти в роботу", callback_data: `take_${call.row}_${userId}` }
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
    await callScript("markDone", { row });
    await sendMessage(chatId, "✅ Виклик закрито!");
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
}
