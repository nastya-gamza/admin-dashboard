import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/types';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'product',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Customer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
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
