import { useState } from 'react';
import { ChainOfThoughtReasoner } from '@phnxforge/mathematics-engine';

export default function ProblemSolverPage() {
  const [problem, setProblem] = useState('');
  const [steps, setSteps] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleSolve = () => {
    const reasoner = new ChainOfThoughtReasoner();
    
    // Simple demonstration
    reasoner
      .addStep('Identify the problem', problem, 'Read and understand the given problem')
      .addStep('Plan the solution', undefined, 'Determine the approach to solve')
      .addStep('Execute the solution', undefined, 'Apply mathematical operations');

    const finalResult = reasoner.getResult(42); // Mock result
    setSteps(finalResult.steps);
    setResult(finalResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Problem Solver</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Enter Your Problem</h2>
          
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter a math problem (e.g., 2 + 3 * 4)"
            className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <button
            onClick={handleSolve}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Solve Problem
          </button>

          {steps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Solution Steps</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{step.description}</h4>
                        {step.expression && (
                          <code className="block bg-white px-3 py-2 rounded border text-sm mb-2">
                            {step.expression}
                          </code>
                        )}
                        <p className="text-sm text-gray-600">{step.justification}</p>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">
                            Confidence: {(step.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {result && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Final Answer</h3>
                  <p className="text-2xl font-bold text-green-700">{result.finalAnswer}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Overall Confidence: {(result.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
