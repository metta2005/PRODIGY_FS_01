import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema, validateForm } from '../utils/validation';

const LoginPage = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    clearError();
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(loginSchema, formData);
    
    if (!validation.success) {
      setFormErrors(validation.errors || {});
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password, formData.remember);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account to continue
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
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          autoComplete="email"
          required
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          autoComplete="current-password"
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Forgot password?
          </Link>
        </div>
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign in
        </Button>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;