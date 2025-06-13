import React, { useState, useEffect, useRef } from "react";
import { Calendar, Factory, Zap , Activity ,Sun} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const SolarDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Google Maps configuration
  const GOOGLE_MAPS_API_KEY = "AIzaSyCnnZFd3rhI1s55YWfZxngj0qbo5URO36Q";

  // Load Google Maps script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.onload = () => setIsMapLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsMapLoaded(true);
    }
  }, [GOOGLE_MAPS_API_KEY]);

  // Initialize map
  useEffect(() => {
    if (isMapLoaded && mapRef.current && window.google) {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            initializeMap(userLocation);
          },
          (error) => {
            console.log("Geolocation error:", error);
            // Fallback to default location if geolocation fails
            const fallbackLocation = { lat: 19.076, lng: 72.8777 };
            initializeMap(fallbackLocation);
          }
        );
      } else {
        // Fallback if geolocation is not supported
        const fallbackLocation = { lat: 19.076, lng: 72.8777 };
        initializeMap(fallbackLocation);
      }
    }
  }, [isMapLoaded]);

  const initializeMap = (location) => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#e3f2fd" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#bbdefb" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      draggable: false,
    });

    // Add marker for solar installation
    new window.google.maps.Marker({
      position: location,
      map: map,
      title: "Solar Installation",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#ef4444",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#ffffff",
      },
    });
  };

  // Generate sample data based on timeframe
  const generateData = (timeframe) => {
    switch (timeframe) {
      case "Day":
        return [
          { time: "06:00", power: 0.2 },
          { time: "07:00", power: 0.8 },
          { time: "08:00", power: 1.5 },
          { time: "09:00", power: 2.1 },
          { time: "10:00", power: 2.8 },
          { time: "11:00", power: 3.2 },
          { time: "12:00", power: 3.5 },
          { time: "13:00", power: 3.1 },
          { time: "14:00", power: 2.9 },
          { time: "15:00", power: 2.4 },
          { time: "16:00", power: 1.8 },
          { time: "17:00", power: 1.2 },
          { time: "18:00", power: 0.5 },
          { time: "19:00", power: 0.1 },
        ];
      case "Week":
        return [
          { time: "Mon", power: 25.2 },
          { time: "Tue", power: 28.8 },
          { time: "Wed", power: 32.1 },
          { time: "Thu", power: 29.5 },
          { time: "Fri", power: 31.2 },
          { time: "Sat", power: 33.8 },
          { time: "Sun", power: 30.1 },
        ];
      case "Month":
        return [
          { time: "Week 1", power: 180.5 },
          { time: "Week 2", power: 195.2 },
          { time: "Week 3", power: 210.8 },
          { time: "Week 4", power: 205.1 },
        ];
      case "Year":
        return [
          { time: "Jan", power: 720.5 },
          { time: "Feb", power: 680.2 },
          { time: "Mar", power: 850.8 },
          { time: "Apr", power: 920.1 },
          { time: "May", power: 980.5 },
          { time: "Jun", power: 1050.2 },
          { time: "Jul", power: 1120.8 },
          { time: "Aug", power: 1080.1 },
          { time: "Sep", power: 950.5 },
          { time: "Oct", power: 880.2 },
          { time: "Nov", power: 780.8 },
          { time: "Dec", power: 720.1 },
        ];
      default:
        return [];
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  // Get unit based on timeframe
  const getUnit = (timeframe) => {
    switch (timeframe) {
      case "Day":
        return "Power(kW)";
      case "Week":
        return "Energy(kWh)";
      case "Month":
        return "Energy(kWh)";
      case "Year":
        return "Energy(kWh)";
      default:
        return "Power(kW)";
    }
  };

  // Get current stats based on timeframe
  const getCurrentStats = (timeframe) => {
    switch (timeframe) {
      case "Day":
        return {
          current: "3.3kW",
          generated: "10 kWh",
          co2: "90kg",
          coal: "90kg",
        };
      case "Week":
        return {
          current: "210.7kWh",
          generated: "70 kWh",
          co2: "630kg",
          coal: "630kg",
        };
      case "Month":
        return {
          current: "791.6kWh",
          generated: "280 kWh",
          co2: "2520kg",
          coal: "2520kg",
        };
      case "Year":
        return {
          current: "10,134kWh",
          generated: "3360 kWh",
          co2: "30,240kg",
          coal: "30,240kg",
        };
      default:
        return {
          current: "3.3kW",
          generated: "10 kWh",
          co2: "90kg",
          coal: "90kg",
        };
    }
  };

  const powerData = generateData(selectedTimeframe);
  const currentStats = getCurrentStats(selectedTimeframe);

  return (
    <div className="h-screen bg-gray-100 p-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Current Power */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">
            {selectedTimeframe === "Day"
              ? "Current Power"
              : `Total Energy (${selectedTimeframe})`}
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {currentStats.current}
          </div>
          <div className="mt-2">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Activity className="text-pink-600" size={24} />
              </div>
          </div>
        </div>

        {/* Energy Generated */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">
            Energy Generated{" "}
            {selectedTimeframe === "Day"
              ? "today"
              : `this ${selectedTimeframe.toLowerCase()}`}
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {currentStats.generated}
          </div>
          <div className="mt-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Sun className="text-green-600" size={24} />
              </div>
          </div>
        </div>

        {/* Energy Generated (Duplicate) */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="h-32 rounded-lg overflow-hidden relative">
              {!isMapLoaded ? (
                <div className="h-full bg-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-sm text-gray-500">Loading map...</div>
                </div>
              ) : (
                <div
                  ref={mapRef}
                  className="w-full h-full rounded-lg"
                  style={{ minHeight: "128px" }}
                />
              )}
              {/* Fallback if geolocation fails */}
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      Loading map...
                    </div>
                    <div className="text-xs text-gray-400">
                      Getting your location
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Power Curve Chart */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Power Curve</h3>
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["Day", "Week", "Month", "Year"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      selectedTimeframe === period
                        ? "bg-black text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <span>{formatDate(selectedDate)}</span>
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="relative"
                  >
                    <Calendar className="w-4 h-4 hover:text-gray-800 cursor-pointer" />
                  </button>
                </div>

                {showCalendar && (
                  <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setShowCalendar(false);
                      }}
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            {getUnit(selectedTimeframe)}
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={powerData}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <Area
                  type="monotone"
                  dataKey="power"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPower)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">Time</div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* CO2 Reduced */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">CO2 Reduced</span>
              <div className="bg-black text-white text-xs px-2 py-1 rounded font-bold">
                CO2
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800">
              {currentStats.co2}
            </div>
          </div>

          {/* Standard Coal Saved */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Standard Coal saved</span>
              <Factory className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">
              {currentStats.coal}
            </div>
          </div>

          {/* Active Devices */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Active Devices</span>
              <Zap className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">4</div>
          </div>

          {/* Inactive Devices */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Inactive Devices</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800">4</div>
          </div>

          {/* Google Map */}
        </div>
      </div>
    </div>
  );
};

export default SolarDashboard;
