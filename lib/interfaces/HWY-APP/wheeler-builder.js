import React, { useState, useEffect } from 'react';
import { Truck, Settings, Play, Pause, RotateCcw, Package, Zap } from 'lucide-react';

const WheelerBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [cargoCount, setCargoCount] = useState(0);
  
  const [wheelerConfig, setWheelerConfig] = useState({
    name: 'Load Matcher Wheeler',
    model: 'claude-sonnet-4',
    steering: [],
    drive: [],
    trailer: []
  });

  const availableWheels = {
    steering: [
      { id: 's1', name: 'Route Planner', icon: '🗺️' },
      { id: 's2', name: 'Priority Logic', icon: '⚡' },
      { id: 's3', name: 'Decision Engine', icon: '🎯' }
    ],
    drive: [
      { id: 'd1', name: 'Load Search', icon: '🔍', pair: 'd2' },
      { id: 'd2', name: 'Rate Calculator', icon: '💰', pair: 'd1' },
      { id: 'd3', name: 'Driver Match', icon: '👤', pair: 'd4' },
      { id: 'd4', name: 'HOS Check', icon: '⏰', pair: 'd3' },
      { id: 'd5', name: 'Email Send', icon: '📧', pair: 'd6' },
      { id: 'd6', name: 'Doc Generator', icon: '📄', pair: 'd5' },
      { id: 'd7', name: 'Payment Process', icon: '💳', pair: 'd8' },
      { id: 'd8', name: 'Invoice Create', icon: '🧾', pair: 'd7' }
    ],
    trailer: [
      { id: 't1', name: 'Data Validator', icon: '✓' },
      { id: 't2', name: 'Logger', icon: '📝' },
      { id: 't3', name: 'Notifier', icon: '🔔' },
      { id: 't4', name: 'Backup', icon: '💾' }
    ]
  };

  const addWheel = (type, wheel) => {
    setWheelerConfig(prev => ({
      ...prev,
      [type]: [...prev[type], wheel]
    }));
  };

  const removeWheel = (type, wheelId) => {
    setWheelerConfig(prev => ({
      ...prev,
      [type]: prev[type].filter(w => w.id !== wheelId)
    }));
  };

  const simulateRun = () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([]);
    setCargoCount(0);
    
    const steps = [
      { time: 500, log: '🚚 Wheeler started - Engine running', cargo: 0 },
      { time: 1000, log: '🗺️ Steering: Planning optimal route...', cargo: 0 },
      { time: 1500, log: '🔍 Drive Axle 1: Searching load boards...', cargo: 0 },
      { time: 2000, log: '📦 Cargo loaded: Found 3 available loads', cargo: 3 },
      { time: 2500, log: '💰 Drive Axle 1: Calculating rates...', cargo: 3 },
      { time: 3000, log: '👤 Drive Axle 2: Matching drivers...', cargo: 3 },
      { time: 3500, log: '⏰ Drive Axle 2: Checking HOS availability...', cargo: 3 },
      { time: 4000, log: '✓ Trailer: Validating data integrity...', cargo: 3 },
      { time: 4500, log: '📧 Drive Axle 3: Sending load offers to drivers...', cargo: 3 },
      { time: 5000, log: '📝 Trailer: Logging all transactions...', cargo: 3 },
      { time: 5500, log: '🔔 Trailer: Notifying dispatcher...', cargo: 0 },
      { time: 6000, log: '✅ Wheeler completed - Cargo delivered!', cargo: 0 }
    ];

    steps.forEach(({ time, log, cargo }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        setProgress((time / 6000) * 100);
        setCargoCount(cargo);
        if (time === 6000) setIsRunning(false);
      }, time);
    });
  };

  const resetWheeler = () => {
    setIsRunning(false);
    setProgress(0);
    setLogs([]);
    setCargoCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Truck className="w-10 h-10 text-orange-500" />
            <div>
              <h1 className="text-3xl font-bold">Wheeler Builder</h1>
              <p className="text-slate-400">Open HWY - Agent Platform</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">AGPL Open Source</div>
            <div className="text-xs text-slate-500">ai.open-hwy.com</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'builder'
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔧 Build Wheeler
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'simulate'
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚚 Test Run
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'config'
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Configuration
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Available Wheels */}
            <div className="col-span-1 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-500" />
                Available Wheels
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-orange-400 mb-2">🎯 Steering Wheels (2)</h3>
                  <div className="space-y-2">
                    {availableWheels.steering.map(wheel => (
                      <button
                        key={wheel.id}
                        onClick={() => wheelerConfig.steering.length < 2 && addWheel('steering', wheel)}
                        disabled={wheelerConfig.steering.length >= 2}
                        className="w-full p-3 bg-slate-700 rounded hover:bg-slate-600 transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-lg mr-2">{wheel.icon}</span>
                        {wheel.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-blue-400 mb-2">⚙️ Drive Wheels (8)</h3>
                  <div className="space-y-2">
                    {availableWheels.drive.map(wheel => (
                      <button
                        key={wheel.id}
                        onClick={() => wheelerConfig.drive.length < 8 && addWheel('drive', wheel)}
                        disabled={wheelerConfig.drive.length >= 8}
                        className="w-full p-3 bg-slate-700 rounded hover:bg-slate-600 transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-lg mr-2">{wheel.icon}</span>
                        {wheel.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-2">🚛 Trailer Wheels</h3>
                  <div className="space-y-2">
                    {availableWheels.trailer.map(wheel => (
                      <button
                        key={wheel.id}
                        onClick={() => addWheel('trailer', wheel)}
                        className="w-full p-3 bg-slate-700 rounded hover:bg-slate-600 transition text-left"
                      >
                        <span className="text-lg mr-2">{wheel.icon}</span>
                        {wheel.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wheeler Visual */}
            <div className="col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Your Wheeler: {wheelerConfig.name}</h2>
              
              <div className="space-y-6">
                {/* Steering Section */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-orange-400 mb-3">🎯 Steering Wheels ({wheelerConfig.steering.length}/2)</h3>
                  <div className="flex gap-2">
                    {wheelerConfig.steering.map(wheel => (
                      <div key={wheel.id} className="flex-1 bg-orange-900/30 border-2 border-orange-500 rounded p-3 text-center relative group">
                        <div className="text-2xl mb-1">{wheel.icon}</div>
                        <div className="text-xs">{wheel.name}</div>
                        <button
                          onClick={() => removeWheel('steering', wheel.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {[...Array(2 - wheelerConfig.steering.length)].map((_, i) => (
                      <div key={`empty-s-${i}`} className="flex-1 bg-slate-700/30 border-2 border-dashed border-slate-600 rounded p-3 text-center">
                        <div className="text-slate-500 text-sm">Empty</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drive Section */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-3">⚙️ Drive Wheels ({wheelerConfig.drive.length}/8) - Paired Axles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 2, 4, 6].map(axleStart => (
                      <div key={`axle-${axleStart}`} className="space-y-2">
                        <div className="text-xs text-slate-400 text-center">Axle {axleStart / 2 + 1}</div>
                        {[axleStart, axleStart + 1].map(idx => {
                          const wheel = wheelerConfig.drive[idx];
                          return wheel ? (
                            <div key={wheel.id} className="bg-blue-900/30 border-2 border-blue-500 rounded p-2 text-center relative group">
                              <div className="text-xl mb-1">{wheel.icon}</div>
                              <div className="text-xs">{wheel.name}</div>
                              <button
                                onClick={() => removeWheel('drive', wheel.id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div key={`empty-d-${idx}`} className="bg-slate-700/30 border-2 border-dashed border-slate-600 rounded p-2 text-center">
                              <div className="text-slate-500 text-xs">Empty</div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trailer Section */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-green-400 mb-3">🚛 Trailer Wheels ({wheelerConfig.trailer.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {wheelerConfig.trailer.map(wheel => (
                      <div key={wheel.id} className="bg-green-900/30 border-2 border-green-500 rounded p-2 text-center relative group">
                        <div className="text-xl mb-1">{wheel.icon}</div>
                        <div className="text-xs">{wheel.name}</div>
                        <button
                          onClick={() => removeWheel('trailer', wheel.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {wheelerConfig.trailer.length === 0 && (
                      <div className="text-slate-500 text-sm italic">No trailer wheels added yet...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulate Tab */}
        {activeTab === 'simulate' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Animation Area */}
            <div className="col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Wheeler in Action</h2>
                <div className="flex gap-2">
                  {!isRunning && progress === 0 && (
                    <button
                      onClick={simulateRun}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2 transition"
                    >
                      <Play className="w-4 h-4" />
                      Start Wheeler
                    </button>
                  )}
                  {progress > 0 && (
                    <button
                      onClick={resetWheeler}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded flex items-center gap-2 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Truck Animation */}
              <div className="bg-slate-900 rounded-lg p-8 mb-4 relative overflow-hidden h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-slate-700 text-6xl">🛣️</div>
                </div>
                
                <div 
                  className="relative transition-all duration-300 ease-linear"
                  style={{ 
                    left: `${progress}%`,
                    transform: `translateX(-50%)`,
                    top: '50%',
                    marginTop: '-40px'
                  }}
                >
                  <div className="relative">
                    <div className="text-6xl">
                      🚚
                    </div>
                    {cargoCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {cargoCount}
                      </div>
                    )}
                  </div>
                </div>

                {progress === 100 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 animate-pulse">
                    <div className="text-4xl">✅</div>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-green-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Activity Log</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.length === 0 && (
                  <div className="text-slate-500 text-sm italic">No activity yet. Start your wheeler to see logs.</div>
                )}
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 rounded p-3 text-sm border-l-2 border-orange-500 animate-fade-in"
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Config Tab */}
        {activeTab === 'config' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Wheeler Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Wheeler Name</label>
                  <input
                    type="text"
                    value={wheelerConfig.name}
                    onChange={(e) => setWheelerConfig({...wheelerConfig, name: e.target.value})}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">AI Model (Engine)</label>
                  <select
                    value={wheelerConfig.model}
                    onChange={(e) => setWheelerConfig({...wheelerConfig, model: e.target.value})}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded focus:border-orange-500 focus:outline-none"
                  >
                    <option value="claude-sonnet-4">Claude Sonnet 4</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="ollama-llama3">Ollama - Llama 3 (Local)</option>
                    <option value="ollama-mistral">Ollama - Mistral (Local)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Trigger</label>
                  <select className="w-full p-3 bg-slate-900 border border-slate-700 rounded focus:border-orange-500 focus:outline-none">
                    <option>Manual</option>
                    <option>New Load Available</option>
                    <option>Driver HOS Updated</option>
                    <option>Schedule (Every 15 min)</option>
                    <option>API Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Behavior Mode</label>
                  <select className="w-full p-3 bg-slate-900 border border-slate-700 rounded focus:border-orange-500 focus:outline-none">
                    <option>Conservative</option>
                    <option>Balanced</option>
                    <option>Aggressive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Export / Import</h2>
              
              <div className="space-y-4">
                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                  <h3 className="font-semibold mb-2">Export Wheeler Configuration</h3>
                  <p className="text-sm text-slate-400 mb-3">Share your wheeler with the community</p>
                  <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded transition">
                    📤 Export as JSON
                  </button>
                </div>

                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                  <h3 className="font-semibold mb-2">Import Wheeler</h3>
                  <p className="text-sm text-slate-400 mb-3">Load a wheeler from ai.open-hwy.com</p>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition">
                    📥 Import Configuration
                  </button>
                </div>

                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                  <h3 className="font-semibold mb-2">Current Setup</h3>
                  <div className="text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded max-h-48 overflow-auto">
                    <pre>{JSON.stringify(wheelerConfig, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WheelerBuilder;