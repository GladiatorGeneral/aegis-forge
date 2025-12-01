import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          PHNXForge
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Advanced Mathematics Education Platform
        </p>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Revolutionizing math education with multi-perspective reasoning, 
          formal verification, and research-backed instructional methods.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Teacher Dashboard
          </Link>
          <Link
            to="/solve"
            className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Student Problem Solver
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Multi-Perspective Reasoning</h3>
            <p className="text-gray-600">
              Explore problems from multiple angles with debate-style reasoning
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">3D Assessment</h3>
            <p className="text-gray-600">
              Evaluate conceptual, procedural, and applied understanding
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Industrial Applications</h3>
            <p className="text-gray-600">
              Connect mathematics to real-world manufacturing and careers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
