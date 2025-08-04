import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { User } from 'firebase/auth';
import WorldMap from '../components/WorldMap';
import Analytics from '../components/Dashboard/Analytics';
import Notifications from '../components/Dashboard/Notifications';
import Crm from '../components/Dashboard/Crm';
import IcpSettings from '../components/IcpSettings';
import NewSidebar from '../components/NewSidebar';

interface DashboardProps {
  user: User | null;
  userPlan?: string; // This is mostly for admin view override
  hideSidebar?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, userPlan: initialPlan, hideSidebar }) => {
  const [userName, setUserName] = useState('');
  const [userPlan, setUserPlan] = useState(initialPlan || '');
  const [selectedView, setSelectedView] = useState('Dashboard');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    // Admin override
    if (initialPlan) {
      setUserPlan(initialPlan);
      // setUserName('Admin View'); // Removed this line
      setIsLoading(false);
      return;
    }

    // Regular user flow
    if (user) {
      setIsLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.name || user.displayName || user.email || 'User');
            setUserPlan(userData.plan || 'free');
          } else {
            // New user default
            setUserName(user.displayName || user.email || 'User');
            setUserPlan('free');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUserName(user.displayName || user.email || 'User');
          setUserPlan('free'); // Default plan on error
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Not logged in
      setIsLoading(false);
      setUserName('Guest');
      setUserPlan('free');
    }
  }, [user, db, initialPlan]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getPlanDisplayName = () => {
    if (userPlan === 'free') return '14-Day Trial';
    if (userPlan === 'solo') return 'Solo';
    if (userPlan === 'pro') return 'Pro';
    if (userPlan === 'admin') return 'Admin';
    return userPlan.charAt(0).toUpperCase() + userPlan.slice(1);
  };

  const renderMainContent = () => {
    switch (selectedView) {
      case 'Dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="glass-card p-4">
                <p className="text-sm text-gray-400">On-Time Arrival</p>
                <p className="text-3xl font-bold">98%</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm text-gray-400">Cargo Moved (tons)</p>
                <p className="text-3xl font-bold">28,429</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm text-gray-400">Active Flights</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {(userPlan === 'pro' || userPlan === 'solo') && <Analytics />}
              {(userPlan === 'pro' || userPlan === 'solo') && <Notifications />}
              {userPlan === 'pro' && <Crm />}
            </div>
            <div className="glass-card p-4">
              <WorldMap />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Flight Status</h2>
              {/* Flight status content here */}
            </div>
          </>
        );
      case 'Inbox':
        return <div>Inbox functionality to be implemented.</div>;
      case 'Settings':
        return <div>Settings functionality to be implemented.</div>;
      case 'ICP Settings':
        return (
          <IcpSettings
            industry={industry}
            setIndustry={setIndustry}
            companySize={companySize}
            setCompanySize={setCompanySize}
          />
        );
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {!hideSidebar && <NewSidebar setView={setSelectedView} userPlan={userPlan} />}
      <div className="flex-1 flex flex-col">
        <header className="w-full p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome, {userName}!
            </h1>
          </div>
          <div className="gradient-button">
            {getPlanDisplayName()}
          </div>
        </header>
        <main className="p-4 flex-1">{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
