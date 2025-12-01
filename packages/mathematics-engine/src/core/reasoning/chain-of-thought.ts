export interface ReasoningStep {
  step: number;
  description: string;
  expression?: string;
  justification: string;
  confidence: number;
}

export interface ReasoningResult {
  steps: ReasoningStep[];
  finalAnswer: any;
  confidence: number;
  verification: VerificationResult;
}

export interface VerificationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class ChainOfThoughtReasoner {
  private steps: ReasoningStep[] = [];
  private currentStep = 0;

  addStep(description: string, expression?: string, justification?: string): this {
    this.currentStep++;
    this.steps.push({
      step: this.currentStep,
      description,
      expression,
      justification: justification || 'Logical deduction',
      confidence: 0.9
    });
    return this;
  }

  setConfidence(step: number, confidence: number): this {
    const targetStep = this.steps.find(s => s.step === step);
    if (targetStep) {
      targetStep.confidence = Math.max(0, Math.min(1, confidence));
    }
    return this;
  }

  verify(): VerificationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    this.steps.forEach(step => {
      if (!step.justification || step.justification.trim() === '' || step.justification === 'Logical deduction') {
        warnings.push(`Step ${step.step} lacks proper justification`);
      }
      if (step.confidence < 0.7) {
        warnings.push(`Step ${step.step} has low confidence: ${step.confidence}`);
      }
    });

    for (let i = 1; i < this.steps.length; i++) {
      if (this.steps[i].step !== this.steps[i-1].step + 1) {
        errors.push(`Step discontinuity between ${this.steps[i-1].step} and ${this.steps[i].step}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  getResult(finalAnswer: any): ReasoningResult {
    const verification = this.verify();
    const overallConfidence = this.calculateOverallConfidence();

    return {
      steps: [...this.steps],
      finalAnswer,
      confidence: overallConfidence,
      verification
    };
  }

  private calculateOverallConfidence(): number {
    if (this.steps.length === 0) return 0;
    return this.steps.reduce((sum, step) => sum + step.confidence, 0) / this.steps.length;
  }

  reset(): void {
    this.steps = [];
    this.currentStep = 0;
  }
}
