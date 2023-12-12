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
    header: 'Date',
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
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
