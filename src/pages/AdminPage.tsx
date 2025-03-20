import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, Users, Settings, Mail, Calendar, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ShareableLink from '@/components/ShareableLink';
import Header from '@/components/Header';
import { toast } from 'sonner';

const generateMockBookings = () => {
  const today = new Date();
  const bookings = [];
  
  for (let i = 0; i < 10; i++) {
    const date = addDays(today, Math.floor(Math.random() * 30));
    const hour = 9 + Math.floor(Math.random() * 8);
    const minute = Math.random() > 0.5 ? 30 : 0;
    
    date.setHours(hour, minute);
    
    bookings.push({
      id: `booking-${i}`,
      date: date.toISOString(),
      clientName: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sam Wilson', 'Emma Thompson'][Math.floor(Math.random() * 5)],
      clientEmail: 'client@example.com',
      clientPhone: '+1 (555) 123-4567',
      notes: Math.random() > 0.7 ? 'Some additional notes for this appointment.' : ''
    });
  }
  
  return bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const AdminPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  
  useEffect(() => {
    setBookings(generateMockBookings());
  }, []);
  
  const upcomingBookings = bookings.filter(
    booking => new Date(booking.date) >= new Date()
  );
  
  const pastBookings = bookings.filter(
    booking => new Date(booking.date) < new Date()
  );
  
  const cancelBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success('Booking has been cancelled');
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your bookings and settings</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="upcoming" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Upcoming Bookings
                  </TabsTrigger>
                  <TabsTrigger value="past" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Past Bookings
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium">
                        Upcoming Appointments ({upcomingBookings.length})
                      </h3>
                      <Input 
                        placeholder="Search appointments..."
                        className="max-w-xs rounded-lg"
                      />
                    </div>
                    
                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings.map(booking => (
                          <BookingCard 
                            key={booking.id} 
                            booking={booking} 
                            onCancel={() => cancelBooking(booking.id)} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-xl border">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                        <p className="text-muted-foreground mb-4">
                          You don't have any upcoming appointments scheduled.
                        </p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Booking
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="past" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium">
                        Past Appointments ({pastBookings.length})
                      </h3>
                      <Input 
                        placeholder="Search appointments..."
                        className="max-w-xs rounded-lg"
                      />
                    </div>
                    
                    {pastBookings.length > 0 ? (
                      <div className="space-y-4">
                        {pastBookings.map(booking => (
                          <BookingCard 
                            key={booking.id} 
                            booking={booking} 
                            isPast
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-xl border">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
                        <p className="text-muted-foreground">
                          You don't have any past appointments.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Availability Settings</CardTitle>
                        <CardDescription>
                          Configure your working hours and availability
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          This feature will be available in the next update. Currently using mock data.
                        </p>
                        <Button variant="outline">
                          Configure Availability
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Configure email and notifications preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          This feature will be available in the next update. Currently notifications are sent automatically.
                        </p>
                        <Button variant="outline">
                          Configure Notifications
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Bookings</div>
                        <div className="font-medium text-lg">{bookings.length}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Upcoming</div>
                        <div className="font-medium text-lg">{upcomingBookings.length}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Clients</div>
                        <div className="font-medium text-lg">
                          {new Set(bookings.map(b => b.clientName)).size}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <ShareableLink />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface BookingCardProps {
  booking: any;
  isPast?: boolean;
  onCancel?: () => void;
}

const BookingCard = ({ booking, isPast = false, onCancel }: BookingCardProps) => {
  const bookingDate = parseISO(booking.date);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="bg-primary/5 p-4 md:p-6 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start md:min-w-32 md:max-w-32">
          <div className="text-center md:mb-2">
            <div className="text-sm text-muted-foreground">
              {format(bookingDate, 'EEEE')}
            </div>
            <div className="text-2xl font-bold">
              {format(bookingDate, 'd')}
            </div>
            <div className="text-sm font-medium">
              {format(bookingDate, 'MMM yyyy')}
            </div>
          </div>
          
          <div className="flex items-center md:mt-2">
            <Clock className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm font-medium">
              {format(bookingDate, 'h:mm a')}
            </span>
          </div>
        </div>
        
        <div className="p-4 md:p-6 flex-1">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="font-medium text-lg flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                {booking.clientName}
              </h3>
              
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Mail className="h-3 w-3 mr-1" />
                {booking.clientEmail}
              </div>
            </div>
            
            <div className="mt-2 md:mt-0">
              {isPast ? (
                <Badge variant="outline" className="bg-muted">
                  Completed
                </Badge>
              ) : (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Upcoming
                </Badge>
              )}
            </div>
          </div>
          
          {booking.notes && (
            <div className="text-sm text-muted-foreground border-t pt-3 mt-3">
              <p className="italic">"{booking.notes}"</p>
            </div>
          )}
        </div>
      </div>
      
      {!isPast && onCancel && (
        <CardFooter className="px-6 py-3 bg-muted/30 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive"
            onClick={onCancel}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminPage;
