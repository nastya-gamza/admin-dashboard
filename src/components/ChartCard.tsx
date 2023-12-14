export const ChartCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='sm:h-full relative rounded-md border border-stroke bg-white p-4 sm:pb-0 shadow-default dark:border-strokedark dark:bg-boxdark'>
      {children}
    </div>
  );
};
