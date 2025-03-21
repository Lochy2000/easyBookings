
# Supabase Setup Guide for Appointment Booking App

This guide will help you set up the necessary tables in your Supabase project for the appointment booking application.

## Prerequisites

1. A Supabase project (create one at https://supabase.com if you don't have one)
2. Your Supabase project URL and anon key

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Replace the values with your actual Supabase project details.

## Database Setup

### 1. Create Bookings Table

Execute the following SQL in the Supabase SQL Editor:

```sql
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE NOT NULL,
  time VARCHAR NOT NULL,
  client_name VARCHAR NOT NULL,
  client_email VARCHAR NOT NULL,
  client_phone VARCHAR NOT NULL,
  notes TEXT,
  status VARCHAR NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed'
);

-- Create index for faster queries
CREATE INDEX idx_bookings_date_time ON bookings(date, time);

-- Set up Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- You can refine this once you've added authentication
CREATE POLICY "Allow all operations" ON bookings
  FOR ALL USING (true);
```

### 2. Create Time Slots Table

Execute the following SQL:

```sql
CREATE TABLE time_slots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  time VARCHAR NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(date, time)
);

-- Create index for faster queries
CREATE INDEX idx_time_slots_date ON time_slots(date);

-- Set up Row Level Security (RLS)
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
CREATE POLICY "Allow all operations" ON time_slots
  FOR ALL USING (true);
```

### 3. Generate Initial Time Slots (Optional)

You can generate time slots using the application's admin functionality, or manually insert some for testing:

```sql
-- Insert example time slots for today
INSERT INTO time_slots (date, time, available)
VALUES
  (CURRENT_DATE, '09:00', true),
  (CURRENT_DATE, '09:30', true),
  (CURRENT_DATE, '10:00', true),
  (CURRENT_DATE, '10:30', true),
  (CURRENT_DATE, '11:00', true),
  (CURRENT_DATE, '11:30', true),
  (CURRENT_DATE, '13:00', true),
  (CURRENT_DATE, '13:30', true),
  (CURRENT_DATE, '14:00', true),
  (CURRENT_DATE, '14:30', true),
  (CURRENT_DATE, '15:00', true),
  (CURRENT_DATE, '15:30', true),
  (CURRENT_DATE, '16:00', true),
  (CURRENT_DATE, '16:30', true);
```

## Next Steps

After setting up these tables, you can:

1. Use the application to book appointments
2. View all bookings in the admin dashboard
3. Generate new time slots for future dates using the admin functionality

## Adding Authentication (Future Enhancement)

When you're ready to add user authentication:

1. Configure authentication providers in the Supabase dashboard
2. Update RLS policies to be more restrictive based on user roles
3. Implement login/signup functionality in the application
