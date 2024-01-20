import { LoadingSpinner } from '@/components/LoadingSpinner';
import { columns } from '@/components/Tables/OrdersTable/columns';
import { DataTable } from '@/components/Tables/OrdersTable/dataTable';
import { useGetOrdersQuery } from '@/redux';

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery('');

  if (isLoading)
    return (
      <div className='fixed left-2/4 top-2/4 z-50'>
        <LoadingSpinner />
      </div>
    );

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};

export default Orders;
