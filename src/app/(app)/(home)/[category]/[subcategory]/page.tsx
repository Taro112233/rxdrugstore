import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{
    subcategory: string;
  }>
  searchParams: Promise<SearchParams>;
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    category: subcategory,
    limit: DEFAULT_LIMIT,
  }));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={subcategory} />
      </HydrationBoundary>
    </div>
  )
}

export default Page;