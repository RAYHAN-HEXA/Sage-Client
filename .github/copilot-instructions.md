# LessonVault Client - AI Coding Instructions

## Project Overview

LessonVault is a **React 19 + Vite + Firebase** lesson-sharing platform with role-based access control (user/admin) and premium payment integration. The client is a SPA built with modern practices: context-based state management, custom hooks, and Tailwind CSS + DaisyUI styling.

**Key Tech Stack:**
- **Frontend:** React 19, React Router v7, Vite
- **Auth & Data:** Firebase Authentication, Axios with JWT interceptors
- **UI:** Tailwind CSS, DaisyUI, Framer Motion, Lottie animations, Lucide/React Icons
- **Payments:** Stripe
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast, SweetAlert2, React Toastify

---

## Architecture & Data Flow

### Context & State Management
Three provider layers in `src/contexts/` wrap the app in [src/main.jsx](src/main.jsx):

1. **AuthProvider** ([src/contexts/AuthContext/AuthProvider.jsx](src/contexts/AuthContext/AuthProvider.jsx))
   - Manages Firebase auth state: `user`, `loading`, auth methods (`createUser`, `loginUser`, `googleLogin`, `logoutUser`)
   - Uses Firebase's `onAuthStateChanged` for real-time sync
   - Exposes via `useAuth()` hook
   - **Critical:** Methods set `loading = true` - consuming components must handle loading state

2. **ThemeProvider** ([src/contexts/AuthContext/ThemeContext/ThemeProvider.jsx](src/contexts/AuthContext/ThemeContext/ThemeProvider.jsx))
   - Dark/light theme toggle (accessed via `useTheme()`)
   - Provides color constants via `COLORS` object

3. **Route-Level Role Context**
   - `useRole()` hook queries backend for user role ("user" | "admin")
   - Used in DashboardLayout to conditionally render admin vs. user menu items

### Data Flow Pattern
```
FirebaseAuth → AuthProvider(user, loading) → PrivateRoute/AdminRoute 
→ Protected Pages → useAxiosSecure() → Backend API (with JWT in headers)
```

---

## Key Files & Patterns

### Protected Routes
- **PrivateRoute** ([src/routes/PrivateRoute/PrivateRoute.jsx](src/routes/PrivateRoute/PrivateRoute.jsx)): Checks `user` and `loading`, redirects to `/auth/login` if unauthenticated
- **AdminRoute** ([src/routes/AdminRoute/AdminRoute.jsx](src/routes/AdminRoute/AdminRoute.jsx)): Further checks `role === "admin"`, redirects if unauthorized
- **Pattern:** Always wrap route children with these components in [src/router/router.jsx](src/router/router.jsx)

### API Integration
- **useAxiosSecure** ([src/hooks/useAxiosSecure.jsx](src/hooks/useAxiosSecure.jsx)): 
  - Pre-configured axios instance with baseURL `https://lesson-vault-server.vercel.app`
  - **Request interceptor:** Adds `Authorization: Bearer {accessToken}` header
  - **Response interceptor:** Catches 401/403 errors, logs out user, redirects to login
  - **Use this for all authenticated API calls** - not plain axios

### Layouts
- **MainLayout** ([src/layouts/MainLayout.jsx](src/layouts/MainLayout.jsx)): Public pages (home, lessons, contact, auth)
- **AuthLayout** ([src/layouts/AuthLayout.jsx](src/layouts/AuthLayout.jsx)): Login/Register pages
- **DashboardLayout** ([src/layouts/DashboardLayout.jsx](src/layouts/DashboardLayout.jsx)): Role-based sidebar (different for admin vs. user)

### Component Structure
- **Shared Components** ([src/components/Shared/](src/components/Shared/)): Navbar, Footer, LessonCard, Loader, Error404, etc.
- **Home Components** ([src/components/Home/](src/components/Home/)): Hero, Featured, TopContributors, etc.
- **Pages** ([src/pages/](src/pages/)): Full page components, often combining shared components
- **Naming Convention:** Use PascalCase for components, descriptive names (e.g., `AddLessons.jsx` not `Form.jsx`)

---

## Developer Workflows

### Development Server
```bash
npm run dev       # Starts Vite dev server (http://localhost:5173)
```

### Building
```bash
npm run build     # Vite production build
npm run preview   # Preview built bundle locally
```

### Code Quality
```bash
npm run lint      # ESLint check (config: eslint.config.js)
```

