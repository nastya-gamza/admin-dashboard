import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface DatePickerProps {
  selected: Date;
  today: Date;
  onSelect: (date: Date | undefined) => void;
}

const DatePicker = ({ selected, onSelect, today }: DatePickerProps) => {
  const [date, setDate] = useState(selected);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onSelect(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[367px] justify-start text-left font-normal dark:bg-boxdark-2',
            !date && 'text-muted-foreground',
          )}>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'dd.MM.yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={handleDateSelect} today={today} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
