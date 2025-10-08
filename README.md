# Little Lemon Restaurant 🍋

A modern, full-featured restaurant website built with React, featuring online table reservations, menu browsing, booking management, and more.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![React Router](https://img.shields.io/badge/React_Router-6.23.1-red?logo=react-router)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.10.9-teal?logo=chakra-ui)
![Tests](https://img.shields.io/badge/Tests-Passing-success?logo=jest)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Key Components](#key-components)
- [Booking System](#booking-system)
- [Deployment](#deployment)
- [License](#license)

## 🎯 About

Little Lemon is a Mediterranean restaurant website that provides a seamless online experience for customers. The application allows users to browse the menu, make table reservations, manage their bookings, and contact the restaurant. Built as a capstone project, it demonstrates modern web development practices with React.

## ✨ Features

### 🏠 Home Page
- Eye-catching hero section with restaurant branding
- Featured menu items showcase
- Customer testimonials
- About section with restaurant story

### 📖 Menu
- Complete menu with images and descriptions
- Organized by categories (Appetizers, Main Courses, Desserts, Drinks)
- Detailed item information including prices

### 📅 Reservation System
- Interactive booking form with date/time selection
- Real-time availability checking
- Form validation using Formik & Yup
- Guest count selection (1-10 guests)
- Occasion selection (Birthday, Anniversary, Business, etc.)
- Special requests field
- Booking confirmation page

### 📋 Booking Management
- View all bookings in one place
- Booking status tracking (Confirmed, Completed, Cancelled)
- Modify existing bookings
- Cancel bookings with confirmation
- Unique booking number for each reservation
- Booking details display (date, time, guests, occasion)

### 📞 Contact
- Contact form for inquiries
- Restaurant location and contact information
- Operating hours display
- Social media links

### 🎨 UI/UX
- Responsive design for all screen sizes
- Modern, clean interface with brand colors
- Smooth navigation with React Router
- Accessibility-focused design
- Loading states and error handling

## 🛠 Tech Stack

### Core
- **React** (18.3.1) - UI library
- **React Router DOM** (6.23.1) - Client-side routing
- **React Scripts** (5.0.1) - Build tooling

### UI Framework & Styling
- **Chakra UI** (2.10.9) - Component library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS
- **Framer Motion** (11.2.10) - Animations
- **React Icons** (5.5.0) - Icon library

### Forms & Validation
- **Formik** (2.4.6) - Form management
- **Yup** (1.4.0) - Schema validation
- **React DatePicker** (6.9.0) - Date selection

### Testing
- **Jest** - Testing framework
- **React Testing Library** (@testing-library/react) - Component testing
- **@testing-library/user-event** - User interaction simulation

### Additional Libraries
- **PropTypes** (15.8.1) - Type checking
- **Web Vitals** (4.0.0) - Performance metrics

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn** (v1.22.0 or higher)

To check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/aderraj/FrontEndCaptsone.git
cd FrontEndCaptsone
```

2. **Install dependencies**
```bash
npm install
```

Or if you use yarn:
```bash
yarn install
```

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The application will open automatically in your default browser at [http://localhost:3000](http://localhost:3000).

The page will automatically reload when you make changes. You'll also see any lint errors in the console.

### Production Build

Create an optimized production build:

```bash
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This launches the test runner in interactive watch mode.

Run all tests without watch mode:

```bash
npm test -- --watchAll=false
```

View test coverage:

```bash
npm test -- --coverage
```

### Test Files
- Component tests in `src/Components/__tests__/`
- Context tests in `src/contexts/__tests__/`
- App-level tests in `src/App.test.js`

## 📁 Project Structure

```
FrontEndCaptsone/
├── public/                      # Static files
│   ├── index.html              # HTML template
│   ├── Logo.png                # Restaurant logo
│   ├── *.png                   # Menu item & customer images
│   └── manifest.json           # PWA manifest
│
├── src/
│   ├── Components/             # React components
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Footer.jsx         # Footer component
│   │   ├── HomePage.jsx       # Home page layout
│   │   ├── Hero.jsx           # Hero section component
│   │   ├── Menu.jsx           # Menu display component
│   │   ├── MenuPage.jsx       # Full menu page
│   │   ├── BookingsPage.jsx   # View all bookings
│   │   ├── ReservationForm.jsx # Booking form
│   │   ├── ConfirmedBooking.jsx # Confirmation page
│   │   ├── ModifyBooking.jsx  # Edit booking page
│   │   ├── Contact.jsx        # Contact page
│   │   ├── About.jsx          # About section
│   │   ├── Testimonials.jsx   # Customer reviews
│   │   ├── Card.jsx           # Reusable card component
│   │   └── __tests__/         # Component tests
│   │
│   ├── contexts/               # React context
│   │   ├── BookingContext.js  # Booking state management
│   │   └── __tests__/         # Context tests
│   │
│   ├── Styles/                 # CSS files
│   │   ├── brand.css          # Brand colors & variables
│   │   ├── App.css            # Global styles
│   │   └── *.css              # Component-specific styles
│   │
│   ├── __mocks__/              # Test mocks
│   │   └── chakraMock.js      # Chakra UI mock
│   │
│   ├── App.js                  # Main app component
│   ├── Reservation.js          # Reservation page wrapper
│   ├── index.js                # Entry point
│   ├── setupTests.js           # Test configuration
│   └── reportWebVitals.js      # Performance monitoring
│
├── coverage/                    # Test coverage reports
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🗺 Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with hero, menu preview, and testimonials |
| `/menu` | MenuPage | Full restaurant menu |
| `/bookings` | BookingsPage | View and manage all bookings |
| `/reservations` | Reservations | Make a new table reservation |
| `/contact` | Contact | Contact form and information |
| `/confirmed-booking` | ConfirmedBooking | Booking confirmation page |
| `/modify-booking/:bookingId` | ModifyBooking | Edit an existing booking |

## 🔑 Key Components

### Header
Navigation bar with logo and menu links. Responsive design with mobile menu support.

### Hero
Reusable hero section component with title, subtitle, description, call-to-action button, and optional image.

### ReservationForm
Comprehensive booking form with:
- Date picker with availability checking
- Time slot selection
- Guest count selector
- Occasion dropdown
- Special requests textarea
- Form validation
- Submit handling

### BookingsPage
Displays all user bookings with:
- Booking cards showing all details
- Status badges (Confirmed, Completed, Cancelled)
- Modify and Cancel actions
- Unique booking number display
- Empty state for no bookings

### Menu Components
- **Menu.jsx**: Displays featured menu items on home page
- **MenuPage.jsx**: Full menu organized by categories
- **Card.jsx**: Reusable card component for menu items

### BookingContext
Global state management for bookings using React Context API:
- Store all bookings
- Add new bookings
- Update existing bookings
- Delete bookings
- Generate unique booking numbers
- Persist bookings to localStorage

## 📅 Booking System

### How It Works

1. **Create a Reservation**
   - Navigate to `/reservations`
   - Select date, time, and number of guests
   - Choose occasion and add special requests
   - Submit the form

2. **View Bookings**
   - Go to `/bookings` to see all your reservations
   - Each booking displays:
     - Unique booking number
     - Date and time
     - Number of guests
     - Occasion
     - Special requests
     - Status badge

3. **Modify a Booking**
   - Click "Modify" on any booking
   - Update any details
   - Save changes

4. **Cancel a Booking**
   - Click "Cancel" on any booking
   - Confirm cancellation in the dialog
   - Booking is removed from the list

### Data Persistence
Bookings are stored in the browser's localStorage, so they persist across page refreshes and browser sessions.

## 🎨 Brand Colors

The application uses a consistent color scheme defined in `brand.css`:

- **Primary Yellow**: `#F4CE14` - Brand color for buttons and highlights
- **Primary Green**: `#495E57` - Dark green for headers and text
- **Highlight Pink**: `#EE9972` - Accent color
- **Highlight Beige**: `#FBDABB` - Soft accent
- **Background**: `#EDEFEE` - Light gray background

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the app:
```bash
npm run build
```

2. Deploy the `build` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/FrontEndCaptsone",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🧰 Development Tips

### Adding New Menu Items

Edit the menu data in `MenuPage.jsx` or create a separate data file for menu items.

### Customizing Styles

- Global styles: `src/Styles/App.css`
- Brand colors: `src/Styles/brand.css`
- Component-specific: `src/Styles/ComponentName.css`

### API Integration

To integrate with a real backend API:

1. Replace `window.fetchAPI` and `window.submitAPI` mock functions in `Reservation.js`
2. Add axios or fetch calls to your backend
3. Update the BookingContext to use API endpoints
4. Add error handling and loading states

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of a frontend development capstone and is available for educational purposes.

## 👨‍💻 Author

**Ali Derraj**
- GitHub: [@aderraj](https://github.com/aderraj)

## 🙏 Acknowledgments

- Built as a capstone project for frontend development
- Images and branding for Little Lemon restaurant
- React and Chakra UI communities for excellent documentation

---

Made with ❤️ and React
