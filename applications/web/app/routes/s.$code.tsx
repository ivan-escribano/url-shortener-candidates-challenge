import { redirect } from "react-router";
import type { Route } from "./+types/s.$code";
import { shortenedUrls } from "@url-shortener/domain";

export function loader({ params }: Route.LoaderArgs) {
  const { code } = params;

  const url = shortenedUrls.get(code);

  if (!url) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect(url);
}
