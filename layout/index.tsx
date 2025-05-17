"use client";
import { usePathname } from "@/utils/navigation";
import React from "react";
import AdminLayout from "./admin-layout";
import AuthLayout from "./auth-layout";
import Footer from "./footer";
import Header from "./header";
import SideMenu from "./side-menu";

const authRoutes = ["/sign-in", "/sign-up", "/forget-password"];

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const asPath = usePathname();
  const isHomePage = asPath === "/";

  const isAdminRoute = asPath.split("/").includes("dashboard");

  const isAuthRoute = authRoutes.includes(asPath);
  return (
    <>
      {/* admin layout */}
      {isAdminRoute && <AdminLayout>{children}</AdminLayout>}

      {/* auth layout */}
      {isAuthRoute && <AuthLayout>{children}</AuthLayout>}
      {/* public layout */}
      {!isAdminRoute && !isAuthRoute && (
        <main className="lg:px-[118px] relative w-screen px-4">
          <Header />

          {isHomePage && <SideMenu />}
          <div className="px-2">{children}</div>

          <Footer />
        </main>
      )}
    </>
  );
}
