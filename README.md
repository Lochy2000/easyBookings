
# Appointment Booking Application

A modern, responsive web application for scheduling and managing appointments. Perfect for professionals, service providers, and small businesses who need an easy way to let clients book time slots.

![Appointment Booking App](public/og-image.png)

## Features

- **Intuitive Booking System**: Calendar and time slot selection with a simple, user-friendly interface
- **Mobile-Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Shareable Booking Links**: Generate and share direct booking links with clients
- **Admin Dashboard**: View and manage upcoming appointments
- **Smart Time Slot Management**: Prevents double-bookings and shows availability in real-time

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Setting Up Production

To deploy this application to production:

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, which you can deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Connecting to a Backend

Currently, the application uses mock data. To connect to a real backend:

### Option 1: Use a Backend Service

1. Create an account with a service like Supabase, Firebase, or AWS Amplify
2. Follow their documentation to set up authentication and a database
3. Update the API calls in the application to use your backend endpoints

### Option 2: Create Your Own API

1. Create API endpoints for:
   - Fetching available time slots
   - Creating new bookings
   - Managing bookings (admin functionality)

2. Update the following files with your API endpoints:
   - `src/pages/BookingPage.tsx` - For fetching and selecting time slots
   - `src/pages/AdminPage.tsx` - For managing bookings
   - `src/components/BookingForm.tsx` - For submitting booking details

## Customization

### Business Details

Update your business details in `src/pages/Index.tsx`

### Available Time Slots

Currently, mock time slots are generated in `src/pages/BookingPage.tsx`. Replace this with your own availability logic or API calls to your backend.

### Email Notifications

Add email notification functionality by:
1. Setting up a backend service with email capabilities
2. Updating the booking submission logic in `src/components/BookingForm.tsx`

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/lib` - Utility functions and helpers

Key components:
- `Calendar.tsx` - Weekly calendar component
- `TimeSlot.tsx` - Individual time slot selection
- `BookingForm.tsx` - Client information form
- `ShareableLink.tsx` - Booking link generator

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
