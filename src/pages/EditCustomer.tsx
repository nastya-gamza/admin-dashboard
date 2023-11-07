import { EditCustomerForm } from '@/components/Form/EditCustomerForm';
import { useSearchParams } from 'react-router-dom';

export const EditCustomer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name')!;
  const email = searchParams.get('email')!;
  const phone = searchParams.get('phone')!;
  const location = searchParams.get('location')!;
  return (
    <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'>
      <EditCustomerForm id={Number(id)} name={name} email={email} phone={phone} location={location} />
    </div>
  );
};
