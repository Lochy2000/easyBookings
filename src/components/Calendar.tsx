
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, addWeeks, isSameDay, isBefore, isAfter } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  className?: string;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

const Calendar = ({
  selectedDate,
  onSelectDate,
  className,
  disabledDates = [],
  minDate = new Date(),
  maxDate = addDays(new Date(), 90),
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out' | null>(null);

  // Get days for current week view
  useEffect(() => {
    const start = startOfWeek(addWeeks(new Date(), weekIndex), { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setCalendarDays(days);
  }, [weekIndex]);

  const changeWeek = (direction: 'prev' | 'next') => {
    setAnimation(direction === 'prev' ? 'slide-out' : 'slide-in');
    
    setTimeout(() => {
      setWeekIndex(prev => direction === 'prev' ? prev - 1 : prev + 1);
      setAnimation(null);
    }, 300);
  };

  const isDateDisabled = (date: Date) => {
    return (
      isBefore(date, minDate) ||
      isAfter(date, maxDate) ||
      disabledDates.some(disabledDate => disabledDate && isSameDay(date, disabledDate))
    );
  };

  // Ensure the calendar has valid dates before rendering
  if (calendarDays.length === 0) {
    return <div className="loading">Loading calendar...</div>;
  }

  return (
    <div className={cn("w-full rounded-2xl shadow-sm overflow-hidden bg-card", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={() => changeWeek('prev')}
          disabled={calendarDays.length > 0 && isBefore(calendarDays[0], minDate)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous week</span>
        </Button>
        
        <h3 className="text-sm font-medium">
          {calendarDays.length > 0 ? format(calendarDays[0], 'MMMM yyyy') : ''}
        </h3>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={() => changeWeek('next')}
          disabled={calendarDays.length > 0 && isAfter(calendarDays[6], maxDate)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next week</span>
        </Button>
      </div>
      
      <div className={cn(
        "grid grid-cols-7 relative transition-transform duration-300",
        animation === 'slide-in' && 'translate-x-full',
        animation === 'slide-out' && '-translate-x-full'
      )}>
        {calendarDays.map((day, i) => (
          <div key={i} className="text-center py-2 border-b">
            <div className="text-xs text-muted-foreground mb-1">
              {format(day, 'EEE')}
            </div>
            <button
              type="button"
              disabled={isDateDisabled(day)}
              onClick={() => onSelectDate(day)}
              className={cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all",
                selectedDate && isSameDay(day, selectedDate)
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary",
                isSameDay(day, new Date()) && selectedDate && !isSameDay(day, selectedDate) && "border border-primary/50",
                isDateDisabled(day) && "opacity-50 cursor-not-allowed"
              )}
            >
              {format(day, 'd')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
