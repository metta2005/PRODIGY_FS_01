import { Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  
  // Format the date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
      </header>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
        </div>
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-lg text-gray-900">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-lg text-gray-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account created</dt>
              <dd className="mt-1 text-lg text-gray-900">{formatDate(user?.createdAt || '')}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account ID</dt>
              <dd className="mt-1 text-lg text-gray-900">{user?.id}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                <p className="mt-1 text-sm text-gray-500">Your account security information</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-500">Last changed: Never</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Change</button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                  <p className="text-sm text-gray-500">Not enabled</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Enable</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">Security Status</h3>
                <p className="mt-1 text-sm text-gray-500">Your account security overview</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="h-4 w-4 rounded-full bg-green-400 flex items-center justify-center">
                      <span className="h-2 w-2 bg-white rounded-full"></span>
                    </span>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Account is secure</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="h-4 w-4 rounded-full bg-yellow-400 flex items-center justify-center">
                      <span className="h-2 w-2 bg-white rounded-full"></span>
                    </span>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Two-factor authentication not enabled</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="h-4 w-4 rounded-full bg-green-400 flex items-center justify-center">
                      <span className="h-2 w-2 bg-white rounded-full"></span>
                    </span>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">No suspicious activity detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;