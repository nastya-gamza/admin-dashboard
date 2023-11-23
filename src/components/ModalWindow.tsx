import { useRef } from 'react';
import { Button } from './ui/button';
import { useClickOutside } from '@/hooks/useClickOutside';

interface ModalWindow {
  handleClose: (value: React.SetStateAction<boolean>) => void;
  handleDelete?: () => void;
  handleDeleteRow?: (id: number) => void;
  handleCancelDelete: () => void;
  text: string;
  id?: number; 
}

export const ModalWindow = ({ text, handleDelete, handleCancelDelete, handleClose, handleDeleteRow, id }: ModalWindow) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => handleClose(false));

  const continueHandler = () => {
    if (id && handleDeleteRow) {
      handleDeleteRow(id);
    } 
    
    if (handleDelete) {
      handleDelete();
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-background/50 backdrop-blur-sm'>
      <div ref={modalRef} className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-3 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full'>
        <h3 className='text-lg font-semibold'>Are you absolutely sure?</h3>
        <p className='text-sm text-muted-foreground'>{text}</p>
        <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
          <Button
            onClick={handleCancelDelete}
            className='bg-background border border-input'>
            Cancel
          </Button>
          <Button onClick={continueHandler}>Continue</Button>
        </div>
      </div>
    </div>
  );
};
