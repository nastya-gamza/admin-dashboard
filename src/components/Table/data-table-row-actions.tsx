import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteCustomerMutation } from '@/redux';
import { Customer } from '@/lib/types';
import { PopupWindow } from '../PopupWindow';
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

  const handleEditCustomer = (id: number) => {
    navigate(`/customers/edit/${id}`);
  };

  return (
    <>
      <Button
        variant='ghost'
        onClick={() =>
          handleEditCustomer(
            row.original.id,
          )
        }>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <PopupWindow
        action={<Trash2 size={20} strokeWidth={1.25} />}
        onClick={() => handleDeleteCustomer(row.original.id)}
        text='This will permanently delete selected customer.'
      />
    </>
  );
}
