const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const RESTAURANT_NAME = "The Moon Brussels";
const COMPANY_VAT_NUMBER = (process.env.COMPANY_VAT_NUMBER || "BE 0773 802 850").trim();
const ROOM_LABELS = {
  normal: "Salle normale",
  vip: "Salle VIP"
};

// Menu complet (ASCII pour compatibilite)
const menu = [
  {
    id: "entrees",
    label: "Entrees",
    items: [
      { id: "scampis-ail", name: "Scampis a l'ail", price: 12.0 },
      { id: "scampis-diabolique", name: "Scampis diabolique", price: 12.0 },
      { id: "carpaccio", name: "Carpaccio", price: 15.0 },
      { id: "calamars-10pcs", name: "Calamars (10pcs)", price: 13.0 },
      { id: "salade-cesar", name: "Salade Cesar", price: 13.0 },
      { id: "burrata", name: "Burrata", price: 13.0 },
      { id: "croquettes-fromage", name: "Croquettes de fromage", price: 12.0 }
    ]
  },
  {
    id: "pates",
    label: "Pates",
    items: [
      { id: "poulet-champignons", name: "Poulet & Champignons", price: 15.0 },
      { id: "poulet-pesto", name: "Poulet au pesto", price: 15.0 },
      { id: "arrabiata", name: "Arrabiata", price: 15.0 },
      { id: "truffe", name: "Truffe", price: 15.0 },
      { id: "scampis-diabolique-pates", name: "Scampis diabolique", price: 15.0 }
    ]
  },
  {
    id: "burgers",
    label: "Burgers",
    items: [
      { id: "burger-boeuf-wagyu", name: "Burger boeuf wagyu", price: 16.0 },
      { id: "burger-chicken", name: "Burger chicken", price: 15.0 }
    ]
  },
  {
    id: "viandes",
    label: "Nos Viandes",
    items: [
      { id: "filet-pur-boeuf", name: "Filet pur de boeuf", price: 32.0 },
      { id: "steak-boeuf", name: "Steak de boeuf", price: 26.0 },
      { id: "cotelette-agneau-nz", name: "Cotelette d'agneau Nouvelle-Zelande", price: 32.0 },
      { id: "cote-os-argentin-700", name: "Cote a l'os argentin (700gr)", price: 45.0 },
      { id: "entrecote-argentine", name: "Entrecote argentine", price: 32.0 },
      { id: "souris-agneau-marocaine", name: "Souris d'agneau facon marocaine", price: 26.0 }
    ]
  },
  {
    id: "poisson",
    label: "Nos Poisson",
    items: [
      { id: "dos-cabillaud", name: "Dos de cabillaud", price: 26.0 },
      { id: "filet-dorade", name: "Filet de dorade", price: 24.0 },
      { id: "saumon", name: "Saumon", price: 26.0 }
    ]
  },
  {
    id: "pizza",
    label: "Nos Pizza",
    items: [
      { id: "margarita", name: "Margarita", price: 12.5 },
      { id: "chicken", name: "Chicken", price: 13.5 },
      { id: "chicken-barbecue", name: "Chicken barbecue", price: 13.5 },
      { id: "quattro-fromage", name: "Quattro fromage", price: 13.5 },
      { id: "jambon-cuit", name: "Jambon cuit", price: 13.5 },
      { id: "scampis", name: "Scampis", price: 14.5 },
      { id: "marinara", name: "Marinara", price: 15.0 },
      { id: "fruits-de-mer", name: "Fruits de mer", price: 15.0 },
      { id: "arabia", name: "Arabia", price: 15.0 },
      { id: "viande-hachee", name: "Viande hachee", price: 13.5 },
      { id: "hawaienne", name: "Hawaienne", price: 13.5 },
      { id: "vegetarienne", name: "Vegetarienne", price: 13.5 },
      { id: "quatre-saisons", name: "4 Saisons", price: 13.5 },
      { id: "la-belgienne", name: "La belgienne", price: 15.0 },
      { id: "la-parisienne", name: "La parisienne", price: 13.5 },
      { id: "rio", name: "Rio", price: 13.5 },
      { id: "folla", name: "Folla", price: 13.5 }
    ]
  },
  {
    id: "desserts",
    label: "Nos Desserts",
    items: [
      { id: "creme-brulee", name: "Creme brulee", price: 8.0 },
      { id: "mousse-chocolat", name: "Mousse au chocolat", price: 8.0 },
      { id: "fondant-chocolat", name: "Fondant chocolat accompagne d'une boule vanille", price: 8.0 },
      { id: "tiramisu-boudoir", name: "Tiramisu boudoir maison", price: 8.0 },
      { id: "tiramisu-speculose", name: "Tiramisu speculose maison", price: 8.0 },
      { id: "tarte-pomme", name: "Tarte pomme", price: 8.0 },
      { id: "saint-sebastian", name: "Saint Sebastian (coulis pistach / coulis nutella)", price: 10.0 }
    ]
  },
  {
    id: "softs",
    label: "Nos Soft",
    items: [
      { id: "coca-cola", name: "Coca Cola", price: 4.0 },
      { id: "coca-cola-zero", name: "Coca Cola zero", price: 4.0 },
      { id: "fanta", name: "Fanta", price: 4.0 },
      { id: "sprite", name: "Sprite", price: 4.0 },
      { id: "ice-tea", name: "Ice Tea", price: 4.0 },
      { id: "ice-tea-peche", name: "Ice Tea peche", price: 4.0 },
      { id: "oasis-tropical", name: "Oasis Tropical", price: 4.0 },
      { id: "looza", name: "Looza (Orange, Pomme, Fraise, Framboise, Ananas, Mangue)", price: 4.0 },
      { id: "eau-plate", name: "Eau plate", price: 4.0 },
      { id: "perrier", name: "Perrier", price: 4.0 }
    ]
  },
  {
    id: "mocktails",
    label: "Nos Mocktails",
    items: [
      { id: "the-moon-rose", name: "The Moon Rose", price: 9.0 },
      { id: "blue-lady", name: "Blue Lady", price: 9.0 },
      { id: "fleur-amour", name: "Fleur d'Amour", price: 9.0 },
      { id: "pina-colada", name: "Pina Colada", price: 9.0 },
      { id: "sex-on-the-beach", name: "Sex on the beach", price: 9.0 }
    ]
  },
  {
    id: "mojitos",
    label: "Nos Mojitos",
    items: [
      { id: "mojito-fraise", name: "Mojito Fraise", price: 9.0 },
      { id: "mojito-peche", name: "Mojito Peche", price: 9.0 },
      { id: "mojito-violette", name: "Mojito Violette", price: 9.0 },
      { id: "mojito-pasteque", name: "Mojito Pasteque", price: 9.0 },
      { id: "mojito-passion", name: "Mojito Fruit de la passion", price: 9.0 },
      { id: "mojito-blue-lagoon", name: "Mojito Blue Lagoon", price: 9.0 }
    ]
  }
];

