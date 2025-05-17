import { getAllProducts } from "@/actions/product";
import ProductsList from "@/views/admin/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    search?: string;
  };
}) {
  // Parse query parameters
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 12;

  const filters = {
    search: searchParams.search,
    page,
    pageSize,
  };

  // Fetch data with filters
  const data = await getAllProducts(filters);

  // Format pagination data to match the expected structure
  const formattedPagination = {
    currentPage: data.pagination.page,
    totalPages: data.pagination.pageCount,
    pageSize: data.pagination.pageSize,
    totalItems: data.pagination.total,
  };

  return (
    <ProductsList
      data={data.products}
      initialFilters={filters}
      pagination={formattedPagination}
    />
  );
}
