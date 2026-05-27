import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['consultant', 'student']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const studentProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  intendedMajor: z.string().optional(),
  schoolType: z.enum(['university', 'highschool']).optional(),
  gpa: z.number().optional(),
  sat: z.object({
    verbal: z.number().optional(),
    math: z.number().optional(),
    total: z.number().optional(),
  }).optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  status: z.enum(['not_started', 'in_progress', 'submitted', 'under_review', 'completed']).optional().default('not_started'),
  category: z.string().optional(),
  studentIds: z.array(z.string()).min(1, 'At least one student is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;