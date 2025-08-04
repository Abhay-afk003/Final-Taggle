import React from 'react';
import { Settings, BarChart2, Bell, Mail, Users, Search } from 'lucide-react';

interface NewSidebarProps {
  userPlan?: string;
  setView: (view: string) => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ userPlan, setView }) => {
  const menuItems = [
    { icon: <Mail size={20} />, name: 'Inbox', plans: ['free', 'lite', 'solo', 'pro'] },
    { icon: <BarChart2 size={20} />, name: 'Analytics', plans: ['solo', 'pro'] },
    { icon: <Bell size={20} />, name: 'Notifications', plans: ['solo', 'pro'] },
    { icon: <Users size={20} />, name: 'CRM Integrations', plans: ['pro'] },
    { icon: <Settings size={20} />, name: 'Settings' },
    { icon: <Search size={20} />, name: 'ICP Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-full mr-2"></div>
        <span className="font-bold text-lg">Taggle</span>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => {
            if (item.plans && !item.plans.includes(userPlan || '')) {
              return null;
            }
            return (
              <li key={item.name} className="mb-2">
                <a href="#" onClick={() => setView(item.name)} className="flex items-center p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NewSidebar;
