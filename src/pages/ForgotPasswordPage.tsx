import { AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useAuth } from '../contexts/AuthContext';
import { forgotPasswordSchema, validateForm } from '../utils/validation';

const ForgotPasswordPage = () => {
  const { resetPassword, error, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearError();
    
    // Clear error when user starts typing
    if (formErrors.email) {
      setFormErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(forgotPasswordSchema, { email });
    
    if (!validation.success) {
      setFormErrors(validation.errors || {});
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-2 text-sm text-gray-600">
            We have sent a password reset link to {email}
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the email?{' '}
            <button 
              type="button" 
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Try again
            </button>
          </p>
          <p className="mt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Forgot password?</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={email}
          onChange={handleChange}
          error={formErrors.email}
          autoComplete="email"
          required
        />
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Reset password
        </Button>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
            Back to sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;