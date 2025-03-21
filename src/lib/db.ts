
import { supabase, Booking, TimeSlot } from './supabase';

// Time slots functions
export async function getTimeSlots(date: string): Promise<TimeSlot[]> {
  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .eq('date', date)
    .order('time');
  
  if (error) {
    console.error('Error fetching time slots:', error);
    return [];
  }
  
  return data || [];
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'status'>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...booking,
      status: 'confirmed'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }
  
  // Mark the time slot as unavailable
  await supabase
    .from('time_slots')
    .update({ available: false })
    .match({ date: booking.date, time: booking.time });
  
  return data;
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date');
  
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  
  return data || [];
}

export async function cancelBooking(id: string): Promise<boolean> {
  const { data: booking } = await supabase
    .from('bookings')
    .select('date, time')
    .eq('id', id)
    .single();
  
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id);
  
  if (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
  
  // If we have the booking details, make the time slot available again
  if (booking) {
    await supabase
      .from('time_slots')
      .update({ available: true })
      .match({ date: booking.date, time: booking.time });
  }
  
  return true;
}

// For admin to add available time slots
export async function generateTimeSlots(date: string, startHour: number = 9, endHour: number = 17, intervalMinutes: number = 30): Promise<boolean> {
  const slots = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      slots.push({
        date,
        time: timeStr,
        available: true
      });
    }
  }
  
  const { error } = await supabase
    .from('time_slots')
    .upsert(slots, { onConflict: 'date,time' });
  
  if (error) {
    console.error('Error generating time slots:', error);
    return false;
  }
  
  return true;
}
