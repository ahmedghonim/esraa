import { usePathname } from "@/utils/navigation";

const useShowProductActions = () => {
  const asPath = usePathname();
  const id = asPath;

  /* ------------------------ */
  /*     get product data     */
  /* ------------------------ */

  const productData = {
    images: [
      "/show-product.png",
      "/show-product.png",
      "/intro-1.png",
      "/intro-2.png",
      "/intro-3.png",
      "/show-product.png",
      "/show-product.png",
      "/show-product.png",
      "/show-product.png",
      "/show-product.png",
      "/intro-1.png",
      "/intro-2.png",
      "/intro-3.png",
    ],
    stock: 10,
    category: "Hejab",
    name: "Hijab Glamour Modest Fashion for Modern Muslim Women",
    price: 3000,
    description:
      "Lorem ipsum dolor sit amet consectetur. Turpis nam eget nulla tincidunt maecenas nunc. Tellus montes quam ornare ac. Vitae viverra arcu ultrices donec tellus ullamcorper turpis eu volutpat. Nunc nunc consectetur blandit nunc lacus nec.Lorem ipsum dolor sit amet consectetur. Turpis nam eget nulla tincidunt maecenas nunc. Tellus montes quam ornare ac. Vitae viverra arcu ultrices donec tellus ullamcorper turpis eu volutpat. Nunc nunc consectetur blandit nunc lacus nec.Lorem ipsum dolor sit amet consectetur. Turpis nam eget nulla tincidunt maecenas nunc. Tellus montes quam ornare ac. Vitae viverra arcu ultrices donec tellus ullamcorper turpis eu volutpat. Nunc nunc consectetur blandit nunc lacus nec.",
    benefits: [
      { image: "", name: "Size & Fit" },
      { image: "", name: "Free Shipping" },
      { image: "", name: "Size & Fit" },
      { image: "", name: "Free Shipping" },
    ],
    similar_products: [],
    sizes: ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"],
    colors: ["#8434E1", "#000", "#F32840", "#F16F2B", "#345EFF", "#fff"],
  };

  return { productData };
};

export { useShowProductActions };
