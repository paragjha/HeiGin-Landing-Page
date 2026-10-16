// @lovable.dev/vite-tanstack-config already includes the following. Do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static images and icons have stable names, so cache them for a week and let the CDN
// refresh in the background. Hashed JS/CSS under /assets is already immutable.
// Declared outside the defineConfig() call because the wrapper's option type does not
// list `routeRules`, although it forwards the whole object to Nitro.
const cacheWeek = { headers: { "cache-control": "public, max-age=604800, stale-while-revalidate=86400" } };
const nitro = {
  preset: "vercel",
  routeRules: {
    "/images/**": cacheWeek,
    "/favicon.ico": cacheWeek,
    "/favicon.png": cacheWeek,
    "/apple-touch-icon.png": cacheWeek,
  },
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro,
});
