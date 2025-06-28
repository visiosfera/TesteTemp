import type { MiddlewareHandler } from "astro";

const publicRoutes = [
  {
    path: "/",
    whenAuthenticated: "next",
  },
  {
    path: "/login",
    whenAuthenticated: "redirect",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

function normalizePath(path: string): string {
  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const rawPathname = url.pathname;
  const pathname = normalizePath(rawPathname);

  // Busca rota pública correspondente
  const publicRoute = publicRoutes.find((route) => route.path === pathname);

  // Usuário da sessão
  const recruiter = await context.session?.get("user");

  // Usuário não autenticado acessando rota pública: deixa passar
  if (!recruiter && publicRoute) {
    return next();
  }

  // Usuário não autenticado acessando rota protegida: redireciona para login
  if (!recruiter && !publicRoute) {
    return context.rewrite(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE);
  }

  // Usuário autenticado acessando rota pública com comportamento 'redirect': redireciona para dashboard
  if (
    recruiter &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    return context.rewrite("/dashboard");
  }

  // Usuário autenticado acessando rota protegida ou rota pública com 'next': deixa passar
  if (recruiter) {
    return next();
  }

  return next();
};
