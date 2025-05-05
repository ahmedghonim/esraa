"use client";

import { Link, usePathname } from "@/utils/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items = [], className = "" }: BreadcrumbProps) {
  const t = useTranslations("common");
  const pathname = usePathname();

  // Auto-generate breadcrumbs if not provided
  const breadcrumbs = items.length ? items : generateBreadcrumbs(pathname, t);

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1 text-sm text-primary-100">
        <li>
          <Link href="/" className="hover:underline">
            {t("home")}
          </Link>
        </li>

        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="size-3 mx-1" />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to auto-generate breadcrumbs from URL
function generateBreadcrumbs(pathname: string, t: any): BreadcrumbItem[] {
  if (pathname === "/") return [];

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let path = "";
  segments.forEach((segment, index) => {
    path += `/${segment}`;

    // Handle special cases
    if (segment === "products" && segments.length === 1) {
      breadcrumbs.push({
        label: t("products"),
        href: path,
      });
    } else if (segments[index - 1] === "products" && !isNaN(Number(segment))) {
      // If this is a product ID, we'll label it as "Product Details"
      breadcrumbs.push({
        label: t("product_details"),
        href: path,
      });
    } else if (segment === "cart") {
      breadcrumbs.push({
        label: t("cart"),
        href: path,
      });
    } else if (segment === "dashboard") {
      breadcrumbs.push({
        label: t("dashboard"),
        href: path,
      });
    } else if (segment === "contact-us") {
      breadcrumbs.push({
        label: t("contact_us"),
        href: path,
      });
    } else {
      // Default case - use the segment itself as the label
      breadcrumbs.push({
        label:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: path,
      });
    }
  });

  return breadcrumbs;
}
