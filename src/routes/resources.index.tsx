import { createFileRoute, redirect } from "@tanstack/react-router";

/** The Resources page became the Blog. Keep old links and search results working. */
export const Route = createFileRoute("/resources/")({
  beforeLoad: () => {
    throw redirect({ to: "/blog", statusCode: 301 });
  },
});
