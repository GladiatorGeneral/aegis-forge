export interface CommonCoreStandard {
  code: string;
  gradeLevel: string;
  domain: string;
  cluster: string;
  description: string;
  prerequisites: string[];
}

export const GRADE_8_STANDARDS: CommonCoreStandard[] = [
  {
    code: '8.EE.A.1',
    gradeLevel: '8',
    domain: 'Expressions and Equations',
    cluster: 'Work with radicals and integer exponents',
    description: 'Know and apply the properties of integer exponents to generate equivalent numerical expressions.',
    prerequisites: ['7.EE.A.1', '7.EE.A.2']
  },
  {
    code: '8.EE.A.2',
    gradeLevel: '8',
    domain: 'Expressions and Equations',
    cluster: 'Work with radicals and integer exponents',
    description: 'Use square root and cube root symbols to represent solutions to equations.',
    prerequisites: ['7.NS.A.2']
  },
  {
    code: '8.EE.C.7',
    gradeLevel: '8',
    domain: 'Expressions and Equations',
    cluster: 'Analyze and solve linear equations and pairs of simultaneous linear equations',
    description: 'Solve linear equations in one variable.',
    prerequisites: ['7.EE.B.4']
  }
];

export class StandardsLibrary {
  private standards: Map<string, CommonCoreStandard> = new Map();

  constructor() {
    GRADE_8_STANDARDS.forEach(standard => {
      this.standards.set(standard.code, standard);
    });
  }

  getStandard(code: string): CommonCoreStandard | undefined {
    return this.standards.get(code);
  }

  getStandardsByGrade(gradeLevel: string): CommonCoreStandard[] {
    return Array.from(this.standards.values()).filter(
      s => s.gradeLevel === gradeLevel
    );
  }

  getStandardsByDomain(domain: string): CommonCoreStandard[] {
    return Array.from(this.standards.values()).filter(
      s => s.domain === domain
    );
  }
}
