import { columns } from '@/components/Table/columns';
import { DataTable } from '@/components/Table/dataTable';
import { useGetCustomersQuery } from '@/redux';

export const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery('');

  if (isLoading) return <h1>Loading...</h1>;

  return <section>{data && <DataTable columns={columns} data={data} />}</section>;
};
