import { LoadingSpinner } from '@/components/LoadingSpinner';
import { columns } from '@/components/Tables/CustomersTable/columns';
import { DataTable } from '@/components/Tables/CustomersTable/dataTable';
import { useGetCustomersQuery } from '@/redux';

export const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery('');

  if (isLoading)
    return (
      <div className='fixed left-2/4 top-2/4 z-50'>
        <LoadingSpinner />
      </div>
    );

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};
