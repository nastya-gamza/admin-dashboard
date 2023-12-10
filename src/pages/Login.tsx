import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { DarkModeSwitcher } from '@/components/DarkModeSwitcher';
import { AuthForm } from '@/components/Form/AuthForm';
import logo from '/icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { TLoginUserSchema } from '@/lib/types';
import { useAppDispatch } from '@/hooks/useRedux';
import { setUser } from '@/redux/userSlice';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useState } from 'react';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }: TLoginUserSchema) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      dispatch(setUser({ email: user.email, id: user.uid, token: user.refreshToken }));
      localStorage.setItem(
        'authUser',
        JSON.stringify({ email: user.email, id: user.uid, token: user.refreshToken }),
      );
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='absolute right-9 top-8'>
        <DarkModeSwitcher />
      </div>
      <main className='flex items-center justify-center h-screen dark:bg-boxdark-2 dark:text-white'>
        {loading ? (
          <div className='fixed left-2/4 top-2/4 z-50'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
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
              <h2 className='font-bold text-3xl mb-9'>Sign In to TailAdmin</h2>
              <AuthForm handleAuth={handleLogin} />
              <p className='mt-10 tracking-wide text-gray dark:text-stone-300'>
                Don’t have any account?{' '}
                <Link to='/signup' className='text-primary'>
                  Sign Up
                </Link>
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
};
