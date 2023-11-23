import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteCustomerMutation } from '@/redux';
import { Customer } from '@/lib/types';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModalWindow } from '../ModalWindow';

interface DataTableRowActionsProps<TData extends Customer> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Customer>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDeleteCustomer = async (id: number) => {
    await deleteCustomer(id).unwrap();
    setShowDeleteWarning(false);
  };

  const navigate = useNavigate();

  const handleEditCustomer = (id: number) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => handleEditCustomer(row.original.id)}>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <Button variant='ghost' onClick={() => setShowDeleteWarning(true)}>
        <Trash2 size={20} strokeWidth={1.25} />
      </Button>
      {showDeleteWarning && (
        <ModalWindow
          id={row.original.id}
          handleClose={setShowDeleteWarning}
          handleDeleteRow={handleDeleteCustomer}
          handleCancelDelete={handleCancelDelete}
          text='This will permanently delete selected customer.'
        />
      )}
    </>
  );
}
