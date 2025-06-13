import React, { useState } from 'react';
import { Calendar, Zap, TrendingUp, Activity, Thermometer, Shield, Power } from 'lucide-react';

const PlantDeviceMonitoringReport = () => {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');

  // Sample data - in a real application, this would come from an API
  const plants = [
    { id: 'plant1', name: 'Solar Plant A', location: 'Maharashtra, India' },
    { id: 'plant2', name: 'Solar Plant B', location: 'Gujarat, India' },
    { id: 'plant3', name: 'Solar Plant C', location: 'Rajasthan, India' }
  ];

  const devices = {
    plant1: [
      { id: 'C102102A02-01', name: 'C102102A02-01', type: 'CREST10' },
      { id: 'C102102A02-02', name: 'C102102A02-02', type: 'CREST15' }
    ],
    plant2: [
      { id: 'C102102B01-01', name: 'C102102B01-01', type: 'CREST10' },
      { id: 'C102102B01-02', name: 'C102102B01-02', type: 'CREST20' }
    ],
    plant3: [
      { id: 'C102102C01-01', name: 'C102102C01-01', type: 'CREST10' }
    ]
  };

  // Sample monitoring data
  const monitoringData = {
    'C102102A02-01': {
      deviceId: 'C102102A02-01',
      deviceType: 'CREST10',
      installDate: '21 March 2021',
      status: 'Working',
      todayGeneration: '20.5kWh',
      totalGeneration: '100.5kWh',
      weekGeneration: '40.5kWh',
      monthGeneration: '8506kWh',
      acPower: '8560.5kW',
      reactivePower: '0.0kVar',
      acVoltage: '234.5/232.6/233.3V',
      acCurrent: '5.5/5.6/5.3A',
      dcVoltage1: '500.0V/8.2A',
      dcVoltage2: '500.0V/8.2A',
      insulationResistance: '1000kOhms',
      temperature: '55°C'
    },
    'C102102A02-02': {
      deviceId: 'C102102A02-02',
      deviceType: 'CREST15',
      installDate: '15 April 2021',
      status: 'Working',
      todayGeneration: '25.3kWh',
      totalGeneration: '120.8kWh',
      weekGeneration: '52.1kWh',
      monthGeneration: '9240kWh',
      acPower: '9800.2kW',
      reactivePower: '0.5kVar',
      acVoltage: '235.1/233.2/234.8V',
      acCurrent: '6.2/6.1/6.0A',
      dcVoltage1: '520.5V/9.1A',
      dcVoltage2: '518.2V/8.9A',
      insulationResistance: '1200kOhms',
      temperature: '52°C'
    },
    'C102102B01-01': {
      deviceId: 'C102102B01-01',
      deviceType: 'CREST10',
      installDate: '10 May 2021',
      status: 'Working',
      todayGeneration: '18.2kWh',
      totalGeneration: '95.3kWh',
      weekGeneration: '38.7kWh',
      monthGeneration: '8102kWh',
      acPower: '8120.3kW',
      reactivePower: '0.2kVar',
      acVoltage: '233.8/231.9/232.5V',
      acCurrent: '5.3/5.4/5.2A',
      dcVoltage1: '498.5V/8.0A',
      dcVoltage2: '499.2V/8.1A',
      insulationResistance: '1050kOhms',
      temperature: '53°C'
    },
    'C102102B01-02': {
      deviceId: 'C102102B01-02',
      deviceType: 'CREST20',
      installDate: '12 May 2021',
      status: 'Working',
      todayGeneration: '28.7kWh',
      totalGeneration: '135.6kWh',
      weekGeneration: '58.3kWh',
      monthGeneration: '9856kWh',
      acPower: '10250.8kW',
      reactivePower: '0.8kVar',
      acVoltage: '236.2/234.1/235.3V',
      acCurrent: '6.8/6.9/6.7A',
      dcVoltage1: '525.3V/9.8A',
      dcVoltage2: '523.8V/9.6A',
      insulationResistance: '1300kOhms',
      temperature: '49°C'
    },
    'C102102C01-01': {
      deviceId: 'C102102C01-01',
      deviceType: 'CREST10',
      installDate: '20 June 2021',
      status: 'Working',
      todayGeneration: '19.8kWh',
      totalGeneration: '98.7kWh',
      weekGeneration: '42.1kWh',
      monthGeneration: '8345kWh',
      acPower: '8340.7kW',
      reactivePower: '0.1kVar',
      acVoltage: '234.2/232.8/233.6V',
      acCurrent: '5.4/5.5/5.3A',
      dcVoltage1: '501.2V/8.3A',
      dcVoltage2: '500.8V/8.2A',
      insulationResistance: '1100kOhms',
      temperature: '54°C'
    }
  };

  const currentData = selectedDevice ? monitoringData[selectedDevice] : null;

  const selectedPlantData = plants.find(plant => plant.id === selectedPlant);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedPlantData ? selectedPlantData.name : 'Plant Device Monitoring Report'}
          </h2>
          <div className="flex items-center text-gray-600">
            <span>Real-time monitoring and performance analytics</span>
          </div>
        </div>

        {/* Plant and Device Selection */}
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Plant Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Plant
            </label>
            <select 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={selectedPlant}
              onChange={(e) => {
                setSelectedPlant(e.target.value);
                setSelectedDevice('');
              }}
            >
              <option value="">Choose a plant...</option>
              {plants.map(plant => (
                <option key={plant.id} value={plant.id}>{plant.name}</option>
              ))}
            </select>
          </div>
          
          {/* Device Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Device
            </label>
            <select 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              disabled={!selectedPlant}
            >
              <option value="">Choose a device...</option>
              {selectedPlant && devices[selectedPlant]?.map(device => (
                <option key={device.id} value={device.id}>{device.name} ({device.type})</option>
              ))}
            </select>
          </div>
        </div>

        {currentData && (
          <div className="max-w-7xl mx-auto">
            {/* All the monitoring sections will be inside this container */}
            {/* Device Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Activity className="mr-2 text-blue-600" />
                Device Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Device ID</p>
                  <p className="text-lg font-semibold text-gray-800">{currentData.deviceId}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Device Type</p>
                  <p className="text-lg font-semibold text-gray-800">{currentData.deviceType}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Install Date</p>
                  <p className="text-lg font-semibold text-gray-800">{currentData.installDate}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">{currentData.status}</p>
                </div>
              </div>
            </div>

            {/* Generation Monitoring */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-600" />
                Generation Monitoring
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Today Generation</p>
                      <p className="text-2xl font-bold">{currentData.todayGeneration}</p>
                    </div>
                    <Calendar className="text-blue-200" size={32} />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Generation</p>
                      <p className="text-2xl font-bold">{currentData.totalGeneration}</p>
                    </div>
                    <Zap className="text-green-200" size={32} />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">This Week</p>
                      <p className="text-2xl font-bold">{currentData.weekGeneration}</p>
                    </div>
                    <TrendingUp className="text-purple-200" size={32} />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">This Month</p>
                      <p className="text-2xl font-bold">{currentData.monthGeneration}</p>
                    </div>
                    <Calendar className="text-orange-200" size={32} />
                  </div>
                </div>
              </div>
            </div>

            {/* Power Parameters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Power className="mr-2 text-yellow-600" />
                Power Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600">AC Power</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.acPower}</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-sm text-gray-600">Reactive Power</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.reactivePower}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">AC Voltage</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.acVoltage}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-gray-600">AC Current</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.acCurrent}</p>
                  </div>
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <p className="text-sm text-gray-600">DC Voltage/Current 1</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.dcVoltage1}</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <p className="text-sm text-gray-600">DC Voltage/Current 2</p>
                    <p className="text-xl font-semibold text-gray-800">{currentData.dcVoltage2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Parameters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="mr-2 text-red-600" />
                System Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Insulation Resistance</p>
                      <p className="text-2xl font-bold text-gray-800">{currentData.insulationResistance}</p>
                    </div>
                    <Shield className="text-red-500" size={32} />
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-2xl font-bold text-gray-800">{currentData.temperature}</p>
                    </div>
                    <Thermometer className="text-orange-500" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedDevice && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Activity className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Select Plant and Device</h3>
              <p className="text-gray-500">Choose a plant and device from the dropdowns above to view monitoring data</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlantDeviceMonitoringReport;