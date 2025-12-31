import {
  AlertTriangle,
  BarChart3,
  Bell,
  Camera,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Download,
  Eye,
  Filter,
  Fuel,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Shield,
  Star,
  Truck,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";

const TruckerMobileApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentTrip, setCurrentTrip] = useState({
    id: "TRP-2024-001",
    status: "in-progress",
    origin: "Dallas, TX",
    destination: "Atlanta, GA",
    miles: 925,
    rate: 2150.0,
    dispatcher: "Elite Logistics",
    estimatedDelivery: "2024-12-16 14:00",
    startTime: "2024-12-15 08:00",
    progress: 42, // percentage
  });

  const [todaysStats, setTodaysStats] = useState({
    milesThisTrip: 387,
    hoursRemaining: 6.5,
    earnings: 892.5,
    fuelStops: 2,
  });

  const [availableDispatchers, setAvailableDispatchers] = useState([
    {
      id: 1,
      company: "Elite Logistics",
      rating: 4.8,
      reviews: 127,
      commission: 8,
      specialties: ["Dedicated lanes", "Quick pay"],
      current: true,
    },
    {
      id: 2,
      company: "FreightPro Dispatch",
      rating: 4.6,
      reviews: 89,
      commission: 7,
      specialties: ["Midwest routes", "Fuel advances"],
    },
    {
      id: 3,
      company: "Highway Heroes",
      rating: 4.9,
      reviews: 203,
      commission: 9,
      specialties: ["Family owned", "24/7 support"],
    },
  ]);

  // Tab Navigation Component
  const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex flex-col items-center space-y-1 px-2 py-3 min-w-0 transition-colors ${
        active ? "text-blue-600" : "text-gray-500"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium truncate">{label}</span>
    </button>
  );

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case "available":
          return "bg-green-100 text-green-800 border-green-200";
        case "in-progress":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "delivered":
          return "bg-green-100 text-green-800 border-green-200";
        case "offline":
          return "bg-gray-100 text-gray-800 border-gray-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor()}`}
      >
        {status.replace("-", " ")}
      </span>
    );
  };

  // Dispatcher Card Component
  const DispatcherCard = ({ dispatcher, onSelect, onViewDetails }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{dispatcher.company}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.floor(dispatcher.rating)
                      ? "text-orange-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                {dispatcher.rating} ({dispatcher.reviews})
              </span>
            </div>
          </div>
        </div>
        {dispatcher.current && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Current
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Commission:</span>
          <span className="font-medium text-orange-600">
            {dispatcher.commission}%
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {dispatcher.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        {!dispatcher.current ? (
          <>
            <button
              onClick={() => onSelect(dispatcher)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium"
            >
              Select
            </button>
            <button
              onClick={() => onViewDetails(dispatcher)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium"
            >
              Details
            </button>
          </>
        ) : (
          <button className="w-full border border-blue-300 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium">
            Manage Contract
          </button>
        )}
      </div>
    </div>
  );

  // Home Screen
  const HomeScreen = () => (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good morning, Mike
          </h1>
          <p className="text-gray-600">Ready to roll?</p>
        </div>
        <div className="relative">
          <button className="p-2 rounded-lg bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Current Trip Status */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-blue-900">Current Trip</h3>
          <StatusBadge status={currentTrip.status} />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-700">{currentTrip.origin}</span>
            <span className="text-sm text-blue-700">
              {currentTrip.destination}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentTrip.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-blue-600">
              {todaysStats.milesThisTrip} miles
            </span>
            <span className="text-xs text-blue-600">
              {currentTrip.miles} total
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-blue-700">Rate:</span>
            <span className="font-bold text-green-600 ml-1">
              ${currentTrip.rate}
            </span>
          </div>
          <div>
            <span className="text-blue-700">ETA:</span>
            <span className="font-medium text-blue-900 ml-1">Tomorrow 2PM</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-green-700 transition-colors">
          <CheckCircle className="h-6 w-6" />
          <div className="text-center">
            <div className="font-semibold">Mark Delivered</div>
            <div className="text-xs text-green-100">Current load</div>
          </div>
        </button>

        <button className="bg-orange-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-orange-700 transition-colors">
          <Camera className="h-6 w-6" />
          <div className="text-center">
            <div className="font-semibold">Document</div>
            <div className="text-xs text-orange-100">BOL, damage, etc.</div>
          </div>
        </button>
      </div>

      {/* Today's Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          Today's Numbers
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {todaysStats.milesThisTrip}
            </div>
            <div className="text-sm text-gray-600">Miles driven</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {todaysStats.hoursRemaining}h
            </div>
            <div className="text-sm text-gray-600">Drive time left</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ${todaysStats.earnings}
            </div>
            <div className="text-sm text-gray-600">Earned today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysStats.fuelStops}
            </div>
            <div className="text-sm text-gray-600">Fuel stops</div>
          </div>
        </div>
      </div>

      {/* Quick Access to Dispatcher */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {currentTrip.dispatcher}
              </p>
              <p className="text-sm text-gray-600">Current dispatcher</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
              <Phone className="h-4 w-4 text-green-600" />
            </button>
            <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dispatchers Screen
  const DispatchersScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dispatchers</h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-gray-100">
            <Search className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100">
            <Filter className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Current Dispatcher */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-3">
          Your Current Dispatcher
        </h3>
        {availableDispatchers
          .filter((d) => d.current)
          .map((dispatcher) => (
            <DispatcherCard
              key={dispatcher.id}
              dispatcher={dispatcher}
              onSelect={() => {}}
              onViewDetails={() => {}}
            />
          ))}
      </div>

      {/* Browse Other Dispatchers */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Available Dispatchers
        </h3>
        <div className="space-y-3">
          {availableDispatchers
            .filter((d) => !d.current)
            .map((dispatcher) => (
              <DispatcherCard
                key={dispatcher.id}
                dispatcher={dispatcher}
                onSelect={(d) => alert(`Selected ${d.company}!`)}
                onViewDetails={(d) => alert(`Viewing details for ${d.company}`)}
              />
            ))}
        </div>
      </div>

      {/* Switch Dispatcher Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900">
              Switching Dispatchers
            </h4>
            <p className="text-sm text-amber-800 mt-1">
              Your data stays with you when you switch. Complete any active
              trips first for a smooth transition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Documents Screen
  const DocumentsScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
          <Camera className="h-4 w-4" />
          <span>Scan</span>
        </button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg mx-auto w-fit mb-3">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900">BOL Documents</h3>
          <p className="text-sm text-gray-600 mt-1">47 documents</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg mx-auto w-fit mb-3">
            <Fuel className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900">Fuel Receipts</h3>
          <p className="text-sm text-gray-600 mt-1">128 receipts</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="p-3 bg-orange-50 rounded-lg mx-auto w-fit mb-3">
            <Shield className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="font-medium text-gray-900">Insurance</h3>
          <p className="text-sm text-gray-600 mt-1">Current policy</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="p-3 bg-purple-50 rounded-lg mx-auto w-fit mb-3">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900">Expenses</h3>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Documents</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">BOL - TRP-2024-001</p>
                <p className="text-sm text-gray-600">Dec 15, 2024 • 2.1 MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Eye className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Fuel className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Fuel Receipt - Pilot
                </p>
                <p className="text-sm text-gray-600">Dec 15, 2024 • $187.45</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Eye className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Screen with Data Export
  const ProfileScreen = () => (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>

      {/* Profile Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 text-xl font-bold">MJ</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Mike Johnson
            </h3>
            <p className="text-gray-600">Owner-Operator</p>
            <p className="text-sm text-gray-500">CDL: TX123456789</p>
            <p className="text-sm text-gray-500">DOT: 3847592</p>
          </div>
        </div>
      </div>

      {/* Data Ownership Section */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-green-900 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Your Data
          </h3>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Locally Stored
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Trip Records:</span>
            <span className="font-medium text-green-900">2,847 trips</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">
              Total Earnings Tracked:
            </span>
            <span className="font-medium text-green-900">$127,450.32</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Documents Stored:</span>
            <span className="font-medium text-green-900">892 files</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Storage Used:</span>
            <span className="font-medium text-green-900">247 MB</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-200">
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export All Data</span>
          </button>
          <p className="text-xs text-green-700 mt-2 text-center">
            Export to CSV, PDF, or JSON format
          </p>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="space-y-2">
        <div className="bg-white rounded-xl border border-gray-200">
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-900">
                Switch Dispatcher
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-900">
                Privacy & Security
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-900">Notifications</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-900">App Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-600">TruckingOS Mobile v1.0.0</p>
        <p className="text-xs text-gray-500 mt-1">
          Built by truckers, for truckers
        </p>
      </div>
    </div>
  );

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "dispatchers":
        return <DispatchersScreen />;
      case "documents":
        return <DocumentsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen flex flex-col shadow-2xl">
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs">
        <span>9:41 AM</span>
        <div className="flex items-center space-x-1">
          <span>●●●●●</span>
          <span>📶</span>
          <span>🔋 85%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderActiveScreen()}</div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 safe-area-padding">
        <div className="flex justify-around">
          <TabButton
            id="home"
            icon={Truck}
            label="Home"
            active={activeTab === "home"}
            onClick={setActiveTab}
          />
          <TabButton
            id="dispatchers"
            icon={Users}
            label="Dispatchers"
            active={activeTab === "dispatchers"}
            onClick={setActiveTab}
          />
          <TabButton
            id="documents"
            icon={Camera}
            label="Documents"
            active={activeTab === "documents"}
            onClick={setActiveTab}
          />
          <TabButton
            id="profile"
            icon={Settings}
            label="Profile"
            active={activeTab === "profile"}
            onClick={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default TruckerMobileApp;
