'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { setUser, setError, setLoading } from '@/store/authSlice';
import { User } from '@/types';
import { AppDispatch } from '@/store';

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoadingState(true);
    setErrorState(null);
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error('User profile not found');
      }

      const userData = userDocSnap.data();
      const user: User = {
        id: userId,
        email: userCredential.user.email || email,
        displayName: userData.displayName || userCredential.user.displayName || '',
        avatar: userData.avatar,
        role: userData.role,
        createdAt: userData.createdAt?.toDate?.() || new Date(),
        lastLogin: new Date(),
      };

      dispatch(setUser(user));
      setLoadingState(false);

      // Redirect based on role
      const dashboardPath = user.role === 'consultant' ? '/dashboard' : '/dashboard/student';
      router.push(dashboardPath);
    } catch (err: any) {
      let errorMessage = 'An error occurred during login';

      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many login attempts. Please try again later';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setErrorState(errorMessage);
      dispatch(setError(errorMessage));
      setLoadingState(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}