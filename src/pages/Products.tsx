import { LoadingSpinner } from '@/components/LoadingSpinner';
import { columns } from '@/components/Tables/ProductsTable/columns';
import { DataTable } from '@/components/Tables/ProductsTable/dataTable';
import { useGetProductsQuery } from '@/redux';

export const Products = () => {
  const { data, isLoading } = useGetProductsQuery('');

  if (isLoading) return <LoadingSpinner />;

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};
