
import { useState } from 'react';
import { format, parse } from 'date-fns';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

export interface TimeSlotType {
  id: string;
  time: string; // Format: "HH:mm"
  available: boolean;
}

interface TimeSlotProps {
  slot: TimeSlotType;
  selected: boolean;
  onSelect: (slot: TimeSlotType) => void;
  date: Date;
}

const TimeSlot = ({ slot, selected, onSelect, date }: TimeSlotProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Parse the time string to create a full datetime
  const timeObj = parse(slot.time, 'HH:mm', date);
  const formattedTime = format(timeObj, 'h:mm a');
  
  return (
    <button
      type="button"
      disabled={!slot.available}
      onClick={() => slot.available && onSelect(slot)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between",
        selected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50",
        !slot.available && "opacity-50 cursor-not-allowed bg-muted",
        "transform transition-transform duration-300",
        isHovering && slot.available && !selected && "scale-[1.02] shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center justify-center p-2 rounded-full transition-colors",
          selected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          <Clock className="h-4 w-4" />
        </div>
        <span className={cn(
          "font-medium",
          selected ? "text-primary" : "text-foreground"
        )}>
          {formattedTime}
        </span>
      </div>
      
      {slot.available && (
        <span className={cn(
          "text-xs px-2 py-1 rounded-full transition-colors",
          selected 
            ? "bg-primary/10 text-primary" 
            : "bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          {selected ? "Selected" : "Available"}
        </span>
      )}
      
      {!slot.available && (
        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
          Booked
        </span>
      )}
    </button>
  );
};

export default TimeSlot;
