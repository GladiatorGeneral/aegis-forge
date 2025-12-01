import type { CommonCoreStandard } from '@phnxforge/mathematics-engine';

interface StandardCardProps {
  standard: CommonCoreStandard;
}

export function StandardCard({ standard }: StandardCardProps) {
  const gradeColors: Record<string, string> = {
    '1': 'bg-green-100 text-green-800',
    '3': 'bg-blue-100 text-blue-800',
    '5': 'bg-purple-100 text-purple-800',
    '7': 'bg-orange-100 text-orange-800',
    '8': 'bg-red-100 text-red-800',
  };

  const complexityColors = {
    basic: 'bg-green-50 border-green-200 text-green-700',
    proficient: 'bg-blue-50 border-blue-200 text-blue-700',
    advanced: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColors[standard.gradeLevel] || 'bg-gray-100 text-gray-800'}`}>
          Grade {standard.gradeLevel}
        </span>
        <span className="text-sm font-mono text-gray-600">{standard.code}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{standard.domain}</h3>
      <p className="text-sm text-gray-600 mb-4">{standard.description}</p>

      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Competencies:</h4>
        <div className="space-y-2">
          {standard.competencies.map((comp) => (
            <div
              key={comp.id}
              className={`p-3 rounded-md border ${complexityColors[comp.complexity]}`}
            >
              <p className="text-sm font-medium mb-1">{comp.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {comp.mathematicalPractices.map((practice) => (
                  <span
                    key={practice}
                    className="px-2 py-0.5 bg-white rounded text-xs font-medium"
                  >
                    {practice}
                  </span>
                ))}
              </div>
              {comp.industrialApplications.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold mb-1">Industrial Applications:</p>
                  <div className="flex flex-wrap gap-1">
                    {comp.industrialApplications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white rounded text-xs italic"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {standard.prerequisites.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Prerequisites:</h4>
          <div className="flex flex-wrap gap-2">
            {standard.prerequisites.map((prereq) => (
              <span
                key={prereq}
                className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-700"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
