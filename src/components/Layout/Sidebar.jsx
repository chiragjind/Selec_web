import React, { useState } from 'react';
import { BarChart3, Zap, AlertTriangle, FileText, Plus, Settings, User, Menu } from 'lucide-react';

const Sidebar = ({ setCurrentView, currentView }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const items = [
    { name: 'Dashboard', icon: BarChart3, view: 'dashboard', color: 'text-blue-400' },
    { name: 'Plant', icon: Zap, view: 'plant', color: 'text-green-400' },
    { name: 'Alerts', icon: AlertTriangle, view: 'alerts', color: 'text-red-400' },
    { name: 'Reports', icon: FileText, view: 'reports', color: 'text-purple-400' },
    { name: 'Add Inventory', icon: Plus, view: 'inventory', color: 'text-orange-400' },
    { name: 'Settings', icon: Settings, view: 'settings', color: 'text-gray-400' },
    { name: 'Me', icon: User, view: 'profile', color: 'text-pink-400' }
  ];

  return (
    <>
      {/* Background Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-500 ease-in-out"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`bg-gray-900 text-white min-h-screen p-4 transition-all duration-500 ease-in-out relative z-50 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        style={{
          boxShadow: isExpanded 
            ? '8px 0 32px rgba(0, 0, 0, 0.3), 16px 0 64px rgba(0, 0, 0, 0.15)' 
            : '4px 0 16px rgba(0, 0, 0, 0.1), 8px 0 24px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Menu className={`w-6 h-6 text-yellow-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-20 opacity-100' : 'max-h-12 opacity-100'}`}>
            {isExpanded ? (
              <h1 className="text-2xl font-bold text-yellow-400 mt-4 text-center transform transition-all duration-300 ease-in-out">
                Solar Monitor
              </h1>
            ) : (
              <div className="text-lg font-bold text-yellow-400 text-center mt-2 transform transition-all duration-300 ease-in-out">
                SM
              </div>
            )}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="space-y-1">
          {items.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-x-1 ${
                currentView === item.view 
                  ? 'bg-blue-600 shadow-lg' 
                  : 'hover:bg-gray-800'
              }`}
              style={{
                transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
              }}
              title={!isExpanded ? item.name : ''}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                currentView === item.view ? 'text-white' : item.color
              }`} />
              <span className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;