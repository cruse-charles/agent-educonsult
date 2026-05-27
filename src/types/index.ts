// User types
export type UserType = 'student' | 'school' | 'admin';

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
  profileComplete: boolean;
}

export interface StudentProfile extends User {
  schoolName?: string;
  gradeLevel?: string;
  bio?: string;
  phoneNumber?: string;
  assignments?: string[];
}

export interface SchoolProfile extends User {
  schoolName: string;
  location?: string;
  description?: string;
  website?: string;
  phoneNumber?: string;
  assignments?: string[];
  teachers?: string[];
}

// Assignment types
export interface Assignment {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  dueDate: Date;
  maxScore: number;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'active' | 'closed' | 'archived';
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionText?: string;
  fileUrl?: string;
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Auth state
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}