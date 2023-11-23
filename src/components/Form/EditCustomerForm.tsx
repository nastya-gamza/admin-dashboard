import { useForm, FieldErrors } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCustomersQuery, useUpdateCustomerMutation } from '@/redux';
import { useEffect, useRef } from 'react';
import { TCustomerSchema, customerSchema } from '@/lib/types';
import { X } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export const EditCustomerForm = () => {
  const { id } = useParams();
  const { data } = useGetCustomersQuery('');
  const currentCustomer = data?.filter(i => i.id === Number(id))[0];

  const form = useForm<TCustomerSchema>({
    defaultValues: {
      name: currentCustomer?.name,
      email: currentCustomer?.email,
      phone: currentCustomer?.phone,
      location: currentCustomer?.location,
    },
    resolver: zodResolver(customerSchema),
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isValid, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit = async () => {
    const updatedCustomer = {
      id,
      body: {
        name: getValues().name,
        email: getValues().email,
        phone: getValues().phone,
        location: getValues().location,
      },
    };

    await updateCustomer(updatedCustomer).unwrap();
    navigate('/customers');
  };

  const onError = (errors: FieldErrors<TCustomerSchema>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const formRef = useRef<HTMLFormElement>(null);
  
  useClickOutside(formRef, () => {
    navigate('/customers');
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit, onError)}
      className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
      noValidate>
      <button
        onClick={() => navigate('/customers')}
        type='button'
        className='absolute right-3 top-3'>
        <X size={20} />
      </button>
      <div className='grid grid-cols-5 items-center gap-2'>
        <Label htmlFor='name' className='text-center'>
          Name <span className='text-danger'>*</span>
        </Label>
        <Input id='name' className='col-span-4' {...register('name')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.name?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='email' className='text-center'>
          Email <span className='text-danger'>*</span>
        </Label>
        <Input type='email' id='email' className='col-span-4' {...register('email')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.email?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='phone' className='text-center'>
          Phone <span className='text-danger'>*</span>
        </Label>
        <Input id='phone' className='col-span-4' {...register('phone')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.phone?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='location' className='text-center'>
          Location <span className='text-danger'>*</span>
        </Label>
        <Input id='location' className='col-span-4' {...register('location')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.location?.message}</p>
      </div>
      <Button disabled={!isValid || isSubmitting} className='mt-4 text-white'>
        Edit
      </Button>
    </form>
  );
};
