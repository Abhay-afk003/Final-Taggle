import React from 'react';
import IcpSettings from './IcpSettings';
import Analytics from './Dashboard/Analytics';
import Notifications from './Dashboard/Notifications';
import Crm from './Dashboard/Crm';

interface SidebarProps {
  userPlan?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userPlan }) => {
  return (
    <div className="w-80 bg-purple-900/30 p-4 rounded-lg flex flex-col gap-8">
      <IcpSettings />

      <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">
          Get Your Leads
        </h2>
        <div className="flex flex-col gap-2">
          <input
            className="w-full bg-black/20 text-white p-2 rounded-lg border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="email"
            placeholder="Enter your email"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full">
            Send to Inbox
          </button>
        </div>
      </div>

      {(userPlan === 'pro' || userPlan === 'solo') && (
        <>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Analytics
            </h2>
            <Analytics />
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Real-time Notifications
            </h2>
            <Notifications />
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              CRM Integrations
            </h2>
            <Crm />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
