import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'standards'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'students'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'standards'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Standards
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">42</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Active Problems</h3>
              <p className="text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Avg Completion</h3>
              <p className="text-3xl font-bold text-purple-600">78%</p>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Student Progress</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Student {i}</h3>
                      <p className="text-sm text-gray-600">Grade 8</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{75 + i * 5}%</p>
                      <p className="text-sm text-gray-600">Completion</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'standards' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Common Core Standards - Grade 8</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">8.EE.A.1</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Know and apply the properties of integer exponents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">8.EE.A.2</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Use square root and cube root symbols
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">8.EE.C.7</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Solve linear equations in one variable
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
