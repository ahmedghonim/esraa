import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all products
    const products = await prisma.product.findMany({
      select: {
        slug: true,
      },
    });

    // Base URLs and static routes with both language versions
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.esramodestwear.com";
    const staticRoutes = [
      { path: "", priority: "1.0", changefreq: "daily" },
      { path: "products", priority: "0.9", changefreq: "daily" },
      { path: "cart", priority: "0.8", changefreq: "daily" },
      { path: "contact-us", priority: "0.7", changefreq: "monthly" },
      { path: "terms-and-policy", priority: "0.5", changefreq: "monthly" },
    ];

    // Create XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Add static routes
    staticRoutes.forEach((route) => {
      // Arabic version
      xml += "  <url>\n";
      xml += `    <loc>${baseUrl}/${route.path}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/${route.path}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${route.path}" />\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += "  </url>\n";

      // English version
      xml += "  <url>\n";
      xml += `    <loc>${baseUrl}/en/${route.path}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/${route.path}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${route.path}" />\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += "  </url>\n";
    });

    // Add product pages
    products.forEach((product) => {
      if (product.slug) {
        // Arabic version
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}/products/${product.slug}</loc>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/products/${product.slug}" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/products/${product.slug}" />\n`;
        xml += "    <changefreq>weekly</changefreq>\n";
        xml += "    <priority>0.8</priority>\n";
        xml += "  </url>\n";

        // English version
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}/en/products/${product.slug}</loc>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/products/${product.slug}" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/products/${product.slug}" />\n`;
        xml += "    <changefreq>weekly</changefreq>\n";
        xml += "    <priority>0.8</priority>\n";
        xml += "  </url>\n";
      }
    });

    xml += "</urlset>";

    // Return XML response
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
