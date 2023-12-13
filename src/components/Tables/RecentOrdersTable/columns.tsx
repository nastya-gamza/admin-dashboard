import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/lib/types';
import { format } from 'date-fns';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => ( 
      <span>{format(new Date(row.original.date), 'dd.MM.yyyy')}</span>
    ),
  },
];
