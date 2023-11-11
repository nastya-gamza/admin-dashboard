import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { DarkModeSwitcher } from '@/components/DarkModeSwitcher';
import { AuthForm } from '@/components/Form/AuthForm';
import logo from '/icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { TLoginUserSchema } from '@/lib/types';
import { useAppDispatch } from '@/hooks/useRedux';
import { setUser } from '@/redux/userSlice';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = ({ email, password }: TLoginUserSchema) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({ email: user.email, id: user.uid, token: user.refreshToken }));
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <>
      <div className='absolute right-9 top-8'>
        <DarkModeSwitcher />
      </div>
      <main className='flex items-center justify-center h-screen dark:bg-boxdark-2 dark:text-white'>
        <div className='flex flex-col items-center justify-center border-r-2 border-stroke dark:border-gray h-full w-1/2 px-4'>
          <div className='flex items-center gap-4 mb-6'>
            <img src={logo} alt='logo' />
            <h1 className={`text-3xl font-bold duration-200`}>TailAdmin</h1>
          </div>
          <p className='text-gray tracking-wide mb-14 dark:text-stone-300'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </p>
          <div className='flex items-end'>
            <img src='/icons/sign-in-phone.svg' alt='' />
            <img src='/icons/sign-in-man.svg' alt='' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2 px-4'>
          <h2 className='font-bold text-3xl mb-9'>Sign Up to TailAdmin</h2>
          <AuthForm handleAuth={handleSignUp} />
          <p className='mt-10 tracking-wide text-gray dark:text-stone-300'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
