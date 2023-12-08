import { useForm, FieldErrors } from 'react-hook-form';
// import AsyncSelect from 'react-select/async';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetProductsQuery, useUpdateProductMutation } from '@/redux';
import { useEffect, useRef } from 'react';
import { TProductSchema, productSchema } from '@/lib/types';
import { X } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export const EditProductForm = () => {
  const { id } = useParams();
  const { data } = useGetProductsQuery('');
  const currentProduct = data?.filter(i => i._id === id)[0];

  const form = useForm<TProductSchema>({
    defaultValues: {
      title: currentProduct?.title,
      quantity: Number(currentProduct?.quantity),
      price: Number(currentProduct?.price),
      color: currentProduct?.color,
      producer: currentProduct?.producer,
    },
    resolver: zodResolver(productSchema),
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = async () => {
    const updatedProduct = {
      id,
      body: {
        title: getValues().title,
        quantity: Number(getValues().quantity),
        price: Number(getValues().price),
        color: getValues().color,
        producer: getValues().producer,
      },
    };

    await updateProduct(updatedProduct).unwrap();
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

  const { data: countriesData } = useGetProductsQuery('');

  // interface CountryOption {
  //   readonly value: string;
  //   readonly label: string;
  // }

  // const filterCountries = (inputValue: string) => {
  //   if (countriesData) {
  //     return countriesData
  //       .filter((country: Country) => country.name.toLowerCase().includes(inputValue.toLowerCase()))
  //       .map((country: Country) => ({
  //         label: country.name,
  //         value: country.name,
  //       }));
  //   }
  //   return [];
  // };

  // const loadOptions = (inputValue: string, callback: (options: CountryOption[]) => void) => {
  //   if (countriesData) {
  //     callback(filterCountries(inputValue));
  //   }
  // };

  return (
    <>
      {countriesData ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-8 border bg-background p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
          noValidate>
          <button
            onClick={() => navigate('/products')}
            type='button'
            className='absolute right-3 top-3'>
            <X size={20} />
          </button>
          <div className='grid grid-cols-5 items-center gap-2'>
        <Label htmlFor='title' className='text-center'>
          Title <span className='text-danger'>*</span>
        </Label>
        <Input id='title' className='col-span-4' {...register('title')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.title?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='quantity' className='text-center'>
          Quantity <span className='text-danger'>*</span>
        </Label>
        <Input type='email' id='quantity' className='col-span-4' {...register('quantity')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.quantity?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='price' className='text-center'>
          Price <span className='text-danger'>*</span>
        </Label>
        <Input id='price' className='col-span-4' {...register('price')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.price?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='producer' className='text-center'>
            Producer <span className='text-danger'>*</span>
        </Label>
        <Input id='producer' className='col-span-4' {...register('producer')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.producer?.message}</p>
      </div>
      <div className='grid grid-cols-5 items-center gap-4'>
        <Label htmlFor='color' className='text-center'>
          Color <span className='text-danger'>*</span>
        </Label>
        <Input id='color' className='col-span-4' {...register('color')} />
        <p className='text-xs text-danger col-span-5 text-center'>{errors.color?.message}</p>
      </div>
          <Button disabled={isSubmitting} className='mt-4 text-white'>
            Edit
          </Button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
