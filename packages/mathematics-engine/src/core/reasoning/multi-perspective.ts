import { ChainOfThoughtReasoner, ReasoningResult } from './chain-of-thought';

export interface Perspective {
  id: string;
  name: string;
  approach: string;
  assumptions: string[];
  constraints: string[];
}

export interface MultiPerspectiveResult {
  perspectives: Map<string, ReasoningResult>;
  consensus: any;
  conflicts: string[];
  bestApproach: string;
}

export class MultiPerspectiveReasoner {
  private perspectives: Map<string, { reasoner: ChainOfThoughtReasoner; perspective: Perspective }> = new Map();

  addPerspective(id: string, perspective: Perspective, reasoner: ChainOfThoughtReasoner): this {
    this.perspectives.set(id, { reasoner, perspective });
    return this;
  }

  async solve(problem: string): Promise<MultiPerspectiveResult> {
    const results = new Map<string, ReasoningResult>();
    const answers: any[] = [];

    for (const [id, { reasoner, perspective }] of this.perspectives.entries()) {
      const result = await this.executePerspective(reasoner, problem, perspective);
      results.set(id, result);
      answers.push(result.finalAnswer);
    }

    const consensus = this.findConsensus(answers);
    const conflicts = this.findConflicts(results);
    const bestApproach = this.selectBestApproach(results);

    return {
      perspectives: results,
      consensus,
      conflicts,
      bestApproach
    };
  }

  private async executePerspective(
    reasoner: ChainOfThoughtReasoner, 
    problem: string, 
    _perspective: Perspective
  ): Promise<ReasoningResult> {
    return reasoner.getResult(this.mockSolve(problem));
  }

  private findConsensus(answers: any[]): any {
    if (answers.length === 0) return null;
    
    const frequency = new Map();
    answers.forEach(answer => {
      const key = JSON.stringify(answer);
      frequency.set(key, (frequency.get(key) || 0) + 1);
    });

    let maxCount = 0;
    let consensus = answers[0];
    
    frequency.forEach((count, answer) => {
      if (count > maxCount) {
        maxCount = count;
        consensus = JSON.parse(answer);
      }
    });

    return consensus;
  }

  private findConflicts(results: Map<string, ReasoningResult>): string[] {
    const conflicts: string[] = [];
    const answers = Array.from(results.values()).map(r => r.finalAnswer);
    
    for (let i = 0; i < answers.length; i++) {
      for (let j = i + 1; j < answers.length; j++) {
        if (JSON.stringify(answers[i]) !== JSON.stringify(answers[j])) {
          conflicts.push(`Perspective ${i} and ${j} disagree: ${answers[i]} vs ${answers[j]}`);
        }
      }
    }
    
    return conflicts;
  }

  private selectBestApproach(results: Map<string, ReasoningResult>): string {
    let bestId = '';
    let bestConfidence = -1;

    results.forEach((result, id) => {
      if (result.confidence > bestConfidence && result.verification.isValid) {
        bestConfidence = result.confidence;
        bestId = id;
      }
    });

    return bestId;
  }

  private mockSolve(problem: string): any {
    if (problem.includes('+')) {
      const parts = problem.split('+').map(p => p.trim());
      return Number(parts[0]) + Number(parts[1]);
    }
    if (problem.includes('*')) {
      const parts = problem.split('*').map(p => p.trim());
      return Number(parts[0]) * Number(parts[1]);
    }
    return null;
  }
}
