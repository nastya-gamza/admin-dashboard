import { LoadingSpinner } from '@/components/LoadingSpinner';
import { columns } from '@/components/Tables/ProductsTable/columns';
import { DataTable } from '@/components/Tables/ProductsTable/dataTable';
import { useGetProductsQuery } from '@/redux';

export const Products = () => {
  const { data, isLoading } = useGetProductsQuery('');

  if (isLoading)
    return (
      <div className='fixed left-2/4 top-2/4 z-50'>
        <LoadingSpinner />
      </div>
    );

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};
