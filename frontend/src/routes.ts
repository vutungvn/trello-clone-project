import type { ComponentType } from "react";
import { matchPath, type PathParams } from "@/lib/match-path";
import { BoardPage } from "@/pages/BoardPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";

export interface PageProps {
  params: PathParams;
}

interface Route {
  path: string;
  page: ComponentType<PageProps>;
}

const routes: Route[] = [
  { path: "/login", page: LoginPage },
  { path: "/register", page: RegisterPage },
  { path: "/b/:boardId", page: BoardPage },
];

interface RouteMatch {
  page: ComponentType<PageProps>;
  params: PathParams;
}

export function resolveRoute(pathname: string): RouteMatch | null {
  for (const route of routes) {
    const params = matchPath(route.path, pathname);
    if (params) return { page: route.page, params };
  }
  return null;
}