### Backend Dependency
- **API runs on `https://lesson-vault-server.vercel.app`** (hardcoded in useAxiosSecure)
- Backend must be running for authenticated features to work
- Frontend handles token refresh via axios interceptors

---

## Project Conventions

### State Management
- **No Redux:** Context + hooks are sufficient for this app size
- **Custom Hooks Pattern:** Extract complex logic into hooks (see `useAuth`, `useAxiosSecure`, `useRole`)
- **Provider Pattern:** Wrap entire app with providers for global state

### Error Handling
- **Network Errors:** Caught in `useAxiosSecure` response interceptor; logged to console, user redirected if 401/403
- **User-Facing Notifications:** Use `react-hot-toast` (recommended) or SweetAlert2 for confirmations
- **Example:** [src/layouts/DashboardLayout.jsx](src/layouts/DashboardLayout.jsx#L35) shows logout confirmation with Swal

### Loading States
- Components should check `useAuth().loading` before rendering protected content
- [PrivateRoute](src/routes/PrivateRoute/PrivateRoute.jsx) shows `<Loader />` component during auth check
- Always provide spinner/skeleton feedback when awaiting async operations

### Form Handling
- Use **React Hook Form** (see [src/pages/Auth/Register.jsx](src/pages/Auth/Register.jsx) pattern for examples)
- Combine with **SweetAlert2** for success/error feedback on submission

### Styling
- **Tailwind CSS v4** + **DaisyUI** components only
- Theme colors via `useTheme()` hook (e.g., `COLORS.primary`, `COLORS.secondary`)
- No inline styles or CSS modules (Tailwind utility-first approach)

### Routing
- All routes defined in [src/router/router.jsx](src/router/router.jsx)
- Dashboard has nested routes for user/admin sections
- Error fallback: Every route has wildcard `path: "*"` child pointing to `<Error404 />`

---

## Critical Integration Points

### Firebase
- **Config:** [src/firebase/firebase.config.js](src/firebase/firebase.config.js) - contains API keys and project ID
- **Auth Methods:** See AuthProvider for full list (Google OAuth, email/password)
- **Google Auth:** GoogleAuthProvider configured in AuthProvider; handle popup blocking in browser

### Stripe Integration
- Pages: [src/pages/Payment/UpgradePremium.jsx](src/pages/Payment/UpgradePremium.jsx), PaymentSuccess, PaymentCancelled
- Backend handles checkout session; frontend redirects on success/cancel

### Axios Interceptors
- **Request:** Add JWT token to headers
- **Response:** Handle 401/403 (logout), re-throw other errors
- **Note:** Avoid calling `axios` directly; always use `useAxiosSecure()`

### Toast Notifications
- **react-hot-toast:** Simple, non-blocking (preferred for general feedback)
- **SweetAlert2:** Modal-based (use for confirmations/important alerts)
- **Pattern:** `toast.success("Message")` or `Swal.fire({...})`

---

## Outstanding Work (from TODO.md)

- [ ] Phase 3: Lesson management (add, edit, delete, view with full CRUD)
- [ ] Public lessons search/filter/sort/pagination
- [ ] Phase 4: Favorites, likes, comments, reports, admin moderation
- [ ] UI responsiveness pass (mobile-first refinement)
- [ ] Dark/light theme styling refinement
- [ ] Social sharing & PDF export features
- [ ] Full test suite & deployment

---

## Quick Debugging Tips

1. **Auth Issues:** Check AuthProvider's `onAuthStateChanged` unsubscribe logic; verify Firebase config
2. **API Errors:** Check `useAxiosSecure` interceptor logs; ensure backend is running on port 5000
3. **Protected Route Not Redirecting:** Confirm PrivateRoute/AdminRoute `loading` state is false before checking user
4. **Styling Missing:** Verify Tailwind is building (`npm run dev` should include tailwindcss plugin)
5. **Missing Hooks:** Custom hooks must be called in component body; `useAuth()` etc. are context-dependent

---

## File Organization Quick Reference

```
src/
  contexts/       → AuthProvider, ThemeProvider (state management)
  hooks/          → useAuth, useAxiosSecure, useRole, useTheme (custom logic)
  router/         → Route definitions (router.jsx)
  routes/         → PrivateRoute, AdminRoute (protection components)
  layouts/        → MainLayout, AuthLayout, DashboardLayout (page wrappers)
  pages/          → Full-page components organized by feature
  components/     → Reusable UI components (Shared, Home sections)
  firebase/       → Firebase config
  assets/         → Animations, images
```

---

**Last Updated:** December 2025
