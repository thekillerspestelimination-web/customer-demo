"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// If lucide-react is not installed, remove these imports and the <Icon/> uses.
import {
  Search,
  Upload,
  Download,
  Plus,
  X,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const DAYS_OF_WEEK = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ---------- CSV helpers ----------
function normalize(v) {
  return (v ?? "").toString().trim().toLowerCase();
}

function safeNum(n, fallback = 0) {
  const x = Number(n);
  return Number.isFinite(x) ? x : fallback;
}

// Normalizes headers by removing punctuation (parentheses, etc.)
function headerKey(h) {
  const s = normalize(h);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const ok =
      (ch >= "a" && ch <= "z") ||
      (ch >= "0" && ch <= "9") ||
      ch === " " ||
      ch === "#" ||
      ch === "/";
    if (ok) out += ch;
  }
  return out.split(" ").filter(Boolean).join(" ");
}

function parseCSVText(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };

  const pushRow = () => {
    // skip trailing empty line
    if (row.length === 1 && (row[0] ?? "") === "" && rows.length > 0) {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        const next = text[i + 1];
        if (next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ",") {
      pushField();
      continue;
    }

    if (ch === "\n") {
      pushField();
      pushRow();
      continue;
    }

    if (ch === "\r") continue;

    field += ch;
  }

  pushField();
  pushRow();

  if (rows.length === 0) return { headers: [], data: [] };

  const headers = (rows[0] || []).map((h) => (h ?? "").toString().trim());
  const data = rows.slice(1).filter((r) => r.some((c) => (c ?? "").toString().trim() !== ""));

  return { headers, data };
}

function getCell(headers, row, aliases) {
  for (let i = 0; i < headers.length; i++) {
    const hk = headerKey(headers[i]);
    if (aliases.includes(hk)) return (row[i] ?? "").toString().trim();
  }
  return "";
}

function parseYesNo(v) {
  const s = normalize(v);
  if (!s) return false;
  return s === "yes" || s === "y" || s === "true" || s === "1";
}

function mapCSVRowToCustomer(headers, row, fallbackAccount) {
  const accountRaw = getCell(headers, row, ["account #", "account", "acct", "acct #", "account number"]);
  const account = safeNum(accountRaw, fallbackAccount);

  const client = getCell(headers, row, ["client", "customer", "name", "client name"]);
  const address = getCell(headers, row, ["address", "street", "street address"]);
  const city = getCell(headers, row, ["city"]);
  const state = getCell(headers, row, ["state", "st"]);
  const zip = getCell(headers, row, ["zip", "zip code", "zipcode", "postal", "postal code"]);
  const phone = getCell(headers, row, ["phone", "phone number", "telephone"]);
  const email1 = getCell(headers, row, ["email", "email 1", "email #1"]);
  const email2 = getCell(headers, row, ["email #2", "email 2", "secondary email"]);
  const calls = getCell(headers, row, ["client calls for scheduling", "calls for scheduling", "calls to schedule"]);
  const frequency = getCell(headers, row, ["frequency"]);
  const serviceType = getCell(headers, row, ["service type", "service"]);
  const rate = getCell(headers, row, ["rate", "price"]);

  // IMPORTANT: include normalized variants (parentheses stripped)
  const hrs = getCell(headers, row, [
    "average duration (hrs)",
    "average duration hrs",
    "avg duration (hrs)",
    "avg duration hrs",
    "avg duration",
    "average duration",
    "hours",
    "hrs",
  ]);

  const preferredGardener = getCell(headers, row, ["preferred gardener", "gardener"]);
  const preferredDay = getCell(headers, row, ["preferred day", "day"]);
  const preferredTime = getCell(headers, row, ["preferred time", "time"]);
  const notes = getCell(headers, row, ["notes", "note"]);
  const lastService = getCell(headers, row, ["last service", "last"]);
  const nextService = getCell(headers, row, ["next service", "next"]);

  return {
    account,
    client,
    address,
    city,
    state,
    zip,
    phone,
    email1,
    email2,
    callsForScheduling: parseYesNo(calls),
    frequency,
    serviceType,
    rate: safeNum(rate, 0),
    avgDurationHrs: safeNum(hrs, 0),
    preferredGardener,
    preferredDay,
    preferredTime,
    notes,
    lastService,
    nextService,
  };
}

