import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center flex flex-col justify-center items-center'>
      <div className='bg-not-found w-[350px] h-[400px] bg-center object-cover'></div>
      <h2 className='my-3 text-2xl font-bold text-black dark:text-white'>
        Sorry, the page can’t be found
      </h2>
      <p className='font-medium'>
        The page you were looking for appears to have been moved, deleted or does not exist.
      </p>
      <Link
        to='/'
        className='mt-6 inline-flex items-center gap-2 rounded-md bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90'>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
