import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventInput } from '@fullcalendar/core/index.js';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRef, useState } from 'react';
import { CalendarForm } from '../Form/CalendarForm';
import { TCalendar } from '@/lib/types';
import { PopupWindow } from '../PopupWindow';

export const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [currentEvents, setCurrentEvents] = useLocalStorage<EventInput[]>('events', []);
  const calendarRef = useRef<FullCalendar>(null);

  const handleDateClick = () => {
    setShowModal(true);
  };

  let clickedDate = '';

  const dateClick = (info: DateClickArg) => {
    clickedDate = info.dateStr;
  };

  const handleEvent = (data: TCalendar) => {
    const newEvent = {
      id: `${Date.now()}`,
      title: data.title.trim(),
      start: `${clickedDate}T${data.start}:00`,
      end: `${clickedDate}T${data.end}:00`,
    };

    setCurrentEvents([...currentEvents, newEvent]);
    setShowModal(false);
  };

  const handleEventClick = (selected: EventClickArg) => {
    setShowDeleteWarning(true)
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
      const updatedEvents = currentEvents.filter(event => event.id !== selected.event.id);
      setCurrentEvents(updatedEvents);
    }
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        height='75vh'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView='dayGridMonth'
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateClick}
        eventClick={handleEventClick}
        events={currentEvents}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dateClick={dateClick}
        displayEventEnd={true}
      />
      {showModal && (
        <div className='fixed inset-0 z-50 bg-background/40 backdrop-blur-sm'>
          <CalendarForm
            calendarRef={calendarRef}
            handleEvent={handleEvent}
            setShowModal={setShowModal}
          />
        </div>
      )}
      {
        showDeleteWarning && (
        <PopupWindow
        onClick={() => ('')}
        text='This will permanently delete selected event from your calendar.'
      />
        )
      }
    </>
  );
};
