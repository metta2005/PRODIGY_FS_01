import React, { useMemo } from 'react';
import { passwordStrength } from '../utils/validation';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { score, feedback } = useMemo(() => passwordStrength(password), [password]);
  
  const getColorClass = (score: number) => {
    switch (score) {
      case 0: return 'bg-gray-300';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-400';
      case 5: return 'bg-green-600';
      default: return 'bg-gray-300';
    }
  };
  
  const getWidthClass = (score: number) => {
    switch (score) {
      case 0: return 'w-0';
      case 1: return 'w-1/5';
      case 2: return 'w-2/5';
      case 3: return 'w-3/5';
      case 4: return 'w-4/5';
      case 5: return 'w-full';
      default: return 'w-0';
    }
  };
  
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColorClass(score)} ${getWidthClass(score)} transition-all duration-300`}
        ></div>
      </div>
      <p className="text-xs mt-1 text-gray-600">{feedback}</p>
    </div>
  );
};

export default PasswordStrengthMeter;