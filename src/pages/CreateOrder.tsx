import { AddOrderForm } from '@/components/Form/AddOrderForm';

export const CreateOrder = () => {
  return (
    <div className='fixed inset-0 z-50 bg-background/50 backdrop-blur-sm'>
      <AddOrderForm />
    </div>
  );
};