const createRoomTables = (roomId, count, startId) =>
  Array.from({ length: count }, (_, idx) => ({
    id: startId + idx,
    number: idx + 1,
    room: roomId,
    roomLabel: ROOM_LABELS[roomId] || roomId,
    status: "free",
    orderId: null
  }));

const tables = [
  ...createRoomTables("normal", 16, 1),
  ...createRoomTables("vip", 5, 101)
];

const orders = new Map();
const settledTickets = [];
const ticketCountersByDate = new Map();

const computeTotal = (items = []) =>
  items.reduce((acc, item) => acc + item.price * item.qty, 0);

const getDateKey = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
};

const nextTicketNumberForDate = (dateKey) => {
  const current = ticketCountersByDate.get(dateKey) || 0;
  const next = current + 1;
  ticketCountersByDate.set(dateKey, next);
  return next;
};

const computePaymentBreakdown = (items, paymentMethod, paymentAmounts) => {
  const totalTtc = computeTotal(items);
  const toMoney = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    return Math.max(0, Math.round(num * 100) / 100);
  };
  if (paymentAmounts && typeof paymentAmounts === "object") {
    const paidCash = toMoney(paymentAmounts.cash);
    const paidCard = toMoney(paymentAmounts.card);
    const paidTotal = Math.round((paidCash + paidCard) * 100) / 100;
    const changeDue = Math.max(0, Math.round((paidTotal - totalTtc) * 100) / 100);
    const totalCard = Math.min(paidCard, totalTtc);
    const totalCash = Math.max(0, Math.round((totalTtc - totalCard) * 100) / 100);
    return { totalCash, totalCard, paidCash, paidCard, changeDue };
  }
  if (paymentMethod === "cash") {
    return { totalCash: totalTtc, totalCard: 0, paidCash: totalTtc, paidCard: 0, changeDue: 0 };
  }
  return { totalCash: 0, totalCard: totalTtc, paidCash: 0, paidCard: totalTtc, changeDue: 0 };
};

const createOrder = (tableId) => {
  const id = `${Date.now()}-${tableId}-${Math.floor(Math.random() * 9999)}`;
  const order = {
    id,
    tableId,
    items: [],
    status: "open",
    sentToKitchen: false,
    createdAt: new Date().toISOString()
  };
  orders.set(id, order);
  return order;
};

const findTable = (tableId) => tables.find((t) => t.id === tableId);

