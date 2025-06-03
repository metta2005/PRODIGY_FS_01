import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuth } from '../contexts/AuthContext';
import { registerSchema, validateForm } from '../utils/validation';

const RegisterPage = () => {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearError();
    setFormData({
      ...formData,
      [name]: value,
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
    
    const validation = validateForm(registerSchema, formData);
    
    if (!validation.success) {
      setFormErrors(validation.errors || {});
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.email, formData.password, formData.name);
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
        <h1 className="text-3xl font-extrabold text-gray-900">Create an account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to get started with SecureAuth
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
          id="name"
          name="name"
          type="text"
          label="Full name"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          autoComplete="name"
          required
        />
        
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
        
        <div>
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            autoComplete="new-password"
            required
          />
          {formData.password && <PasswordStrengthMeter password={formData.password} />}
        </div>
        
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          autoComplete="new-password"
          required
        />
        
        <div className="mt-6">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Create account
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;