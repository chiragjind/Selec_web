import React from 'react';
import { BarChart3, Zap, AlertTriangle, FileText, Plus, Settings, User } from 'lucide-react';

const Sidebar = ({ setCurrentView, currentView }) => {
  const items = [
    { name: 'Dashboard', icon: BarChart3, view: 'dashboard' },
    { name: 'Plant', icon: Zap, view: 'plant' },
    { name: 'Alerts', icon: AlertTriangle, view: 'alerts' },
    { name: 'Reports', icon: FileText, view: 'reports' },
    { name: 'Add Inventory', icon: Plus, view: 'inventory' },
    { name: 'Settings', icon: Settings, view: 'settings' },
    { name: 'Me', icon: User, view: 'profile' }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Solar Monitor</h1>
      {items.map(item => (
        <button
  key={item.name}
  onClick={() => setCurrentView(item.view)}
  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${currentView === item.view ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
>
  <item.icon className="w-5 h-5" />
  {item.name}
</button>
      ))}
    </div>
  );
};

export default Sidebar;
