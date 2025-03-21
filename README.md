
# Appointment Booking Application

A modern, responsive web application for scheduling and managing appointments. Perfect for professionals, service providers, and small businesses who need an easy way to let clients book time slots.

![image](https://github.com/user-attachments/assets/a5649d38-4dac-473e-9f2b-49a1aeca4086)

## Features

- **Intuitive Booking System**: Calendar and time slot selection with a simple, user-friendly interface
- **Mobile-Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Shareable Booking Links**: Generate and share direct booking links with clients
- **Admin Dashboard**: View and manage upcoming appointments
- **Smart Time Slot Management**: Prevents double-bookings and shows availability in real-time
- **Supabase Integration**: Persistent storage of bookings and time slots

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm
- Supabase account (for database functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/appointment-booking-app.git
   cd appointment-booking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Set up the required tables by following the instructions in `SUPABASE_SETUP.md`
   - Create a `.env.local` file in the project root with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Setting Up Production

To deploy this application to production:

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, which you can deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

3. Make sure to set up the environment variables in your hosting provider:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Customization

### Business Details

Update your business details in `src/pages/Index.tsx`

### Available Time Slots

Use the Admin Dashboard to generate time slots for your available dates. This will create entries in the Supabase `time_slots` table.

### Email Notifications

Add email notification functionality by:
1. Setting up a Supabase Edge Function for sending emails
2. Triggering the function after successful booking creation

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/lib` - Utility functions and helpers, including Supabase client and database operations

Key components:
- `Calendar.tsx` - Weekly calendar component
- `TimeSlot.tsx` - Individual time slot selection
- `BookingForm.tsx` - Client information form
- `ShareableLink.tsx` - Booking link generator
- `supabase.ts` - Supabase client initialization
- `db.ts` - Database operation functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
