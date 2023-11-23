import { AddCustomerForm } from '@/components/Form/AddCustomerForm';

export const CreateCustomer = () => {
  return (
    <div className='fixed inset-0 z-50 bg-background/50 backdrop-blur-sm'>
      <AddCustomerForm />
    </div>
  );
};
