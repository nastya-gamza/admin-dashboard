import { AddCustomerForm } from '@/components/Form/AddCustomerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center h-full gap-20'>
      <AddCustomerForm />
      <Button className='text-white self-start' onClick={() => navigate(-1)}>
        <ArrowLeft size={20} className='mr-2' /> Back
      </Button>
    </div>
  );
};
export default CreateCustomer;
