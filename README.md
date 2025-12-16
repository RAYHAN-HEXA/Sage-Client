#Digital Lessom Client

A modern, responsive React-based client application for LessonVault, a platform where users can access, share, and learn from various lessons. Built with cutting-edge technologies for a seamless user experience.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication
- **Lesson Management**: Browse, view, and save public lessons
- **Premium Features**: Upgrade to premium for exclusive content access
- **Dashboard**: Personalized dashboard for users and admins
- **Payment Integration**: Stripe-powered payment system for premium subscriptions
- **Admin Panel**: Comprehensive admin tools for managing users, lessons, and reports
- **Responsive Design**: Mobile-first design using Tailwind CSS and DaisyUI
- **Real-time Notifications**: Toast notifications for user feedback
- **Social Sharing**: Share lessons across social media platforms
- **Dark/Light Theme**: Theme switching capability

## Tech Stack

- **Frontend**: React 19, React Router 7
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, DaisyUI
- **Backend Integration**: Axios for API calls
- **Authentication**: Firebase Authentication
- **Payments**: Stripe
- **Animations**: Framer Motion, Lottie React
- **Charts**: Recharts
- **Icons**: Lucide React, React Icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast, React Toastify
- **Carousels**: Swiper
- **Email**: EmailJS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lessonvault-client.git
   cd lessonvault-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_API_BASE_URL=your_api_base_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173] in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable UI components
│   ├── Home/        # Home page specific components
│   └── Shared/      # Shared components across the app
├── contexts/        # React contexts for state management
├── firebase/        # Firebase configuration
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── router/          # Routing configuration
└── routes/          # Route protection components
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@lessonvault.com or join our Discord community.

---

Built with ❤️ using React and modern web technologies.
