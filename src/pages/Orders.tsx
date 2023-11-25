import { LoadingSpinner } from '@/components/LoadingSpinner';
import { columns } from '@/components/Tables/OrdersTable/columns';
import { DataTable } from '@/components/Tables/OrdersTable/dataTable';
import { useGetOrdersQuery } from '@/redux';

export const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery('');

  if (isLoading) return <LoadingSpinner />;

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};

 