import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { useAddCustomerMutation } from '@/redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCustomerSchema, customerSchema } from '@/lib/types';

export const AddCustomerForm = () => {
  const form = useForm<TCustomerSchema>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    resolver: zodResolver(customerSchema),
    mode: 'onTouched'
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [addCustomer] = useAddCustomerMutation();

  const onSubmit = async (data: TCustomerSchema) => {
    await addCustomer(data).unwrap();
    navigate('/customers')
  };

  const onError = (errors: FieldErrors<TCustomerSchema>) => {
    console.log(errors)
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset])
  

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full' noValidate>
        <div className='grid grid-cols-5 items-center gap-2'>
          <Label htmlFor='name' className='text-center'>Name:</Label>
          <Input id='name' className="col-span-4" {...register('name')} />
          <p className="text-xs text-danger col-span-5 text-center">{errors.name?.message}</p>
        </div>
        <div className='grid grid-cols-5 items-center gap-4'>
          <Label htmlFor='email' className='text-center'>Email:</Label>
          <Input type='email' id='email' className="col-span-4" {...register('email')} />
          <p className="text-xs text-danger col-span-5 text-center">{errors.email?.message}</p>
        </div>
        <div className='grid grid-cols-5 items-center gap-4'>
          <Label htmlFor='phone' className='text-center'>Phone:</Label>
          <Input id='phone' className="col-span-4" {...register('phone')} />
          <p className="text-xs text-danger col-span-5 text-center">{errors.phone?.message}</p>
        </div>
        <div className='grid grid-cols-5 items-center gap-4'>
          <Label htmlFor='location' className='text-center'>Location:</Label>
          <Input id='location' className="col-span-4" {...register('location')} />
          <p className="text-xs text-danger col-span-5 text-center">{errors.location?.message}</p>
        </div>
        <Button disabled={!isDirty || !isValid || isSubmitting} className='mt-4 text-white'>Add</Button>
      </form>
  );
};
