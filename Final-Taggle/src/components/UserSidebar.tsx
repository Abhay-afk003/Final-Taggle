import React from 'react';
import { Home, Settings } from 'lucide-react';

const UserSidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home size={20} />, name: 'Dashboard' },
    { icon: <Settings size={20} />, name: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-full mr-2"></div>
        <span className="font-bold text-lg">Taggle</span>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a href="#" className="flex items-center p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;
