export type PathParams = Record<string, string>;

function split(path: string): string[] {
  return path.split("/").filter(Boolean);
}

/** matchPath("/b/:boardId", "/b/1") → { boardId: "1" }, không khớp → null */
export function matchPath(
  pattern: string,
  pathname: string,
): PathParams | null {
  const patternParts = split(pattern);
  const pathParts = split(pathname);
  if (patternParts.length !== pathParts.length) return null;

  const params: PathParams = {};
  for (const [index, part] of patternParts.entries()) {
    const value = pathParts[index];
    if (part.startsWith(":")) {
      params[part.slice(1)] = value;
    } else if (part !== value) {
      return null;
    }
  }
  return params;
}
