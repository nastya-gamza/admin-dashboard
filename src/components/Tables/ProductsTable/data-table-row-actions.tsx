import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteProductMutation } from '@/redux';
import { Product } from '@/lib/types';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalConfirm from '@/components/ModalConfirm';

interface DataTableRowActionsProps<TData extends Product> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Product>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
    setShowDeleteWarning(false);
  };

  const navigate = useNavigate();

  const handleEditProduct = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => handleEditProduct(row.original._id)}>
        <Pencil size={20} strokeWidth={1.25} />
      </Button>
      <Button variant='ghost' onClick={() => setShowDeleteWarning(true)}>
        <Trash2 size={20} strokeWidth={1.25} />
      </Button>
      <ModalConfirm
        isOpen={showDeleteWarning}
        setIsOpen={setShowDeleteWarning}
        proceed={() => handleDeleteProduct(row.original._id)}
        text='This will permanently delete selected product.'
      />
    </>
  );
}
