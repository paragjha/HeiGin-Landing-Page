import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old article address, now under /blog. */
export const Route = createFileRoute("/resources/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/blog/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
