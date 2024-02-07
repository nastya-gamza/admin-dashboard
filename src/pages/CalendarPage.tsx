import { Calendar } from '@/components/Calendar';

const CalendarPage = () => {
  return (
    <>
      <h3 className='mb-5 text-lg font-bold'>click on the date to add a new event!</h3>
      <Calendar />
    </>
  );
};

export default CalendarPage;
