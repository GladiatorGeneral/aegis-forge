'use client';

import { useState } from 'react';
import { trpc } from '../lib/trpc-client';

export function ReasoningDemo() {
  const [problem, setProblem] = useState('Solve 2x + 5 = 13');
  const [perspectives, setPerspectives] = useState(['algebraic', 'geometric', 'numerical']);
  
  const solveMutation = trpc.standards.solveProblem.useMutation();

  const handleSolve = () => {
    solveMutation.mutate({ problem, perspectives });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Problem Statement:
        </label>
        <input
          type="text"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter a mathematical problem..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Perspectives:
        </label>
        <div className="flex gap-4">
          {['algebraic', 'geometric', 'numerical'].map((p) => (
            <label key={p} className="flex items-center">
              <input
                type="checkbox"
                checked={perspectives.includes(p)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPerspectives([...perspectives, p]);
                  } else {
                    setPerspectives(perspectives.filter(x => x !== p));
                  }
                }}
                className="mr-2"
              />
              <span className="text-sm capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSolve}
        disabled={solveMutation.isPending}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {solveMutation.isPending ? 'Solving...' : 'Solve Problem'}
      </button>

      {solveMutation.data && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">Best Approach:</h3>
            <p className="text-green-700">{solveMutation.data.bestApproach || 'Multiple perspectives analyzed'}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Reasoning Perspectives:</h3>
            {solveMutation.data.perspectives?.map((perspective: any) => (
              <div key={perspective.id} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-semibold text-gray-700 mb-2">{perspective.perspective.name}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Approach: <span className="font-medium">{perspective.perspective.approach}</span>
                </p>
                
                {perspective.reasoning?.steps && perspective.reasoning.steps.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Reasoning Steps:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      {perspective.reasoning.steps.map((step: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700">
                          {step.title}: {step.justification || 'Processing...'}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {perspective.perspective.assumptions && perspective.perspective.assumptions.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Assumptions:</p>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                      {perspective.perspective.assumptions.map((assumption: string, idx: number) => (
                        <li key={idx}>{assumption}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {solveMutation.data.consensus && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-semibold text-blue-800 mb-2">Consensus:</h4>
              <p className="text-blue-700">{solveMutation.data.consensus}</p>
            </div>
          )}

          {solveMutation.data.conflicts && solveMutation.data.conflicts.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-semibold text-yellow-800 mb-2">Conflicts Detected:</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                {solveMutation.data.conflicts.map((conflict: string, idx: number) => (
                  <li key={idx}>{conflict}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {solveMutation.error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
          <p className="text-red-700">{solveMutation.error.message}</p>
        </div>
      )}
    </div>
  );
}
