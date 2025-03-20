
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { CheckCircle, ChevronLeft, Calendar, Clock, User, Mail, Phone, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import Header from '@/components/Header';
import ShareableLink from '@/components/ShareableLink';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  
  useEffect(() => {
    // Get booking data from location state
    if (location.state?.booking) {
      setBooking(location.state.booking);
      
      // Show success toast
      toast.success('Booking confirmed!', {
        description: 'Your appointment has been successfully booked.',
      });
    } else {
      // If no booking data, redirect to booking page
      navigate('/booking');
    }
  }, [location, navigate]);
  
  if (!booking) {
    return null;
  }
  
  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
        <div className="container max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="flex items-center text-muted-foreground mb-8" 
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-medium mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your appointment has been successfully booked. A confirmation has been sent to your email.
            </p>
          </motion.div>
          
          <Card className="overflow-hidden">
            <div className="bg-primary/5 p-6 border-b">
              <h2 className="text-xl font-medium">Booking Details</h2>
            </div>
            
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">
                      {format(booking.date, 'EEEE, MMMM do, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">
                      {format(new Date(`2000-01-01T${booking.timeSlot.time}`), 'h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Your Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">{booking.user.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{booking.user.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">{booking.user.phone}</div>
                    </div>
                  </div>
                  
                  {booking.user.notes && (
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Notes</div>
                        <div>{booking.user.notes}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 rounded-lg" asChild>
                  <a href={`data:text/calendar;charset=utf8,${encodeURIComponent('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Appointment\nDTSTART:20230615T090000\nDTEND:20230615T100000\nEND:VEVENT\nEND:VCALENDAR')}`} download="appointment.ics">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </a>
                </Button>
                
                <Button variant="outline" className="flex-1 rounded-lg" onClick={() => navigate('/booking')}>
                  <Clock className="h-4 w-4 mr-2" />
                  Book Another
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Share This Booking System</h3>
            <p className="text-muted-foreground mb-4">
              Help others book appointments easily using this booking system
            </p>
            <ShareableLink />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
