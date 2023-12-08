import { useForm, FieldErrors, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCustomersQuery, useUpdateCustomerMutation, useGetCountriesQuery } from '@/redux';
import { useEffect, useRef } from 'react';
import { Country, TCustomerSchema, customerSchema } from '@/lib/types';
import { X } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export const EditCustomerForm = () => {
  const { id } = useParams();
  const { data } = useGetCustomersQuery('');
  const currentCustomer = data?.filter(i => i._id === id)[0];

  const form = useForm<TCustomerSchema>({
    defaultValues: {
      name: currentCustomer?.name,
      email: currentCustomer?.email,
      phone: Number(currentCustomer?.phone),
    },
    resolver: zodResolver(customerSchema),
  });

  const { register, handleSubmit, formState, reset, getValues, control } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit = async () => {
    const updatedCustomer = {
      id,
      body: {
        name: getValues().name,
        email: getValues().email,
        phone: Number(getValues().phone),
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

  const { data: countriesData } = useGetCountriesQuery('');

  interface CountryOption {
    readonly value: string;
    readonly label: string;
  }

  const filterCountries = (inputValue: string) => {
    if (countriesData) {
      return countriesData
        .filter((country: Country) => country.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map((country: Country) => ({
          label: country.name,
          value: country.name,
        }));
    }
    return [];
  };

  const loadOptions = (inputValue: string, callback: (options: CountryOption[]) => void) => {
    if (countriesData) {
      callback(filterCountries(inputValue));
    }
  };

  return (
    <>
      {countriesData ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-8 border bg-background p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
          noValidate>
          <button
            onClick={() => navigate('/customers')}
            type='button'
            className='absolute right-3 top-3'>
            <X size={20} />
          </button>
          <div className='relative grid grid-cols-5 items-center gap-2'>
            <Label htmlFor='name' className='text-center'>
              Name <span className='text-danger'>*</span>
            </Label>
            <Input id='name' className='col-span-4' {...register('name')} />
            <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
              {errors.name?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label htmlFor='email' className='text-center'>
              Email <span className='text-danger'>*</span>
            </Label>
            <Input type='email' id='email' className='col-span-4' {...register('email')} />
            <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
              {errors.email?.message}
            </p>
          </div>
          <div className='relative grid grid-cols-5 items-center gap-4'>
            <Label htmlFor='phone' className='text-center'>
              Phone <span className='text-danger'>*</span>
            </Label>
            <Input id='phone' className='col-span-4' {...register('phone')} />
            <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
              {errors.phone?.message}
            </p>
          </div>
          <div className='grid grid-cols-5 items-center gap-4'>
            <Label className='text-center'>Location</Label>
            <Controller
              control={control}
              name='location'
              shouldUnregister={false}
              defaultValue={currentCustomer?.location}
              render={({ field: { onChange, onBlur } }) => (
                <AsyncSelect
                  id='location'
                  styles={{
                    control: baseStyles => ({
                      ...baseStyles,
                      borderColor: 'rgb(226, 232, 240)',
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
                  }}
                  className='col-span-4 h-10'
                  cacheOptions
                  onChange={selectedOption => onChange(selectedOption?.value || null)}
                  onBlur={onBlur}
                  loadOptions={loadOptions}
                  defaultOptions
                  defaultValue={{
                    label: currentCustomer?.location,
                    value: currentCustomer?.location,
                  }}
                  noOptionsMessage={() => 'Location is not found'}
                />
              )}
            />
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
