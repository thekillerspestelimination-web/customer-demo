export const CUSTOMER_STORAGE_KEY = "customer_db_v1";

export function migrateCustomer(c) {
  const avgHrs = Number(c.avgDurationHrs ?? 0) || 0;
  return {
    ...c,
    lastServiceDate: c.lastServiceDate ?? "",        // new
    lat: c.lat ?? null,                               // new
    lng: c.lng ?? null,                               // new
    serviceDurationMins: c.serviceDurationMins ?? Math.round(avgHrs * 60), // new
  };
}

export function loadCustomers(seedCustomers) {
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const list = Array.isArray(parsed) && parsed.length ? parsed : seedCustomers;
    return list.map(migrateCustomer);
  } catch {
    return seedCustomers.map(migrateCustomer);
  }
}

export function saveCustomers(customers) {
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers));
}
