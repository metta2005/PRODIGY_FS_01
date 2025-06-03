import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean, errors?: Record<string, string> } => {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          errors[err.path[0]] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { form: 'Validation failed' } };
  }
};

export const passwordStrength = (password: string): { score: number, feedback: string } => {
  if (!password) return { score: 0, feedback: 'No password provided' };
  
  let score = 0;
  let feedback = '';

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Common patterns
  if (/(.)\1\1/.test(password)) {
    score -= 1;
    feedback = 'Avoid repeating characters';
  }
  
  if (/^(123|abc|qwerty|password|admin)/i.test(password)) {
    score -= 1;
    feedback = 'Avoid common patterns';
  }
  
  // Cap the score
  score = Math.max(0, Math.min(5, score));
  
  if (score === 0) feedback = 'Very weak password';
  else if (score === 1) feedback = 'Weak password';
  else if (score === 2) feedback = 'Fair password';
  else if (score === 3) feedback = 'Good password';
  else if (score === 4) feedback = 'Strong password';
  else feedback = 'Very strong password';
  
  return { score, feedback };
};