app.get("/api/menu", (_req, res) => {
  res.json(menu);
});

app.get("/api/tables", (_req, res) => {
  res.json(tables);
});

app.post("/api/tables/:id/open", (req, res) => {
  const tableId = Number(req.params.id);
  const table = findTable(tableId);
  if (!table) {
    return res.status(404).json({ error: "Table introuvable" });
  }
  if (!table.orderId) {
    const order = createOrder(tableId);
    table.orderId = order.id;
    table.status = "occupied";
  } else if (table.status === "free") {
    table.status = "occupied";
  }
  const order = orders.get(table.orderId);
  return res.json({ table, order });
});

app.get("/api/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Commande introuvable" });
  }
  res.json(order);
});

app.put("/api/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Commande introuvable" });
  }
  const { items = [] } = req.body || {};
  order.items = Array.isArray(items) ? items : order.items;
  order.total = computeTotal(order.items);
  res.json(order);
});

app.post("/api/orders/:id/send-kitchen", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Commande introuvable" });
  }
  order.sentToKitchen = true;
  res.json(order);
});

app.post("/api/orders/:id/mark-to-pay", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Commande introuvable" });
  }
  const table = findTable(order.tableId);
  table.status = "to_pay";
  order.status = "to_pay";
  res.json({ table, order });
});

app.post("/api/orders/:id/settle", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Commande introuvable" });
  }
  const table = findTable(order.tableId);
  const paymentMethod = (req.body && req.body.paymentMethod) || "card";
  const paymentAmounts = req.body && req.body.paymentAmounts;
  const dateOverride = req.body && req.body.dateOverride;
  const parsedDate = dateOverride ? new Date(dateOverride) : null;
  const ticketDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toISOString()
      : new Date().toISOString();
  const ticketDateKey = getDateKey(ticketDate) || new Date().toISOString().slice(0, 10);
  const ticketNumber = nextTicketNumberForDate(ticketDateKey);
  const { totalCash, totalCard, paidCash, paidCard, changeDue } = computePaymentBreakdown(
    order.items,
    paymentMethod,
    paymentAmounts
  );
  const totalTtc = computeTotal(order.items);
  const paidTotal = Math.round((paidCash + paidCard) * 100) / 100;
  if (paidTotal + 0.01 < totalTtc) {
    return res.status(400).json({
      error: "Montant de paiement invalide",
      expectedTotal: totalTtc,
      paidTotal
    });
  }
  const ticket = {
    restaurant: RESTAURANT_NAME,
    vatNumber: COMPANY_VAT_NUMBER || null,
    ticketNumber,
    ticketDateKey,
    table: table.id,
    tableNumber: table.number || table.id,
    room: table.room || "normal",
    roomLabel: table.roomLabel || ROOM_LABELS.normal,
    orderId: order.id,
    items: order.items,
    totalTtc,
    paymentMethod,
    totalCash,
    totalCard,
    paidCash,
    paidCard,
    changeDue,
    date: ticketDate
  };
  settledTickets.push(ticket);
  table.status = "free";
  table.orderId = null;
  order.status = "settled";
  orders.delete(order.id);
  res.json(ticket);
});

app.get("/api/reports/daily", (_req, res) => {
  const queryDate = getDateKey(_req.query.date);
  const todayKey = new Date().toISOString().slice(0, 10);
  const targetKey = queryDate || todayKey;
  const todayTickets = settledTickets.filter(
    (t) => new Date(t.date).toISOString().slice(0, 10) === targetKey
  );
  const total = todayTickets.reduce((sum, t) => sum + (t.totalTtc || 0), 0);
  const totalCash = todayTickets.reduce((sum, t) => {
    if (typeof t.totalCash === "number") return sum + t.totalCash;
    if (t.paymentMethod === "cash") return sum + (t.totalTtc || 0);
    return sum;
  }, 0);
  const totalCard = todayTickets.reduce((sum, t) => {
    if (typeof t.totalCard === "number") return sum + t.totalCard;
    if (t.paymentMethod !== "cash") return sum + (t.totalTtc || 0);
    return sum;
  }, 0);
  const items = {};
  todayTickets.forEach((ticket) => {
    ticket.items.forEach((line) => {
      const entry = items[line.name] || { name: line.name, qty: 0, total: 0 };
      entry.qty += line.qty;
      entry.total += line.price * line.qty;
      items[line.name] = entry;
    });
  });
  res.json({
    date: targetKey,
    vatNumber: COMPANY_VAT_NUMBER || null,
    totalTtc: total,
    totalCash,
    totalCard,
    tickets: todayTickets,
    items: Object.values(items)
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur tactile pret sur http://localhost:${PORT}`);
});
