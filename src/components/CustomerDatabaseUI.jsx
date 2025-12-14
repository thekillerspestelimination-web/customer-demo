"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  X,
  Copy,
  Check,
  Users,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  NotebookPen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ------------------------------------------------------------
// Seed Data + Persistence
// ------------------------------------------------------------

const STORAGE_KEY = "customer_db_v1";

const SEED = [
  { account: 1, client: "Anya Marina", address: "2525 SE Ash, Portland", phone: "", email1: "Anyamarina23@gmail.com", email2: "", callsForScheduling: true, frequency: "2x/year", serviceType: "", rate: 85, avgDurationHrs: 7 },
  { account: 2, client: "April Ann Fong", address: "11234 SW Capitol Hwy, Portland, OR 97219", phone: "", email1: "App1efrog@yahoo.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 85, avgDurationHrs: 2 },
  { account: 3, client: "April Severson", address: "5428 SE Washington St, Portland, OR 97215", phone: "", email1: "april@seversonevents.com", email2: "", callsForScheduling: true, frequency: "1x/year", serviceType: "Winter Pruning", rate: 85, avgDurationHrs: 3 },
  { account: 4, client: "Barb Dallum", address: "1111 N. Water St", phone: "(503) 551-5530", email1: "", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 65, avgDurationHrs: 2 },
  { account: 5, client: "Barbara Dudley", address: "7407 SW 33rd Ave, Portland", phone: "", email1: "barbdudley@aol.com", email2: "", callsForScheduling: true, frequency: "1x/Year", serviceType: "Winter Pruning", rate: 100, avgDurationHrs: 5 },
  { account: 6, client: "Barry Pelsner", address: "2335 NE 24 Ave, Portland, OR 97212", phone: "", email1: "pelznerb@gmail.com", email2: "", callsForScheduling: true, frequency: "2x/Year", serviceType: "Fall/Spring Pruning", rate: 100, avgDurationHrs: 3 },
  { account: 7, client: "Beth Rice", address: "4125 SE 14th Ave. Portland, OR 97202", phone: "", email1: "Beth_rice1@yahoo.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 85, avgDurationHrs: 3 },
  { account: 8, client: "Bobbi Jo Snethen & Michael Davidson", address: "6816 N Williams, Portland OR 97217", phone: "", email1: "bobbijo.snethen@gmail.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 85, avgDurationHrs: 3 },
  { account: 9, client: "Bill Curtin", address: "2623 NE 43rd Ave, Portland, OR 97317", phone: "", email1: "bllcurtin@gmail.com", email2: "", callsForScheduling: false, frequency: "Montlhy", serviceType: "", rate: 65, avgDurationHrs: 2 },
  { account: 10, client: "Bill McNamee & Hannah Kuhn", address: "2734 NE 35th Place, Portland, OR", phone: "", email1: "wdmhak@gmail.com", email2: "", callsForScheduling: true, frequency: "As Needed", serviceType: "", rate: 85, avgDurationHrs: 4 },
  { account: 11, client: "Brett Muphy", address: "1833 SW Laurel St, Portland, OR 97201, USA", phone: "", email1: "murphybpm@gmail.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 100, avgDurationHrs: 3 },
  { account: 12, client: "Brianne Day", address: "4909 SW Miles St. Portland, OR 97219", phone: "", email1: "Brianneday@gmail.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 85, avgDurationHrs: 3 },
  { account: 13, client: "Beverly Nicholson", address: "224 Ames Ct., Silverton, OR 9781", phone: "", email1: "bevnich224@gmail.com", email2: "", callsForScheduling: false, frequency: "2x/Month", serviceType: "", rate: 85, avgDurationHrs: 2 },
  { account: 14, client: "Carol Christiansen", address: "409 N 2nd St, Silverton, OR 97381", phone: "(503) 703-8897", email1: "", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 65, avgDurationHrs: 2 },
  { account: 15, client: "Carrie Brownstein & Karen Murphy", address: "2512 NE 45th Ave, Portland, OR 97213, USA", phone: "", email1: "crbrownstein@gmail.com", email2: "", callsForScheduling: true, frequency: "4x/year", serviceType: "", rate: 85, avgDurationHrs: 2 },
  { account: 16, client: "Carrie Brownstein", address: "2536 NE 46th Ave., Portland OR 97213", phone: "", email1: "crbrownstein@gmail.com", email2: "", callsForScheduling: true, frequency: "4x/year", serviceType: "", rate: 85, avgDurationHrs: 2 },
  { account: 17, client: "Carly Ritorto", address: "6924 N. Greeley AVe, Portland, OR 97217", phone: "", email1: "carly.ritorto@gmail.com", email2: "", callsForScheduling: true, frequency: "2x/year", serviceType: "", rate: 85, avgDurationHrs: 5 },
  { account: 18, client: "Celia & Scott Kool", address: "300 Welch St. Silverton, OR 97317", phone: "", email1: "sckool@frontiernet.net", email2: "", callsForScheduling: true, frequency: "As Needed", serviceType: "", rate: 75, avgDurationHrs: 5 },
  { account: 19, client: "Chris & Erin Blandford", address: "550 SW Glen Rd, Portland, OR 97219", phone: "", email1: "blandford.chris@gmail.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 100, avgDurationHrs: 4 },
  { account: 20, client: "Chris Tebben & Cam Turner", address: "3811 NE Alameda, Portland, OR 97212", phone: "", email1: "turben4@gmail.com", email2: "", callsForScheduling: false, frequency: "Monthly", serviceType: "", rate: 100, avgDurationHrs: 3 },
].map((c) => ({
  ...c,
  notes: { gateCode: "", preferences: "", lastService: "", nextDue: "", internal: "" },
}));

const cx = (...c) => c.filter(Boolean).join(" ");
const norm = (s) => (s ?? "").toString().toLowerCase().trim();
const zipOf = (a) => ((a || "").match(/\b\d{5}\b/) || [""])[0];
const cityOf = (a) => (/\bSilverton\b/i.test(a || "") ? "Silverton" : /\bPortland\b/i.test(a || "") ? "Portland" : "Unknown");
const money = (n) => (Number.isFinite(Number(n)) ? `$${Number(n).toFixed(0)}` : "—");
const yesNo = (v) => (v ? "Yes" : "No");
const freqC = (f) => {
  const x = norm(f);
  if (!x) return "Unknown";
  if (x.includes("monthly")) return "Monthly";
  if (x.includes("as needed")) return "As Needed";
  if (x.includes("2x/month")) return "2x/Month";
  if (x.includes("4x/year")) return "4x/Year";
  if (x.includes("2x/year")) return "2x/Year";
  if (x.includes("1x/year")) return "1x/Year";
  return (f || "").trim();
};

function Stat({ Icon, label, value, sub }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 shadow-sm backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs text-white/60">{label}</p>
            <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
            {sub ? <p className="text-xs text-white/50">{sub}</p> : null}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <Icon className="h-5 w-5 text-white/75" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BadgeLite({ tone = "neutral", children }) {
  const t =
    tone === "warn"
      ? "border-amber-400/20 bg-amber-400/10 text-amber-100"
      : tone === "good"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
      : "border-white/10 bg-white/5 text-white/75";
  return <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-[11px]", t)}>{children}</span>;
}

function Pill({ href, Icon, children }) {
  if (!href) return null;
  return (
    <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10" href={href}>
      <Icon className="h-3.5 w-3.5" />
      <span className="truncate">{children}</span>
    </a>
  );
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 900);
        } catch {}
      }}
      aria-label="Copy"
    >
      {ok ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-white/60">{label}</p>
      {children}
    </div>
  );
}

function CustomerDialog({ open, onOpenChange, initial, onSave }) {
  const isEdit = !!initial;
  const blank = {
    account: "",
    client: "",
    address: "",
    phone: "",
    email1: "",
    email2: "",
    callsForScheduling: false,
    frequency: "Monthly",
    serviceType: "",
    rate: 85,
    avgDurationHrs: 2,
    notes: { gateCode: "", preferences: "", lastService: "", nextDue: "", internal: "" },
  };

  const [v, setV] = useState(initial || blank);
  useEffect(() => setV(initial || blank), [initial, open]);

  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));
  const setN = (k, val) => setV((p) => ({ ...p, notes: { ...(p.notes || {}), [k]: val } }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl border-white/10 bg-[#0b0d1b] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{isEdit ? "Edit Customer" : "Add Customer"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Account #">
            <Input
              value={v.account}
              onChange={(e) => set("account", e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 21"
              className="h-10 rounded-xl border-white/10 bg-black/30 text-white"
              disabled={isEdit}
            />
          </Field>
          <Field label="Client">
            <Input value={v.client} onChange={(e) => set("client", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Address">
            <Input value={v.address} onChange={(e) => set("address", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Phone">
            <Input value={v.phone} onChange={(e) => set("phone", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Email">
            <Input value={v.email1} onChange={(e) => set("email1", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Email #2">
            <Input value={v.email2} onChange={(e) => set("email2", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>

          <div className="md:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field label="Calls for scheduling">
              <button
                onClick={() => set("callsForScheduling", !v.callsForScheduling)}
                className={cx(
                  "h-10 w-full rounded-xl border px-3 text-sm transition",
                  v.callsForScheduling ? "border-amber-400/30 bg-amber-400/10 text-amber-100" : "border-white/10 bg-black/30 text-white/80"
                )}
              >
                {yesNo(v.callsForScheduling)}
              </button>
            </Field>
            <Field label="Frequency">
              <Input value={v.frequency} onChange={(e) => set("frequency", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
            </Field>
            <Field label="Rate">
              <Input value={v.rate} onChange={(e) => set("rate", e.target.value.replace(/[^0-9.]/g, ""))} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
            </Field>
            <Field label="Avg Duration (hrs)">
              <Input value={v.avgDurationHrs} onChange={(e) => set("avgDurationHrs", e.target.value.replace(/[^0-9.]/g, ""))} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
            </Field>
          </div>

          <Field label="Service Type">
            <Input value={v.serviceType} onChange={(e) => set("serviceType", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Gate Code">
            <Input value={v.notes?.gateCode || ""} onChange={(e) => setN("gateCode", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Last Service">
            <Input type="date" value={v.notes?.lastService || ""} onChange={(e) => setN("lastService", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>
          <Field label="Next Due">
            <Input type="date" value={v.notes?.nextDue || ""} onChange={(e) => setN("nextDue", e.target.value)} className="h-10 rounded-xl border-white/10 bg-black/30 text-white" />
          </Field>

          <div className="md:col-span-2">
            <Field label="Preferences">
              <Textarea value={v.notes?.preferences || ""} onChange={(e) => setN("preferences", e.target.value)} className="min-h-[90px] rounded-xl border-white/10 bg-black/30 text-white" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Internal Notes">
              <Textarea value={v.notes?.internal || ""} onChange={(e) => setN("internal", e.target.value)} className="min-h-[90px] rounded-xl border-white/10 bg-black/30 text-white" />
            </Field>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-white text-black hover:bg-white/90"
            onClick={() => {
              const payload = {
                ...v,
                account: Number(v.account),
                rate: Number(v.rate),
                avgDurationHrs: Number(v.avgDurationHrs),
                notes: { gateCode: "", preferences: "", lastService: "", nextDue: "", internal: "", ...(v.notes || {}) },
              };
              if (!payload.account || !payload.client) return;
              onSave(payload);
              onOpenChange(false);
            }}
          >
            {isEdit ? "Save changes" : "Add customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CustomerCard({ c, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(c)}
      className={cx(
        "w-full text-left rounded-2xl border p-4 transition",
        active ? "border-white/25 bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">{c.client}</p>
            <BadgeLite tone={c.callsForScheduling ? "warn" : "neutral"}>Calls: {yesNo(c.callsForScheduling)}</BadgeLite>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <BadgeLite>Acct #{c.account}</BadgeLite>
            <BadgeLite>{c.freqC}</BadgeLite>
            <BadgeLite>{money(c.rate)}</BadgeLite>
            <BadgeLite tone={c.serviceType ? "good" : "neutral"}>{c.serviceType || "Service TBD"}</BadgeLite>
            {c.notes?.nextDue ? <BadgeLite tone="good">Next due: {c.notes.nextDue}</BadgeLite> : null}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{c.address} • {c.city}{c.zip ? ` ${c.zip}` : ""}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-white/60">Avg duration</p>
          <p className="text-lg font-semibold text-white">{c.avgDurationHrs}h</p>
        </div>
      </div>
    </button>
  );
}

function Detail({ c, onClear, onEdit, onDelete }) {
  if (!c)
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-base font-semibold text-white">Select a customer</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/60">Choose a customer on the left to see details and notes.</p>
      </div>
    );

  const phoneDigits = (c.phone || "").replace(/[^0-9+]/g, "");
  const summary = [
    `Account #${c.account} — ${c.client}`,
    c.address,
    `Phone: ${c.phone || "—"}`,
    `Email: ${c.email1 || "—"}`,
    `Next due: ${c.notes?.nextDue || "—"}`,
  ].join("\n");

  return (
    <motion.div key={c.account} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
      <Card className="rounded-2xl border-white/10 bg-white/5 shadow-sm backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-xl text-white">{c.client}</CardTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full bg-white/10 text-white/80">Account #{c.account}</Badge>
                <Badge variant="secondary" className="rounded-full bg-white/10 text-white/80">{c.freqC}</Badge>
                <Badge variant="secondary" className="rounded-full bg-white/10 text-white/80">{money(c.rate)}</Badge>
                <Badge variant="secondary" className={cx("rounded-full", c.callsForScheduling ? "bg-amber-400/15 text-amber-100" : "bg-white/10 text-white/80")}>
                  Calls: {yesNo(c.callsForScheduling)}
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => onEdit(c)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => onDelete(c)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
              <Button variant="ghost" className="rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10" onClick={onClear}>
                <X className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2"><MapPin className="h-5 w-5 text-white/75" /></div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">Address</p>
                <p className="mt-1 text-sm text-white/70">{c.address}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Pill href={c.phone ? `tel:${phoneDigits}` : ""} Icon={Phone}>{c.phone}</Pill>
                  <Pill href={c.email1 ? `mailto:${c.email1}` : ""} Icon={Mail}>{c.email1}</Pill>
                  {c.email2 ? <Pill href={`mailto:${c.email2}`} Icon={Mail}>{c.email2}</Pill> : null}
                  {c.email1 ? <CopyBtn text={c.email1} /> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-white/70"><Clock className="h-4 w-4" /><p className="text-xs">Avg Duration</p></div>
              <p className="mt-2 text-2xl font-semibold text-white">{c.avgDurationHrs}h</p>
              <p className="mt-1 text-xs text-white/50">Crew capacity planning.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-white/70"><DollarSign className="h-4 w-4" /><p className="text-xs">Service Rate</p></div>
              <p className="mt-2 text-2xl font-semibold text-white">{money(c.rate)}</p>
              <p className="mt-1 text-xs text-white/50">Billing cadence: {c.frequency}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-white/70"><SlidersHorizontal className="h-4 w-4" /><p className="text-xs">Service Type</p></div>
              <p className="mt-2 text-lg font-semibold text-white">{c.serviceType || "Not specified"}</p>
              <p className="mt-1 text-xs text-white/50">Update seasonality as needed.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-white/80"><NotebookPen className="h-4 w-4" /><p className="text-sm font-medium">Notes</p></div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Gate code</p>
                <p className="mt-1 text-sm text-white/80">{c.notes?.gateCode || "—"}</p>
                <p className="mt-3 text-xs text-white/60">Preferences</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-white/80">{c.notes?.preferences || "—"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap gap-2">
                  <BadgeLite tone={c.notes?.lastService ? "good" : "neutral"}>Last service: {c.notes?.lastService || "—"}</BadgeLite>
                  <BadgeLite tone={c.notes?.nextDue ? "warn" : "neutral"}>Next due: {c.notes?.nextDue || "—"}</BadgeLite>
                </div>
                <p className="mt-3 text-xs text-white/60">Internal</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-white/80">{c.notes?.internal || "—"}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address || "")}`, "_blank")}>
                <MapPin className="mr-2 h-4 w-4" /> Open in Maps
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
                disabled={!c.email1}
                onClick={() => {
                  const subj = encodeURIComponent(`Scheduling: Account #${c.account} — ${c.client}`);
                  const body = encodeURIComponent(`Hi ${c.client},

Reaching out to schedule your ${c.serviceType || "service"}.

Preferred dates/times?

Thanks,`);
                  window.location.href = `mailto:${c.email1}?subject=${subj}&body=${body}`;
                }}
              >
                <Mail className="mr-2 h-4 w-4" /> Draft Email
              </Button>
              <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => navigator.clipboard.writeText(summary)}>
                <Copy className="mr-2 h-4 w-4" /> Copy Summary
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CustomerDatabaseUI() {
  const [clients, setClients] = useState(SEED);
  const [selected, setSelected] = useState(null);

  const [q, setQ] = useState("");
  const [freq, setFreq] = useState("all");
  const [calls, setCalls] = useState("all");
  const [city, setCity] = useState("all");
  const [service, setService] = useState("all");
  const [sortField, setSortField] = useState("client");
  const [sortDir, setSortDir] = useState("asc");

  const [dlgOpen, setDlgOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setClients(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch {}
  }, [clients]);

  const enriched = useMemo(
    () =>
      clients.map((c) => ({
        ...c,
        city: cityOf(c.address),
        zip: zipOf(c.address),
        freqC: freqC(c.frequency),
        serviceC: (c.serviceType || "").trim() ? c.serviceType : "Unspecified",
        searchable: norm(
          [
            c.account,
            c.client,
            c.address,
            c.phone,
            c.email1,
            c.email2,
            c.frequency,
            c.serviceType,
            c.rate,
            c.avgDurationHrs,
            c.notes?.gateCode,
            c.notes?.preferences,
            c.notes?.internal,
            c.notes?.nextDue,
          ].join(" ")
        ),
      })),
    [clients]
  );

  const cities = useMemo(() => ["all", ...Array.from(new Set(enriched.map((c) => c.city))).sort()], [enriched]);
  const freqs = useMemo(() => ["all", ...Array.from(new Set(enriched.map((c) => c.freqC))).sort()], [enriched]);
  const services = useMemo(() => ["all", ...Array.from(new Set(enriched.map((c) => c.serviceC))).sort()], [enriched]);

  const filtered = useMemo(() => {
    const nq = norm(q);
    const dir = sortDir === "desc" ? -1 : 1;
    const cmp = (a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return norm(av).localeCompare(norm(bv)) * dir;
    };

    return enriched
      .filter((c) => (!nq ? true : c.searchable.includes(nq)))
      .filter((c) => (freq === "all" ? true : c.freqC === freq))
      .filter((c) => (city === "all" ? true : c.city === city))
      .filter((c) => (service === "all" ? true : c.serviceC === service))
      .filter((c) => (calls === "all" ? true : calls === "yes" ? !!c.callsForScheduling : !c.callsForScheduling))
      .slice()
      .sort(cmp);
  }, [enriched, q, freq, city, service, calls, sortField, sortDir]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const avgRate = total ? filtered.reduce((s, c) => s + (Number(c.rate) || 0), 0) / total : 0;
    const avgHrs = total ? filtered.reduce((s, c) => s + (Number(c.avgDurationHrs) || 0), 0) / total : 0;
    return {
      total,
      avgRate: `$${avgRate.toFixed(0)}`,
      avgHrs: `${avgHrs.toFixed(1)}h`,
      calls: filtered.filter((c) => c.callsForScheduling).length,
      due: filtered.filter((c) => c.notes?.nextDue).length,
    };
  }, [filtered]);

  const reset = () => {
    setQ("");
    setFreq("all");
    setCalls("all");
    setCity("all");
    setService("all");
    setSortField("client");
    setSortDir("asc");
  };

  const upsert = (payload) => {
    setClients((prev) => {
      const i = prev.findIndex((x) => x.account === payload.account);
      if (i >= 0) {
        const next = prev.slice();
        next[i] = { ...prev[i], ...payload, notes: { ...(prev[i].notes || {}), ...(payload.notes || {}) } };
        return next;
      }
      return [...prev, payload].sort((a, b) => a.account - b.account);
    });
    setSelected((s) => (s?.account === payload.account ? { ...s, ...payload } : s));
  };

  const remove = (c) => {
    if (!window.confirm(`Delete ${c.client} (Account #${c.account})?`)) return;
    setClients((p) => p.filter((x) => x.account !== c.account));
    setSelected((s) => (s?.account === c.account ? null : s));
  };

  const parseCSV = (text) => {
  const rows = [];
  let row = [], cell = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], nx = text[i + 1];
    if (inQ) {
      if (ch === '"' && nx === '"') { cell += '"'; i++; }
      else if (ch === '"') inQ = false;
      else cell += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (ch !== "\r") cell += ch;
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
};

const fileRef = useRef(null);

const importCSV = async (file) => {
  const text = await file.text();
  const rows = parseCSV(text).filter((r) => r.some((x) => (x ?? "").toString().trim() !== ""));
  if (rows.length < 2) return alert("CSV appears empty.");

  const hdr = rows[0].map((h) => norm(h));
  const col = (names) => {
    const set = new Set(names.map(norm));
    return hdr.findIndex((h) => set.has(h));
  };

  const iAcct = col(["account #","account","acct","acct #","id"]);
  const iClient = col(["client","name","customer","customer name"]);
  const iAddr = col(["address","service address","location"]);
  const iPhone = col(["phone","phone number","mobile"]);
  const iE1 = col(["email","email 1","email1","primary email"]);
  const iE2 = col(["email #2","email 2","email2","secondary email"]);
  const iCalls = col(["client calls for scheduling","calls for scheduling","calls","needs call"]);
  const iFreq = col(["frequency","billing frequency"]);
  const iSvc = col(["service type","service","work type"]);
  const iRate = col(["rate","price"]);
  const iDur = col(["average duration (hrs)","avg duration","duration","hours"]);

  const iGate = col(["gate code","gatecode"]);
  const iPref = col(["preferences","pref"]);
  const iLast = col(["last service","last_service"]);
  const iNext = col(["next due","next_due","next service"]);
  const iInt = col(["internal notes","notes","internal"]);

  const nextAcct = () => (clients.reduce((m, c) => Math.max(m, Number(c.account) || 0), 0) + 1);

  let added = 0;
  rows.slice(1).forEach((r) => {
    const get = (i) => (i >= 0 ? (r[i] ?? "").toString().trim() : "");
    const acctRaw = get(iAcct);
    const acct = acctRaw ? Number(acctRaw.replace(/[^0-9]/g, "")) : nextAcct();
    const callsRaw = norm(get(iCalls));
    const callsForScheduling = callsRaw ? ["yes","y","true","1"].includes(callsRaw) : false;

    const payload = withNotes({
      account: acct,
      client: get(iClient),
      address: get(iAddr),
      phone: get(iPhone),
      email1: get(iE1),
      email2: get(iE2),
      callsForScheduling,
      frequency: get(iFreq),
      serviceType: get(iSvc),
      rate: Number(get(iRate).replace(/[^0-9.]/g, "")) || 0,
      avgDurationHrs: Number(get(iDur).replace(/[^0-9.]/g, "")) || 0,
      notes: {
        gateCode: get(iGate),
        preferences: get(iPref),
        lastService: get(iLast),
        nextDue: get(iNext),
        internal: get(iInt),
      },
    });

    if (!payload.client) return;
    upsert(payload);
    added++;
  });

  alert(`Imported ${added} customer${added === 1 ? "" : "s"}.`);
};

const exportCSV = () => {
    const headers = ["Account #","Client","Address","Phone","Email","Email #2","Calls For Scheduling","Frequency","Service Type","Rate","Avg Duration (hrs)","Gate Code","Preferences","Last Service","Next Due","Internal Notes"];
    const esc = (v) => {
      const s = (v ?? "").toString();
      return /[\n\r\t,\"]/g.test(s) ? `"${s.replace(/\"/g, '""')}"` : s;
    };
    const lines = [headers.join(",")];
    clients.forEach((r) => {
      lines.push(
        [
          r.account,
          r.client,
          r.address,
          r.phone,
          r.email1,
          r.email2,
          r.callsForScheduling ? "Yes" : "No",
          r.frequency,
          r.serviceType,
          r.rate,
          r.avgDurationHrs,
          r.notes?.gateCode,
          r.notes?.preferences,
          r.notes?.lastService,
          r.notes?.nextDue,
          r.notes?.internal,
        ].map(esc).join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openAdd = () => {
    setEditing(null);
    setDlgOpen(true);
  };
  const openEdit = (c) => {
    setEditing(c);
    setDlgOpen(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#060712_0%,#060712_30%,#05060f_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs text-white/60">Customer Database</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Service Portfolio</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">CRUD + notes (gate codes, preferences, last service, next due). Persists locally in your browser.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={reset}>
              <Filter className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={exportCSV}>
              <Users className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={() => fileRef.current?.click()}><Plus className="mr-2 h-4 w-4" /> Import CSV</Button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; importCSV(f); e.target.value = ""; }} />
            <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={openAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
          <Stat Icon={Users} label="Customers (filtered)" value={stats.total} sub="Current filters" />
          <Stat Icon={DollarSign} label="Average rate" value={stats.avgRate} sub="Across filtered" />
          <Stat Icon={Clock} label="Average duration" value={stats.avgHrs} sub="Capacity planning" />
          <Stat Icon={Phone} label="Calls required" value={stats.calls} sub="Outreach list" />
          <Stat Icon={NotebookPen} label="Next due set" value={stats.due} sub="Has Next Due date" />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, address, email, ZIP, notes…"
                  className="h-10 rounded-xl border-white/10 bg-black/30 pl-10 text-white placeholder:text-white/35 focus-visible:ring-white/20"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10">
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Sort <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl border-white/10 bg-[#0b0d1b] text-white">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {[
                    { k: "client", t: "Client" },
                    { k: "account", t: "Account #" },
                    { k: "rate", t: "Rate" },
                    { k: "avgDurationHrs", t: "Avg Duration" },
                    { k: "city", t: "City" },
                  ].map((o) => (
                    <DropdownMenuItem key={o.k} className="cursor-pointer focus:bg-white/10" onClick={() => setSortField(o.k)}>
                      {o.t}{sortField === o.k ? <span className="ml-auto text-xs text-white/60">Selected</span> : null}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer focus:bg-white/10" onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}>
                    Direction <span className="ml-auto text-xs text-white/60">{sortDir === "asc" ? "Asc" : "Desc"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-10 w-[170px] rounded-xl border-white/15 bg-black/30 text-white"><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent className="rounded-xl border-white/10 bg-[#0b0d1b] text-white">
                  {cities.map((c) => (
                    <SelectItem key={c} value={c} className="focus:bg-white/10">{c === "all" ? "All cities" : c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={freq} onValueChange={setFreq}>
                <SelectTrigger className="h-10 w-[170px] rounded-xl border-white/15 bg-black/30 text-white"><SelectValue placeholder="Frequency" /></SelectTrigger>
                <SelectContent className="rounded-xl border-white/10 bg-[#0b0d1b] text-white">
                  {freqs.map((f) => (
                    <SelectItem key={f} value={f} className="focus:bg-white/10">{f === "all" ? "All frequencies" : f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-10 w-[190px] rounded-xl border-white/15 bg-black/30 text-white"><SelectValue placeholder="Service type" /></SelectTrigger>
                <SelectContent className="rounded-xl border-white/10 bg-[#0b0d1b] text-white">
                  {services.map((s) => (
                    <SelectItem key={s} value={s} className="focus:bg-white/10">{s === "all" ? "All services" : s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-1">
                {[
                  { k: "all", t: "Calls: All" },
                  { k: "yes", t: "Yes" },
                  { k: "no", t: "No" },
                ].map((x) => (
                  <button
                    key={x.k}
                    onClick={() => setCalls(x.k)}
                    className={cx(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs transition",
                      calls === x.k ? "border-white/20 bg-white/15 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    {x.t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            {filtered.length ? (
              filtered.map((c) => <CustomerCard key={c.account} c={c} active={selected?.account === c.account} onSelect={setSelected} />)
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <p className="text-base font-semibold text-white">No results</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/60">Try broadening search terms or resetting filters.</p>
                <div className="mt-6 flex justify-center gap-2">
                  <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={reset}>Reset</Button>
                  <Button className="rounded-xl bg-white text-black hover:bg-white/90" onClick={openAdd}><Plus className="mr-2 h-4 w-4" />Add</Button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-3">
            <Detail c={selected} onClear={() => setSelected(null)} onEdit={openEdit} onDelete={remove} />
          </div>
        </div>

        <Separator className="mt-8 bg-white/10" />
        <div className="mt-4 text-xs text-white/40">Data persists locally (localStorage). For team use, wire this to a backend.</div>
      </div>

      <CustomerDialog
        open={dlgOpen}
        onOpenChange={setDlgOpen}
        initial={editing}
        onSave={(payload) => {
          if (!editing && clients.some((x) => x.account === payload.account)) {
            alert("Account # already exists. Choose a new number.");
            return;
          }
          upsert(payload);
          if (selected?.account === payload.account || !selected) setSelected(payload);
        }}
      />
    </div>
  );
}