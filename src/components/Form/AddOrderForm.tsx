import { useForm, FieldErrors, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { useAddOrderMutation, useGetCustomersQuery, useGetProductsQuery, useUpdateProductMutation } from '@/redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer, Product } from '@/lib/types';
import { X } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';
import DatePicker from '../DatePicker';

type FormValues = {
  product: string
  customer: string
  date: Date
  quantity: number
  status: string
}

export const AddOrderForm = () => {
  const form = useForm<FormValues>();

  const { register, handleSubmit, formState, reset, control, getValues } = form;
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [addOrder] = useAddOrderMutation();
  const [updateProduct] = useUpdateProductMutation();

  const { data: productsData } = useGetProductsQuery('');
  const { data: customersData } = useGetCustomersQuery('');

  const [selectedProduct, setSelectedProduct] = useState('');
  const getSelectedProduct = (id: string) => productsData?.find(i => i._id === id);
  const getProductQuantity = getSelectedProduct(selectedProduct)?.quantity || 0;

  const onSubmit = async (data: FormValues) => {
    await addOrder(data).unwrap();
    console.log(data);
    
    const updatedProduct = {
      id: selectedProduct,
      body: {
        ...getSelectedProduct(selectedProduct),
        quantity: getProductQuantity - Number(getValues().quantity),
      },
    };
    console.log(updatedProduct);
    await updateProduct(updatedProduct).unwrap();
    navigate('/orders');
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const formRef = useRef<HTMLFormElement>(null);

  interface ProductOption {
    readonly value: string;
    readonly label: string;
  }

  interface CustomerOption {
    readonly value: string;
    readonly label: string;
  }

  const filterProducts = (inputValue: string) => {
    if (productsData) {
      return productsData
        .filter((product: Product) =>
          product.title.toLowerCase().includes(inputValue.toLowerCase()) && product.quantity > 0,
        )
        .map((product: Product) => ({
          label: product.title,
          value: product._id,
        }));
    }
    return [];
  };

  const filterCustomers = (inputValue: string) => {
    if (customersData) {
      return customersData
        .filter((customer: Customer) =>
          customer.name.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .map((customer: Customer) => ({
          label: customer.name,
          value: customer._id,
        }));
    }
    return [];
  };

  const loadOptions = (inputValue: string, callback: (options: ProductOption[]) => void) => {
    if (productsData) {
      callback(filterProducts(inputValue));
    }
  };

  const loadOptionsCustomer = (
    inputValue: string,
    callback: (options: CustomerOption[]) => void,
  ) => {
    if (customersData) {
      callback(filterCustomers(inputValue));
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'complete', label: 'Complete' },
    { value: 'canceled', label: 'Canceled' },
  ];

  const themeColor = JSON.parse(localStorage.getItem('theme') as string);
  const selectBackgroundColor = themeColor === 'dark' ? '#1A222C' : '#fff';
  const selectBorderColor = themeColor === 'dark' ? '#1A222C' : 'rgb(226, 232, 240)';
  const selectTextColor = themeColor === 'dark' ? '#fff' : 'rgb(33, 43, 54)';

  return (
    <>
      {productsData && customersData ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-8 border dark:bg-boxdark p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
          noValidate>
          <button
            onClick={() => navigate('/orders')}
            type='button'
            className='absolute right-3 top-3'>
            <X size={20} />
          </button>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label htmlFor='date' className='text-center'>
              Date <span className='text-danger'>*</span>
            </Label>
            <Controller
              name='date'
              control={control}
              rules={{ required: 'Date is required.' }} 
              render={({ field }) => (
                <DatePicker selected={field.value} onSelect={date => field.onChange(date)} />
              )}
            />
            <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>
              {errors.date?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label className='text-center'>
              Customer <span className='text-danger'>*</span>
            </Label>
            <Controller
              control={control}
              name='customer'
              rules={{ required: 'Customer is required.' }} 
              render={({ field: { onChange, onBlur } }) => (
                <AsyncSelect
                  id='customer'
                  styles={{
                    control: baseStyles => ({
                      ...baseStyles,
                      backgroundColor: selectBackgroundColor,
                      borderColor: selectBorderColor,
                      padding: '1px',
                      boxShadow: 'none',
                      borderRadius: '6px',
                      '&:focus-within': {
                        borderColor: 'black',
                      },
                      '&:hover': {
                        borderColor: 'none',
                      },
                    }),
                    singleValue: provided => ({
                      ...provided,
                      color: selectTextColor,
                    }),
                    option: provided => ({
                      ...provided,
                      color: selectTextColor,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menu: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menuList: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                  }}
                  className='col-span-4 h-10'
                  cacheOptions
                  onChange={selectedOption => onChange(selectedOption?.label || null)}
                  onBlur={onBlur}
                  loadOptions={loadOptionsCustomer}
                  defaultOptions
                  noOptionsMessage={() => 'Customers are not found'}
                />
              )}
            />
            <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>
              {errors.customer?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label className='text-center'>
              Product <span className='text-danger'>*</span>
            </Label>
            <Controller
              control={control}
              name='product'
              rules={{ required: 'Product is required.' }} 
              render={({ field: { onChange, onBlur } }) => (
                <AsyncSelect
                  id='product'
                  styles={{
                    control: baseStyles => ({
                      ...baseStyles,
                      backgroundColor: selectBackgroundColor,
                      borderColor: selectBorderColor,
                      padding: '1px',
                      boxShadow: 'none',
                      borderRadius: '6px',
                      '&:focus-within': {
                        borderColor: 'black',
                      },
                      '&:hover': {
                        borderColor: 'none',
                      },
                    }),
                    singleValue: provided => ({
                      ...provided,
                      color: selectTextColor,
                    }),
                    option: provided => ({
                      ...provided,
                      color: selectTextColor,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menu: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menuList: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                  }}
                  className='col-span-4 h-10'
                  cacheOptions
                  onChange={selectedOption => {
                    setSelectedProduct(selectedOption?.value || '');
                    onChange(selectedOption?.label || null)
                  }}
                  onBlur={onBlur}
                  loadOptions={loadOptions}
                  defaultOptions
                  noOptionsMessage={() => 'Products are not found'}
                />
              )}
            />
            <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>
              {errors.product?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label htmlFor='quantity' className='text-center'>
              Quantity <span className='text-danger'>*</span>
            </Label>
            <Input
              type='number'
              id='quantity'
              className='col-span-4'
              {...register('quantity', {
                required: 'Quantity is required.',
                min: {
                  value: 1,
                  message: `Quantity must be greater than 1`,
                },
                max: {
                  value: getProductQuantity,
                  message: `Quantity cannot exceed ${getProductQuantity}`,
                },
                setValueAs: (value) => Number(value),
              })}
            />
            <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>
              {errors.quantity?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label htmlFor='status' className='text-center'>
              Status <span className='text-danger'>*</span>
            </Label>
            <Controller
              control={control}
              name='status'
              rules={{ required: 'Status is required.' }} 
              render={({ field: { onChange, onBlur } }) => (
                <Select
                  id='status'
                  styles={{
                    control: baseStyles => ({
                      ...baseStyles,
                      backgroundColor: selectBackgroundColor,
                      borderColor: selectBorderColor,
                      padding: '1px',
                      boxShadow: 'none',
                      borderRadius: '6px',
                      '&:focus-within': {
                        borderColor: 'black',
                      },
                      '&:hover': {
                        borderColor: 'none',
                      },
                    }),
                    singleValue: provided => ({
                      ...provided,
                      color: selectTextColor,
                    }),
                    option: provided => ({
                      ...provided,
                      color: selectTextColor,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menu: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                    menuList: provided => ({
                      ...provided,
                      backgroundColor: selectBackgroundColor,
                    }),
                  }}
                  className='col-span-4 h-10'
                  options={statusOptions}
                  onChange={selectedOption => onChange(selectedOption?.value || null)}
                  onBlur={onBlur}
                  noOptionsMessage={() => 'Statuses are not found'}
                />
              )}
            />
            <p className='absolute -bottom-5 right-1/2 -translate-x-[-50%] text-xs text-danger text-center'>
              {errors.status?.message}
            </p>
          </div>
          <Button disabled={!isDirty || isSubmitting } className='mt-4 text-white'>
            Add
          </Button>
        </form>
      ) : (
        <div className='fixed left-2/4 top-2/4 z-50'>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
