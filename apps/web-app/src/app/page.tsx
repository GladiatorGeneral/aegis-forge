'use client';

import { trpc } from '../lib/trpc-client';
import { StandardCard } from '../components/standard-card';
import { ReasoningDemo } from '../components/reasoning-demo';

export default function HomePage() {
  const { data: standards, isLoading } = trpc.standards.getAll.useQuery();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PHNXForge Mathematics Platform
          </h1>
          <p className="text-xl text-gray-600">
            Advanced reasoning engine with Common Core alignment
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Multi-Perspective Problem Solving
          </h2>
          <ReasoningDemo />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Common Core Standards
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards?.map((standard) => (
                <StandardCard key={standard.id} standard={standard} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
