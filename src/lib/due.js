function normalizeFrequency(freq) {
  return (freq || "").toString().trim().toLowerCase();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isDueOnDate(customer, targetDate) {
  const freq = normalizeFrequency(customer.frequency);

  // If lastServiceDate is missing, treat as due (or change to false if you prefer)
  if (!customer.lastServiceDate) return true;

  const last = new Date(customer.lastServiceDate);
  if (Number.isNaN(last.getTime())) return true;

  const t = new Date(targetDate);
  const daysSince = Math.floor((t.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  // Approximate rules (you can tune these)
  if (freq.includes("monthly")) return daysSince >= 28;
  if (freq.includes("2x") || freq.includes("2/") || freq.includes("twice")) return daysSince >= 170;
  if (freq.includes("1x") || freq.includes("year")) return daysSince >= 350;

  // "As Needed": only due if dispatcher explicitly includes it
  if (freq.includes("as needed")) return false;

  // Unknown frequency: include (safer default)
  return true;
}

export function filterCustomersForRouting(customers, targetDate, includedFrequencies) {
  const includeSet = new Set(includedFrequencies.map((x) => x.toLowerCase()));

  return customers.filter((c) => {
    const f = (c.frequency || "").toLowerCase();

    // Included/excluded frequencies
    const frequencyIncluded =
      (includeSet.has("monthly") && f.includes("monthly")) ||
      (includeSet.has("2x/year") && f.includes("2x")) ||
      (includeSet.has("1x/year") && (f.includes("1x") || f.includes("year"))) ||
      (includeSet.has("as needed") && f.includes("as needed"));

    if (!frequencyIncluded) return false;

    // Due logic
    if (f.includes("as needed")) return true; // included explicitly -> treat as due
    return isDueOnDate(c, targetDate);
  });
}
