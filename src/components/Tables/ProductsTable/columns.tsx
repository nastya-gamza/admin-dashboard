import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { DataTableRowActions } from './data-table-row-actions';
// import { useGetProductsQuery } from '@/redux';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Quantity
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    header: 'In Stoke',
    cell: ({ row }) =>
      row.original.quantity > 0 ? (
        <span className='inline-block rounded  py-1 px-3 font-medium text-meta-3 bg-meta-3/[0.08] '>
          Yes
        </span>
      ) : (
        <span className='inline-block rounded  py-1 px-3 font-medium text-meta-1 bg-meta-1/[0.08] '>
          No
        </span>
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
