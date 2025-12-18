export async function POST(req) {
  console.log("GOOGLE_MAPS_SERVER_KEY exists:", !!process.env.GOOGLE_MAPS_SERVER_KEY);

  const { addresses } = await req.json();

  const key = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!key) return Response.json({ error: "Missing GOOGLE_MAPS_SERVER_KEY" }, { status: 500 });

  const results = [];
  for (const a of addresses) {
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      encodeURIComponent(a) +
      "&key=" +
      encodeURIComponent(key);

    const r = await fetch(url);
    const j = await r.json();

    const loc = j?.results?.[0]?.geometry?.location;
    results.push({
      address: a,
      ok: !!loc,
      lat: loc?.lat ?? null,
      lng: loc?.lng ?? null,
    });
  }

  return Response.json({ results });
}
