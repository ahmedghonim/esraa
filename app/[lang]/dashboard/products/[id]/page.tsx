import { getAllCategories } from "@/actions/category";
import { getAllCollections } from "@/actions/collection";
import { getAllColors } from "@/actions/color";
import { getAllProducts, getProductById } from "@/actions/product";
import { getAllSizes } from "@/actions/size";
import ProductForm from "@/views/forms/product-form";

async function Page({ params: { id } }: { params: { id: string } }) {
  let values: any = {};

  try {
    if (id !== "add") {
      values = await getProductById(+id);
    }

    const productsData = await getAllProducts({
      pageSize: 1000,
    });
    const color = await getAllColors();
    const category = await getAllCategories({});
    const collection = await getAllCollections();
    const sizes = await getAllSizes();

    return (
      <ProductForm
        values={values}
        color={color}
        category={category}
        sizes={sizes}
        products={productsData.products as any}
        collection={collection}
      />
    );
  } catch (error) {
    console.error("Error loading product data:", error);
    // You could return an error component here
    return <div>Error loading product data. Please try again later.</div>;
  }
}

export default Page;
