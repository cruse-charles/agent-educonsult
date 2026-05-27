export type UserRole = 'consultant' | 'student';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Consultant extends User {
  role: 'consultant';
  studentsCount: number;
  assignmentsCount: number;
}

export interface Student extends User {
  role: 'student';
  consultantId: string;
  profileData?: StudentProfile;
  academicData?: AcademicData;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nationality?: string;
  intendedMajor?: string;
  schoolType?: 'university' | 'highschool';
  phoneNumber?: string;
  address?: string;
}

export interface AcademicData {
  gpa?: number;
  sat?: { verbal?: number; math?: number; total?: number };
  act?: { composite?: number; sections?: Record<string, number> };
  toefl?: { score?: number; date?: string };
  ielts?: { score?: number; date?: string };
}

export type AssignmentStatus = 'not_started' | 'in_progress' | 'submitted' | 'under_review' | 'completed';
export type AssignmentPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TimelineEvent {
  id: string;
  type: 'created' | 'updated' | 'commented' | 'submitted' | 'reviewed';
  timestamp: Date;
  userId?: string;
  message?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: AssignmentPriority;
  status: AssignmentStatus;
  category?: string;
  studentIds: string[];
  consultantId: string;
  folderId?: string;
  subtasks?: Subtask[];
  createdAt: Date;
  updatedAt: Date;
  timeline: TimelineEvent[];
}

export interface ApplicationDeadline {
  name: string;
  date: Date;
}

export interface School {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  location: { city: string; state: string; country: string };
  ranking?: number;
  acceptanceRate?: number;
  tuition?: number;
  majors?: string[];
  academicRequirements?: {
    gpaRange?: { min: number; max: number };
    satRange?: { min: number; max: number };
    actRange?: { min: number; max: number };
    toeflRange?: { min: number; max: number };
    ieltsBand?: { min: number; max: number };
  };
  deadlines?: ApplicationDeadline[];
  financialAid?: string;
  campusSetting?: string;
  metadata: { source: string; lastUpdated: Date; confidence: number };
}

export type ApplicationStatus = 'researching' | 'planning' | 'applying' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted';

export interface Essay {
  id: string;
  title: string;
  prompt: string;
  wordCount?: number;
  status: 'draft' | 'reviewing' | 'approved';
  revisionCount: number;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recommendation {
  id: string;
  recommenderName: string;
  recommenderRole: string;
  status: 'pending' | 'submitted';
  requestedDate: Date;
  submitDate?: Date;
}

export interface Interview {
  id: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  scheduledDate?: Date;
  notes?: string;
}

export interface Application {
  id: string;
  studentId: string;
  schoolId: string;
  status: ApplicationStatus;
  appliedDate?: Date;
  deadlines?: { earlyAction?: Date; earlyDecision?: Date; regularDecision?: Date };
  essays?: Essay[];
  recommendations?: Recommendation[];
  interviews?: Interview[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'deadline' | 'feedback' | 'comment' | 'message';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}