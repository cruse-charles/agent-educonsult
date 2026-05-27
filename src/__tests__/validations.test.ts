import { loginSchema, signupSchema, forgotPasswordSchema } from '@/lib/validations';

describe('Zod Validations', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(() => loginSchema.parse(data)).not.toThrow();
    });

    it('rejects invalid email', () => {
      const data = {
        email: 'invalid-email',
        password: 'password123',
      };
      expect(() => loginSchema.parse(data)).toThrow();
    });

    it('rejects short password', () => {
      const data = {
        email: 'test@example.com',
        password: 'pass',
      };
      expect(() => loginSchema.parse(data)).toThrow();
    });
  });

  describe('signupSchema', () => {
    it('validates correct signup data', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'student' as const,
      };
      expect(() => signupSchema.parse(data)).not.toThrow();
    });

    it('rejects mismatched passwords', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456',
        role: 'student' as const,
      };
      expect(() => signupSchema.parse(data)).toThrow();
    });

    it('validates both student and consultant roles', () => {
      const studentData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'student' as const,
      };
      expect(() => signupSchema.parse(studentData)).not.toThrow();

      const consultantData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'consultant' as const,
      };
      expect(() => signupSchema.parse(consultantData)).not.toThrow();
    });
  });

  describe('forgotPasswordSchema', () => {
    it('validates correct email', () => {
      const data = { email: 'test@example.com' };
      expect(() => forgotPasswordSchema.parse(data)).not.toThrow();
    });

    it('rejects invalid email', () => {
      const data = { email: 'invalid-email' };
      expect(() => forgotPasswordSchema.parse(data)).toThrow();
    });
  });
});
