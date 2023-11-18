import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { TCalendar, calendarSchema } from '@/lib/types';
import { EventInput } from '@fullcalendar/core/index.js';
import FullCalendar from '@fullcalendar/react';

interface CalendarFormProps {
  calendarRef: React.RefObject<FullCalendar>;
  handleEvent: (data: TCalendar) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEvents?: React.Dispatch<React.SetStateAction<EventInput[]>>;
  setEvent?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      start: string;
      end: string;
    }>
  >;
}

export const CalendarForm = ({ handleEvent, setShowModal }: CalendarFormProps) => {
  const form = useForm({
    defaultValues: {
      title: '',
      start: '',
      end: '',
    },
    resolver: zodResolver(calendarSchema),
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, dirtyFields, isValid, isSubmitting, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const startTime = form.watch('start');
  const endTime = form.watch('end');
  const isStartTimeValid =
    startTime &&
    endTime &&
    Date.parse(`2023-01-01T${startTime}`) < Date.parse(`2023-01-01T${endTime}`);

  return (
    <form
      onSubmit={handleSubmit(handleEvent)}
      className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-5 border bg-background p-6 pt-11 shadow-lg duration-200 sm:rounded-lg md:w-full'
      noValidate>
      <button onClick={() => setShowModal(false)} type='button' className='absolute right-3 top-3'>
        <X size={20} />
      </button>
      <div className='relative grid grid-cols-6 items-center'>
        <Label htmlFor='name' className='text-center col-span-1'>
          Title:
        </Label>
        <Input id='name' className='col-span-5' {...register('title')} />
        <p className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-danger text-center pt-1'>
          {errors.title?.message}
        </p>
      </div>
      <div className='flex gap-10 relative'>
        <div className='flex-1 text-center relative'>
          <Label htmlFor='start' className='text-center'>
            Start time:
          </Label>
          <Input type='time' id='start' {...register('start')} />
          <p className='absolute left-1/2 -translate-x-1/2 text-xs text-danger pt-1'>
            {errors.start?.message}
          </p>
        </div>
        <div className='flex-1 text-center relative'>
          <Label htmlFor='end' className='text-center'>
            End time:
          </Label>
          <Input type='time' id='end' {...register('end')} />
          <p className='absolute left-1/2 -translate-x-1/2 text-xs text-danger pt-1'>
            {errors.end?.message}
          </p>
        </div>
        {dirtyFields.start && dirtyFields.end && !isStartTimeValid && (
          <p className='text-xs text-danger absolute -bottom-6 left-1/2 -translate-x-1/2'>
            Start time must be before end time.
          </p>
        )}
      </div>
      <Button disabled={!isDirty || !isValid || isSubmitting} className='mt-6 text-white'>
        Add
      </Button>
    </form>
  );
};
