
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarCheck, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TimeSlotType } from '@/components/TimeSlot';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlotType | null;
  onSubmit: (data: BookingFormData) => void;
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(7, { message: 'Valid phone number is required' }),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof formSchema>;

const BookingForm = ({ selectedDate, selectedTimeSlot, onSubmit, className }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(formSchema)
  });
  
  const onFormSubmit = (data: BookingFormData) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select a date and time slot');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Booking Summary</h3>
        
        <div className="rounded-xl border p-4 space-y-4 bg-card">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-3">
              <CalendarCheck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Date</div>
              <div className="font-medium">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : 'No date selected'}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-3">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Time</div>
              <div className="font-medium">
                {selectedTimeSlot ? format(new Date(`2000-01-01T${selectedTimeSlot.time}`), 'h:mm a') : 'No time selected'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="rounded-lg"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="rounded-lg"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                className="rounded-lg"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>Additional Notes</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requests or information..."
                className="min-h-[100px] rounded-lg"
                {...register('notes')}
              />
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-xl py-6 shadow-sm transition-all duration-300 hover:shadow"
          disabled={isSubmitting || !selectedDate || !selectedTimeSlot}
        >
          {isSubmitting ? 'Confirming Your Booking...' : 'Confirm Booking'}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
