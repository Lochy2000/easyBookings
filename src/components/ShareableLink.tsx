
import { useState, useEffect } from 'react';
import { Link, Copy, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ShareableLinkProps {
  className?: string;
}

const ShareableLink = ({ className }: ShareableLinkProps) => {
  const [bookingUrl, setBookingUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Get the current window URL and construct the booking URL
    const baseUrl = window.location.origin;
    setBookingUrl(`${baseUrl}/booking`);
  }, []);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast.success('Link copied to clipboard');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };
  
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Book an appointment',
          text: 'Book an appointment using this link:',
          url: bookingUrl,
        });
        toast.success('Link shared successfully');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Error sharing link');
        }
      }
    } else {
      copyToClipboard();
    }
  };
  
  return (
    <div className={cn("space-y-4 p-6 rounded-2xl border bg-card", className)}>
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-full bg-primary/10">
          <Link className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-medium">Share Booking Link</h3>
      </div>
      
      <div className="relative flex items-center">
        <Input
          value={bookingUrl}
          readOnly
          className="pr-24 rounded-xl border-muted-foreground/20 bg-muted/50"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="absolute right-1 h-8 px-3 rounded-lg"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="flex-1 rounded-xl border-muted-foreground/20"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        
        <Button
          onClick={shareLink}
          variant="default"
          className="flex-1 rounded-xl"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        Send this link to clients for easy appointment booking
      </div>
    </div>
  );
};

export default ShareableLink;
