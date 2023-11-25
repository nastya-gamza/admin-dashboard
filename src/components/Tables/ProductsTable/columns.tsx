import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { DataTableRowActions } from './data-table-row-actions';
import { useGetProductsQuery } from '@/redux';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    header: 'Image',
    cell: ({ row }) => {
      return <img src={row.original.imgUrl} alt='Product Image' className='inline h-12' />;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'producer',
    header: 'Producer',
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    header: 'In Stoke',
    cell: ({ row }) =>
      row.original.quantity > 0 ? (
        <p className='bg-green-300 rounded-lg'>Yes</p>
      ) : (
        <p className='bg-red-300 rounded-lg'>No</p>
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const ColumnsWithImage = () => {
  const { data: products = [] } = useGetProductsQuery('');

  if (products.length > 0) {
    columns[1].cell = ({ row }) => {
      const product = products.find(p => p.id === row.original.id);
      return <img src={product!.imgUrl} alt='Product Image' className='inline h-12' />;
    };
  }

  return columns;
};
