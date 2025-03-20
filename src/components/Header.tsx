
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-2 rounded-full transition-all group-hover:scale-110">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium text-lg tracking-tight">TimeSlot</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/booking" active={location.pathname === "/booking"}>
            Book Now
          </NavLink>
          <NavLink to="/admin" active={location.pathname === "/admin"}>
            Admin
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link to="/booking" className="flex items-center gap-2 text-primary">
              <Clock className="h-4 w-4" />
              <span>Book Now</span>
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="rounded-full hidden md:flex animate-pulse-subtle">
            <Link to="/admin" className="flex items-center gap-2">
              <span>Admin Access</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-2 rounded-full text-sm font-medium transition-all relative",
      active 
        ? "text-primary" 
        : "text-foreground/70 hover:text-foreground"
    )}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-subtle" />
    )}
  </Link>
);

export default Header;
