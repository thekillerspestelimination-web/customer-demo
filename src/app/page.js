'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Download,
  FileUp,
  Plus,
  Pencil,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  User,
  DollarSign,
  Timer,
  Building2,
} from "lucide-react";

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---------------------------------------------
// Data
// ---------------------------------------------

const seedCustomers = [
  {
    account: 1,
    client: "Anya Marina",
    address: "2525 SE Ash",
    city: "Portland",
    state: "OR",
    zip: "97214",
    phone: "",
    email1: "Anyamarina23@gmail.com",
    email2: "",
    callsForScheduling: true,
    frequency: "2x/year",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 7,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 2,
    client: "April Ann Fong",
    address: "11234 SW Capitol Hwy",
    city: "Portland",
    state: "OR",
    zip: "97219",
    phone: "",
    email1: "App1efrog@yahoo.com",
    email2: "",
    callsForScheduling: false,
    frequency: "Monthly",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 2,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 3,
    client: "April Severson",
    address: "5428 SE Washington St",
    city: "Portland",
    state: "OR",
    zip: "97215",
    phone: "",
    email1: "april@seversonevents.com",
    email2: "",
    callsForScheduling: true,
    frequency: "1x/year",
    serviceType: "Winter Pruning",
    rate: 85,
    avgDurationHrs: 3,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 4,
    client: "Barb Dallum",
    address: "1111 N Water St",
    city: "Silverton",
    state: "OR",
    zip: "97381",
    phone: "(503) 551-5530",
    email1: "",
    email2: "",
    callsForScheduling: false,
    frequency: "Monthly",
    serviceType: "",
    rate: 65,
    avgDurationHrs: 2,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 5,
    client: "Barbara Dudley",
    address: "7407 SW 33rd Ave",
    city: "Portland",
    state: "OR",
    zip: "97219",
    phone: "",
    email1: "barbdudley@aol.com",
    email2: "",
    callsForScheduling: true,
    frequency: "1x/Year",
    serviceType: "Winter Pruning",
    rate: 100,
    avgDurationHrs: 5,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 6,
    client: "Barry Pelsner",
    address: "2335 NE 24 Ave",
    city: "Portland",
    state: "OR",
    zip: "97212",
    phone: "",
    email1: "pelznerb@gmail.com",
    email2: "",
    callsForScheduling: true,
    frequency: "2x/Year",
    serviceType: "Fall/Spring Pruning",
    rate: 100,
    avgDurationHrs: 3,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 7,
    client: "Beth Rice",
    address: "4125 SE 14th Ave",
    city: "Portland",
    state: "OR",
    zip: "97202",
    phone: "",
    email1: "Beth_rice1@yahoo.com",
    email2: "",
    callsForScheduling: false,
    frequency: "Monthly",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 3,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 8,
    client: "Bobbi Jo Snethen & Michael Davidson",
    address: "6816 N Williams",
    city: "Portland",
    state: "OR",
    zip: "97217",
    phone: "",
    email1: "bobbijo.snethen@gmail.com",
    email2: "",
    callsForScheduling: false,
    frequency: "Monthly",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 3,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 9,
    client: "Bill Curtin",
    address: "2623 NE 43rd Ave",
    city: "Portland",
    state: "OR",
    zip: "97317",
    phone: "",
    email1: "bllcurtin@gmail.com",
    email2: "",
    callsForScheduling: false,
    frequency: "Montlhy",
    serviceType: "",
    rate: 65,
    avgDurationHrs: 2,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
  {
    account: 10,
    client: "Bill McNamee & Hannah Kuhn",
    address: "2734 NE 35th Place",
    city: "Portland",
    state: "OR",
    zip: "97212",
    phone: "",
    email1: "wdmhak@gmail.com",
    email2: "",
    callsForScheduling: true,
    frequency: "As Needed",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 4,
    preferredGardener: "",
    preferredDay: "",
    preferredTime: "",
    notes: "",
    lastService: "",
    nextService: "",
  },
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ---------------------------------------------
// Utilities
// ---------------------------------------------

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase();
}

function safeNum(n, fallback = 0) {
  const x = Number(n);
  return Number.isFinite(x) ? x : fallback;
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
    // Quote if contains comma, quote, CR, or LF
    if (/[\n\r,\"]/g.test(s)) return `"${s.replace(/"/g, '""')}"`;
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

// CSV parser that supports quoted fields and commas/newlines inside quotes.
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
    // Skip trailing empty line
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
  const data = rows
    .slice(1)
    .filter((r) => r.some((c) => (c ?? "").toString().trim() !== ""));

  return { headers, data };
}

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
  // Robust CSV column mapping (case/space/punctuation-insensitive)
  const norm = (s) =>
    (s ?? "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/﻿/g, "") // BOM
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const headerIndex = new Map(headers.map((h, i) => [norm(h), i]));

  const get = (aliases, fallback = "") => {
    for (const a of aliases) {
      const idx = headerIndex.get(norm(a));
      if (idx !== undefined) return row[idx] ?? fallback;
    }
    // If we didn't find an exact alias match, try a contains match (helps with slight header variants)
    const wanted = aliases.map((a) => norm(a));
    for (const [h, idx] of headerIndex.entries()) {
      if (wanted.some((w) => h.includes(w))) return row[idx] ?? fallback;
    }
    return fallback;
  };

  const asNum = (v, fb = 0) => {
    const s = (v ?? "").toString().trim();
    if (!s) return fb;
    const x = Number(s.replace(/[^0-9.\-]/g, ""));
    return Number.isFinite(x) ? x : fb;
  };

  const asYesNo = (v) => {
    const s = (v ?? "").toString().trim().toLowerCase();
    if (["yes", "y", "true", "1"].includes(s)) return true;
    if (["no", "n", "false", "0"].includes(s)) return false;
    return false;
  };

  // Account
  const acctRaw = get(["Account #", "Account", "Acct", "Account Number", "Account No"]).toString().trim();
  const account = acctRaw ? asNum(acctRaw, fallbackAccount) : fallbackAccount;

  // Core fields
  const client = get(["Client", "Customer", "Name", "Client Name"]).toString().trim();
  const address = get(["Address", "Street", "Street Address"]).toString().trim();
  const city = get(["City"]).toString().trim();
  const state = get(["State", "ST"]).toString().trim();
  const zip = get(["Zip Code", "Zip", "Postal", "Postal Code"]).toString().trim();
  const phone = get(["Phone", "Phone #", "Telephone"]).toString().trim();
  const email1 = get(["Email", "Email 1", "Primary Email"]).toString().trim();
  const email2 = get(["Email #2", "Email 2", "Secondary Email"]).toString().trim();

  // Scheduling + services
  const callsForScheduling = asYesNo(
    get(["Client Calls For Scheduling", "Calls For Scheduling", "Calls to Schedule", "Client Calls"]) 
  );
  const frequency = get(["Frequency", "Service Frequency"]).toString().trim();
  const serviceType = get(["Service Type", "Service", "Work Type"]).toString().trim();
  const rate = asNum(get(["Rate", "Price", "Hourly Rate", "Service Rate"]), 0);

  // **Avg hours** mapping (this is what you reported)
  const avgDurationHrs = asNum(
    get([
      "Average Duration (hrs)",
      "Average Duration", 
      "Avg Duration (hrs)",
      "Avg Duration",
      "Average Hours",
      "Avg Hours",
      "Avg. Hours",
      "Hours",
      "Hrs",
    ]),
    0
  );

  const preferredGardener = get(["Preferred Gardener", "Preferred Tech", "Preferred Technician"]).toString().trim();
  const preferredDay = get(["Preferred Day", "Day Preference"]).toString().trim();
  const preferredTime = get(["Preferred Time", "Time Preference"]).toString().trim();

  const notes = get(["Notes", "Note"]).toString().trim();
  const lastService = get(["Last Service", "Last Service Date"]).toString().trim();
  const nextService = get(["Next Service", "Next Service Date"]).toString().trim();

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
    callsForScheduling,
    frequency,
    serviceType,
    rate,
    avgDurationHrs,
    preferredGardener,
    preferredDay,
    preferredTime,
    notes,
    lastService,
    nextService,
  };
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

function statBuckets(customers) {
  const byCity = new Map();
  const byZip = new Map();

  for (const c of customers) {
    const cityKey = c.city || "(Unknown)";
    const zipKey = c.zip || "(Unknown)";
    byCity.set(cityKey, (byCity.get(cityKey) || 0) + 1);
    byZip.set(zipKey, (byZip.get(zipKey) || 0) + 1);
  }

  const toSorted = (m) => Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  return { byCity: toSorted(byCity), byZip: toSorted(byZip) };
}

function frequencyBadge(freq) {
  const f = normalize(freq);
  if (f.includes("monthly")) return { label: "Monthly", variant: "default" };
  if (f.includes("as needed")) return { label: "As Needed", variant: "secondary" };
  if (f.includes("2x")) return { label: freq || "2x/Year", variant: "outline" };
  if (f.includes("1x") || f.includes("annual") || f.includes("year"))
    return { label: freq || "Annual", variant: "outline" };
  return { label: freq || "—", variant: "secondary" };
}

function dateFromISO(iso) {
  const s = (iso ?? "").toString().trim();
  if (!s) return undefined;
  try {
    const d = parseISO(s);
    return isValid(d) ? d : undefined;
  } catch {
    return undefined;
  }
}

function isoFromDate(d) {
  return format(d, "yyyy-MM-dd");
}

function DatePickerField({ label, value, onChange }) {
  // Robust fallback: use native date input (always available) rather than depending on a Calendar component.
  // Stores value as YYYY-MM-DD.
  const selected = dateFromISO(value);

  return (
    <div className="space-y-2">
      {label ? <Label>{label}</Label> : null}

      <div className="relative">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="date"
          className="rounded-xl pl-9"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {selected ? `Selected: ${format(selected, "PPP")}` : "No date selected"}
        </div>
        <Button type="button" variant="ghost" className="h-8 rounded-xl" onClick={() => onChange("")}>
          Clear
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Self-tests (run once in dev)
// ---------------------------------------------

function runCsvSelfTests() {
  // 1) Escaping in CSV output
  const csv = toCSV([
    {
      account: 99,
      client: 'A, "B"',
      address: "Line1\nLine2",
      city: "Portland",
      state: "OR",
      zip: "97200",
      phone: "",
      email1: "",
      email2: "",
      callsForScheduling: false,
      frequency: "Monthly",
      serviceType: "",
      rate: 1,
      avgDurationHrs: 2,
      preferredGardener: "",
      preferredDay: "",
      preferredTime: "",
      notes: "",
      lastService: "",
      nextService: "",
    },
  ]);
  console.assert(csv.includes('"A, ""B"""'), "CSV should escape quotes and commas");
  console.assert(csv.includes('"Line1\nLine2"'), "CSV should quote newline fields");

  // 2) Parsing quoted commas/newlines
  const sample =
    "Account #,Client,Address\n" + "1,Normal,Simple\n" + '2,"Comma, Name","Multi\nLine"\n';
  const parsed = parseCSVText(sample);
  console.assert(parsed.headers.length === 3, "Should parse headers");
  console.assert(parsed.data.length === 2, "Should parse 2 data rows");
  console.assert(parsed.data[1][1] === "Comma, Name", "Should preserve commas inside quotes");
  console.assert(parsed.data[1][2] === "Multi\nLine", "Should preserve newlines inside quotes");
}

function runDateSelfTests() {
  const d = dateFromISO("2025-12-15");
  console.assert(!!d, "dateFromISO should parse YYYY-MM-DD");
  if (d) console.assert(isoFromDate(d) === "2025-12-15", "isoFromDate should roundtrip");

  const bad = dateFromISO("not-a-date");
  console.assert(bad === undefined, "dateFromISO should return undefined for invalid input");
}

// ---------------------------------------------
// UI Components
// ---------------------------------------------

function StatPill({ icon: Icon, label, value, sub }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl border bg-background p-2 shadow-sm">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="truncate text-2xl font-semibold">{value}</div>
            {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniBarList({ title, items }) {
  const max = Math.max(1, ...items.map(([, v]) => v));
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>Count distribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">No data</div>
        ) : (
          items.map(([k, v]) => (
            <div key={k} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="truncate pr-2">{k}</div>
                <div className="tabular-nums text-muted-foreground">{v}</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-foreground/20"
                  style={{ width: `${Math.round((v / max) * 100)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ title, subtitle, action }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-10 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border bg-background shadow-sm">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
        {action ? <div className="mt-6">{action}</div> : null}
      </CardContent>
    </Card>
  );
}

function CustomerCard({ customer, onOpen }) {
  const b = frequencyBadge(customer.frequency);
  const hasAnyEmail = !!(customer.email1 || customer.email2);
  const hasPhone = !!customer.phone;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left"
      aria-label={`Open ${customer.client}`}
    >
      <Card className="h-full rounded-2xl shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-base">{customer.client}</CardTitle>
              <CardDescription className="truncate">
                #{customer.account} • {customer.city}, {customer.state} {customer.zip}
              </CardDescription>
            </div>
            <Badge variant={b.variant}>{b.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4" />
            <div className="min-w-0 truncate">{customer.address}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" /> Rate
              </div>
              <div className="mt-1 text-sm font-semibold tabular-nums">${safeNum(customer.rate).toFixed(0)}</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="h-3.5 w-3.5" /> Avg. Hours
              </div>
              <div className="mt-1 text-sm font-semibold tabular-nums">{safeNum(customer.avgDurationHrs)}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {customer.callsForScheduling ? <Badge variant="secondary">Calls to Schedule</Badge> : null}
            {customer.serviceType ? (
              <Badge variant="outline">{customer.serviceType}</Badge>
            ) : (
              <Badge variant="outline">Service TBD</Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className={cx("flex items-center gap-1", !hasPhone && "opacity-50")}>
              <Phone className="h-3.5 w-3.5" />
              <span>{hasPhone ? "Phone" : "No phone"}</span>
            </div>
            <div className={cx("flex items-center gap-1", !hasAnyEmail && "opacity-50")}>
              <Mail className="h-3.5 w-3.5" />
              <span>{hasAnyEmail ? "Email" : "No email"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

function Row({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border p-3">
      <div className="mt-0.5 rounded-xl border bg-background p-2 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-0.5 break-words text-sm font-medium">{value || "—"}</div>
      </div>
    </div>
  );
}

function CustomerDialog({ open, onOpenChange, customer, onSave, onDelete, onSaved }) {
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    setDraft(customer ? { ...customer } : null);
  }, [customer]);

  const set = (k, v) => setDraft((d) => ({ ...(d || {}), [k]: v }));

  if (!draft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> {draft.client}
          </DialogTitle>
          <DialogDescription>
            Account #{draft.account} • {draft.city}, {draft.state} {draft.zip}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Scheduling</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Row
                icon={MapPin}
                label="Address"
                value={`${draft.address}${draft.city ? `, ${draft.city}` : ""}${draft.state ? `, ${draft.state}` : ""}${draft.zip ? ` ${draft.zip}` : ""}`}
              />
              <Row icon={Phone} label="Phone" value={draft.phone} />
              <Row icon={Mail} label="Email" value={draft.email1} />
              <Row icon={Mail} label="Email #2" value={draft.email2} />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Row icon={DollarSign} label="Rate" value={draft.rate ? `$${safeNum(draft.rate).toFixed(0)}` : ""} />
              <Row icon={Timer} label="Avg Duration (hrs)" value={draft.avgDurationHrs?.toString()} />
              <Row icon={Filter} label="Service Type" value={draft.serviceType} />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Row icon={Calendar} label="Frequency" value={draft.frequency} />
              <Row icon={User} label="Preferred Gardener" value={draft.preferredGardener} />
              <Row icon={Filter} label="Notes" value={draft.notes} />
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Preferred Day
                </div>
                <div className="mt-2">
                  <Select
                    value={draft.preferredDay ? draft.preferredDay : "__none__"}
                    onValueChange={(v) => set("preferredDay", v === "__none__" ? "" : v)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None</SelectItem>
                      {DAYS_OF_WEEK.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Row icon={Clock} label="Preferred Time" value={draft.preferredTime} />
              <Row icon={Phone} label="Client Calls For Scheduling" value={draft.callsForScheduling ? "Yes" : "No"} />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <DatePickerField label="Last Service" value={draft.lastService} onChange={(v) => set("lastService", v)} />
              <DatePickerField label="Next Service" value={draft.nextService} onChange={(v) => set("nextService", v)} />
            </div>

            <div className="rounded-2xl border p-4">
              <div className="text-sm font-semibold">Quick actions</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    const to = draft.email1 || draft.email2;
                    if (!to) return;
                    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
                      `Scheduling: ${draft.client}`
                    )}`;
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (!draft.phone) return;
                    window.location.href = `tel:${draft.phone}`;
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const q = `${draft.address}, ${draft.city}, ${draft.state} ${draft.zip}`.trim();
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
                      "_blank"
                    );
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" /> Open in Maps
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Email/Call buttons open your default apps. Maps opens a new tab.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Client</Label>
                <Input value={draft.client} onChange={(e) => set("client", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Account #</Label>
                <Input value={draft.account} onChange={(e) => set("account", Number(e.target.value) || draft.account)} />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={draft.address} onChange={(e) => set("address", e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-2">
                  <Label>City</Label>
                  <Input value={draft.city} onChange={(e) => set("city", e.target.value)} />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label>State</Label>
                  <Input value={draft.state} onChange={(e) => set("state", e.target.value)} />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label>Zip</Label>
                  <Input value={draft.zip} onChange={(e) => set("zip", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={draft.email1} onChange={(e) => set("email1", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email #2</Label>
                <Input value={draft.email2} onChange={(e) => set("email2", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={draft.frequency || ""} onValueChange={(v) => set("frequency", v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="2x/Year">2x/Year</SelectItem>
                <SelectItem value="1x/Year">1x/Year</SelectItem>
                <SelectItem value="As Needed">As Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Service Type</Label>
            <Input
              value={draft.serviceType}
              onChange={(e) => set("serviceType", e.target.value)}
              placeholder="e.g., Winter Pruning"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Rate</Label>
              <Input value={draft.rate} onChange={(e) => set("rate", Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Avg Duration (hrs)</Label>
              <Input
                value={draft.avgDurationHrs}
                onChange={(e) => set("avgDurationHrs", Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3 md:col-span-2">
            <div>
              <div className="text-sm font-semibold">Client calls for scheduling</div>
              <div className="text-xs text-muted-foreground">Record who initiates scheduling.</div>
            </div>
            <Switch checked={!!draft.callsForScheduling} onCheckedChange={(v) => set("callsForScheduling", !!v)} />
          </div>
        </div>

        </TabsContent>
                  
        <DialogFooter>
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              className="rounded-xl"
              onClick={() => {
                const ok = window.confirm(`Delete ${draft.client}? This cannot be undone.`);
                if (!ok) return;
                onDelete?.(draft);
                onOpenChange(false);
              }}
            >
              Delete
            </Button>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} className="rounded-xl">
                Close
              </Button>
              <Button
                type="button"
                className="rounded-xl"
                onClick={() => {
                  onSave?.(draft);
                  onOpenChange(false);
                  onSaved?.(draft);
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DataTable({ rows, onOpen }) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="overflow-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b">
              {["Acct", "Client", "City", "Zip", "Frequency", "Service", "Rate", "Hrs", "Calls?", "Email"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const b = frequencyBadge(c.frequency);
              return (
                <tr
                  key={c.account}
                  className="cursor-pointer border-b last:border-b-0 hover:bg-muted/50"
                  onClick={() => onOpen(c)}
                >
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.account}</td>
                  <td className="px-4 py-3 font-medium">{c.client}</td>
                  <td className="px-4 py-3">{c.city}</td>
                  <td className="px-4 py-3 tabular-nums">{c.zip}</td>
                  <td className="px-4 py-3">
                    <Badge variant={b.variant}>{b.label}</Badge>
                  </td>
                  <td className="px-4 py-3">{c.serviceType || "—"}</td>
                  <td className="px-4 py-3 tabular-nums">${safeNum(c.rate).toFixed(0)}</td>
                  <td className="px-4 py-3 tabular-nums">{safeNum(c.avgDurationHrs)}</td>
                  <td className="px-4 py-3">{c.callsForScheduling ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email1 || c.email2 || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Main App
// ---------------------------------------------

export default function CustomerDatabaseUI() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process?.env?.NODE_ENV === "production") return;
    try {
      runCsvSelfTests();
      runDateSelfTests();
    } catch {
      // ignore
    }
  }, []);

  const fileInputRef = useRef(null);

  const [customers, setCustomers] = useState(() => {
    try {
      const raw = localStorage.getItem("customer_db_v1");
      if (!raw) return seedCustomers;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return seedCustomers;
      return parsed;
    } catch {
      return seedCustomers;
    }
  });

  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [saveNotice, setSaveNotice] = useState("");
  const [saveNoticeOpen, setSaveNoticeOpen] = useState(false);

  const showSaved = (c) => {
    const who = (c?.client || "Customer").toString().trim() || "Customer";
    setSaveNotice(`Saved changes for ${who}.`);
    setSaveNoticeOpen(true);
    window.clearTimeout(showSaved._t);
    showSaved._t = window.setTimeout(() => setSaveNoticeOpen(false), 2500);
  };

  const [isImporting, setIsImporting] = useState(false);

  const [cityFilter, setCityFilter] = useState("all");
  const [zipFilter, setZipFilter] = useState("all");
  const [freqFilter, setFreqFilter] = useState("all");
  const [callsOnly, setCallsOnly] = useState(false);
  const [hideNoEmail, setHideNoEmail] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("customer_db_v1", JSON.stringify(customers));
    } catch {
      // ignore
    }
  }, [customers]);

  const uniqueCities = useMemo(() => {
    const s = new Set(customers.map((c) => c.city).filter(Boolean));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [customers]);

  const uniqueZips = useMemo(() => {
    const s = new Set(customers.map((c) => c.zip).filter(Boolean));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [customers]);

  const nextAccount = useMemo(() => {
    const max = Math.max(0, ...customers.map((c) => safeNum(c.account)));
    return max + 1;
  }, [customers]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return customers
      .filter((c) => {
        if (cityFilter !== "all" && c.city !== cityFilter) return false;
        if (zipFilter !== "all" && c.zip !== zipFilter) return false;

        if (freqFilter !== "all") {
          const f = normalize(c.frequency);
          if (freqFilter === "monthly" && !f.includes("monthly")) return false;
          if (freqFilter === "annual" && !(f.includes("year") || f.includes("1x"))) return false;
          if (freqFilter === "2x" && !f.includes("2x")) return false;
          if (freqFilter === "asneeded" && !f.includes("as needed")) return false;
        }

        if (callsOnly && !c.callsForScheduling) return false;
        if (hideNoEmail && !(c.email1 || c.email2)) return false;

        if (!q) return true;

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
  }, [customers, query, cityFilter, zipFilter, freqFilter, callsOnly, hideNoEmail]);

  const stats = useMemo(() => {
    const total = customers.length;
    const monthly = customers.filter((c) => normalize(c.frequency).includes("monthly")).length;
    const calls = customers.filter((c) => c.callsForScheduling).length;
    const avgRate = total === 0 ? 0 : customers.reduce((sum, c) => sum + safeNum(c.rate), 0) / total;
    const avgHrs = total === 0 ? 0 : customers.reduce((sum, c) => sum + safeNum(c.avgDurationHrs), 0) / total;
    const { byCity, byZip } = statBuckets(customers);
    return { total, monthly, calls, avgRate, avgHrs, byCity, byZip };
  }, [customers]);

  const openCustomer = (c) => {
    setSelected(c);
    setOpenDetail(true);
  };

  const saveCustomer = (draft) => {
    setCustomers((prev) => prev.map((x) => (x.account === draft.account ? { ...draft } : x)));
  };

  const deleteCustomer = (draft) => {
    setCustomers((prev) => prev.filter((x) => x.account !== draft.account));
    setOpenDetail(false);
    setSelected(null);
  };

  const createCustomer = (draft) => {
    setCustomers((prev) => {
      const exists = prev.some((x) => x.account === draft.account);
      const account = exists ? Math.max(0, ...prev.map((c) => safeNum(c.account))) + 1 : draft.account;
      return [...prev, { ...draft, account }].sort((a, b) => safeNum(a.account) - safeNum(b.account));
    });
  };

  const importCustomersFromCSV = async (file) => {
    if (!file) return;
    setIsImporting(true);
    try {
      const text = await file.text();
      const parsed = parseCSVText(text);

      if (!parsed.headers?.length || !parsed.data?.length) {
        alert("CSV import: No rows found. Make sure the file has a header row and at least one data row.");
        return;
      }

      let fallbackAccount = Math.max(0, ...customers.map((c) => safeNum(c.account))) + 1;
      const incoming = parsed.data.map((row) => {
        const mapped = mapCSVRowToCustomer(parsed.headers, row, fallbackAccount);
        if (mapped.account === fallbackAccount) fallbackAccount += 1;
        return mapped;
      });

      const cleaned = incoming.filter((c) => (c.client || "").trim() || (c.address || "").trim() || (c.email1 || "").trim() || (c.email2 || "").trim());

      if (cleaned.length === 0) {
        alert("CSV import: All rows were empty after parsing.");
        return;
      }

      const replace = window.confirm(
        `Imported ${cleaned.length} rows.

OK = Replace all existing customers
Cancel = Append / merge into existing list`
      );

      if (replace) {
        setCustomers(cleaned.sort((a, b) => safeNum(a.account) - safeNum(b.account)));
      } else {
        setCustomers((prev) => {
          const byAccount = new Map(prev.map((c) => [safeNum(c.account), c]));
          let next = Math.max(0, ...prev.map((c) => safeNum(c.account))) + 1;

          const takeNext = () => {
            while (byAccount.has(next)) next += 1;
            const out = next;
            next += 1;
            return out;
          };

          for (const c of cleaned) {
            let acct = safeNum(c.account, 0);
            if (!acct) acct = takeNext();
            byAccount.set(acct, { ...c, account: acct });
          }

          return Array.from(byAccount.values()).sort((a, b) => safeNum(a.account) - safeNum(b.account));
        });
      }

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      console.error(e);
      alert("CSV import failed. Please confirm the file is a valid .csv and try again.");
    } finally {
      setIsImporting(false);
    }
  };

  const resetToSeed = () => {
    setCustomers(seedCustomers);
    try {
      localStorage.removeItem("customer_db_v1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <Building2 className="h-3.5 w-3.5" /> Customer database • Local-first demo
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Customer Database</h1>
            <p className="mt-1 text-sm text-muted-foreground">Search, segment, and manage your recurring service customers.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                importCustomersFromCSV(f);
              }}
            />

            <Button variant="secondary" className="rounded-xl" onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
              <FileUp className="mr-2 h-4 w-4" /> {isImporting ? "Importing…" : "Upload CSV"}
            </Button>

            <Button
              variant="secondary"
              className="rounded-xl"
              onClick={() => downloadText(`customers_${new Date().toISOString().slice(0, 10)}.csv`, toCSV(customers), "text/csv;charset=utf-8")}
            >
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="rounded-xl">
                  <Pencil className="mr-2 h-4 w-4" /> Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => resetToSeed()}>Reset to seed data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="rounded-xl" onClick={() => setOpenCreate(true)}>
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatPill icon={LayoutGrid} label="Customers" value={stats.total} sub={`${filtered.length} shown`} />
          <StatPill icon={Calendar} label="Monthly" value={stats.monthly} sub="Active monthly accounts" />
          <StatPill icon={Phone} label="Calls to schedule" value={stats.calls} sub="Client-initiated scheduling" />
          <StatPill icon={DollarSign} label="Avg rate" value={`$${stats.avgRate.toFixed(0)}`} sub={`Avg duration ${stats.avgHrs.toFixed(1)} hrs`} />
        </div>

        <div className="mt-6 rounded-2xl border bg-background p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, address, email, zip…" className="rounded-xl pl-9" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[170px] rounded-xl">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cities</SelectItem>
                    {uniqueCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={zipFilter} onValueChange={setZipFilter}>
                  <SelectTrigger className="w-[160px] rounded-xl">
                    <SelectValue placeholder="Zip" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All zips</SelectItem>
                    {uniqueZips.map((z) => (
                      <SelectItem key={z} value={z}>
                        {z}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={freqFilter} onValueChange={setFreqFilter}>
                  <SelectTrigger className="w-[170px] rounded-xl">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All frequencies</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="2x">2x/Year</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="asneeded">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={callsOnly} onCheckedChange={(v) => setCallsOnly(!!v)} id="callsOnly" />
                  <Label htmlFor="callsOnly" className="text-sm">Calls to schedule</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={hideNoEmail} onCheckedChange={(v) => setHideNoEmail(!!v)} id="hideNoEmail" />
                  <Label htmlFor="hideNoEmail" className="text-sm">Hide no-email</Label>
                </div>
              </div>

              <Button variant="secondary" onClick={() => setView((v) => (v === "grid" ? "table" : "grid"))} className="rounded-xl">
                {view === "grid" ? (
                  <>
                    <List className="mr-2 h-4 w-4" /> Table
                  </>
                ) : (
                  <>
                    <LayoutGrid className="mr-2 h-4 w-4" /> Grid
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {filtered.length === 0 ? (
              <EmptyState
                title="No matching customers"
                subtitle="Try clearing filters or searching by zip, name, or email."
                action={
                  <Button
                    variant="secondary"
                    className="rounded-xl"
                    onClick={() => {
                      setQuery("");
                      setCityFilter("all");
                      setZipFilter("all");
                      setFreqFilter("all");
                      setCallsOnly(false);
                      setHideNoEmail(false);
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map((c) => (
                  <CustomerCard key={c.account} customer={c} onOpen={() => openCustomer(c)} />
                ))}
              </div>
            ) : (
              <DataTable rows={filtered} onOpen={openCustomer} />
            )}
          </div>

          <div className="space-y-4 lg:col-span-4">
            <MiniBarList title="Clients by city" items={stats.byCity} />
            <MiniBarList title="Clients by zip" items={stats.byZip} />
          </div>
        </div>

        <CustomerDialog
          open={openDetail}
          onOpenChange={setOpenDetail}
          customer={selected}
          onSave={saveCustomer}
          onDelete={deleteCustomer}
          onSaved={showSaved}
        />

        <CreateDialog open={openCreate} onOpenChange={setOpenCreate} nextAccount={nextAccount} onCreate={createCustomer} />

        <div
          className={cx(
            "fixed bottom-4 left-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 transition-all",
            saveNoticeOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
          )}
          aria-live="polite"
        >
          <div className="rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium">{saveNotice}</div>
              <Button type="button" variant="ghost" className="h-8 rounded-xl" onClick={() => setSaveNoticeOpen(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-muted-foreground">Tip: Click any customer card/row to view details, scheduling actions, and edit fields.</div>
      </div>
    </div>
  );
}
