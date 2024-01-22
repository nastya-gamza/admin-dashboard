import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface ModalConfirmProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  proceed: () => void;
  text: string;
}

const ModalConfirm = ({ isOpen, setIsOpen, proceed, text }: ModalConfirmProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isOpen ? modalRef.current?.showModal() : modalRef.current?.close();
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsOpen(false);
    }
  };

  return (
    <dialog ref={modalRef} onClick={() => setIsOpen(false)}>
      <div
        onClick={e => e.stopPropagation()}
        className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-3 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full text-left'>
        <h3 className='text-lg font-semibold'>Are you absolutely sure?</h3>
        <p className='text-sm text-muted-foreground'>{text}</p>
        <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
          <Button onClick={() => handleClose()} className='bg-background border border-input'>
            Cancel
          </Button>
          <Button className='text-white' onClick={proceed}>
            Continue
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
