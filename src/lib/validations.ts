import { z } from 'zod';

// Auth schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userType: z.enum(['student', 'school', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid user type' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Profile schemas
export const studentProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().optional(),
  schoolName: z.string().optional(),
  gradeLevel: z.string().optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

export const schoolProfileSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

// Assignment schemas
export const createAssignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.coerce.date('Invalid date'),
  subject: z.string().min(1, 'Subject is required'),
  gradeLevel: z.string().min(1, 'Grade level is required'),
  maxScore: z.number().min(1, 'Max score must be at least 1'),
  instructions: z.string().optional(),
});

export const submitAssignmentSchema = z.object({
  submissionText: z.string().optional(),
  fileUrl: z.string().url('Invalid file URL').optional(),
});

// Types
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type StudentProfileData = z.infer<typeof studentProfileSchema>;
export type SchoolProfileData = z.infer<typeof schoolProfileSchema>;
export type CreateAssignmentData = z.infer<typeof createAssignmentSchema>;
export type SubmitAssignmentData = z.infer<typeof submitAssignmentSchema>;