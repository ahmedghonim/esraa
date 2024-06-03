"use client";
import React from "react";
import Header from "./header";
import Footer from "./footer";
import SideMenu from "./side-menu";

import AuthLayout from "./auth-layout";
import AdminLayout from "./admin-layout";
import { usePathname } from "@/utils/navigation";

const authRoutes = ["/sign-in"];

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
        <main>
          <div className="lg:px-[118px] px-6 lg:py-[56px]">
            <Header />

            {isHomePage && <SideMenu />}

            {children}
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}
