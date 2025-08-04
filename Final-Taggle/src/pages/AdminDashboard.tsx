import React, { useState } from 'react';
import Dashboard from './Dashboard';
import UserActivity from '../components/Dashboard/UserActivity';
import AdminAnalytics from '../components/Dashboard/AdminAnalytics';
import IcpSettings from '../components/IcpSettings';
import NewSidebar from '../components/NewSidebar';

const AdminDashboard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [selectedView, setSelectedView] = useState('Dashboard');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === 'Abhay_Taggle_2003') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="p-8 rounded-lg bg-gray-800/50">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-700 text-white p-2 rounded-lg w-full mb-4"
            placeholder="Enter password"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <NewSidebar setView={setSelectedView} userPlan={selectedPlan} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="mt-4">
            <label htmlFor="plan-select" className="mr-2">
              Select Plan View:
            </label>
            <select
              id="plan-select"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg"
            >
              <option value="free">14-Day Trial</option>
              <option value="lite">Lite</option>
              <option value="solo">Solo</option>
              <option value="pro">Pro</option>
              <option value="admin-analytics">Admin Analytics</option>
            </select>
          </div>
        </div>
        <div className="flex-1 p-4">
          {selectedView === 'Dashboard' && (
            selectedPlan === 'admin-analytics' ? (
              <>
                <AdminAnalytics />
                <UserActivity />
              </>
            ) : (
              <Dashboard user={null} userPlan={selectedPlan} hideSidebar={true} />
            )
          )}
          {selectedView === 'ICP Settings' && (
            <IcpSettings
              industry={industry}
              setIndustry={setIndustry}
              companySize={companySize}
              setCompanySize={setCompanySize}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
