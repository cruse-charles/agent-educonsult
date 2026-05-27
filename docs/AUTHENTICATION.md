# EduConsult Authentication System

## Overview

The authentication system for EduConsult provides a complete login, signup, and password recovery flow using Firebase Authentication and Firestore.

## Features

- **Email/Password Authentication** via Firebase Auth
- **Form Validation** using React Hook Form and Zod schemas
- **Role-Based Access** (Consultant and Student roles)
- **Password Reset** email functionality
- **Redux State Management** for auth state
- **Error Handling** with user-friendly messages
- **Loading States** with visual feedback
- **Responsive Design** mobile-first approach
- **Dark Mode** by default with Tailwind CSS

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx           # Auth layout wrapper
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── signup/
│   │   │   └── page.tsx         # Signup page
│   │   └── forgot-password/
│   │       └── page.tsx         # Password reset page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Redux and React Query providers
├── hooks/
│   └── useAuth.ts               # Custom authentication hook
├── lib/
│   ├── firebase.ts              # Firebase config and initialization
│   └── validations.ts           # Zod validation schemas
├── store/
│   ├── authSlice.ts             # Redux auth slice
│   └── index.ts                 # Redux store configuration
├── styles/
│   └── globals.css              # Global Tailwind styles
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Components

### Login Page (`src/app/(auth)/login/page.tsx`)

The main login component with the following features:

- Email and password input fields
- Form validation using Zod
- Firebase authentication
- Error messages
- Loading state during submission
- Links to signup and forgot password pages
- Remember me checkbox

**Key Props/Usage:**
```typescript
// The component uses hooks internally:
// - useForm() from react-hook-form
// - useAuth() custom hook for Firebase integration
// - useRouter() for navigation
```

### Auth Layout (`src/app/(auth)/layout.tsx`)

Layout component for all auth pages with:
- Centered card design
- EduConsult branding
- Gradient background
- Dark theme
- Responsive padding

### Signup Page (`src/app/(auth)/signup/page.tsx`)

Account creation page with:
- Email, password, role selection
- Form validation
- Firebase user creation
- Firestore user profile creation
- Success feedback

### Forgot Password Page (`src/app/(auth)/forgot-password/page.tsx`)

Password recovery with:
- Email verification
- Firebase password reset email
- Success confirmation
- Email display feedback

## Custom Hook: `useAuth`

Location: `src/hooks/useAuth.ts`

The `useAuth` hook handles all Firebase authentication logic:

```typescript
const { login, loading, error } = useAuth();

await login(email, password);
```

**Return Values:**
- `login(email: string, password: string)`: Async function to authenticate user
- `loading: boolean`: Loading state during auth process
- `error: string | null`: Error message if auth fails

**Features:**
- Fetches user profile from Firestore
- Dispatches user data to Redux store
- Handles Firebase error codes with user-friendly messages
- Redirects based on user role (consultant vs student)

## Validation Schemas

Location: `src/lib/validations.ts`

### `loginSchema`
```typescript
email: z.string().email('Invalid email address'),
password: z.string().min(6, 'Password must be at least 6 characters'),
rememberMe: z.boolean().optional(),
```

### `signupSchema`
```typescript
email: z.string().email('Invalid email address'),
password: z.string().min(6, 'Password must be at least 6 characters'),
confirmPassword: z.string(),
role: z.enum(['consultant', 'student']),
```

### `forgotPasswordSchema`
```typescript
email: z.string().email('Invalid email address'),
```

## Redux Store

Location: `src/store/`

### Auth Slice (`authSlice.ts`)

**State Structure:**
```typescript
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
```

**Actions:**
- `setUser(user: User)`: Set user and mark as authenticated
- `clearUser()`: Clear user data and logout
- `setLoading(loading: boolean)`: Set loading state
- `setError(error: string | null)`: Set error message

**Usage in Components:**
```typescript
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';

const dispatch = useDispatch();
dispatch(setUser(userData));
```

## Firebase Integration

Location: `src/lib/firebase.ts`

Exports:
- `auth`: Firebase Auth instance
- `db`: Firestore database instance
- `storage`: Firebase Storage instance

**Environment Variables Required:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Error Handling

The authentication system handles various Firebase error codes:

| Firebase Code | User Message |
|---|---|
| `auth/invalid-email` | Invalid email address |
| `auth/user-not-found` | No account found with this email |
| `auth/wrong-password` | Incorrect password |
| `auth/user-disabled` | This account has been disabled |
| `auth/too-many-requests` | Too many login attempts. Please try again later |
| `auth/email-already-in-use` | This email is already registered |
| `auth/weak-password` | Password is too weak |

## Usage Examples

### Login Flow
```typescript
// In a client component:
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const { login, loading, error } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // User is redirected by the hook
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    // Form JSX
  );
}
```

### Accessing User from Redux
```typescript
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Dashboard() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  
  return <div>Welcome, {user?.displayName}</div>;
}
```

## Firestore User Schema

When a user signs up, the following document is created in `/users/{userId}`:

```typescript
interface FirestoreUser {
  email: string;
  role: 'consultant' | 'student';
  displayName: string;
  avatar: string | null;
  createdAt: Timestamp;
  lastLogin: Timestamp;
}
```

## Styling

All components use:
- **TailwindCSS** for styling
- **Dark mode** colors (slate-800, slate-700, etc.)
- **Lucide React** icons
- **Responsive design** with mobile-first approach

## Testing

Test files are located in `src/__tests__/`:

### Running Tests
```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
```

### Test Coverage
- Form rendering and validation
- Error message display
- User interactions
- Schema validation

## Security Considerations

1. **Passwords**: Stored securely by Firebase Auth, never logged or displayed
2. **API Keys**: Use environment variables, never hardcode
3. **CORS**: Firebase Auth handles CORS automatically
4. **Rate Limiting**: Firebase Auth includes built-in rate limiting
5. **HTTPS Only**: All Firebase operations are HTTPS

## Performance

- **Code Splitting**: Each auth page is code-split automatically by Next.js
- **Form Validation**: Client-side validation with Zod (fast, no server calls)
- **Firebase Optimization**: Using Firebase Auth (optimized, no backend required)
- **Redux**: Efficient state management with Redux Toolkit

## Future Enhancements

- [ ] Google OAuth integration
- [ ] Email verification during signup
- [ ] Two-factor authentication
- [ ] Social login options
- [ ] Session persistence
- [ ] Account lockout after failed attempts

## Troubleshooting

### "User profile not found" Error
- Ensure Firestore user document exists at `/users/{userId}`
- Check that your Firebase Firestore rules allow reading user documents

### Login redirects to wrong page
- Verify the user's role is set correctly in Firestore
- Check that `/dashboard` and `/dashboard/student` pages exist

### Firebase initialization errors
- Verify all environment variables are set in `.env.local`
- Check Firebase project credentials are correct
- Ensure Firebase Authentication is enabled in the console

## References

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
