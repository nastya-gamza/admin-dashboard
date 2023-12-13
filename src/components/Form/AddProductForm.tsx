import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { useAddProductMutation } from '@/redux';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TProductSchema, productSchema } from '@/lib/types';
import { X } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export const AddProductForm = () => {
  const form = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [addProduct] = useAddProductMutation();

  const onSubmit = async (data: TProductSchema) => {
    await addProduct(data).unwrap();
    navigate('/products');
  };

  const onError = (errors: FieldErrors<TProductSchema>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const formRef = useRef<HTMLFormElement>(null);
  
  useClickOutside(formRef, () => {
    navigate('/products');
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit, onError)}
      className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 border dark:bg-boxdark p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
      noValidate>
      <button
        onClick={() => navigate('/products')}
        type='button'
        className='absolute right-3 top-3'>
        <X size={20} />
      </button>
      <div className='relative grid grid-cols-5 items-center gap-2'>
        <Label htmlFor='title' className='text-center'>
          Title <span className='text-danger'>*</span>
        </Label>
        <Input id='title' className='col-span-4' {...register('title')} />
        <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>{errors.title?.message}</p>
      </div>
      <div className='relative grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='quantity' className='text-center'>
          Quantity <span className='text-danger'>*</span>
        </Label>
        <Input type='email' id='quantity' className='col-span-4' {...register('quantity', {valueAsNumber: true})} />
        <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>{errors.quantity?.message}</p>
      </div>
      <div className='relative grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='price' className='text-center'>
          Price <span className='text-danger'>*</span>
        </Label>
        <Input id='price' className='col-span-4' {...register('price', {valueAsNumber: true})} />
        <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>{errors.price?.message}</p>
      </div>
      <div className='relative grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='producer' className='text-center'>
            Producer <span className='text-danger'>*</span>
        </Label>
        <Input id='producer' className='col-span-4' {...register('producer')} />
        <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>{errors.producer?.message}</p>
      </div>
      <div className='relative grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='color' className='text-center'>
          Color <span className='text-danger'>*</span>
        </Label>
        <Input id='color' className='col-span-4' {...register('color')} />
        <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>{errors.color?.message}</p>
      </div>
      <Button disabled={!isDirty || !isValid || isSubmitting} className='mt-4 text-white'>
        Add
      </Button>
    </form>
  );
};
