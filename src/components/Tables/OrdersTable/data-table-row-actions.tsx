import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteOrderMutation } from '@/redux';
import { Order } from '@/lib/types';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalConfirm from '@/components/ModalConfirm';

interface DataTableRowActionsProps<TData extends Order> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Order>({ row }: DataTableRowActionsProps<TData>) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id).unwrap();
    setShowDeleteWarning(false);
  };

  const navigate = useNavigate();

  const handleEditOrder = (id: string) => {
    navigate(`/orders/edit/${id}`);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => handleEditOrder(row.original._id)}>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <Button variant='ghost' onClick={() => setShowDeleteWarning(true)}>
        <Trash2 size={20} strokeWidth={1.25} />
      </Button>
      <ModalConfirm
        isOpen={showDeleteWarning}
        setIsOpen={setShowDeleteWarning}
        proceed={() => handleDeleteOrder(row.original._id)}
        text='This will permanently delete selected order.'
      />
    </>
  );
}
