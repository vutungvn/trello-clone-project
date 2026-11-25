import type { ComponentType } from "react";
import { matchPath, type PathParams } from "@/lib/match-path";
import { BoardPage } from "@/pages/BoardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { WorkspaceBoardsPage } from "@/pages/WorkspaceBoardsPage";
import { WorkspaceMembersPage } from "@/pages/WorkspaceMembersPage";
import { WorkspaceSettingsPage } from "@/pages/WorkspaceSettingsPage";

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
  { path: "/", page: HomePage },
  { path: "/profile", page: ProfilePage },
  { path: "/w/:workspaceId", page: WorkspaceBoardsPage },
  { path: "/w/:workspaceId/members", page: WorkspaceMembersPage },
  { path: "/w/:workspaceId/settings", page: WorkspaceSettingsPage },
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
