export interface CommonCoreStandard {
  id: string;
  code: string;
  description: string;
  gradeLevel: string;
  domain: string;
  cluster: string;
  competencies: Competency[];
  prerequisites: string[];
  relatedStandards: string[];
}

export interface Competency {
  id: string;
  description: string;
  complexity: 'basic' | 'proficient' | 'advanced';
  mathematicalPractices: string[];
  industrialApplications: string[];
}

export class CommonCoreRepository {
  private standards: Map<string, CommonCoreStandard> = new Map();

  constructor() {
    this.initializeStandards();
  }

  private initializeStandards() {
    // K-5 Standards
    this.addStandard({
      id: '1.OA.A.1',
      code: '1.OA.A.1',
      description: 'Use addition and subtraction within 20 to solve word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions.',
      gradeLevel: '1',
      domain: 'Operations and Algebraic Thinking',
      cluster: 'Represent and solve problems involving addition and subtraction.',
      competencies: [
        {
          id: '1.OA.A.1-1',
          description: 'Solve addition word problems within 20',
          complexity: 'basic',
          mathematicalPractices: ['MP1', 'MP4'],
          industrialApplications: ['Inventory counting', 'Assembly line tracking']
        }
      ],
      prerequisites: ['K.CC.A.1', 'K.OA.A.1'],
      relatedStandards: ['1.OA.A.2', '1.OA.B.3']
    });

    this.addStandard({
      id: '3.NF.A.1',
      code: '3.NF.A.1',
      description: 'Understand a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts; understand a fraction a/b as the quantity formed by a parts of size 1/b.',
      gradeLevel: '3',
      domain: 'Number and Operations—Fractions',
      cluster: 'Develop understanding of fractions as numbers.',
      competencies: [
        {
          id: '3.NF.A.1-1',
          description: 'Identify fractions as parts of a whole',
          complexity: 'basic',
          mathematicalPractices: ['MP2', 'MP7'],
          industrialApplications: ['Material measurements', 'Quality control sampling']
        }
      ],
      prerequisites: ['2.G.A.3'],
      relatedStandards: ['3.NF.A.2', '3.NF.A.3']
    });

    this.addStandard({
      id: '5.NF.B.4',
      code: '5.NF.B.4',
      description: 'Apply and extend previous understandings of multiplication to multiply a fraction or whole number by a fraction.',
      gradeLevel: '5',
      domain: 'Number and Operations—Fractions',
      cluster: 'Apply and extend previous understandings of multiplication and division.',
      competencies: [
        {
          id: '5.NF.B.4-1',
          description: 'Multiply fractions by fractions',
          complexity: 'proficient',
          mathematicalPractices: ['MP2', 'MP7', 'MP8'],
          industrialApplications: ['Recipe scaling', 'Material cost calculations', 'Production ratios']
        }
      ],
      prerequisites: ['4.NF.B.4', '3.NF.A.1'],
      relatedStandards: ['5.NF.B.5', '5.NF.B.6']
    });

    // 6-8 Standards
    this.addStandard({
      id: '7.RP.A.1',
      code: '7.RP.A.1',
      description: 'Compute unit rates associated with ratios of fractions, including ratios of lengths, areas and other quantities measured in like or different units.',
      gradeLevel: '7',
      domain: 'Ratios and Proportional Relationships',
      cluster: 'Analyze proportional relationships and use them to solve real-world and mathematical problems.',
      competencies: [
        {
          id: '7.RP.A.1-1',
          description: 'Calculate unit rates from ratios',
          complexity: 'proficient',
          mathematicalPractices: ['MP1', 'MP2', 'MP6'],
          industrialApplications: ['Production rates', 'Cost analysis', 'Efficiency calculations', 'Speed calculations']
        }
      ],
      prerequisites: ['6.RP.A.1', '6.RP.A.2'],
      relatedStandards: ['7.RP.A.2', '7.RP.A.3']
    });

    this.addStandard({
      id: '8.EE.A.1',
      code: '8.EE.A.1',
      description: 'Know and apply the properties of integer exponents to generate equivalent numerical expressions.',
      gradeLevel: '8',
      domain: 'Expressions and Equations',
      cluster: 'Work with radicals and integer exponents.',
      competencies: [
        {
          id: '8.EE.A.1-1',
          description: 'Apply exponent properties',
          complexity: 'proficient',
          mathematicalPractices: ['MP2', 'MP7'],
          industrialApplications: ['Scientific notation in engineering', 'Exponential growth modeling', 'Compound calculations']
        }
      ],
      prerequisites: ['7.EE.A.1', '7.EE.A.2'],
      relatedStandards: ['8.EE.A.2', '8.EE.A.3']
    });
  }

  private addStandard(standard: CommonCoreStandard) {
    this.standards.set(standard.id, standard);
  }

  getStandardById(id: string): CommonCoreStandard | undefined {
    return this.standards.get(id);
  }

  getStandardsByGradeLevel(gradeLevel: string): CommonCoreStandard[] {
    return Array.from(this.standards.values())
      .filter(standard => standard.gradeLevel === gradeLevel)
      .sort((a, b) => a.code.localeCompare(b.code));
  }

  getStandardsByDomain(domain: string): CommonCoreStandard[] {
    return Array.from(this.standards.values())
      .filter(standard => standard.domain === domain);
  }

  findRelatedStandards(standardId: string): CommonCoreStandard[] {
    const standard = this.standards.get(standardId);
    if (!standard) return [];

    return standard.relatedStandards
      .map(id => this.standards.get(id))
      .filter((s): s is CommonCoreStandard => s !== undefined);
  }

  getPrerequisiteChain(standardId: string): CommonCoreStandard[] {
    const chain: CommonCoreStandard[] = [];
    const visited = new Set<string>();

    const buildChain = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);

      const standard = this.standards.get(id);
      if (!standard) return;

      standard.prerequisites.forEach(prereqId => {
        buildChain(prereqId);
      });

      chain.push(standard);
    };

    buildChain(standardId);
    return chain;
  }

  getAllStandards(): CommonCoreStandard[] {
    return Array.from(this.standards.values());
  }
}
