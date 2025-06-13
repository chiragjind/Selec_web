import React, { useState } from 'react';
import { Calendar, MapPin, Zap, Sun, TrendingUp, Activity, ChevronDown } from 'lucide-react';

const SolarPlantPage = () => {
  const [selectedPlant, setSelectedPlant] = useState('plant1');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Day');
  const [selectedDate, setSelectedDate] = useState('13 Jun 25');
  const [showPlantDropdown, setShowPlantDropdown] = useState(false);
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Sample plants data - replace with your actual data
  const plants = [
    { 
      id: 'plant1', 
      name: 'Plant A', 
      location: 'Mumbai, Maharashtra',
      totalDevices: 8,
      activeDevices: 6,
      inactiveDevices: 2,
      currentPower: '5.2kW',
      todayEnergy: '25kWh'
    },
    { 
      id: 'plant2', 
      name: 'Plant B', 
      location: 'Pune, Maharashtra',
      totalDevices: 12,
      activeDevices: 10,
      inactiveDevices: 2,
      currentPower: '8.1kW',
      todayEnergy: '42kWh'
    },
    { 
      id: 'plant3', 
      name: 'Plant C', 
      location: 'Nashik, Maharashtra',
      totalDevices: 6,
      activeDevices: 5,
      inactiveDevices: 1,
      currentPower: '3.7kW',
      todayEnergy: '18kWh'
    },
  ];

  const currentPlant = plants.find(p => p.id === selectedPlant) || plants[0];

  const devices = [
    { id: 'all', name: 'All Devices', power: currentPlant.currentPower, energy: currentPlant.todayEnergy, status: 'active' },
    { id: 'inv1', name: 'Inverter 1', power: '2.1kW', energy: '12kWh', status: 'active' },
    { id: 'inv2', name: 'Inverter 2', power: '1.8kW', energy: '8kWh', status: 'active' },
    { id: 'inv3', name: 'Inverter 3', power: '1.3kW', energy: '5kWh', status: 'active' },
    { id: 'inv4', name: 'Inverter 4', power: '0kW', energy: '0kWh', status: 'inactive' },
  ];

  const currentDevice = devices.find(d => d.id === selectedDevice) || devices[0];

  // Sample chart data points
  const chartData = [
    { time: '06:00', power: 0 },
    { time: '07:00', power: 0.8 },
    { time: '08:00', power: 1.5 },
    { time: '09:00', power: 2.2 },
    { time: '10:00', power: 2.8 },
    { time: '11:00', power: 3.2 },
    { time: '12:00', power: 3.6 },
    { time: '13:00', power: 3.4 },
    { time: '14:00', power: 3.1 },
    { time: '15:00', power: 2.7 },
    { time: '16:00', power: 2.2 },
    { time: '17:00', power: 1.5 },
    { time: '18:00', power: 0.8 },
    { time: '19:00', power: 0 },
  ];

  const maxPower = Math.max(...chartData.map(d => d.power));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentPlant.name}</h2>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{currentPlant.location}</span>
          </div>
        </div>

        {/* Plant and Device Selection */}
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Plant Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Plant</label>
            <button
              onClick={() => setShowPlantDropdown(!showPlantDropdown)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 min-w-48"
            >
              <span>{currentPlant.name}</span>
              <ChevronDown size={16} />
            </button>
            
            {showPlantDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
                {plants.map(plant => (
                  <button
                    key={plant.id}
                    onClick={() => {
                      setSelectedPlant(plant.id);
                      setSelectedDevice('all'); // Reset device selection when plant changes
                      setShowPlantDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium">{plant.name}</div>
                    <div className="text-sm text-gray-600">{plant.location}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {plant.activeDevices}/{plant.totalDevices} devices active
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Device Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Device</label>
            <button
              onClick={() => setShowDeviceDropdown(!showDeviceDropdown)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 min-w-48"
            >
              <span>{currentDevice.name}</span>
              <ChevronDown size={16} />
            </button>
            
            {showDeviceDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
                {devices.map(device => (
                  <button
                    key={device.id}
                    onClick={() => {
                      setSelectedDevice(device.id);
                      setShowDeviceDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{device.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Activity className="text-pink-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Current Power</p>
                <p className="text-2xl font-bold">{currentDevice.power}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Sun className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Energy Generated Today</p>
                <p className="text-2xl font-bold">{currentDevice.energy}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Devices</p>
                <p className="text-2xl font-bold">{currentPlant.activeDevices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Inactive Devices</p>
                <p className="text-2xl font-bold">{currentPlant.inactiveDevices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Power Curve Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Power Curve</h3>
              <div className="flex items-center space-x-2">
                <div className="flex bg-gray-100 rounded-lg">
                  {['Day', 'Week', 'Month', 'Year'].map(period => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        selectedTimeframe === period 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Calendar size={16} />
                    <span className="text-sm">{selectedDate}</span>
                  </button>
                  
                  {showCalendar && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10">
                      <input
                        type="date"
                        value="2025-06-13"
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          setSelectedDate(date.toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: '2-digit' 
                          }));
                          setShowCalendar(false);
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-64 relative">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 w-8">
                <span>{maxPower.toFixed(1)}</span>
                <span>{(maxPower * 0.75).toFixed(1)}</span>
                <span>{(maxPower * 0.5).toFixed(1)}</span>
                <span>{(maxPower * 0.25).toFixed(1)}</span>
                <span>0</span>
              </div>
              
              <div className="ml-10 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 240">
                  <defs>
                    <linearGradient id="powerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <g stroke="#e5e7eb" strokeWidth="1" opacity="0.3">
                    <line x1="0" y1="0" x2="400" y2="0" />
                    <line x1="0" y1="60" x2="400" y2="60" />
                    <line x1="0" y1="120" x2="400" y2="120" />
                    <line x1="0" y1="180" x2="400" y2="180" />
                    <line x1="0" y1="240" x2="400" y2="240" />
                  </g>
                  
                  {/* Area fill */}
                  <path
                    d={`M 0 240 ${chartData.map((point, index) => {
                      const x = (index / (chartData.length - 1)) * 400;
                      const y = 240 - (point.power / maxPower) * 240;
                      return `L ${x} ${y}`;
                    }).join(' ')} L 400 240 Z`}
                    fill="url(#powerGradient)"
                  />
                  
                  {/* Line */}
                  <path
                    d={`M ${chartData.map((point, index) => {
                      const x = (index / (chartData.length - 1)) * 400;
                      const y = 240 - (point.power / maxPower) * 240;
                      return `${index === 0 ? '' : 'L '}${x} ${y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  {chartData.map((point, index) => {
                    const x = (index / (chartData.length - 1)) * 400;
                    const y = 240 - (point.power / maxPower) * 240;
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
                
                <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600 px-1">
                  {chartData.filter((_, i) => i % 2 === 0).map(point => (
                    <span key={point.time}>{point.time}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Power(kW)</span>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Environmental Impact */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm">CO2 Reduced</span>
                <div className="bg-black text-white text-xs px-2 py-1 rounded">CO2</div>
              </div>
              <p className="text-2xl font-bold">45kg</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm">Standard Coal Saved</span>
                <TrendingUp size={16} className="text-gray-600" />
              </div>
              <p className="text-2xl font-bold">45kg</p>
            </div>

            {/* Plant Location Map */}
           <div className="bg-white rounded-lg p-4 shadow-sm">
  <h4 className="text-sm font-semibold mb-3">Plant Location</h4>
  <div className="h-48 rounded-lg overflow-hidden">
    <iframe
  title={`plant-map-${currentPlant.name || 'default'}`}
  width="100%"
  height="100%"
  frameBorder="0"
  loading="lazy"
  allowFullScreen
  src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(currentPlant.location)}&key=AIzaSyCnnZFd3rhI1s55YWfZxngj0qbo5URO36Q`}
  className="rounded-lg"
/>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPlantPage;