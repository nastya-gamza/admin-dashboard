import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteOrderMutation } from '@/redux';
import { Order } from '@/lib/types';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModalWindow } from '../../ModalWindow';

interface DataTableRowActionsProps<TData extends Order> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Order>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (id: number) => {
    await deleteOrder(id).unwrap();
    setShowDeleteWarning(false);
  };

  const navigate = useNavigate();

  const handleEditOrder = (id: number) => {
    navigate(`/orders/edit/${id}`);
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => handleEditOrder(row.original.id)}>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <Button variant='ghost' onClick={() => setShowDeleteWarning(true)}>
        <Trash2 size={20} strokeWidth={1.25} />
      </Button>
      {showDeleteWarning && (
        <ModalWindow
          id={row.original.id}
          handleClose={setShowDeleteWarning}
          handleDeleteRow={handleDeleteOrder}
          handleCancelDelete={handleCancelDelete}
          text='This will permanently delete selected order.'
        />
      )}
    </>
  );
}
