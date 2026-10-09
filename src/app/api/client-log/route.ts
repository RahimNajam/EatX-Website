// Dev-only sink for the phone diagnostics in src/app/layout.tsx: prints what a
// physical device reports into the `next dev` terminal. Disabled in production.
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const message = (await request.text()).slice(0, 2000);
  console.log(`[device] ${message}`);

  return new Response(null, { status: 204 });
}
