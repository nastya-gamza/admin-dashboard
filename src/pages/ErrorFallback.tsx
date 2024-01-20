const ErrorFallback = () => {
  return (
    <div className='text-center flex flex-col justify-center items-center'>
      <div className='bg-not-found w-[350px] h-[400px] bg-center object-cover'></div>
      <h2 className='my-3 text-2xl font-bold text-black dark:text-white'>
        Something went wrong ☹️
      </h2>
      <p className='font-medium'>Please reload the page.</p>
    </div>
  );
};

export default ErrorFallback;
