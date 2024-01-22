import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteCustomerMutation } from '@/redux';
import { Customer } from '@/lib/types';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalConfirm from '@/components/ModalConfirm';

interface DataTableRowActionsProps<TData extends Customer> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Customer>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDeleteCustomer = async (id: string) => {
    await deleteCustomer(id).unwrap();
    setShowDeleteWarning(false);
  };

  const navigate = useNavigate();

  const handleEditCustomer = (id: string) => {
    navigate(`/customers/edit/${id}`);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => handleEditCustomer(row.original._id)}>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <Button variant='ghost' onClick={() => setShowDeleteWarning(true)}>
        <Trash2 size={20} strokeWidth={1.25} />
      </Button>
      <ModalConfirm
        isOpen={showDeleteWarning}
        setIsOpen={setShowDeleteWarning}
        proceed={() => handleDeleteCustomer(row.original._id)}
        text='This will permanently delete selected customer.'
      />
    </>
  );
}
