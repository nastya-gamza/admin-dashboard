import error from '/icons/error.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center'>
      <div className='flex justify-center mt-5'>
        <img width={400} height={400} src={error} alt='Page not found' />
      </div>
      <h2 className='mb-3 text-2xl font-bold text-black dark:text-white'>
        Sorry, the page can’t be found
      </h2>
      <p className='font-medium'>
        The page you were looking for appears to have been moved, deleted or does not exist.
      </p>
      <Link to='/' className='mt-6 inline-flex items-center gap-2 rounded-md bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90'>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
