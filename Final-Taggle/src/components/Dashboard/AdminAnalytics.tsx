import React from 'react';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-2">Admin Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">SEO Rank</p>
          <p className="text-3xl font-bold">#1</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Churn Rate</p>
          <p className="text-3xl font-bold">5%</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Users Joined Today</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Users Left Today</p>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Feature Usage</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p>Analytics</p>
            <p>80%</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Real-time Notifications</p>
            <p>60%</p>
          </div>
          <div className="flex items-center justify-between">
            <p>CRM Integrations</p>
            <p>40%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
