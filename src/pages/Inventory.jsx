import React, { useState } from 'react';
import { 
  MapPin, 
  Check, 
  ArrowLeft,
  Hash,
  Tag,
  Zap,
  Building,
  Map
} from 'lucide-react';

const AddInventory = () => {
  const [currentView, setCurrentView] = useState('selectOption'); // 'selectOption', 'addPlant', 'addInverter'
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showMap, setShowMap] = useState(false);
  
  const [plantData, setPlantData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const [inverterData, setInverterData] = useState({
    slaveId: '',
    serialNumber: '',
    rating: ''
  });

  // Sample existing plants
  const existingPlants = [
    {
      id: 1,
      name: "Plant A",
      location: "Mumbai, Maharashtra",
      activeDevices: 12,
      totalDevices: 15
    },
    {
      id: 2,
      name: "Plant B",
      location: "Pune, Maharashtra",
      activeDevices: 8,
      totalDevices: 10
    }
  ];

  // Sample inverter ratings
  const inverterRatings = [
    { id: 1, rating: "5kW", model: "INV-5K-001" },
    { id: 2, rating: "10kW", model: "INV-10K-001" },
    { id: 3, rating: "15kW", model: "INV-15K-001" },
    { id: 4, rating: "20kW", model: "INV-20K-001" },
    { id: 5, rating: "25kW", model: "INV-25K-001" }
  ];

  const handlePlantInputChange = (field, value) => {
    setPlantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInverterInputChange = (field, value) => {
    setInverterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMapSelect = (lat, lng) => {
    setPlantData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
    setShowMap(false);
  };

  const handleAddPlant = () => {
    console.log('Adding plant:', plantData);
    alert('Plant added successfully!');
    // Create new plant object
    const newPlant = {
      id: existingPlants.length + 1,
      name: plantData.name,
      location: plantData.address,
      activeDevices: 0,
      totalDevices: 0
    };
    setSelectedPlant(newPlant);
    setCurrentView('addInverter');
    setPlantData({ name: '', address: '', latitude: '', longitude: '' });
  };

  const handleAddInverter = () => {
    console.log('Adding inverter:', inverterData);
    alert('Inverter added successfully!');
    setInverterData({ slaveId: '', serialNumber: '', rating: '' });
    setCurrentStep(1);
  };

  const isPlantFormValid = () => {
    return plantData.name && plantData.address && plantData.latitude && plantData.longitude;
  };

  const isInverterFormValid = () => {
    return inverterData.slaveId && inverterData.serialNumber && inverterData.rating;
  };

  const renderSelectOption = () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Add to Inventory
        </h3>
        <p className="text-gray-600">
          Choose whether to add a new plant or add devices to an existing plant
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add New Plant */}
        <button
          onClick={() => setCurrentView('addPlant')}
          className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200 text-left"
        >
          <div className="flex items-center mb-4">
            <Building size={32} className="text-green-600 mr-4" />
            <h4 className="text-lg font-semibold text-gray-800">
              Add New Plant
            </h4>
          </div>
          <p className="text-gray-600 mb-4">
            Create a new plant location with name, address, and map coordinates
          </p>
          <div className="text-sm text-green-600 font-medium">
            → Set up new plant first
          </div>
        </button>

        {/* Add to Existing Plant */}
        <button
          onClick={() => setCurrentView('selectExisting')}
          className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200 text-left"
        >
          <div className="flex items-center mb-4">
            <Zap size={32} className="text-blue-600 mr-4" />
            <h4 className="text-lg font-semibold text-gray-800">
              Add to Existing Plant
            </h4>
          </div>
          <p className="text-gray-600 mb-4">
            Add inverters and devices to an already configured plant
          </p>
          <div className="text-sm text-blue-600 font-medium">
            → Add devices to existing plant
          </div>
        </button>
      </div>
    </div>
  );

  const renderAddPlant = () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('selectOption')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to options
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Add New Plant
        </h3>
        <p className="text-gray-600">
          Enter plant details and select location on map
        </p>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="space-y-6">
          {/* Plant Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plant Name *
            </label>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={plantData.name}
                onChange={(e) => handlePlantInputChange('name', e.target.value)}
                placeholder="Enter plant name (e.g., Solar Plant Alpha)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Plant Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plant Address *
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                value={plantData.address}
                onChange={(e) => handlePlantInputChange('address', e.target.value)}
                placeholder="Enter complete plant address"
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Map Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plant Location *
            </label>
            <div className="border border-gray-300 rounded-lg p-4">
              {plantData.latitude && plantData.longitude ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Selected Coordinates:</p>
                    <p className="font-mono text-sm">
                      {plantData.latitude}, {plantData.longitude}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMap(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change Location
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowMap(true)}
                  className="w-full flex items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Map size={24} className="text-gray-400 mr-3" />
                  <span className="text-gray-600">Click to select location on map</span>
                </button>
              )}
            </div>
          </div>

          {/* Mock Map Modal */}
          {showMap && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Select Plant Location</h4>
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Map size={48} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map Component</p>
                    <p className="text-sm text-gray-500">Click anywhere to select coordinates</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowMap(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleMapSelect('19.0760', '72.8777')} // Mock Mumbai coordinates
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirm Location
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {isPlantFormValid() && (
            <div className="pt-4 border-t">
              <button
                onClick={handleAddPlant}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center font-medium transition-colors"
              >
                <Check size={16} className="mr-2" />
                Add Plant & Continue to Add Devices
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSelectExisting = () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('selectOption')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to options
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Select Existing Plant
        </h3>
        <p className="text-gray-600">
          Choose a plant to add new devices
        </p>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="grid gap-4">
          {existingPlants.map((plant) => (
            <button
              key={plant.id}
              onClick={() => {
                setSelectedPlant(plant);
                setCurrentView('addInverter');
              }}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="font-medium text-gray-900">{plant.name}</div>
              <div className="text-sm text-gray-600 mt-1">{plant.location}</div>
              <div className="text-xs text-gray-500 mt-2">
                {plant.activeDevices}/{plant.totalDevices} devices active
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddInverter = () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => {
            setCurrentView('selectOption');
            setSelectedPlant(null);
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to options
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Add Inverter to {selectedPlant?.name}
        </h3>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2" />
          <span>{selectedPlant?.location}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">
          Manual Device Entry
        </h4>
        
        <div className="space-y-6">
          {/* Step 1: Slave ID */}
          <div className={`p-4 rounded-lg border ${currentStep >= 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <label className="text-sm font-medium text-gray-700">
                Enter Slave ID (as displayed on LCD screen)
              </label>
            </div>
            <div className="ml-9">
              <div className="relative">
                <Hash size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={inverterData.slaveId}
                  onChange={(e) => handleInverterInputChange('slaveId', e.target.value)}
                  placeholder="Enter slave ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Serial Number */}
          <div className={`p-4 rounded-lg border ${currentStep >= 2 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <label className="text-sm font-medium text-gray-700">
                Enter Inverter Serial Number (from side stickers)
              </label>
            </div>
            <div className="ml-9">
              <div className="relative">
                <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={inverterData.serialNumber}
                  onChange={(e) => {
                    handleInverterInputChange('serialNumber', e.target.value);
                    if (e.target.value && currentStep < 2) setCurrentStep(2);
                  }}
                  placeholder="Enter serial number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  disabled={!inverterData.slaveId}
                />
              </div>
            </div>
          </div>

          {/* Step 3: Inverter Rating */}
          <div className={`p-4 rounded-lg border ${currentStep >= 3 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <label className="text-sm font-medium text-gray-700">
                Select Inverter Rating
              </label>
            </div>
            <div className="ml-9">
              <div className="relative">
                <Zap size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={inverterData.rating}
                  onChange={(e) => {
                    handleInverterInputChange('rating', e.target.value);
                    if (e.target.value && currentStep < 3) setCurrentStep(3);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  disabled={!inverterData.serialNumber}
                >
                  <option value="">Select inverter rating</option>
                  {inverterRatings.map((rating) => (
                    <option key={rating.id} value={rating.rating}>
                      {rating.rating} - {rating.model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isInverterFormValid() && (
            <div className="pt-4 border-t">
              <button
                onClick={handleAddInverter}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center font-medium transition-colors"
              >
                <Check size={16} className="mr-2" />
                Add Inverter to Plant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Add Inventory
          </h2>
          <p className="text-gray-600">
            Add new plants and devices to your solar monitoring system
          </p>
        </div>

        {/* Render current view */}
        {currentView === 'selectOption' && renderSelectOption()}
        {currentView === 'addPlant' && renderAddPlant()}
        {currentView === 'selectExisting' && renderSelectExisting()}
        {currentView === 'addInverter' && renderAddInverter()}
      </div>
    </div>
  );
};

export default AddInventory;