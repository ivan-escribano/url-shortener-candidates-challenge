import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index/route.tsx"),
  route("s/:code", "routes/s.$code/route.tsx"),
] satisfies RouteConfig;
