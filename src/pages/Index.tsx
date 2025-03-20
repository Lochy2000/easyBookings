
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Simple Scheduling',
      description: 'Display your available time slots in a clean, easy-to-navigate calendar.'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Real-time Bookings',
      description: 'Calendar updates automatically once a time slot is booked.'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Instant Confirmations',
      description: 'Send automated confirmation messages to you and your clients.'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <section className="pt-32 pb-16 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-2"
              >
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Appointment Booking Made Simple
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight"
              >
                Effortlessly manage your 
                <span className="relative">
                  <span className="relative z-10 text-primary"> appointments</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 z-0"></span>
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                A clean, intuitive calendar system that displays your available time slots and
                allows clients to book appointments with just a few clicks.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              >
                <Button 
                  size="lg" 
                  className="rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate('/booking')}
                >
                  Book an Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl px-8 py-6"
                  onClick={() => navigate('/admin')}
                >
                  Admin Dashboard
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-6 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Simple. Intuitive. Effective.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our booking system focuses on what matters most - providing a seamless 
                experience for both you and your clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className="bg-card rounded-2xl p-6 shadow-sm border h-full"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="bg-primary/5 border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-medium">Ready to streamline your booking process?</h2>
                <p className="text-muted-foreground">
                  Start managing your appointments efficiently today.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                onClick={() => navigate('/booking')}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <footer className="py-8 px-4 md:px-6 border-t">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">TimeSlot</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TimeSlot. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
