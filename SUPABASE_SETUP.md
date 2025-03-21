
# Supabase Setup Guide

This guide will help you set up the necessary tables in your Supabase database for the Appointment Booking Application.

## Database Tables

### 1. Create the `bookings` Table

```sql
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed'))
);
```

### 2. Create the `time_slots` Table

```sql
CREATE TABLE time_slots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  UNIQUE(date, time)
);
```

## Row Level Security (Optional but recommended)

For better security, you may want to enable Row Level Security (RLS) for these tables.

### Enable RLS and Add Policies for the `bookings` Table

1. Enable RLS:
```sql
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
```

2. Add policies:
```sql
CREATE POLICY "Allow anonymous read access to bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert access to bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to bookings" ON bookings
  FOR UPDATE USING (true);
```

### Enable RLS and Add Policies for the `time_slots` Table

1. Enable RLS:
```sql
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
```

2. Add policies:
```sql
CREATE POLICY "Allow anonymous read access to time_slots" ON time_slots
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert access to time_slots" ON time_slots
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to time_slots" ON time_slots
  FOR UPDATE USING (true);
```

## Generate Initial Time Slots

After setting up your tables, use the Admin Dashboard's "Generate Time Slots" button to create time slots for the next 30 days.

## Testing the Setup

1. Navigate to the Admin page at `/admin`
2. Click on the "Settings" tab
3. Click "Generate Time Slots"
4. Navigate to the Booking page at `/booking` and select a date
5. If you see time slots for that date, your setup is working correctly!
