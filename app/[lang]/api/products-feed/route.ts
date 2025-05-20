// app/api/products-feed/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      ProductVariant: true,
    },
  });

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Your Store</title>
    <link>https://esramodestwear.com</link>
    <description>Product Feed</description>
    ${products
      .map((product) => {
        const description = product.description
          ? product.description
              .replace(/<[^>]*>?/gm, "")
              .replace(/&nbsp;/g, " ")
              .replace(/&/g, "&amp;")
          : "";
        return `
      <item>
        <g:id>${product.id}</g:id>
        <g:title>${product.name
          .replace(/<[^>]*>?/gm, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&/g, "&amp;")}</g:title>
        <g:description>${description}</g:description>
        <g:link>https://esramodestwear.com/products/${product.slug}</g:link>
        <g:image_link>${product.images[0]}</g:image_link>
        <g:price>${product.price} EGP</g:price>
        <g:availability>${
          product.ProductVariant.length > 0 ? "in stock" : "out of stock"
        }</g:availability>
        <g:condition>new</g:condition>
      </item>
    `;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
