import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/types';
import { DataTableRowActions } from './data-table-row-actions';
import { format } from 'date-fns';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: '_id',
    header: 'Id',
  },
  {
    accessorKey: 'product',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Product
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Customer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-[16px]'>
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => ( 
      <span>{format(new Date(row.original.date), 'dd.MM.yyyy')}</span>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
    row.original.status === 'pending' ? (
      <span className='inline-block rounded  py-1 px-3 font-medium text-meta-6 bg-meta-6/[0.08] '>
        Pending
      </span>
    ) : row.original.status === 'complete' ? (
      <span className='inline-block rounded  py-1 px-3 font-medium text-meta-3 bg-meta-3/[0.08] '>
        Completed
      </span>
    ) : (
      <span className='inline-block rounded  py-1 px-3 font-medium text-meta-1 bg-meta-1/[0.08] '>
        Cancelled
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
