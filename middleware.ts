import { auth } from "./auth";
import { localePrefix } from "./utils/navigation";
import { locales } from "./i18n";
import createIntlMiddleware from "next-intl/middleware";
import {
  authRoutes,
  DEFAULT_LOGIN_PAGE,
  DEFAULT_LOGIN_REDIRECT,
} from "./auth/routes";

export default auth((request) => {
  const { nextUrl } = request;
  const isLogin = !!request.auth;
  const lang = nextUrl.pathname.split("/")[1];
  request.headers.set("x-url-lang", lang);

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: "ar",
    localePrefix,
    locales,
    alternateLinks: false,
  });

  const baseUrl = nextUrl.pathname.replace("/en", "");

  const isProtectedRoute = /^\/dashboard(?:\/|$)/.test(baseUrl);

  const isAuthRoute = authRoutes.includes(baseUrl);

  const response = handleI18nRouting(request);

  if (isAuthRoute) {
    if (isLogin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
    }
    return response;
  }

  if (!isLogin && isProtectedRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl.origin));
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
