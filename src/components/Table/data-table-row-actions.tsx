import { Row } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useDeleteCustomerMutation } from '@/redux';
import { Customer } from '@/types';
import { AlertDialogDemo } from './AlertDialogDemo';

interface DataTableRowActionsProps<TData extends Customer> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Customer>({
  row,
}: DataTableRowActionsProps<TData>) {
  
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDeleteCustomer = async (id: number) => {
    await deleteCustomer(id).unwrap();
  };

  return (
    <AlertDialogDemo
      action={<Trash2 />}
      onClick={() => handleDeleteCustomer(row.original.id)}
      text='This will permanently delete selected customer.'
    />
  );
}
