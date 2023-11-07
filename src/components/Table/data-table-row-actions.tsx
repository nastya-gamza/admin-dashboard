import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteCustomerMutation } from '@/redux';
import { Customer } from '@/lib/types';
import { AlertDialogDemo } from './AlertDialogDemo';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleEditCustomer = (id: number, name: string, email: string, phone: string, location: string) => {
    navigate(`/customers/edit?id=${id}&name=${name}&email=${email}&phone=${phone}&location=${location}`);
  };

  return (
    <>
      <Button
        variant='ghost'
        onClick={() =>
          handleEditCustomer(
            row.original.id,
            row.original.name,
            row.original.email,
            row.original.phone,
            row.original.location,
          )
        }>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <AlertDialogDemo
        action={<Trash2 size={20} strokeWidth={1.25} />}
        onClick={() => handleDeleteCustomer(row.original.id)}
        text='This will permanently delete selected customer.'
      />
    </>
  );
}
