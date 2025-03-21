import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Calendar from '@/components/Calendar';
import TimeSlot, { TimeSlotType } from '@/components/TimeSlot';
import BookingForm, { BookingFormData } from '@/components/BookingForm';
import Header from '@/components/Header';
import { getTimeSlots, createBooking } from '@/lib/db';

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlotType | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchTimeSlots = async (date: Date) => {
      setIsLoading(true);
      try {
        // Format date as YYYY-MM-DD for Supabase
        const dateString = format(date, 'yyyy-MM-dd');
        const slots = await getTimeSlots(dateString);
        
        // Map the database format to the TimeSlotType format
        const mappedSlots: TimeSlotType[] = slots.map(slot => ({
          id: slot.id,
          time: slot.time,
          available: slot.available
        }));
        
        setTimeSlots(mappedSlots);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
        toast.error('Failed to load available time slots. Please try again.');
        setTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selectedDate) {
      fetchTimeSlots(selectedDate);
      setSelectedTimeSlot(null); // Reset selected time when date changes
    }
  }, [selectedDate]);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSlotSelect = (slot: TimeSlotType) => {
    setSelectedTimeSlot(slot);
  };
  
  const handleBookingSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select a date and time slot');
      return;
    }
    
    try {
      // Format date as YYYY-MM-DD for Supabase
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      
      const booking = await createBooking({
        date: dateString,
        time: selectedTimeSlot.time,
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone,
        notes: data.notes
      });
      
      if (booking) {
        // Navigate to confirmation page with booking details
        navigate('/confirmation', { 
          state: {
            booking: {
              date: selectedDate,
              timeSlot: selectedTimeSlot,
              user: data
            }
          } 
        });
      } else {
        toast.error('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    }
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="flex items-center text-muted-foreground" 
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
            
            <h1 className="text-3xl font-medium mt-4">Book an Appointment</h1>
            <p className="text-muted-foreground">Select your preferred date and time</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-medium mb-4">Select a Date</h2>
                <Calendar 
                  selectedDate={selectedDate}
                  onSelectDate={handleDateSelect}
                  className="mb-8"
                />
              </motion.div>
              
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-medium mb-4">
                    Available Time Slots for {format(selectedDate, 'EEEE, MMMM do')}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.length > 0 ? (
                      timeSlots.map((slot) => (
                        <TimeSlot
                          key={slot.id}
                          slot={slot}
                          selected={selectedTimeSlot?.id === slot.id}
                          onSelect={handleTimeSlotSelect}
                          date={selectedDate}
                        />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8 text-muted-foreground">
                        No available time slots for this date.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-card rounded-2xl border shadow-sm p-6 h-full sticky top-24"
              >
                <BookingForm
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onSubmit={handleBookingSubmit}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
