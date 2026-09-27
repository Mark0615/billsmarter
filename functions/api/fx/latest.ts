import { fxResponse } from "../../../lib/fx";

// Pages Functions keeps the calculator's existing /api/fx/latest URL while
// the Next.js pages and the browser-generated PDF are static assets.
export function onRequestGet({ request }: { request: Request }): Promise<Response> {
  return fxResponse(request);
}