function toCSV(rows) {
  const header = [
    "Account #",
    "Client",
    "Address",
    "City",
    "State",
    "Zip Code",
    "Phone",
    "Email",
    "Email #2",
    "Client Calls For Scheduling",
    "Frequency",
    "Service Type",
    "Rate",
    "Average Duration (hrs)",
    "Preferred Gardener",
    "Preferred Day",
    "Preferred Time",
    "Notes",
    "Last Service",
    "Next Service",
  ];

  const esc = (v) => {
    const s = (v ?? "").toString();
    if (/[\n\r,"]/g.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.account,
        r.client,
        r.address,
        r.city,
        r.state,
        r.zip,
        r.phone,
        r.email1,
        r.email2,
        r.callsForScheduling ? "Yes" : "No",
        r.frequency,
        r.serviceType,
        r.rate,
        r.avgDurationHrs,
        r.preferredGardener,
        r.preferredDay,
        r.preferredTime,
        r.notes,
        r.lastService,
        r.nextService,
      ]
        .map(esc)
        .join(",")
    );
  }
  return lines.join("\n");
}

function downloadText(filename, content, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- UI ----------
function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 mx-auto w-[95vw] max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="font-semibold">{title}</div>
          <button className="rounded-lg p-2 hover:bg-gray-100" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

export default function Page() {
  const STORAGE_KEY = "customer_db_v1";

  // Default behavior: blank DB on first load
  const [customers, setCustomers] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const fileRef = useRef(null);

  useEffect(() => {
    // Self-test: Average Duration (hrs) import mapping
    try {
      const p = parseCSVText("Account #,Client,Average Duration (hrs)\n1,Test,2\n");
      const c = mapCSVRowToCustomer(p.headers, p.data[0], 1);
      console.assert(c.avgDurationHrs === 2, "CSV mapping: Average Duration (hrs) should map to avgDurationHrs");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCustomers(parsed);
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch {
      // ignore
    }
  }, [customers, hydrated]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return customers.slice().sort((a, b) => safeNum(a.account) - safeNum(b.account));
    return customers
      .filter((c) => {
        const hay = [
          c.account,
          c.client,
          c.address,
          c.city,
          c.state,
          c.zip,
          c.phone,
          c.email1,
          c.email2,
          c.frequency,
          c.serviceType,
          c.preferredGardener,
          c.preferredDay,
          c.preferredTime,
          c.notes,
        ]
          .map((x) => (x ?? "").toString())
          .join(" | ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => safeNum(a.account) - safeNum(b.account));
  }, [customers, query]);

  const stats = useMemo(() => {
    const total = customers.length;
    const avgRate = total ? customers.reduce((s, c) => s + safeNum(c.rate), 0) / total : 0;
    const avgHrs = total ? customers.reduce((s, c) => s + safeNum(c.avgDurationHrs), 0) / total : 0;
    return { total, avgRate, avgHrs };
  }, [customers]);

  const nextAccount = useMemo(() => {
    const max = Math.max(0, ...customers.map((c) => safeNum(c.account)));
    return max + 1;
  }, [customers]);

  const openCustomer = (c) => {
    setSelected({ ...c });
    setOpenDetail(true);
  };

  const saveSelected = () => {
    if (!selected) return;
    setCustomers((prev) => prev.map((c) => (c.account === selected.account ? { ...selected } : c)));
    setOpenDetail(false);
  };

  const deleteSelected = () => {
    if (!selected) return;
    setCustomers((prev) => prev.filter((c) => c.account !== selected.account));
    setOpenDetail(false);
  };

  const clearDatabase = () => {
    setCustomers([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const createCustomer = () => {
    const c = {
      account: nextAccount,
      client: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email1: "",
      email2: "",
      callsForScheduling: false,
      frequency: "",
      serviceType: "",
      rate: 0,
      avgDurationHrs: 0,
      preferredGardener: "",
      preferredDay: "",
      preferredTime: "",
      notes: "",
      lastService: "",
      nextService: "",
    };
    setCustomers((prev) => [...prev, c]);
    openCustomer(c);
  };

  const startImport = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  };

  const handleFile = async (file) => {
    const text = await file.text();
    const { headers, data } = parseCSVText(text);
    if (!headers.length) return;

    const existingAccounts = new Set(customers.map((c) => safeNum(c.account)));
    let next = Math.max(0, ...customers.map((c) => safeNum(c.account))) + 1;

    const pending = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const hasAccountInCSV =
        normalize(getCell(headers, row, ["account #", "account", "acct", "acct #", "account number"])).length > 0;

      const draft = mapCSVRowToCustomer(headers, row, next);
      if (!normalize(draft.client)) continue;

      if (existingAccounts.has(safeNum(draft.account))) continue;

      if (!hasAccountInCSV) next += 1;
      existingAccounts.add(safeNum(draft.account));
      pending.push(draft);
    }

    if (pending.length) {
      setCustomers((prev) => [...prev, ...pending].sort((a, b) => safeNum(a.account) - safeNum(b.account)));
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-6 shadow-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs text-gray-500">Customer database demo</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">Customer Database</div>
            <div className="mt-1 text-sm text-gray-600">
              Import CSV, search customers, and manage scheduling fields.
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
              onClick={startImport}
            >
              <Upload className="mr-2 h-4 w-4" /> Import CSV
            </button>

            <button
              className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
              onClick={() =>
                downloadText(
                  `customers_${new Date().toISOString().slice(0, 10)}.csv`,
                  toCSV(customers),
                  "text/csv;charset=utf-8"
                )
              }
            >
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </button>

            <button
              className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm text-white shadow-sm hover:bg-black/90"
              onClick={createCustomer}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </button>

            <button
              className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
              onClick={clearDatabase}
            >
              Clear DB
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="Customers" value={stats.total} />
          <StatCard label="Avg Rate" value={`$${stats.avgRate.toFixed(0)}`} />
          <StatCard label="Avg Hours" value={stats.avgHrs.toFixed(1)} />
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-xl border px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, address, email, zip…"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <div className="text-lg font-semibold">No customers yet</div>
              <div className="mt-1 text-sm text-gray-600">Import a CSV or create a new customer.</div>
            </div>
          ) : (
            filtered.map((c) => (
              <button
                key={c.account}
                onClick={() => openCustomer(c)}
                className="rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold">{c.client || "(Unnamed)"}</div>
                    <div className="truncate text-sm text-gray-600">
                      #{c.account} • {c.city}, {c.state} {c.zip}
                    </div>
                  </div>
                  <div className="rounded-full border px-3 py-1 text-xs text-gray-600">{c.frequency || "—"}</div>
                </div>

                <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="mt-0.5 h-4 w-4" />
                  <div className="truncate">{c.address || "—"}</div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-3">
                    <div className="text-xs text-gray-500">Rate</div>
                    <div className="mt-1 font-semibold">${safeNum(c.rate).toFixed(0)}</div>
                  </div>
                  <div className="rounded-xl border p-3">
                    <div className="text-xs text-gray-500">Avg Hours</div>
                    <div className="mt-1 font-semibold">{safeNum(c.avgDurationHrs)}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                  {c.callsForScheduling ? <span className="rounded-full border px-3 py-1">Calls to schedule</span> : null}
                  {c.serviceType ? <span className="rounded-full border px-3 py-1">{c.serviceType}</span> : null}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <Modal
        open={openDetail}
        title={selected?.client ? `Customer: ${selected.client}` : "Customer"}
        onClose={() => setOpenDetail(false)}
      >
        {!selected ? null : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-gray-500">Client</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.client}
                  onChange={(e) => setSelected((s) => ({ ...s, client: e.target.value }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Account #</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.account}
                  onChange={(e) => setSelected((s) => ({ ...s, account: safeNum(e.target.value, s.account) }))}
                />
              </div>

              <div className="sm:col-span-2">
                <div className="text-xs text-gray-500">Address</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.address}
                  onChange={(e) => setSelected((s) => ({ ...s, address: e.target.value }))}
                />
              </div>

              <div>
                <div className="text-xs text-gray-500">City</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.city}
                  onChange={(e) => setSelected((s) => ({ ...s, city: e.target.value }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">State</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.state}
                  onChange={(e) => setSelected((s) => ({ ...s, state: e.target.value }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Zip</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.zip}
                  onChange={(e) => setSelected((s) => ({ ...s, zip: e.target.value }))}
                />
              </div>

              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.phone}
                  onChange={(e) => setSelected((s) => ({ ...s, phone: e.target.value }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.email1}
                  onChange={(e) => setSelected((s) => ({ ...s, email1: e.target.value }))}
                />
              </div>

              <div>
                <div className="text-xs text-gray-500">Frequency</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.frequency}
                  onChange={(e) => setSelected((s) => ({ ...s, frequency: e.target.value }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Service Type</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.serviceType}
                  onChange={(e) => setSelected((s) => ({ ...s, serviceType: e.target.value }))}
                />
              </div>

              <div>
                <div className="text-xs text-gray-500">Rate</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.rate}
                  onChange={(e) => setSelected((s) => ({ ...s, rate: safeNum(e.target.value, 0) }))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Average Hours</div>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  value={selected.avgDurationHrs}
                  onChange={(e) => setSelected((s) => ({ ...s, avgDurationHrs: safeNum(e.target.value, 0) }))}
                />
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <CalendarDays className="h-5 w-5" /> Scheduling
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Preferred Day</div>
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value={selected.preferredDay || ""}
                    onChange={(e) => setSelected((s) => ({ ...s, preferredDay: e.target.value }))}
                  >
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d} value={d}>
                        {d || "None"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Preferred Time</div>
                  <input
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value={selected.preferredTime}
                    onChange={(e) => setSelected((s) => ({ ...s, preferredTime: e.target.value }))}
                    placeholder="e.g., 10:00 AM"
                  />
                </div>

                <div>
                  <div className="text-xs text-gray-500">Last Service</div>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value={selected.lastService || ""}
                    onChange={(e) => setSelected((s) => ({ ...s, lastService: e.target.value }))}
                  />
                </div>

                <div>
                  <div className="text-xs text-gray-500">Next Service</div>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value={selected.nextService || ""}
                    onChange={(e) => setSelected((s) => ({ ...s, nextService: e.target.value }))}
                  />
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Date inputs open a native calendar picker on phones and desktop browsers.
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Notes</div>
              <textarea
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                rows={4}
                value={selected.notes}
                onChange={(e) => setSelected((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <button
                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                onClick={deleteSelected}
              >
                Delete
              </button>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setOpenDetail(false)}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
                  onClick={saveSelected}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-700">
              {selected.phone ? (
                <a className="inline-flex items-center rounded-xl border px-3 py-2 hover:bg-gray-50" href={`tel:${selected.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> Call
                </a>
              ) : null}
              {selected.email1 ? (
                <a
                  className="inline-flex items-center rounded-xl border px-3 py-2 hover:bg-gray-50"
                  href={`mailto:${encodeURIComponent(selected.email1)}?subject=${encodeURIComponent(`Scheduling: ${selected.client}`)}`}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              ) : null}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
