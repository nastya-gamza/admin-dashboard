import { useEffect, useRef } from 'react';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCustomerMutation } from '@/redux';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Country, TCustomerSchema, customerSchema } from '@/lib/types';
import { useGetCountriesQuery } from '@/redux/countriesApi';
import { LoadingSpinner } from '../LoadingSpinner';
import { useThemeContext } from '@/context/theme/useThemeContext';

export const AddCustomerForm = () => {
  const form = useForm<TCustomerSchema>({
    resolver: zodResolver(customerSchema),
  });

  const { register, handleSubmit, formState, reset, control } = form;
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const navigate = useNavigate();

  const [addCustomer] = useAddCustomerMutation();

  const onSubmit = async (data: TCustomerSchema) => {
    await addCustomer(data).unwrap();
    navigate('/customers');
  };

  const onError = (errors: FieldErrors<TCustomerSchema>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const formRef = useRef<HTMLFormElement>(null);

  const { data } = useGetCountriesQuery('');

  interface CountryOption {
    readonly value: string;
    readonly label: string;
  }

  const filterCountries = (inputValue: string) => {
    if (data) {
      return data
        .filter((country: Country) => country.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map((country: Country) => ({
          label: country.name,
          value: country.name,
        }));
    }
    return [];
  };

  const loadOptions = (inputValue: string, callback: (options: CountryOption[]) => void) => {
    if (data) {
      callback(filterCountries(inputValue));
    }
  };
  const { theme: themeColor } = useThemeContext();
  const selectBackgroundColor = themeColor === 'dark' ? '#1A222C' : '#F1F5F9';
  const selectBorderColor = themeColor === 'dark' ? '#1A222C' : 'rgb(226, 232, 240)';
  const selectTextColor = themeColor === 'dark' ? '#fff' : 'rgb(33, 43, 54)';

  return (
    <>
      {data ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className='bg-white  grid w-full max-w-2xl  gap-10 border dark:bg-boxdark p-8 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
          noValidate>
          <div className='relative grid grid-cols-6 items-center gap-2'>
            <Label htmlFor='name' className='text-center'>
              Name <span className='text-danger'>*</span>
            </Label>
            <div className='relative col-span-5'>
              <Input id='name' {...register('name')} />
              <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
                {errors.name?.message}
              </p>
            </div>
          </div>
          <div className='relative grid grid-cols-6 items-center gap-4'>
            <Label htmlFor='email' className='text-center'>
              Email <span className='text-danger'>*</span>
            </Label>
            <div className='relative col-span-5'>
              <Input type='email' id='email' {...register('email')} />
              <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
                {errors.email?.message}
              </p>
            </div>
          </div>
          <div className='relative grid grid-cols-6 items-center gap-4'>
            <Label htmlFor='phone' className='text-center'>
              Phone <span className='text-danger'>*</span>
            </Label>
            <div className='relative col-span-5'>
              <Input id='phone' {...register('phone')} />
              <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
                {errors.phone?.message}
              </p>
            </div>
          </div>
          <div className='relative grid grid-cols-6 items-center gap-4'>
            <Label className='text-center'>
              Location <span className='text-danger'>*</span>
            </Label>
            <div className='relative col-span-5'>
            <Controller
              control={control}
              name='location'
              render={({ field: { onChange, onBlur } }) => (
                <AsyncSelect
                  id='location'
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
                  className='h-10'
                  cacheOptions
                  onChange={selectedOption => onChange(selectedOption?.value || null)}
                  onBlur={onBlur}
                  loadOptions={loadOptions}
                  defaultOptions
                  noOptionsMessage={() => 'Location is not found'}
                />
              )}
            />
            <p className='absolute -bottom-5 left-1/2 translate-x-[-50%] text-xs text-danger text-center'>
              {errors.location?.message}
            </p>

            </div>
          </div>
          <Button disabled={!isDirty || isSubmitting} className='mt-4 text-white'>
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
