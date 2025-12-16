"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Download,
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
    if (/[\n\r,\"]/g.test(s)) return `"${s.replace(/\"/g, '"').replace(/"/g, '""')}"`;
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
      ].map(esc).join(",")
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
  if (f.includes("2x") || f.includes("2")) return { label: freq || "2x/Year", variant: "outline" };
  if (f.includes("1x") || f.includes("annual") || f.includes("year")) return { label: freq || "Annual", variant: "outline" };
  return { label: freq || "—", variant: "secondary" };
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
            {customer.serviceType ? <Badge variant="outline">{customer.serviceType}</Badge> : <Badge variant="outline">Service TBD</Badge>}
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

function CustomerDialog({ open, onOpenChange, customer, onSave, onDelete }) {
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
              <Row icon={MapPin} label="Address" value={`${draft.address}${draft.city ? `, ${draft.city}` : ""}${draft.state ? `, ${draft.state}` : ""}${draft.zip ? ` ${draft.zip}` : ""}`} />
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
              <Row icon={Calendar} label="Preferred Day" value={draft.preferredDay} />
              <Row icon={Clock} label="Preferred Time" value={draft.preferredTime} />
              <Row icon={Phone} label="Client Calls For Scheduling" value={draft.callsForScheduling ? "Yes" : "No"} />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Row icon={Calendar} label="Last Service" value={draft.lastService} />
              <Row icon={Calendar} label="Next Service" value={draft.nextService} />
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
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, "_blank");
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
                <Input
                  value={draft.account}
                  onChange={(e) => set("account", Number(e.target.value) || draft.account)}
                />
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
                <Input value={draft.serviceType} onChange={(e) => set("serviceType", e.target.value)} placeholder="e.g., Winter Pruning" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Rate</Label>
                  <Input value={draft.rate} onChange={(e) => set("rate", Number(e.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Avg Duration (hrs)</Label>
                  <Input value={draft.avgDurationHrs} onChange={(e) => set("avgDurationHrs", Number(e.target.value) || 0)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Gardener</Label>
                <Input value={draft.preferredGardener} onChange={(e) => set("preferredGardener", e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Preferred Day</Label>
                  <Input value={draft.preferredDay} onChange={(e) => set("preferredDay", e.target.value)} placeholder="e.g., Tuesday" />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Input value={draft.preferredTime} onChange={(e) => set("preferredTime", e.target.value)} placeholder="e.g., 10:00 AM" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <div className="text-sm font-semibold">Client calls for scheduling</div>
                  <div className="text-xs text-muted-foreground">If enabled, client expects to initiate scheduling.</div>
                </div>
                <Switch
                  checked={!!draft.callsForScheduling}
                  onCheckedChange={(v) => set("callsForScheduling", !!v)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Notes</Label>
                <Input value={draft.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Add any property notes or preferences" />
              </div>

              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <div className="space-y-2">
                  <Label>Last Service</Label>
                  <Input value={draft.lastService} onChange={(e) => set("lastService", e.target.value)} placeholder="YYYY-MM-DD" />
                </div>
                <div className="space-y-2">
                  <Label>Next Service</Label>
                  <Input value={draft.nextService} onChange={(e) => set("nextService", e.target.value)} placeholder="YYYY-MM-DD" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => onDelete?.(draft)}
              className="rounded-xl"
            >
              <X className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSave?.(draft)}
              className="rounded-xl"
            >
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateDialog({ open, onOpenChange, nextAccount, onCreate }) {
  const blank = useMemo(
    () => ({
      account: nextAccount,
      client: "",
      address: "",
      city: "Portland",
      state: "OR",
      zip: "",
      phone: "",
      email1: "",
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
    }),
    [nextAccount]
  );

  const [draft, setDraft] = useState(blank);

  useEffect(() => {
    if (open) setDraft(blank);
  }, [open, blank]);

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> New customer
          </DialogTitle>
          <DialogDescription>Create a customer record. You can edit details later.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Client</Label>
            <Input value={draft.client} onChange={(e) => set("client", e.target.value)} placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <Label>Account #</Label>
            <Input value={draft.account} onChange={(e) => set("account", Number(e.target.value) || nextAccount)} />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={draft.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" />
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
            <Label>Email</Label>
            <Input value={draft.email1} onChange={(e) => set("email1", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select value={draft.frequency} onValueChange={(v) => set("frequency", v)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select" />
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
            <Input value={draft.serviceType} onChange={(e) => set("serviceType", e.target.value)} placeholder="e.g., Winter Pruning" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Rate</Label>
              <Input value={draft.rate} onChange={(e) => set("rate", Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Avg Duration (hrs)</Label>
              <Input value={draft.avgDurationHrs} onChange={(e) => set("avgDurationHrs", Number(e.target.value) || 0)} />
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

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!draft.client.trim()) return;
              onCreate?.(draft);
              onOpenChange(false);
            }}
            className="rounded-xl"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DataTable({ rows, onOpen }) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="overflow-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b">
              {[
                "Acct",
                "Client",
                "City",
                "Zip",
                "Frequency",
                "Service",
                "Rate",
                "Hrs",
                "Calls?",
                "Email",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                  {h}
                </th>
              ))}
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
  const [view, setView] = useState("grid"); // grid | table
  const [selected, setSelected] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  // Filters
  const [cityFilter, setCityFilter] = useState("all");
  const [zipFilter, setZipFilter] = useState("all");
  const [freqFilter, setFreqFilter] = useState("all");
  const [callsOnly, setCallsOnly] = useState(false);
  const [hideNoEmail, setHideNoEmail] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("customer_db_v1", JSON.stringify(customers));
    } catch {
      // ignore storage errors
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
          if (freqFilter === "2x" && !(f.includes("2x") || f.includes("2"))) return false;
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
    const avgRate =
      total === 0
        ? 0
        : customers.reduce((sum, c) => sum + safeNum(c.rate), 0) / total;
    const avgHrs =
      total === 0
        ? 0
        : customers.reduce((sum, c) => sum + safeNum(c.avgDurationHrs), 0) / total;

    const { byCity, byZip } = statBuckets(customers);
    return { total, monthly, calls, avgRate, avgHrs, byCity, byZip };
  }, [customers]);

  const openCustomer = (c) => {
    setSelected(c);
    setOpenDetail(true);
  };

  const saveCustomer = (draft) => {
    setCustomers((prev) => {
      const exists = prev.some((x) => x.account === draft.account);
      if (!exists) return prev;
      return prev.map((x) => (x.account === draft.account ? { ...draft } : x));
    });
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
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <Building2 className="h-3.5 w-3.5" />
              Customer database • Local-first demo
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Customer Database</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, segment, and manage your recurring service customers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                <DropdownMenuItem onClick={() => resetToSeed()}>
                  Reset to seed data
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const csv = toCSV(customers);
                    downloadText(`customers_backup_${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv;charset=utf-8");
                  }}
                >
                  Export backup CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="rounded-xl" onClick={() => setOpenCreate(true)}>
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatPill icon={LayoutGrid} label="Customers" value={stats.total} sub={`${filtered.length} shown`} />
          <StatPill icon={Calendar} label="Monthly" value={stats.monthly} sub="Active monthly accounts" />
          <StatPill icon={Phone} label="Calls to schedule" value={stats.calls} sub="Client-initiated scheduling" />
          <StatPill
            icon={DollarSign}
            label="Avg rate"
            value={`$${stats.avgRate.toFixed(0)}`}
            sub={`Avg duration ${stats.avgHrs.toFixed(1)} hrs`}
          />
        </div>

        {/* Controls */}
        <div className="mt-6 rounded-2xl border bg-background p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, address, email, zip…"
                  className="rounded-xl pl-9"
                />
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

                <div className="hidden items-center gap-2 rounded-xl border px-3 py-2 sm:flex">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">More</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={callsOnly}
                    onCheckedChange={(v) => setCallsOnly(!!v)}
                    id="callsOnly"
                  />
                  <Label htmlFor="callsOnly" className="text-sm">
                    Calls to schedule
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={hideNoEmail}
                    onCheckedChange={(v) => setHideNoEmail(!!v)}
                    id="hideNoEmail"
                  />
                  <Label htmlFor="hideNoEmail" className="text-sm">
                    Hide no-email
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setView((v) => (v === "grid" ? "table" : "grid"))}
                  className="rounded-xl"
                >
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
        </div>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {filtered.length === 0 ? (
              <EmptyState
                title="No matching customers"
                subtitle="Try clearing filters or searching by zip, name, or email."
                action={
                  <Button variant="secondary" className="rounded-xl" onClick={() => {
                    setQuery("");
                    setCityFilter("all");
                    setZipFilter("all");
                    setFreqFilter("all");
                    setCallsOnly(false);
                    setHideNoEmail(false);
                  }}>
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

          <div className="lg:col-span-4 space-y-4">
            <MiniBarList title="Clients by city" items={stats.byCity} />
            <MiniBarList title="Clients by zip" items={stats.byZip} />

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Operational notes</CardTitle>
                <CardDescription>Optional helpers for dispatching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border p-4">
                  <div className="text-sm font-semibold">Route grouping (lightweight)</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Use City and Zip filters to build same-day clusters. Add preferred day/time fields per customer to enable a true crew-day heat map.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Local storage</Badge>
                  <Badge variant="outline">CSV export</Badge>
                  <Badge variant="outline">Detail + edit modal</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detail Dialog */}
        <CustomerDialog
          open={openDetail}
          onOpenChange={setOpenDetail}
          customer={selected}
          onSave={saveCustomer}
          onDelete={deleteCustomer}
        />

        {/* Create Dialog */}
        <CreateDialog
          open={openCreate}
          onOpenChange={setOpenCreate}
          nextAccount={nextAccount}
          onCreate={createCustomer}
        />

        {/* Footer */}
        <div className="mt-10 text-xs text-muted-foreground">
          Tip: Click any customer card/row to view details, scheduling actions, and edit fields.
        </div>
      </div>
    </div>
  );
}

