
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { TLoginUserSchema, loginUserSchema } from '@/lib/types';

interface AuthFormProps {
  handleAuth: ({ email, password }: TLoginUserSchema) => void;
}

export const AuthForm = ({handleAuth}: AuthFormProps) => {
  const form = useForm<TLoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(handleAuth)} className='grid max-w-sm w-full gap-3' noValidate>
      <div className='grid grid-cols-4 items-center'>
        <Label htmlFor='email' className='mb-1'>
          Email:
        </Label>
        <Input
          type='email'
          id='email'
          className='col-span-4 h-12'
          placeholder='Enter your email'
          {...register('email')}
        />
        <p className='col-span-4 text-xs text-danger text-center mt-2'>{errors.email?.message}</p>
      </div>
      <div className='grid grid-cols-4 items-center'>
        <Label htmlFor='password' className='mb-1'>
          Password:
        </Label>
        <Input
          type='password'
          id='password'
          className='col-span-4 h-12'
          placeholder='6+ Characters, 1 Capital letter'
          {...register('password')}
        />
        <p className='text-xs text-danger col-span-4 text-center mt-2'>
          {errors.password?.message}
        </p>
      </div>
      <Button className='text-white h-12'>Sign in</Button>
    </form>
  );
};
