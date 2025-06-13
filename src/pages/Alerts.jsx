import React from "react";
import { AlertTriangle } from "lucide-react";

const alerts = [
  {
    device: "C102102A02-01",
    plant: "Selec_27_1",
    error: "PHASE_OV",
    remedy: "Check grid voltage",
  },
  {
    device: "C102102A02-02",
    plant: "Selec_27_2",
    error: "DC_OV",
    remedy: "Check PV array wiring",
  },
  {
    device: "C102102A02-03",
    plant: "Selec_28_1",
    error: "OV_TEMPERATURE",
    remedy: "Ensure proper ventilation",
  },
];

const AlertPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          Inverter Fault Alerts
        </h1>
        <p className="text-gray-600 mt-1">Monitor critical device faults and suggested remedies.</p>
      </div>

      <div className="overflow-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Error</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Remedy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alerts.map((alert, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{alert.device}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{alert.plant}</td>
                <td className="px-6 py-4 text-sm text-red-600 font-semibold">{alert.error}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{alert.remedy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertPage;
